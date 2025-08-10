
import { Metadata } from 'next';
import { NewHeaderServer } from '@/components/layout/new-header-server';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { PromotionalBanners } from '@/components/home/promotional-banners';
import { FitnessGoals } from '@/components/home/fitness-goals';
import { HotDeals } from '@/components/home/hot-deals';
import { LatestReviews } from '@/components/home/latest-reviews';
import { InstagramSection } from '@/components/home/instagram-section';
import { Footer } from '@/components/layout/footer';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Muscles - Premium Graphic Design Templates | Festival Designs & Business Templates',
  description: 'Discover SSCreation\'s premium graphic design templates. Download festival designs, business cards, social media templates, and celebration graphics instantly. Commercial license included.',
  keywords: 'SSCreation, sscreation, graphic design templates, festival designs, premium templates, business templates, social media templates, poster designs, banner templates, celebration graphics',
  openGraph: {
    title: 'SSCreation - Premium Graphic Design Templates',
    description: 'Discover SSCreation\'s premium graphic design templates. Download festival designs, business cards, and social media templates instantly.',
    url: 'https://sscreation.com',
  },
  alternates: {
    canonical: 'https://sscreation.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <NewHeaderServer />
              <main>
                <HeroCarousel />
                <PromotionalBanners />
                <FitnessGoals />
                <HotDeals />
                <LatestReviews />
                <InstagramSection />
              </main>
      <Footer />
    </div>
  );
}