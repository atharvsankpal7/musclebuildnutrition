import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Section from '@/models/Section';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const category = await Category.findById(params.id)
      .populate({
        path: 'sectionIds',
        model: Section,
        select: 'name slug'
      });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const categoryWithSections = {
      id: category._id.toString(),
      title: category.title,
      description: category.description,
      originalPrice: category.originalPrice,
      discountPrice: category.discountPrice,
      displayImage: category.displayImage,
      categoryFiles: category.categoryFiles,
      isFeatured: category.isFeatured,
      isActive: category.isActive,
      sections: category.sectionIds.map((section: any) => ({
        id: section._id.toString(),
        name: section.name,
        slug: section.slug
      }))
    };

    return NextResponse.json(categoryWithSections);
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: 'Categories are fixed. Updating categories is not allowed.' },
    { status: 405 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: 'Categories are fixed. Deleting categories is not allowed.' },
    { status: 405 }
  );
}
