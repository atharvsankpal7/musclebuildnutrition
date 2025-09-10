import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

async function deleteCategories() {
  try {
    console.log('Starting deletion of old categories...');
    
    await connectDB();
    
    const categoryCount = await Category.countDocuments({});
    console.log(`Found ${categoryCount} categories to delete`);
    
    if (categoryCount === 0) {
      console.log('No categories found to delete.');
      return;
    }
    
    console.log('\n⚠️  WARNING: This will permanently delete all categories from the database.');
    console.log('Make sure you have verified that the migration to products was successful.');
    
    const result = await Category.deleteMany({});
    
    console.log(`\n✓ Successfully deleted ${result.deletedCount} categories`);
    console.log('Migration cleanup completed!');
    
  } catch (error) {
    console.error('Deletion failed:', error);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  deleteCategories();
}

export default deleteCategories;
