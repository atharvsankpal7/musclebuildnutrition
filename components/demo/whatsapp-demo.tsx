'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { PurchaseModal } from '@/components/products/purchase-modal';

interface FitnessGoalProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
}

interface HotDealProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  isFeatured: boolean;
  category: string;
  discountPercentage: number;
}

const fitnessGoalProducts: FitnessGoalProduct[] = [
  {
    id: 'build-muscle',
    name: 'Build Muscle',
    image: '/fitness-goals/Build Muscle.png',
    description: 'Gain strength and muscle mass with our premium supplements',
    link: '/products?goal=muscle-building'
  },
  {
    id: 'overall-fitness',
    name: 'Overall Fitness',
    image: '/fitness-goals/Overall Fitness.png',
    description: 'Improve general health and wellness with balanced nutrition',
    link: '/products?goal=overall-fitness'
  },
  {
    id: 'energy-endurance',
    name: 'Energy & Endurance',
    image: '/fitness-goals/Energy & Endurance.png',
    description: 'Boost stamina and performance for better workouts',
    link: '/products?goal=energy-endurance'
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    image: '/fitness-goals/Reduce Weight.png',
    description: 'Achieve healthy weight goals with targeted supplements',
    link: '/products?goal=weight-loss'
  },
  {
    id: 'weight-gain',
    name: 'Weight Gain',
    image: '/fitness-goals/Weight Gain.png',
    description: 'Healthy weight gain solutions for muscle building',
    link: '/products?goal=weight-gain'
  },
  {
    id: 'immunity-boost',
    name: 'Immunity Boost',
    image: '/fitness-goals/Immunity Boost.png',
    description: 'Strengthen your immune system naturally',
    link: '/products?goal=immunity-boost'
  }
];

const hotDealsProducts: HotDealProduct[] = [
  {
    id: 'hot-deal-1',
    title: 'Premium Whey Protein Isolate',
    description: 'High-quality whey protein isolate for muscle building and recovery. 90% protein content.',
    image: '/fitness-goals/Build Muscle.png',
    originalPrice: 3999,
    discountPrice: 2499,
    isFeatured: true,
    category: 'Protein',
    discountPercentage: 38
  },
  {
    id: 'hot-deal-2',
    title: 'BCAA Complex + Electrolytes',
    description: 'Essential amino acids with electrolyte support for enhanced performance and recovery.',
    image: '/fitness-goals/Energy & Endurance.png',
    originalPrice: 1899,
    discountPrice: 1299,
    isFeatured: false,
    category: 'Amino Acids',
    discountPercentage: 32
  },
  {
    id: 'hot-deal-3',
    title: 'Creatine Monohydrate + BCAAs',
    description: 'Pure creatine with branched-chain amino acids for strength and muscle gains.',
    image: '/fitness-goals/Overall Fitness.png',
    originalPrice: 1299,
    discountPrice: 899,
    isFeatured: true,
    category: 'Performance',
    discountPercentage: 31
  },
  {
    id: 'hot-deal-4',
    title: 'Weight Loss Stack Bundle',
    description: 'Complete weight loss supplement stack with metabolism boosters and appetite control.',
    image: '/fitness-goals/Reduce Weight.png',
    originalPrice: 2999,
    discountPrice: 1999,
    isFeatured: false,
    category: 'Weight Loss',
    discountPercentage: 33
  }
];

export function WhatsAppDemo() {
  const [selectedProduct, setSelectedProduct] = useState<FitnessGoalProduct | HotDealProduct | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleInquiry = (product: FitnessGoalProduct | HotDealProduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* How It Works Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <MessageCircle className="h-6 w-6 mr-2" />
            How WhatsApp Integration Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Click Buy</h3>
              <p className="text-sm text-gray-600">Customer clicks "Buy Now" on any product</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Option</h3>
              <p className="text-sm text-gray-600">Go directly to WhatsApp or add email (optional)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Message</h3>
              <p className="text-sm text-gray-600">WhatsApp opens with pre-filled inquiry message</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hot Deals Section */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <Zap className="h-6 w-6 mr-2" />
            🔥 Hot Deals - Limited Time Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotDealsProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-red-200">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white font-bold">
                    {product.discountPercentage}% OFF
                  </Badge>

                  {/* Featured Badge */}
                  {product.isFeatured && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleInquiry(product)}
                      className="bg-white hover:bg-gray-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Buy Now
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleInquiry(product)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Buy via WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Fitness Goal Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Fitness Goal Products</h2>
        <p className="text-gray-600 mb-6 text-center">
          Click on any fitness goal to Buy about products via WhatsApp
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fitnessGoalProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleInquiry(product)}
                    className="bg-white hover:bg-gray-100"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Buy Now
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleInquiry(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Buy via WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(product.link, '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Products
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Benefits of WhatsApp Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Instant Access</h4>
                  <p className="text-sm text-gray-600">Go directly to WhatsApp without email verification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Direct Communication</h4>
                  <p className="text-sm text-gray-600">Builds customer relationship through personal contact</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Higher Engagement</h4>
                  <p className="text-sm text-gray-600">WhatsApp has better response rates than emails</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Setup</h4>
                  <p className="text-sm text-gray-600">No complex payment integration or verification required</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          product={{
            id: selectedProduct.id,
            title: 'title' in selectedProduct ? selectedProduct.title : selectedProduct.name,
            originalPrice: 'originalPrice' in selectedProduct ? selectedProduct.originalPrice : 0,
            discountPrice: 'discountPrice' in selectedProduct ? selectedProduct.discountPrice : 0
          }}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
