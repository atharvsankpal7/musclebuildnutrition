import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({ isActive: true })
      .populate({
        path: 'categoryIds',
        model: Category,
        select: 'title description slug'
      })
      .sort({ createdAt: -1 });

    const productsWithCategories = products.map(product => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      displayImage: product.displayImage,
      productFiles: product.productFiles,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      categories: product.categoryIds.map((category: any) => ({
        id: category._id.toString(),
        title: category.title,
        slug: category.slug,
        description: category.description
      }))
    }));

    return NextResponse.json(productsWithCategories);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      description,
      originalPrice,
      discountPrice,
      categoryIds,
      displayImage,
      productFiles,
      isFeatured,
      isActive,
      isHotDeal
    } = body;

    if (!title || !description || !originalPrice || !categoryIds || !displayImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (categoryIds.length > 8) {
      return NextResponse.json(
        { error: 'A product can have maximum 8 categories' },
        { status: 400 }
      );
    }

    const categories = await Category.find({ _id: { $in: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return NextResponse.json(
        { error: 'One or more categories not found' },
        { status: 400 }
      );
    }

    const product = new Product({
      title,
      description,
      originalPrice,
      discountPrice,
      categoryIds,
      displayImage,
      productFiles: productFiles || [],
      isFeatured: isFeatured || false,
      isActive: isActive !== undefined ? isActive : true,
      isHotDeal: isHotDeal || false
    });

    await product.save();

    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
