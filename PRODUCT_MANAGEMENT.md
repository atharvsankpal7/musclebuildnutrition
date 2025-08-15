# Product Management System

## Overview

This system manages **Products** that can be assigned to multiple **Categories** (up to 8 categories per product). Each product has a unique ID and can be managed through the admin interface.

## System Structure

### 1. Products
- **Unique ID**: Each product has a different ID
- **Multiple Categories**: Each product can be assigned to up to 8 categories
- **Database-Driven**: All products are stored in and retrieved from the database
- **Admin Management**: Admins can add, edit, and delete products

### 2. Categories
- **Organizational Tool**: Categories help organize and classify products
- **Multiple Assignment**: Products can belong to multiple categories
- **Maximum Limit**: Each product can have up to 8 categories

## Database Models

### Product Model
```typescript
interface IProduct {
  title: string;           // Product name
  description: string;     // Product description
  originalPrice: number;   // Base price
  discountPrice?: number;  // Optional discount price
  categoryIds: ObjectId[]; // Up to 8 category IDs
  displayImage: string;    // Main product image
  productFiles: string[];  // Related file URLs
  isFeatured: boolean;     // Featured status
  isActive: boolean;       // Active status
  createdAt: Date;
  updatedAt: Date;
}
```

### Category Model
```typescript
interface ICategory {
  title: string;           // Category name
  description: string;     // Category description
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

## Admin Interface

### Product Management (`/admin/products`)
- **Add Products**: Create new products with multiple category assignments
- **Edit Products**: Modify existing products and their category assignments
- **Delete Products**: Remove products from the system
- **Category Selection**: Choose up to 8 categories per product
- **Image Management**: Upload and manage product images
- **File Management**: Add related files (PDFs, etc.)

### Category Management (`/admin/categories`)
- **Manage Categories**: Create and organize product categories
- **Category Assignment**: Products can be assigned to multiple categories

## API Endpoints

### Products
- `GET /api/products` - List all active products
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

### Categories
- `GET /api/categories` - List all active categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/[id]` - Get a specific category
- `PUT /api/categories/[id]` - Update a category
- `DELETE /api/categories/[id]` - Delete a category

## Migration Process

### From Categories to Products
If you have existing categories and want to convert them to products:

1. **Run Migration**:
   ```bash
   npm run migrate-to-products
   ```

2. **Verify Migration**:
   - Go to `/admin/products`
   - Check that all categories are now products
   - Verify images, descriptions, and pricing

3. **Clean Up (Optional)**:
   ```bash
   npm run delete-categories
   ```

### From Products to Categories
If you want to convert products back to categories:

1. **Run Migration**:
   ```bash
   npm run migrate-to-categories
   ```

2. **Verify Migration**:
   - Go to `/admin/categories`
   - Check that all products are now categories

3. **Clean Up (Optional)**:
   ```bash
   npm run delete-products
   ```

## Adding Products

### Step-by-Step Process
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill in required fields:
   - **Product Title**: Name of the product
   - **Description**: Detailed product description
   - **Original Price**: Base price
   - **Discount Price**: Optional discounted price
   - **Categories**: Select up to 8 categories
   - **Display Image**: Upload product image
   - **Product Files**: Add related files
   - **Featured**: Mark as featured product
   - **Active**: Enable/disable the product

### Category Selection
- Use the Category Selector component
- Select up to 8 categories per product
- Categories are displayed as badges
- Remove categories by clicking the X button
- Visual indicator shows selected count (e.g., "3/8 selected")

## Features

### Product Features
- **Unique Identification**: Each product has a different ID
- **Multiple Categories**: Up to 8 category assignments
- **Image Management**: Upload and preview product images
- **File Attachments**: Add multiple related files
- **Pricing**: Original and discount pricing
- **Status Management**: Featured and active status
- **Search & Filter**: Find products by category or search terms

### Admin Features
- **Full CRUD Operations**: Create, read, update, delete products
- **Bulk Management**: Manage multiple products efficiently
- **Category Assignment**: Easy category selection interface
- **Image Preview**: Expand images for better viewing
- **Validation**: Ensures data integrity and limits

## Contact Information

All contact information is managed through the database:
- **Phone Numbers**: Managed via `/admin/contact-settings`
- **Email Addresses**: Database-driven contact management
- **Addresses**: Stored and retrieved from database
- **Working Hours**: Configurable through admin interface

## Benefits

1. **Flexible Organization**: Products can belong to multiple categories
2. **Better Search**: Users can find products through different category paths
3. **Admin Control**: Easy management of products and categories
4. **Scalable**: System can handle many products and categories
5. **Database-Driven**: All data comes from database for easy updates

## Troubleshooting

### Common Issues
- **Category Limit**: Ensure products don't exceed 8 categories
- **Image Upload**: Check file size and format requirements
- **Validation Errors**: Verify all required fields are filled
- **Database Connection**: Ensure MongoDB connection is working

### Migration Issues
- **Data Loss**: Always backup before running migrations
- **Validation Errors**: Check that all required fields are present
- **Duplicate Entries**: Migration scripts handle duplicates automatically

The product management system provides a flexible and scalable way to organize and manage your product catalog with multiple category assignments.
