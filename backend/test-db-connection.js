const { PrismaClient } = require('@prisma/client');

// Common passwords that might have been generated
const possiblePasswords = [
  'IwanyuDT$2025',
  'IwanyuDT%242025',
  '',  // Empty password
  'postgres',
  'password',
  'admin',
  'root'
];

async function testConnection(password) {
  const encodedPassword = encodeURIComponent(password);
  const databaseUrl = `postgresql://postgres:${encodedPassword}@db.fsbjcgdpgxiymbgldhaq.supabase.co:5432/postgres?sslmode=require`;
  
  console.log(`Testing password: "${password}"`);
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });

  try {
    await prisma.$connect();
    console.log(`✅ SUCCESS! Password "${password}" works!`);
    console.log(`Database URL: ${databaseUrl}`);
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
    await prisma.$disconnect();
    return false;
  }
}

async function main() {
  console.log('Testing database connection with different passwords...\n');
  
  for (const password of possiblePasswords) {
    const success = await testConnection(password);
    if (success) {
      break;
    }
    console.log(''); // Empty line for readability
  }
}

main().catch(console.error);
