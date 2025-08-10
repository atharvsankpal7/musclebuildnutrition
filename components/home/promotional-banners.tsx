'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PromoBanner {
  id: number;
  title: string;
  subtitle: string;
  background: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: 1,
    title: "Unlock Your Body's Potential",
    subtitle: "Use FIT10 for 10% off!",
    background: "bg-green-800",
    image: "/promotional/small_poster1.jpg",
    ctaText: "EXPLORE NOW",
    ctaLink: "/products?category=protein"
  },
  {
    id: 2,
    title: "Health & Wellbeing",
    subtitle: "Up to - 10% Off on every Product",
    background: "bg-gray-800",
    image: "/promotional/small_poster2.jpg",
    ctaText: "EXPLORE NOW",
    ctaLink: "/products?category=wellness"
  },
  {
    id: 3,
    title: "Dietary Supplement",
    subtitle: "Up to - 10% Off on every Product",
    background: "bg-blue-600",
    image: "/promotional/small_poster3.jpg",
    ctaText: "EXPLORE NOW",
    ctaLink: "/products?category=supplements"
  }
];

export function PromotionalBanners() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${banner.background} rounded-xl overflow-hidden relative group`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6 text-white">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-2xl font-bold mb-3"
                >
                  {banner.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-lg mb-6 opacity-90"
                >
                  {banner.subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={banner.ctaLink}
                    className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 group-hover:scale-105"
                  >
                    {banner.ctaText}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
