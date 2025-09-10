'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, Star, ShoppingCart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { config } from '@/lib/config';

const demoProducts = [
  {
    id: 'demo-1',
    title: 'Musclebuild Whey Protein',
    description: 'Premium whey protein isolate for muscle building and recovery',
    displayImage: '/products/Musclebuild whey protein.jpg',
    originalPrice: 2499,
    discountPrice: 1999,
    category: 'Build Muscle'
  },
  {
    id: 'demo-2',
    title: 'Musclebuild Mass Gainer',
    description: 'High-calorie mass gainer for weight gain and muscle building',
    displayImage: '/products/Musclebuild mass gainer.jpg',
    originalPrice: 1899,
    discountPrice: 1599,
    category: 'Weight Gain'
  },
  {
    id: 'demo-3',
    title: 'Musclebuild Pre Workout',
    description: 'Energy-boosting pre-workout supplement for enhanced performance',
    displayImage: '/products/Musclebuild Pre workout.jpg',
    originalPrice: 1299,
    discountPrice: 999,
    category: 'Energy & Endurance'
  }
];

const demoBundles = [
  {
    id: 'bundle-demo-1',
    name: 'Complete Fitness Bundle',
    description: 'Whey Protein + Mass Gainer + Pre Workout',
    displayImage: '/products/Musclebuild whey protein.jpg',
    originalPrice: 5697,
    discountPrice: 4597,
    productCount: 3
  }
];

export function WhatsAppDemo() {
  const [selectedProduct, setSelectedProduct] = useState<typeof demoProducts[0] | null>(null);

  const handleProductInquiry = (product: typeof demoProducts[0]) => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    let message = config.whatsapp.messageTemplate.replace('{productUrl}', productUrl);
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = config.whatsapp.businessNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('WhatsApp opened! Please send the message to complete your inquiry.');
  };

  const handleBundleInquiry = (bundle: typeof demoBundles[0]) => {
    const bundleUrl = `${window.location.origin}/bundles/${bundle.id}`;
    let message = config.whatsapp.messageTemplate.replace('{productUrl}', bundleUrl);
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = config.whatsapp.businessNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('WhatsApp opened! Please send the message to complete your inquiry.');
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  return (
    <div className="space-y-8">
      {/* Demo Products Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Products</h2>
          <p className="text-gray-600">
            Click "Buy Now" on any product to see how WhatsApp integration works
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.displayImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-600">
                  {product.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{product.title}</CardTitle>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(product.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleProductInquiry(product)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Buy Now via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Demo Bundles Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Bundles</h2>
          <p className="text-gray-600">
            Try the bundle inquiry system through WhatsApp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoBundles.map((bundle) => (
            <Card key={bundle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={bundle.displayImage}
                  alt={bundle.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-emerald-600">
                  <Package className="h-3 w-3 mr-1" />
                  Bundle
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{bundle.name}</CardTitle>
                <p className="text-gray-600 text-sm mb-3">{bundle.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {bundle.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(bundle.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(bundle.originalPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(bundle.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {bundle.productCount} items
                  </Badge>
                </div>

                <Button 
                  onClick={() => handleBundleInquiry(bundle)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Buy Bundle via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How WhatsApp Integration Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">1. Select Product</h3>
            <p className="text-sm text-gray-600">Choose any product or bundle you're interested in</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">2. Click Buy Now</h3>
            <p className="text-sm text-gray-600">WhatsApp opens with a pre-filled message about the product</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">3. Complete Purchase</h3>
            <p className="text-sm text-gray-600">Send the message and complete your order through WhatsApp</p>
          </div>
        </div>
      </section>
    </div>
  );
}
