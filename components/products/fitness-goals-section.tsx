'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { PurchaseModal } from '@/components/products/purchase-modal';

interface FitnessGoal {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
}

const fitnessGoals: FitnessGoal[] = [
  {
    id: 'mass-gainer',
    name: 'Musclebuild mass gainer',
    image: '/products/Musclebuild mass gainer.jpg',
    description: 'Gain strength and muscle mass',
    link: '/products?category=mass-gainer'
  },
  {
    id: 'pre-workout',
    name: 'Musclebuild Pre workout',
    image: '/products/Musclebuild Pre workout.jpg',
    description: 'Improve general health and wellness',
    link: '/products?category=pre-workout'
  },
  {
    id: 'whey-protein',
    name: 'Musclebuild Wey Protein',
    image: '/products/Musclebuild whey protein.jpg',
    description: 'Boost stamina and performance',
    link: '/products?category=whey-protein'
  }
];

export function FitnessGoalsSection() {
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleInquiry = (goal: FitnessGoal) => {
    setSelectedGoal(goal);
    setShowModal(true);
  };

  return (
    <section className="py-12 bg-white rounded-xl shadow-sm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            All Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our complete collection of premium supplements and nutrition products.
            From muscle building to weight management, find the perfect solution for your fitness goals.
          </motion.p>
        </div>

        {/* Fitness Goals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {fitnessGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="text-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                {/* Icon Container */}
                <div className="relative mb-4 mx-auto">
                  <div className="w-20 h-20 mx-auto relative group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={goal.image}
                      alt={goal.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  
                  {/* Hover Effect Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Goal Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {goal.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {goal.description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    size="sm"
                    onClick={() => handleInquiry(goal)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="w-full"
                  >
                    <Link href={goal.link}>
                      View Products
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedGoal && (
        <PurchaseModal
          product={{
            id: selectedGoal.id,
            title: selectedGoal.name,
            originalPrice: 0,
            discountPrice: 0
          }}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedGoal(null);
          }}
        />
      )}
    </section>
  );
}
