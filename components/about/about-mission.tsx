'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

export function AboutMission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the journey that led us to become your trusted partner in fitness and nutrition
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Building a Healthier Future
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Muscle Build Nutrition was founded with a simple yet powerful vision: to make premium quality 
                supplements accessible to everyone who wants to improve their fitness and health. We started 
                as a small team of fitness enthusiasts and nutrition experts who were frustrated by the lack 
                of transparency and quality in the supplement industry.
              </p>
              <p>
                Our journey began in 2020 when we realized that many people were struggling to find supplements 
                that actually worked and were made with the highest quality ingredients. We decided to change 
                that by creating a company that prioritizes quality, transparency, and customer satisfaction above all else.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across India and beyond, helping them achieve 
                their fitness goals with our carefully formulated products and expert guidance.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h4>
                <p className="text-gray-700 leading-relaxed">
                  To provide premium quality supplements that empower individuals to achieve their fitness goals, 
                  while maintaining the highest standards of quality, safety, and customer service.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is guided by what's best for our customers. Your success is our success.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product undergoes rigorous testing and quality control.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Standards</h3>
              <p className="text-gray-600">
                We follow international quality standards and source the best ingredients from around the world.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
