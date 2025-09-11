import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Section from '@/models/Section';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find({ isActive: true })
      .populate({
        path: 'categoryIds',
        model: Section,
        select: 'name slug'
      })
      .sort({ createdAt: -1 });

    const categoriesWithSections = categories.map(category => ({
      id: category._id.toString(),
      title: category.title,
      description: category.description,
      originalPrice: category.originalPrice,
      discountPrice: category.discountPrice,
      displayImage: category.displayImage,
      categoryFiles: category.categoryFiles,
      isFeatured: category.isFeatured,
      isActive: category.isActive,
      sections: category.categoryIds.map((section: any) => ({
        id: section._id.toString(),
        name: section.name,
        slug: section.slug
      }))
    }));

    return NextResponse.json(categoriesWithSections);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Categories are fixed. Creating new categories is not allowed.' },
    { status: 405 }
  );
}
