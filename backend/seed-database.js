const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSuperAdmin() {
  console.log('👑 Creating Super Admin...');

  try {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('IwanyuAdmin2025!', 12);

    // Create super admin user
    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@iwanyu.com' },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      },
      create: {
        email: 'admin@iwanyu.com',
        name: 'Super Administrator',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
        phone: '+250788000000'
      }
    });

    console.log('✅ Super Admin created successfully!');
    console.log('📧 Email: admin@iwanyu.com');
    console.log('🔐 Password: IwanyuAdmin2025!');
    console.log('👑 Role: ADMIN');
    
    return superAdmin;
  } catch (error) {
    console.error('❌ Super Admin creation failed:', error);
    throw error;
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning up mock/static data...');

  try {
    // Delete all products first (due to foreign key constraints)
    console.log('🗑️ Deleting all products...');
    await prisma.product.deleteMany({});

    // Delete all vendors
    console.log('🗑️ Deleting all vendors...');
    await prisma.vendor.deleteMany({});

    // Delete all categories except essential ones
    console.log('🗑️ Deleting sample categories...');
    await prisma.category.deleteMany({
      where: {
        slug: {
          in: ['electronics', 'fashion', 'home-garden', 'books']
        }
      }
    });

    // Delete sample users (keep admin)
    console.log('�️ Deleting sample users...');
    await prisma.user.deleteMany({
      where: {
        email: {
          not: 'admin@iwanyu.com'
        },
        role: {
          not: 'ADMIN'
        }
      }
    });

    // Clean up other mock data
    await prisma.cartItem.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.order.deleteMany({});

    console.log('✅ Database cleanup completed!');
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
    throw error;
  }
}

async function initializeCleanDatabase() {
  console.log('🚀 Initializing clean database with admin credentials...');

  try {
    // First clean up existing data
    await cleanDatabase();
    
    // Create super admin
    await createSuperAdmin();

    console.log('✅ Database initialization completed successfully!');
    console.log('');
    console.log('🎉 SUPER ADMIN CREDENTIALS:');
    console.log('============================');
    console.log('Email: admin@iwanyu.com');
    console.log('Password: IwanyuAdmin2025!');
    console.log('Role: ADMIN');
    console.log('============================');
    console.log('');
    console.log('🔗 Login URL: https://iwanyu-3-0.vercel.app/auth/login');
    console.log('');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization function
initializeCleanDatabase()
  .catch((error) => {
    console.error('Fatal error during initialization:', error);
    process.exit(1);
  });
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
