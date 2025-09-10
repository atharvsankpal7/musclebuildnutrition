import Link from "next/link"
import { Mail, Phone, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { connectDB } from '@/lib/mongodb';
import ContactSettings from '@/models/ContactSettings';
import SocialMedia from '@/models/SocialMedia';
import FooterLinks from '@/models/FooterLinks';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Globe 
} from 'lucide-react';
import { getFooterData } from "@/lib/actions";

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
    website: Globe,
  };
  return iconMap[iconName] || Globe;
};

interface DynamicFooterProps {
  footerLinks?: any[];
  socialMedia?: any[];
}

export function DynamicFooter({ footerLinks = [], socialMedia = [] }: DynamicFooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logos/header-logo.png"
                alt="Musclebuild Nutrition Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Musclebuild Nutrition</span>
            </div>
            <p className="text-gray-300 text-sm">
              Premium fitness and nutrition products for your health journey. Quality supplements and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social: any) => (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social.platform}</span>
                  {/* Add social media icons here */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 5).map((link: any) => (
                <li key={link._id}>
                  <Link
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.slice(5, 10).map((link: any) => (
                <li key={link._id}>
                  <Link
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Phone: +91-9657866181</p>
              <p>Email: info@musclebuildnutrition.com</p>
              <p>Address: Peth, Sangli Road, Islampur</p>
              <p>Working Hours: Mon-Sat 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Musclebuild Nutrition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}