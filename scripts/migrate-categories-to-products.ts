import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';

async function migrateCategoriesToProducts() {
  try {
    console.log('Starting migration from categories to products...');
    
    await connectDB();
    
    const categories = await Category.find({});
    console.log(`Found ${categories.length} categories to migrate`);
    
    let migratedCount = 0;
    let errorCount = 0;
    
    for (const category of categories) {
      try {
        const existingProduct = await Product.findOne({ title: category.title });
        
        if (existingProduct) {
          console.log(`Product "${category.title}" already exists, skipping...`);
          continue;
        }
        
        const product = new Product({
          title: category.title,
          description: category.description,
          originalPrice: category.originalPrice,
          discountPrice: category.discountPrice,
          categoryIds: [category._id],
          displayImage: category.displayImage,
          productFiles: category.categoryFiles || [],
          isFeatured: category.isFeatured,
          isActive: category.isActive,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        });
        
        await product.save();
        migratedCount++;
        console.log(`✓ Migrated: ${category.title}`);
        
      } catch (error) {
        errorCount++;
        console.error(`✗ Error migrating category "${category.title}":`, error);
      }
    }
    
    console.log('\nMigration completed!');
    console.log(`Successfully migrated: ${migratedCount} categories to products`);
    console.log(`Errors: ${errorCount} categories`);
    
    if (migratedCount > 0) {
      console.log('\nNote: Original categories are still in the database.');
      console.log('You may want to delete them after verifying the migration.');
      console.log('To delete original categories, run: npm run delete-categories');
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  migrateCategoriesToProducts();
}

export default migrateCategoriesToProducts;
