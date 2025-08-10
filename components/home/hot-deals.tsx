'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface HotDealProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  link: string;
}

const hotDealProducts: HotDealProduct[] = [
  {
    id: 1,
    name: "Max Pump",
    image: "/products/product1.webp",
    originalPrice: 1299,
    discountedPrice: 909,
    discountPercentage: 30,
    link: "/products/max-pump"
  },
  {
    id: 2,
    name: "Hardy Bull Ripped",
    image: "/products/product2.webp",
    originalPrice: 2499,
    discountedPrice: 1749,
    discountPercentage: 30,
    link: "/products/hardy-bull-ripped"
  },
  {
    id: 3,
    name: "Performance Series Weight Gainer",
    image: "/products/product3.webp",
    originalPrice: 3599,
    discountedPrice: 3419,
    discountPercentage: 5,
    link: "/products/weight-gainer"
  },
  {
    id: 4,
    name: "Pharma Grade BCAA",
    image: "/products/product4.webp",
    originalPrice: 1999,
    discountedPrice: 1499,
    discountPercentage: 25,
    link: "/products/bcaa"
  },
  {
    id: 5,
    name: "Taurine",
    image: "/products/product5.webp",
    originalPrice: 1299,
    discountedPrice: 650,
    discountPercentage: 50,
    link: "/products/taurine"
  }
];

export function HotDeals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hot Deals Of The Week
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these incredible offers! Limited time deals on premium supplements.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {hotDealProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={product.link} className="block">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                  {/* Discount Badge */}
                  <div className="relative mb-4">
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discountPercentage}% Off
                    </div>
                    
                    {/* Product Image */}
                    <div className="w-full h-48 relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    {/* Pricing */}
                    <div className="mb-3">
                      <span className="text-gray-500 line-through text-sm">
                        INR {product.originalPrice}
                      </span>
                      <div className="text-red-600 font-bold text-lg">
                        INR {product.discountedPrice}
                      </div>
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-gray-300 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            View All Deals
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
