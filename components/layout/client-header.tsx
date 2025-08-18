'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActivePage = (path: string) => pathname === path;

  const buildSectionUrl = (section: any) => `/products/${section.slug}`;

  const renderDesktopSubMenu = (children: any[]) => (
    <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
      <div className="py-2">
        {children.map((child) => (
          <Link
            key={child.id}
            href={buildSectionUrl(child)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            {child.name}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-white'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        {/* Top Bar: Logo | Search | Contact */}
        <div className="flex items-center justify-between py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg sm:text-xl text-red-600">Muscle Build</div>
              <div className="text-xs sm:text-sm text-red-600">Nutrition</div>
            </div>
            <div className="block sm:hidden">
              <div className="font-bold text-base text-red-600">Muscle Build</div>
            </div>
          </Link>

          {/* Search (desktop) */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <SearchDropdown className="w-full" placeholder="Search" />
          </div>

          {/* Contact number (desktop) */}
          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${headerData.phone.replace(/\s/g, '')}`}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300 font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">{headerData.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Desktop Navigation - second row */}
        <div className="hidden md:block border-t border-gray-100/60">
          <nav className="py-2">
            <div className="flex items-center justify-center gap-x-8">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Product' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 font-medium py-1 text-sm transition-colors ${isActivePage(link.href) ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                    }`}
                >
                  {/* Red little box indicator */}
                  <span
                    className={`h-3 w-3 rounded-sm bg-red-500 transition-transform ${isActivePage(link.href) ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`}
                  />
                  <span className="relative">
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all ${isActivePage(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </span>
                </Link>
              ))}

              {/* Dynamic Section Navigation */}
              {navigationSections.map((section) => (
                <div key={section.id} className="relative group">
                  <Link
                    href={buildSectionUrl(section)}
                    className="flex items-center gap-1 text-gray-700 hover:text-red-600 font-medium py-1 text-sm"
                  >
                    <span>{section.name}</span>
                    {section.children && section.children.length > 0 && (
                      <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-red-600 transition-all group-hover:rotate-180" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all" />
                  </Link>
                  {section.children && section.children.length > 0 && renderDesktopSubMenu(section.children)}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-3 sm:py-4 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Search */}
            <div className="mb-3 sm:mb-4">
              <SearchDropdown className="w-full" onResultClick={() => setIsMenuOpen(false)} />
            </div>

            <div className="flex flex-col space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Product' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${isActivePage(link.href) ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Sections on mobile */}
              <SSRMobileNavigation sections={navigationSections} onLinkClick={() => setIsMenuOpen(false)} />

              <div className="pt-3 border-t border-gray-200">
                <a
                  href={`tel:${headerData.phone.replace(/\s/g, '')}`}
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors py-2 px-3 rounded-lg hover:bg-red-50 text-sm"
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