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
    console.log('🗑️ Deleting sample users...');
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
