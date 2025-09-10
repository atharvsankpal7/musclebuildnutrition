import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/products/product-grid';
import { getAllProducts } from '@/lib/actions';
import { getNavigationSections } from '@/lib/section-utils';
import { SEOHead } from '@/components/seo/seo-head';

interface SectionPageProps {
  params: {
    sections: string[];
  };
  searchParams: {
    search?: string;
  };
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const sections = await getNavigationSections();
  const sectionPath = params.sections.join('/');
  const section = sections.find(s => s.slug === sectionPath);

  if (!section) {
    return {
      title: 'Section Not Found - Musclebuild Nutrition',
      description: 'The requested fitness and nutrition product section could not be found.',
    };
  }

  return {
    title: `${section.name} - Musclebuild Nutrition | Premium Fitness & Nutrition Products`,
    description: `Explore our ${section.name.toLowerCase()} collection. Premium fitness and nutrition products for ${section.name.toLowerCase()} with quality ingredients and proven results.`,
    keywords: `musclebuild nutrition, ${section.name.toLowerCase()}, fitness products, nutrition supplements, ${section.name.toLowerCase()} products`,
    openGraph: {
      title: `${section.name} - Musclebuild Nutrition | Premium Fitness & Nutrition Products`,
      description: `Explore our ${section.name.toLowerCase()} collection. Premium fitness and nutrition products for ${section.name.toLowerCase()}.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${section.name} - Musclebuild Nutrition | Premium Fitness & Nutrition Products`,
      description: `Explore our ${section.name.toLowerCase()} collection. Premium fitness and nutrition products.`,
    },
  };
}

export default async function SectionPage({ params, searchParams }: SectionPageProps) {
  const sections = await getNavigationSections();
  const sectionPath = params.sections.join('/');
  const section = sections.find(s => s.slug === sectionPath);

  if (!section) {
    notFound();
  }

  const productsData = await getAllProducts();
  const filteredProducts = productsData.products.filter(product =>
    product.categories.some((cat: any) => cat.slug === section.slug)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={`${section.name} - Musclebuild Nutrition | Premium Fitness & Nutrition Products`}
        description={`Explore our ${section.name.toLowerCase()} collection. Premium fitness and nutrition products for ${section.name.toLowerCase()} with quality ingredients and proven results.`}
        keywords={`musclebuild nutrition, ${section.name.toLowerCase()}, fitness products, nutrition supplements`}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {section.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our {section.name.toLowerCase()} collection. Premium fitness and nutrition products with quality ingredients.
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid 
          products={filteredProducts}
          totalCount={filteredProducts.length}
          totalPages={1}
          currentPage={1}
          sort="newest"
          sectionPath={sectionPath}
        />
      </main>
    </div>
  );
}