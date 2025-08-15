import { Footer } from '@/components/layout/footer';
import { SSRHeader } from '@/components/layout/ssr-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Bundles - Musclebuild Nutrition | Premium Fitness & Nutrition Bundles',
  description: 'Explore Musclebuild Nutrition\'s exclusive fitness and nutrition bundles featuring multiple premium products at incredible value. Perfect for comprehensive fitness and health goals. Save up to 70% on bundle collections.',
  keywords: 'musclebuild nutrition bundles, fitness bundles, nutrition packages, health supplements bundle, muscle building packages, weight management bundles',
  openGraph: {
    title: 'Product Bundles - Musclebuild Nutrition | Premium Fitness & Nutrition Bundles',
    description: 'Explore Musclebuild Nutrition\'s exclusive fitness and nutrition bundles featuring multiple premium products at incredible value.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Bundles - Musclebuild Nutrition | Premium Fitness & Nutrition Bundles',
    description: 'Explore Musclebuild Nutrition\'s exclusive fitness and nutrition bundles featuring multiple premium products at incredible value.',
  },
};

export default function BundlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}