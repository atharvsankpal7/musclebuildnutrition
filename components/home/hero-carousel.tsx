'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: '/banners/banner1.jpg',
    title: 'Better Nutrition, Better You',
    subtitle: 'Discover premium supplements for your fitness journey',
    ctaText: 'Shop Now',
    ctaLink: '/products'
  },
  {
    id: 2,
    image: '/banners/banner2.webp',
    title: 'बेहतर पोषण, बेहतर आप',
    subtitle: 'अपनी फिटनेस यात्रा के लिए प्रीमियम सप्लीमेंट्स',
    ctaText: 'अभी खरीदें',
    ctaLink: '/products'
  },
  {
    id: 3,
    image: '/banners/banner3.jpg',
    title: 'चांगले पोषण, चांगले तुम्ही',
    subtitle: 'तुमच्या फिटनेस प्रवासासाठी प्रीमियम पूरक',
    ctaText: 'आता खरेदी करा',
    ctaLink: '/products'
  },
  {
    id: 4,
    image: '/banners/banner4.jpg',
    title: 'Premium Supplements',
    subtitle: 'Quality nutrition for optimal performance',
    ctaText: 'Explore Now',
    ctaLink: '/products'
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
         <div className="relative w-full h-[350px] overflow-hidden bg-gradient-to-r from-orange-50 to-blue-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white z-10">
                             <motion.h1
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-3xl md:text-4xl font-bold mb-3"
               >
                 {heroSlides[currentSlide].title}
               </motion.h1>
              {heroSlides[currentSlide].subtitle && (
                                 <motion.p
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="text-lg md:text-xl mb-4"
                 >
                   {heroSlides[currentSlide].subtitle}
                 </motion.p>
              )}
              {heroSlides[currentSlide].ctaText && (
                                 <motion.button
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.6 }}
                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-base font-semibold transition-colors"
                 >
                   {heroSlides[currentSlide].ctaText}
                 </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Left/Right Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
