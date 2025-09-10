'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface NewHeaderProps {
  navigationSections?: any[];
  headerData?: {
    phone: string;
    whatsappNumber: string;
  };
}

export function NewHeader({ navigationSections = [], headerData }: NewHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <motion.div
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/96 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white'
        }`}
    >
      {/* Main Header Section */}
      <div className="container mx-auto px-3 sm:px-4">
        {/* Top Row: Logo | Search | Contact */}
        <div className="flex items-center justify-between py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Left Side - Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-transparent">
                <Image
                  src="/logos/logo.jpg"
                  alt="Musclebuild Logo"
                  width={32}
                  height={32}
                  className="rounded-full sm:w-10 sm:h-10"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-red-600 font-bold text-sm sm:text-base md:text-lg">Musclebuild Nutrition</span>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🍁</span>
                </div>
              </div>
              <span className="text-red-600 text-xs hidden sm:block">KNOW BETTER, LIVE BETTER</span>
            </div>
          </Link>

          {/* Center - Search Bar (Desktop only) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Side - Contact Number (Desktop) & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Contact Number - Hidden on mobile */}
            <div className="hidden lg:flex items-center">
              <a
                href={`tel:${headerData?.phone?.replace(/\s/g, '') || ''}`}
                className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300 font-medium"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{headerData?.phone || 'Contact'}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Links (Desktop only) */}
        <div className="hidden md:block border-t border-gray-200 py-2">
          <div className="flex items-center justify-center">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Product' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => {
                const isActive = isActivePage(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center space-x-2 transition-all duration-300 font-medium py-2 px-3 rounded-lg ${isActive
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                      }`}
                  >
                    <div className={`w-3 h-3 rounded-sm transition-transform duration-300 ${isActive ? 'bg-red-600 scale-100' : 'bg-red-500 group-hover:scale-110'
                      }`}></div>
                    <span className="relative">
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 py-3 sm:py-4"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/products', label: 'Product' },
                  { href: '/about', label: 'About' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => {
                  const isActive = isActivePage(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-300 font-medium ${isActive
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`w-3 h-3 rounded-sm transition-transform duration-300 ${isActive ? 'bg-red-600 scale-100' : 'bg-red-500'
                        }`}></div>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Contact */}
                <div className="pt-3 border-t border-gray-200">
                  <a
                    href={`tel:${headerData?.phone?.replace(/\s/g, '') || ''}`}
                    className="flex items-center space-x-3 py-3 px-4 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-300 font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{headerData?.phone || 'Contact'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
