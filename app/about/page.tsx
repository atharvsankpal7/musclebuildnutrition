import { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { AboutMission } from '@/components/about/about-mission';

export const metadata: Metadata = {
  title: 'About Us - Muscle Build Nutrition | Premium Supplements & Fitness Solutions',
  description: 'Learn about Muscle Build Nutrition\'s mission to provide premium supplements and fitness solutions. Discover our story, values, and commitment to helping you achieve your fitness goals.',
  keywords: 'Muscle Build Nutrition about us, fitness supplements company, muscle building company, nutrition company, fitness goals, premium supplements',
  openGraph: {
    title: 'About Us - Muscle Build Nutrition | Premium Supplements & Fitness Solutions',
    description: 'Learn about Muscle Build Nutrition\'s mission to provide premium supplements and fitness solutions.',
    url: 'https://musclebuildnutrition.com/about',
  },
  alternates: {
    canonical: 'https://musclebuildnutrition.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <AboutHero />
        <AboutMission />
      </main>
    </div>
  );
}