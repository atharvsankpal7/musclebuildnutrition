'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  productImage: string;
  title: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
}

const reviews: Review[] = [
  {
    id: 1,
    productImage: "/products/Musclebuild mass gainer.jpg",
    title: "Good for Muscles",
    rating: 4.8,
    reviewText: "This product helps you in recover you muscles",
    reviewerName: "Abhishek"
  },
  {
    id: 2,
    productImage: "/products/Musclebuild whey protein.jpg",
    title: "Best Product",
    rating: 4.6,
    reviewText: "I looking for a protein product which is easy to digest and it is very difficult for me to find. Can someone please suggest me?",
    reviewerName: "Harshad"
  },
  {
    id: 3,
    productImage: "/products/Musclebuild Pre workout.jpg",
    title: "Pro series Whey protien",
    rating: 4.6,
    reviewText: "Taste mixability and quality are all excellent Whey protein is essential for a fitness freak especially if he or she is a strict vegetarian Musclebuild Nutrition pro series whey protein meets my daily protein requirements with the highest quality",
    reviewerName: "Team Sparta"
  }
];

export function LatestReviews() {
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
            Latest Reviews
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                {/* Product Image and Title */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={review.productImage}
                      alt={review.title}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {review.title}
                    </h3>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {review.reviewText}
                  </p>
                </div>

                {/* Reviewer Name */}
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">
                    — {review.reviewerName}
                  </span>
                </div>
              </div>
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
          <button className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300">
            Read All Reviews
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
