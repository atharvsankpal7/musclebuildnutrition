# Category Migration Guide

## Overview

This project has been updated to use a **Category-based system** instead of individual products. Categories represent different product types or collections that users can browse and purchase.

## What Changed

### 1. Database Models
- **New**: `Category` model replaces the `Product` model
- **Updated**: All references to "products" are now "categories"
- **Maintained**: Section system remains the same for organizing categories

### 2. Admin Interface
- **New**: `/admin/categories` page for managing categories
- **Updated**: Admin dashboard now shows "Manage Categories" instead of "Manage Products"
- **Features**: Full CRUD operations for categories with image upload and file management

### 3. API Routes
- **New**: `/api/categories` for category management
- **New**: `/api/categories/[id]` for individual category operations
- **Updated**: Stats API now counts categories instead of products

## Migration Process

### Step 1: Run the Migration
```bash
npm run migrate-to-categories
```

This script will:
- Connect to your database
- Find all existing products
- Create corresponding categories with the same data
- Skip any categories that already exist
- Report the migration results

### Step 2: Verify Migration
1. Go to `/admin/categories` in your admin panel
2. Verify that all your products have been converted to categories
3. Check that images, descriptions, and pricing are correct
4. Test the category management features

### Step 3: Clean Up (Optional)
After verifying the migration was successful, you can delete the old products:

```bash
npm run delete-products
```

**⚠️ Warning**: This permanently deletes all products from the database. Only run this after verifying the migration was successful.

## Category Management

### Adding Categories
1. Go to `/admin/categories`
2. Click "Add Category"
3. Fill in the required fields:
   - **Category Title**: Name of the category
   - **Description**: Detailed description
   - **Original Price**: Base price
   - **Discount Price**: Optional discounted price
   - **Sections**: Select which sections this category belongs to
   - **Display Image**: Upload or provide image URL
   - **Category Files**: Add any related files (PDFs, etc.)
   - **Featured**: Mark as featured category
   - **Active**: Enable/disable the category

### Managing Categories
- **Edit**: Click the edit button to modify category details
- **Delete**: Remove categories (with confirmation)
- **Image Preview**: Hover over images to expand them
- **Section Tags**: See which sections each category belongs to

## Database Schema

### Category Model
```typescript
interface ICategory {
  title: string;           // Category name
  description: string;     // Detailed description
  originalPrice: number;   // Base price
  discountPrice?: number;  // Optional discount price
  sectionIds: ObjectId[];  // Associated sections
  displayImage: string;    // Main image URL
  categoryFiles: string[]; // Related file URLs
  isFeatured: boolean;     // Featured status
  isActive: boolean;       // Active status
  createdAt: Date;
  updatedAt: Date;
}
```

## Contact Information

All contact information (phone numbers, email, address) is managed through the database via:
- `/admin/contact-settings` - Update contact details
- Contact information is automatically displayed throughout the site

## Benefits of Category System

1. **Better Organization**: Categories group related products together
2. **Easier Management**: Admins can manage product types as categories
3. **Improved UX**: Users can browse by category type
4. **Flexible Pricing**: Each category can have its own pricing structure
5. **File Management**: Categories can include multiple related files

## Troubleshooting

### Migration Issues
- If migration fails, check your database connection
- Ensure you have proper permissions to read/write to the database
- Check the console output for specific error messages

### Category Management Issues
- Verify that sections exist before assigning categories to them
- Ensure image URLs are accessible
- Check that all required fields are filled

### Contact Information Issues
- Verify contact settings are saved in the database
- Check that the contact API routes are working
- Ensure the frontend is properly fetching contact data

## Support

If you encounter any issues during migration or category management, please check:
1. Database connection and permissions
2. API route availability
3. Admin panel access
4. Image upload functionality

The category system provides a more organized and manageable approach to your product catalog while maintaining all the functionality of the previous product system.
