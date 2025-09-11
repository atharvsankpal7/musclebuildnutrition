import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

async function migrateProductsToCategories() {
  try {
    console.log('Starting migration from products to categories...');
    
    await connectDB();
    
    const products = await Product.find({});
    console.log(`Found ${products.length} products to migrate`);
    
    let migratedCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        const existingCategory = await Category.findOne({ title: product.title });
        
        if (existingCategory) {
          console.log(`Category "${product.title}" already exists, skipping...`);
          continue;
        }
        
        const category = new Category({
          title: product.title,
          description: product.description,
          originalPrice: product.originalPrice,
          discountPrice: product.discountPrice,
          categoryIds: product.categoryIds,
          displayImage: product.displayImage,
          categoryFiles: product.productFiles || [],
          isFeatured: product.isFeatured,
          isActive: product.isActive,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        });
        
        await category.save();
        migratedCount++;
        console.log(`✓ Migrated: ${product.title}`);
        
      } catch (error) {
        errorCount++;
        console.error(`✗ Error migrating product "${product.title}":`, error);
      }
    }
    
    console.log('\nMigration completed!');
    console.log(`Successfully migrated: ${migratedCount} products`);
    console.log(`Errors: ${errorCount} products`);
    
    if (migratedCount > 0) {
      console.log('\nNote: Original products are still in the database.');
      console.log('You may want to delete them after verifying the migration.');
      console.log('To delete original products, run: npm run delete-products');
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  migrateProductsToCategories();
}

export default migrateProductsToCategories;
