const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createSampleData() {
  console.log('🌱 Creating sample data...');

  try {
    // Check if categories already exist
    const existingCategories = await prisma.category.findMany();
    
    if (existingCategories.length === 0) {
      // Create sample categories first
      const categories = await prisma.category.createMany({
        data: [
          {
            name: 'Electronics',
            slug: 'electronics',
            description: 'Electronic devices and gadgets',
            isActive: true
          },
          {
            name: 'Mobile Phones',
            slug: 'mobile-phones',
            description: 'Smartphones and mobile devices',
            isActive: true
          },
          {
            name: 'Computers',
            slug: 'computers',
            description: 'Laptops, desktops, and computer accessories',
            isActive: true
          }
        ]
      });
      console.log('📂 Categories created:', categories.count);
    } else {
      console.log('📂 Categories already exist, skipping creation');
    }

    // Get the electronics category
    const electronicsCategory = await prisma.category.findFirst({
      where: { slug: 'electronics' }
    });

    // Get the existing vendor or create a new one
    let vendor = await prisma.vendor.findFirst({
      where: {
        user: {
          email: 'vendor@iwanyu.com'
        }
      }
    });

    if (!vendor) {
      // Create sample vendor if it doesn't exist
      vendor = await prisma.vendor.create({
        data: {
          businessName: 'Sample Tech Store',
          description: 'A sample technology store for testing',
          status: 'APPROVED',
          user: {
            create: {
              email: 'vendor@iwanyu.com',
              name: 'Sample Vendor',
              password: '$2a$12$LQv3c1yqBw9kK6.jgBvzfOkM9EgGqZmzRJEQWGKZvSeMJO8NJ2.oW', // password123
              role: 'VENDOR',
              emailVerified: new Date()
            }
          }
        }
      });
    }

    // Create sample products
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Sample iPhone 15',
          slug: 'sample-iphone-15',
          description: 'Sample iPhone 15 for testing purposes',
          price: 1200.00,
          comparePrice: 1300.00,
          images: ['https://via.placeholder.com/400x400/FFD700/000000?text=iPhone+15'],
          inventory: 50,
          status: 'ACTIVE',
          vendorId: vendor.id,
          categoryId: electronicsCategory.id
        },
        {
          name: 'Sample MacBook Pro',
          slug: 'sample-macbook-pro',
          description: 'Sample MacBook Pro for testing purposes',
          price: 2500.00,
          comparePrice: 2800.00,
          images: ['https://via.placeholder.com/400x400/FFD700/000000?text=MacBook+Pro'],
          inventory: 25,
          status: 'ACTIVE',
          vendorId: vendor.id,
          categoryId: electronicsCategory.id
        },
        {
          name: 'Sample Samsung Galaxy S24',
          slug: 'sample-samsung-galaxy-s24',
          description: 'Sample Samsung Galaxy S24 for testing purposes',
          price: 1000.00,
          comparePrice: 1100.00,
          images: ['https://via.placeholder.com/400x400/FFD700/000000?text=Galaxy+S24'],
          inventory: 30,
          status: 'ACTIVE',
          vendorId: vendor.id,
          categoryId: electronicsCategory.id
        }
      ]
    });

    console.log('✅ Sample data created successfully!');
    console.log('🏪 Vendor found/created:', vendor.businessName);
    console.log('📱 Products created:', products.count);
    console.log('');
    console.log('🔗 Vendor Login Credentials:');
    console.log('Email: vendor@iwanyu.com');
    console.log('Password: password123');
    console.log('');

  } catch (error) {
    console.error('❌ Sample data creation failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sample data creation
createSampleData()
  .catch((error) => {
    console.error('Fatal error during sample data creation:', error);
    process.exit(1);
  });
