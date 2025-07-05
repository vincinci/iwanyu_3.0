const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const prisma = new PrismaClient();

// Function to clean and format product name
function cleanProductName(name) {
  if (!name) return '';
  return name
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .slice(0, 100); // Limit to 100 characters
}

// Function to create slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 50);
}

// Function to parse price (convert from cents to dollars/francs)
function parsePrice(priceString) {
  if (!priceString || isNaN(priceString)) return 0;
  const price = parseInt(priceString);
  return price; // Keep as is since it's already in RWF
}

// Function to clean HTML description
function cleanDescription(html) {
  if (!html) return '';
  
  // Remove HTML tags and convert to plain text
  let text = html
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/&[a-zA-Z0-9#]+;/g, ' ') // Remove HTML entities
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .trim();
  
  return text.slice(0, 1000); // Limit description length
}

// Function to extract images from CSV rows
function extractImages(rows) {
  const images = [];
  for (const row of rows) {
    if (row['Image Src'] && row['Image Src'].trim()) {
      images.push(row['Image Src'].trim());
    }
  }
  return [...new Set(images)]; // Remove duplicates
}

async function importProducts() {
  try {
    console.log('🚀 Starting product import...');

    // First, ensure we have the Ewanu vendor
    let vendor = await prisma.vendor.findFirst({
      where: {
        businessName: 'Ewanu'
      }
    });

    if (!vendor) {
      console.log('📝 Creating Ewanu vendor...');
      
      // Create a user for the vendor first
      const vendorUser = await prisma.user.create({
        data: {
          email: 'vendor@ewanu.com',
          name: 'Ewanu Store',
          role: 'VENDOR'
        }
      });

      vendor = await prisma.vendor.create({
        data: {
          userId: vendorUser.id,
          businessName: 'Ewanu',
          description: 'Quality products from Ewanu marketplace',
          status: 'APPROVED'
        }
      });
    }

    console.log(`✅ Vendor ready: ${vendor.businessName} (ID: ${vendor.id})`);

    // Create a default category
    let category = await prisma.category.findFirst({
      where: {
        name: 'General Products'
      }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: 'General Products',
          slug: 'general-products',
          description: 'General product category for imported items',
          isActive: true
        }
      });
    }

    console.log(`✅ Category ready: ${category.name} (ID: ${category.id})`);

    // Read and parse CSV file
    const csvFilePath = '/Users/dushimiyimanadavy/Downloads/products_export_1 2.csv';
    
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSV file not found: ${csvFilePath}`);
    }

    console.log('📖 Reading CSV file...');
    
    const allRows = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          allRows.push(row);
        })
        .on('end', async () => {
          try {
            console.log(`📊 Found ${allRows.length} CSV rows`);

            // Group rows by product handle (each product can have multiple rows for variants/images)
            const productGroups = {};
            
            for (const row of allRows) {
              const handle = row.Handle;
              if (!handle) continue;
              
              if (!productGroups[handle]) {
                productGroups[handle] = [];
              }
              productGroups[handle].push(row);
            }

            console.log(`🔍 Found ${Object.keys(productGroups).length} unique products`);

            let importedCount = 0;
            let skippedCount = 0;

            // Process each product group
            for (const [handle, rows] of Object.entries(productGroups)) {
              try {
                // Get the main product row (first row with title)
                const mainRow = rows.find(row => row.Title && row.Title.trim()) || rows[0];
                
                if (!mainRow || !mainRow.Title) {
                  console.log(`⚠️  Skipping product ${handle}: No title found`);
                  skippedCount++;
                  continue;
                }

                const productName = cleanProductName(mainRow.Title);
                const slug = createSlug(productName);
                
                // Check if product already exists
                const existingProduct = await prisma.product.findUnique({
                  where: { slug }
                });

                if (existingProduct) {
                  console.log(`⚠️  Skipping existing product: ${productName}`);
                  skippedCount++;
                  continue;
                }

                // Extract product data
                const description = cleanDescription(mainRow['Body (HTML)']);
                const price = parsePrice(mainRow['Variant Price']);
                const comparePrice = parsePrice(mainRow['Variant Compare At Price']);
                const sku = mainRow['Variant SKU'] || `ewanu-${handle}`;
                const images = extractImages(rows);

                // Create product
                const product = await prisma.product.create({
                  data: {
                    name: productName,
                    slug: slug,
                    description: description,
                    price: price,
                    comparePrice: comparePrice > price ? comparePrice : null,
                    sku: sku,
                    inventory: 100, // Default inventory
                    status: 'ACTIVE',
                    images: images.slice(0, 10), // Limit to 10 images
                    vendorId: vendor.id,
                    categoryId: category.id
                  }
                });

                console.log(`✅ Imported: ${productName} (RWF ${price})`);
                importedCount++;

                // Add a small delay to avoid overwhelming the database
                if (importedCount % 10 === 0) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                }

              } catch (error) {
                console.error(`❌ Error importing product ${handle}:`, error.message);
                skippedCount++;
              }
            }

            console.log(`\n🎉 Import completed!`);
            console.log(`✅ Successfully imported: ${importedCount} products`);
            console.log(`⚠️  Skipped: ${skippedCount} products`);
            console.log(`📦 All products assigned to vendor: ${vendor.businessName}`);

            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });

  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
if (require.main === module) {
  importProducts()
    .then(() => {
      console.log('\n🏁 Import script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Import script failed:', error);
      process.exit(1);
    });
}

module.exports = { importProducts };
