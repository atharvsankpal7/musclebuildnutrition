'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FitnessGoal {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
}

const fitnessGoals: FitnessGoal[] = [
  {
    id: 'build-muscle',
    name: 'Build Muscle',
    image: '/fitness-goals/Build Muscle.png',
    description: 'Gain strength and muscle mass',
    link: '/products?category=muscle-building'
  },
  {
    id: 'overall-fitness',
    name: 'Overall Fitness',
    image: '/fitness-goals/Overall Fitness.png',
    description: 'Improve general health and wellness',
    link: '/products?category=overall-fitness'
  },
  {
    id: 'energy-endurance',
    name: 'Energy & Endurance',
    image: '/fitness-goals/Energy & Endurance.png',
    description: 'Boost stamina and performance',
    link: '/products?category=energy-endurance'
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    image: '/fitness-goals/Reduce Weight.png',
    description: 'Achieve healthy weight goals',
    link: '/products?category=weight-loss'
  },
  {
    id: 'weight-gain',
    name: 'Weight Gain',
    image: '/fitness-goals/Weight Gain.png',
    description: 'Healthy weight gain solutions',
    link: '/products?category=weight-gain'
  },
  {
    id: 'immunity-boost',
    name: 'Immunity Boost',
    image: '/fitness-goals/Immunity Boost.png',
    description: 'Strengthen your immune system',
    link: '/products?category=immunity-boost'
  }
];

export function FitnessGoals() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
          >
            Choose Your Fitness Goal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
          >
            Discover personalized supplements and nutrition plans tailored to your specific fitness objectives
          </motion.p>
        </div>

        {/* Fitness Goals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {fitnessGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              {/* <Link href={goal.link} className="block"> */}
                <div className="text-center p-2 sm:p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  {/* Icon Container */}
                  <div className="relative mb-2 sm:mb-3 md:mb-4 mx-auto">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto relative group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={goal.image}
                        alt={goal.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                      />
                    </div>

                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-red-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Goal Name */}
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {goal.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">
                    {goal.description}
                  </p>
                </div>
              {/* </Link> */}
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
            Explore All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
