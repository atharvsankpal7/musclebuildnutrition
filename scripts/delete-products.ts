import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

async function deleteProducts() {
  try {
    console.log('Starting deletion of old products...');
    
    await connectDB();
    
    const productCount = await Product.countDocuments({});
    console.log(`Found ${productCount} products to delete`);
    
    if (productCount === 0) {
      console.log('No products found to delete.');
      return;
    }
    
    console.log('\n⚠️  WARNING: This will permanently delete all products from the database.');
    console.log('Make sure you have verified that the migration to categories was successful.');
    
    const result = await Product.deleteMany({});
    
    console.log(`\n✓ Successfully deleted ${result.deletedCount} products`);
    console.log('Migration cleanup completed!');
    
  } catch (error) {
    console.error('Deletion failed:', error);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  deleteProducts();
}

export default deleteProducts;
