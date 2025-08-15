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
    title: "Better Nutrition, Better You",
    subtitle: "Discover premium supplements for your fitness journey",
    background: "bg-gradient-to-br from-blue-600 to-blue-800",
    image: "/banners/banner1.jpg",
    ctaText: "Shop Now",
    ctaLink: "/products?category=protein"
  },
  {
    id: 2,
    title: "Fuel Your Performance",
    subtitle: "Premium pre-workout and energy boosters",
    background: "bg-gradient-to-br from-green-600 to-green-800",
    image: "/banners/banner2.webp",
    ctaText: "Explore Now",
    ctaLink: "/products?category=preworkout"
  },
  {
    id: 3,
    title: "Build Muscle, Build Strength",
    subtitle: "Mass gainers and muscle building supplements",
    background: "bg-gradient-to-br from-orange-600 to-orange-800",
    image: "/banners/banner3.jpg",
    ctaText: "Get Started",
    ctaLink: "/products?category=massgainer"
  }
];

export function PromotionalBanners() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured Promotions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover amazing deals on premium nutrition supplements
          </motion.p>
        </div>

        {/* Promotional Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-2xl overflow-hidden relative group shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                background: banner.id === 1 
                  ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  : banner.id === 2
                  ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                  : 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
              }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-8 text-white h-full flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-2xl md:text-3xl font-bold leading-tight"
                  >
                    {banner.title}
                  </motion.h3>
                  
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-lg opacity-90 leading-relaxed"
                  >
                    {banner.subtitle}
                  </motion.p>
                </div>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="mt-6"
                >
                  <Link
                    href={banner.ctaLink}
                    className="inline-block bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform group-hover:scale-105 shadow-lg"
                  >
                    {banner.ctaText}
                  </Link>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏆",
              title: "Premium Quality",
              description: "All products are tested and certified for quality and safety"
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              description: "Free shipping on orders above ₹999 across India"
            },
            {
              icon: "💯",
              title: "100% Authentic",
              description: "Genuine products with manufacturer warranty"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
