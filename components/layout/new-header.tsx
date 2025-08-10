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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/96 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white'
      }`}
    >
      {/* Top Black Banner */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Truck className="h-4 w-4" />
            <span>Better Nutrition, Better You - Use AUGUST10 for 10% off!</span>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="container mx-auto px-4">
                 {/* Logo, Search, and Icons Row */}
         <div className="flex items-center justify-between py-2">
                     {/* Left Side - Logo */}
           <Link href="/" className="flex items-center space-x-2">
             <div className="relative">
               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                 <span className="text-white font-bold text-sm">MT</span>
               </div>
             </div>
             <div className="flex flex-col">
               <div className="flex items-center space-x-1">
                 <span className="text-red-600 font-bold text-lg">MUSCLETRAIL</span>
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
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
               />
               <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                 <Search className="h-4 w-4 text-gray-400" />
               </button>
             </div>
           </div>

                     {/* Right Side - Icons */}
           <div className="flex items-center space-x-3">
             {/* Indian Flag */}
             <div className="w-6 h-6 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
             </div>
             
             {/* User Icon */}
             <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
               <User className="h-5 w-5" />
             </button>
             
             {/* Heart Icon with Badge */}
             <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative">
               <Heart className="h-5 w-5" />
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                 0
               </span>
             </button>
             
             {/* Shopping Cart */}
             <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative">
               <ShoppingCart className="h-5 w-5" />
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                 0
               </span>
             </button>
           </div>
        </div>

                 {/* Navigation and Help Section */}
         <div className="border-t border-gray-200 py-2">
           <div className="flex items-center justify-center">
             {/* Navigation Links */}
             <nav className="flex items-center space-x-6">
              <Link 
                href="/products" 
                className="group flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50"
              >
                <div className="w-3 h-3 bg-red-500 rounded-sm group-hover:scale-110 transition-transform duration-300"></div>
                <span className="relative">
                  Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              
              <Link 
                href="/shop-by-goal" 
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  Shop By Goal
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              
              <Link 
                href="/authentication" 
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  Authentication
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              
              <Link 
                href="/refer-earn" 
                className="group text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 relative"
              >
                <span className="relative">
                  Refer and Earn
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50">
                  <span>More</span>
                  <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    <Link 
                      href="/about" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Contact
                    </Link>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Blog
                    </Link>
                    <Link 
                      href="/support" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Support
                    </Link>
                  </div>
                </div>
              </div>
                         </nav>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
