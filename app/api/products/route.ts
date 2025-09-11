import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({ isActive: true })
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
    console.log('Connected to database');
    const body = await request.json();
    const {
      title,
      description,
      originalPrice,
      discountPrice,
      displayImage,
      productFiles,
      isFeatured,
      isActive,
      isHotDeal
    } = body;
    console.log('Received product data:', body);

    if (!title || !description || !originalPrice  || !displayImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = new Product({
      title,
      description,
      originalPrice,
      discountPrice,
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
