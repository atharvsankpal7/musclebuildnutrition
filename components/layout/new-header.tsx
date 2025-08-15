'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Heart, ShoppingCart, ChevronDown, Truck } from 'lucide-react';
import { motion } from "framer-motion";

interface NewHeaderProps {
  navigationSections?: any[];
  headerData?: {
    phone: string;
    whatsappNumber: string;
  };
}

export function NewHeader({ navigationSections = [], headerData }: NewHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/96 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white'
        }`}
    >
      {/* Main Header Section */}
      <div className="container mx-auto px-4">
        {/* Logo, Search, and Icons Row */}
        <div className="flex items-center justify-between py-2">
          {/* Left Side - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                <Image
                  src="/logos/logo white.jpg"
                  alt="TechVerse Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-red-600 font-bold text-lg">Musclebuild Nutrition</span>
                <div className="w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🍁</span>
                </div>
              </div>
              <span className="text-red-600 text-xs">KNOW BETTER, LIVE BETTER</span>
            </div>
          </Link>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent "
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-400 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation and Help Section */}
        <div className="border-t border-gray-200 py-2">
          <div className="flex items-center justify-center">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50"
              >
                <div className="w-3 h-3 bg-red-500 rounded-sm group-hover:scale-110 transition-transform duration-300"></div>
                <span className="relative">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>

              <Link
                href="/products"
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  Product
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>

              <Link
                href="/about"
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>

              <Link
                href="/contact"
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>

            </nav>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
