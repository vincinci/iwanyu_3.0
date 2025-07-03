import { clientDb } from './src/lib/database';

async function testDatabase() {
  console.log('Testing database connections...');
  
  try {
    // Test products
    console.log('\n--- Testing Products ---');
    const productsResult = await clientDb.getProducts();
    console.log('Products result:', productsResult);
    
    // Test categories
    console.log('\n--- Testing Categories ---');
    const categoriesResult = await clientDb.getCategories();
    console.log('Categories result:', categoriesResult);
    
    // Test vendors
    console.log('\n--- Testing Vendors ---');
    const vendorsResult = await clientDb.getVendors();
    console.log('Vendors result:', vendorsResult);
    
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();
