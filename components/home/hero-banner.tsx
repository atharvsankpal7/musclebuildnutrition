'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
            >
              Because Your Body Deserves The Best – Pure, Potent, And Purposeful Nutrition.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
            >
              Optimized for Cardio, Strength & Endurance - See the Results, Feel the Power.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/about"
                className="inline-block bg-black text-white px-6 py-3 text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
              >
                ABOUT US
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with Text Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-[300px] lg:h-[400px] w-full bg-white rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/hero-banner.webp"
                alt="Fitness and Nutrition Banner"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white z-10 p-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold mb-3"
                  >
                    Transform Your Body
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-lg md:text-xl mb-4 opacity-90"
                  >
                    Premium Supplements for Maximum Results
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Link
                      href="/products"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
                    >
                      SHOP NOW
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
