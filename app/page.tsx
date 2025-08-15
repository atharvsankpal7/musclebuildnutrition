
import { Metadata } from 'next';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { FitnessGoals } from '@/components/home/fitness-goals';
import { HotDeals } from '@/components/home/hot-deals';
import { LatestReviews } from '@/components/home/latest-reviews';
import { InstagramSection } from '@/components/home/instagram-section';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Muscle Build Nutrition | Premium Supplements & Fitness Solutions',
  description: 'Discover premium quality supplements for muscle building, weight loss, energy, and overall fitness. Expert nutrition guidance and WhatsApp inquiry available.',
  keywords: 'Muscle Build Nutrition, premium supplements, muscle building, weight loss, fitness supplements, nutrition, WhatsApp inquiry',
  openGraph: {
    title: 'Muscle Build Nutrition | Premium Supplements & Fitness Solutions',
    description: 'Discover premium quality supplements for muscle building, weight loss, energy, and overall fitness.',
    url: 'https://musclebuildnutrition.com',
  },
  alternates: {
    canonical: 'https://musclebuildnutrition.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <FitnessGoals />
      <HotDeals />
      <LatestReviews />
      <InstagramSection />
    </div>
  );
}