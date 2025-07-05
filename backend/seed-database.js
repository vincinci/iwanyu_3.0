const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create sample categories
    const categories = [
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic gadgets and devices',
        isActive: true
      },
      {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        isActive: true
      },
      {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Everything for your home and garden',
        isActive: true
      },
      {
        name: 'Books',
        slug: 'books',
        description: 'Books for all ages and interests',
        isActive: true
      }
    ];

    console.log('📁 Creating categories...');
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      });
    }

    // Create sample user
    const sampleUser = await prisma.user.upsert({
      where: { email: 'vendor@iwanyu.com' },
      update: {},
      create: {
        email: 'vendor@iwanyu.com',
        name: 'Sample Vendor',
        role: 'VENDOR',
        emailVerified: new Date()
      }
    });

    // Create sample vendor
    const sampleVendor = await prisma.vendor.upsert({
      where: { userId: sampleUser.id },
      update: {},
      create: {
        userId: sampleUser.id,
        businessName: 'Iwanyu Electronics',
        businessDescription: 'Leading electronics retailer in Rwanda',
        businessType: 'RETAIL',
        status: 'APPROVED',
        phone: '+250788123456',
        address: 'Kigali, Rwanda',
        businessLicense: 'BL123456',
        taxId: 'TAX123456'
      }
    });

    // Create sample products
    const electronics = await prisma.category.findUnique({
      where: { slug: 'electronics' }
    });

    const sampleProducts = [
      {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'Latest iPhone with advanced features',
        price: 999.99,
        comparePrice: 1099.99,
        sku: 'IP15PRO001',
        inventory: 50,
        status: 'ACTIVE',
        categoryId: electronics.id,
        vendorId: sampleVendor.id,
        images: ['https://cdn.shopify.com/s/files/1/0057/8938/4802/files/iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1__en-US.jpg']
      },
      {
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        description: 'Premium Android smartphone',
        price: 849.99,
        comparePrice: 949.99,
        sku: 'SGS24001',
        inventory: 30,
        status: 'ACTIVE',
        categoryId: electronics.id,
        vendorId: sampleVendor.id,
        images: ['https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Galaxy_S24_Violet_PDP_Image_Position-1__en-US.jpg']
      },
      {
        name: 'MacBook Pro 14"',
        slug: 'macbook-pro-14',
        description: 'Professional laptop for creators',
        price: 1999.99,
        comparePrice: 2199.99,
        sku: 'MBP14001',
        inventory: 20,
        status: 'ACTIVE',
        categoryId: electronics.id,
        vendorId: sampleVendor.id,
        images: ['https://cdn.shopify.com/s/files/1/0057/8938/4802/files/MacBook_Pro_14_Space_Gray_PDP_Image_Position-1__en-US.jpg']
      }
    ];

    console.log('📱 Creating products...');
    for (const product of sampleProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product
      });
    }

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDatabase()
  .catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  });
