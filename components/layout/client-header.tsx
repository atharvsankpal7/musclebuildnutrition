'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown, Search } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { SectionHierarchy } from '@/types/section';

import { SSRMobileNavigation } from './ssr-mobile-navigation';
import { SearchDropdown } from './search-dropdown';

interface ClientHeaderProps {
  navigationSections: SectionHierarchy[];
  headerData: {
    phone: string;
    whatsappNumber: string;
  };
}

export function ClientHeader({ navigationSections, headerData }: ClientHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buildSectionUrl = (section: SectionHierarchy): string => {
    return `/products?section=${encodeURIComponent(section.name)}`;
  };

  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const renderDesktopSubMenu = (children: SectionHierarchy[], level = 1) => {
    if (!children || children.length === 0) return null;

    return (
      <div className={`absolute ${level === 1 ? 'top-full left-0 mt-2' : 'top-0 left-full ml-2'} 
                      min-w-[220px] bg-white shadow-2xl border border-gray-200 rounded-xl py-3 z-50 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 ease-out transform
                      ${level === 1 ? 'translate-y-2 group-hover:translate-y-0' : 'translate-x-2 group-hover:translate-x-0'}`}>
        <div className="px-2">
          {children.map((child, index) => (
            <div key={child.id} className="relative group/child">
              <Link
                href={buildSectionUrl(child)}
                className="flex items-center justify-between px-3 py-2.5 text-gray-700 
                           hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 
                           hover:to-pink-50 transition-all duration-200 rounded-lg"
              >
                <span className="font-medium text-sm">{child.name}</span>
                {child.children && child.children.length > 0 && (
                  <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400 
                                       hover:text-purple-600 transition-colors" />
                )}
              </Link>
              
                {/* Only show subsubsection when hovering over this specific subsection */}
              {child.children && child.children.length > 0 && (
                <div className="absolute top-0 left-full ml-2 min-w-[220px] bg-white 
                               shadow-2xl border border-gray-200 rounded-xl py-3 z-50 
                               opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible
                               transition-all duration-300 ease-out transform
                               translate-x-2 group-hover/child:translate-x-0">
                  <div className="px-2">
                    {child.children.map((grandChild: SectionHierarchy, grandIndex: number) => (
                      <div key={grandChild.id}>
                        <Link
                          href={buildSectionUrl(grandChild)}
                          className="flex items-center justify-between px-3 py-2.5 text-gray-700 
                                     hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 
                                     hover:to-pink-50 transition-all duration-200 rounded-lg"
                        >
                          <span className="font-medium text-sm">{grandChild.name}</span>
                        </Link>
                        
                        {child.children && grandIndex < child.children.length - 1 && (
                          <div className="mx-3 my-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {index < children.length - 1 && (
                <div className="mx-3 my-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Muscle Build</div>
              <div className="text-sm text-gray-600">Nutrition</div>
            </div>
          </Link>

          {/* Desktop Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href={`tel:${headerData.phone.replace(/\s/g, '')}`} 
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{headerData.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation - Multi-row support */}
        <div className="hidden lg:block border-t border-gray-100/60">
          <nav className="py-3">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link 
                href="/" 
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group py-1 text-sm ${
                  isActivePage('/') ? 'text-purple-600' : ''
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePage('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                href="/about" 
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group py-1 text-sm ${
                  isActivePage('/about') ? 'text-purple-600' : ''
                }`}
              >
                About
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePage('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                href="/products" 
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group py-1 text-sm ${
                  isActivePage('/products') ? 'text-purple-600' : ''
                }`}
              >
                Products
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePage('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                href="/demo" 
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group py-1 text-sm ${
                  isActivePage('/demo') ? 'text-purple-600' : ''
                }`}
              >
                WhatsApp Demo
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePage('/demo') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              {/* Dynamic Section Navigation */}
              {navigationSections.map((section) => (
                <div key={section.id} className="relative group">
                  <Link
                    href={buildSectionUrl(section)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 
                               transition-colors duration-300 font-medium group py-1 text-sm"
                  >
                    <span>{section.name}</span>
                    {section.children && section.children.length > 0 && (
                      <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-purple-600 
                                           transition-all duration-300 group-hover:rotate-180" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                     from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  
                  {section.children && section.children.length > 0 && (
                    renderDesktopSubMenu(section.children)
                  )}
                </div>
              ))}
              
              <Link 
                href="/contact" 
                className={`relative text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group py-1 text-sm ${
                  isActivePage('/contact') ? 'text-purple-600' : ''
                }`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePage('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden py-4 border-t border-purple-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchDropdown 
                className="w-full" 
                onResultClick={() => setIsMenuOpen(false)}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 text-sm ${
                  isActivePage('/') ? 'text-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 text-sm ${
                  isActivePage('/about') ? 'text-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/products" 
                className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 text-sm ${
                  isActivePage('/products') ? 'text-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              <Link 
                href="/demo" 
                className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 text-sm ${
                  isActivePage('/demo') ? 'text-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                WhatsApp Demo
              </Link>
              
              {/* Mobile Section Navigation */}
              <SSRMobileNavigation 
                sections={navigationSections} 
                onLinkClick={() => setIsMenuOpen(false)} 
              />
              
              <Link 
                href="/contact" 
                className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 text-sm ${
                  isActivePage('/contact') ? 'text-purple-600 bg-purple-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-3 border-t border-gray-200">
                <a 
                  href={`tel:${headerData.phone.replace(/\s/g, '')}`} 
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-purple-50 text-sm"
                >
                  <Phone className="h-4 w-4 mr-3" />
                  {headerData.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}