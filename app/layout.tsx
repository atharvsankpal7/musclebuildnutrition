import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NewHeaderServer } from '@/components/layout/new-header-server';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muscle Build Nutrition | Premium Supplements & Fitness Solutions',
  description: 'Discover premium quality supplements for muscle building, weight loss, energy, and overall fitness. Expert nutrition guidance and WhatsApp inquiry available.',
  keywords: 'Muscle Build Nutrition, premium supplements, muscle building, weight loss, fitness supplements, nutrition, WhatsApp inquiry',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NewHeaderServer />
        <main className="pt-16 sm:pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
