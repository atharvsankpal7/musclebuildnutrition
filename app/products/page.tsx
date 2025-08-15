import { Metadata } from 'next';
import { ProductGrid } from '@/components/products/product-grid';
import { AllProductsSidebar } from '@/components/products/all-products-sidebar';
import { FitnessGoalsSection } from '@/components/products/fitness-goals-section';
import connectDB from '@/lib/mongodb';
import { Product, Section } from '@/lib/models';
import { getAllProducts } from '@/lib/actions';
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    priceRange?: string;
    section?: string;
    goal?: string;
  };
}

export const metadata: Metadata = {
  title: 'All Products - Muscle Build Nutrition | Premium Supplements Collection',
  description: 'Browse Muscle Build Nutrition\'s complete collection of premium supplements. Find products for muscle building, weight loss, energy, immunity, and overall fitness. WhatsApp inquiry available.',
  keywords: 'Muscle Build Nutrition products, supplements collection, muscle building, weight loss, energy supplements, immunity boost, fitness products, nutrition supplements',
  openGraph: {
    title: 'All Products - Muscle Build Nutrition | Premium Supplements Collection',
    description: 'Browse Muscle Build Nutrition\'s complete collection of premium supplements. WhatsApp inquiry available.',
    url: 'https://musclebuildnutrition.com/products',
  },
  alternates: {
    canonical: 'https://musclebuildnutrition.com/products',
  },
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort || 'newest';
  const priceRange = searchParams.priceRange;
  const sectionName = searchParams.section;
  const goal = searchParams.goal;

  const productData = await getAllProducts(page, sort, priceRange, sectionName);

  return (
    // <div className="min-h-screen bg-gray-50">
    //   <main className="container mx-auto px-4 py-8">
        
        <div className="mb-12">
          <FitnessGoalsSection />
        </div>
    //   </main>
    // </div>
  );
}
