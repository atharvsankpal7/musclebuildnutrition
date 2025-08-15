import { Metadata } from 'next';
import { ProductGrid } from '@/components/products/product-grid';
import { AllProductsSidebar } from '@/components/products/all-products-sidebar';
import connectDB from '@/lib/mongodb';
import { Product, Section } from '@/lib/models';
import { getAllProducts } from '@/lib/actions';
import { SEOHead } from '@/components/seo/seo-head';

export const dynamic = 'force-dynamic';


interface ProductsPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    priceRange?: string;
    section?: string;
  };
}



export const metadata: Metadata = {
  title: 'All Products - Musclebuild Nutrition | Premium Fitness & Nutrition Products',
  description: 'Browse Musclebuild Nutrition\'s complete collection of premium fitness and nutrition products. Find supplements for muscle building, weight management, and overall health. Quality products for your fitness journey.',
  keywords: 'musclebuild nutrition, fitness products, nutrition supplements, muscle building, weight management, health supplements, protein supplements',
  openGraph: {
    title: 'All Products - Musclebuild Nutrition | Premium Fitness & Nutrition Products',
    description: 'Browse Musclebuild Nutrition\'s complete collection of premium fitness and nutrition products. Find supplements for muscle building, weight management, and overall health.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - Musclebuild Nutrition | Premium Fitness & Nutrition Products',
    description: 'Browse Musclebuild Nutrition\'s complete collection of premium fitness and nutrition products.',
  },
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort || 'newest';
  const priceRange = searchParams.priceRange;
  const sectionName = searchParams.section;
  
  const productData = await getAllProducts(page, sort, priceRange, sectionName);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="All Products - Musclebuild Nutrition | Premium Fitness & Nutrition Products"
        description="Browse Musclebuild Nutrition's complete collection of premium fitness and nutrition products. Find supplements for muscle building, weight management, and overall health."
        keywords="musclebuild nutrition, fitness products, nutrition supplements, muscle building, weight management, health supplements"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover our complete collection of premium fitness and nutrition products.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <AllProductsSidebar />
          </aside>
          
          <div className="flex-1">
            <ProductGrid 
              {...productData}
              sort={sort}
              priceRange={priceRange}
              sectionPath=""
            />
          </div>
        </div>
      </main>
      
    </div>
  );
}