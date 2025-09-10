import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const products = await Product.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const transformedProducts = products.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      displayImage: product.displayImage,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      isFeatured: product.isFeatured,
      createdAt: product.createdAt.toISOString(),
    }));

    return NextResponse.json({
      products: transformedProducts,
      total: transformedProducts.length
    });
  } catch (error: any) {
    console.error('Error fetching hot deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hot deals' },
      { status: 500 }
    );
  }
}
