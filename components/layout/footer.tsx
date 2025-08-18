'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Leaf, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                <Image
                  src="/logos/logo.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 text-lg font-bold">Musclebuild Nutrition</span>
                <Leaf className="w-4 h-4 text-red-600" />
              </div>
            </div>

            <p className="text-gray-800 text-sm mb-4">KNOW BETTER, LIVE BETTER</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-gray-800">About Us</Link></li>
              <li><Link href="/products" className="hover:text-gray-800">Products</Link></li>
              <li><Link href="/contact" className="hover:text-gray-800">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600" />
                <a href="mailto:Musclebuildnutrition55@gmail.com" className="hover:text-gray-800">
                  Musclebuildnutrition55@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <a href="tel:9657866181" className="hover:text-gray-800">
                  9657866181
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-200 mt-6 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Muscle Trail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
