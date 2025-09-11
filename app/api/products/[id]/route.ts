import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id)
      

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productWithCategories = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      displayImage: product.displayImage,
      productFiles: product.productFiles,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      isHotDeal: product.isHotDeal,
    };

    return NextResponse.json(productWithCategories);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!title || !description || !originalPrice || !displayImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }




    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        originalPrice,
        discountPrice,
        displayImage,
        productFiles: productFiles || [],
        isFeatured: isFeatured || false,
        isActive: isActive !== undefined ? isActive : true,
        isHotDeal: isHotDeal || false
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product updated successfully', product }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}