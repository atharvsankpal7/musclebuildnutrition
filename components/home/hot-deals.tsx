import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart, Clock, Zap, TrendingUp } from 'lucide-react';
import { getFeaturedProducts, getHotDealProducts } from '@/lib/actions';

interface ProductType {
  id: string;
  title: string;
  description: string;
  displayImage: string;
  originalPrice: number;
  discountPrice?: number;
  isFeatured: boolean;
  isHotDeal?: boolean;
  createdAt: string;
}

const calculateDiscount = (originalPrice: number, discountPrice: number) => {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

export async function HotDeals() {
  const hotDeals = await getFeaturedProducts();

  if (hotDeals.length === 0) {
    return null;
  }

  return (
    <section className="mb-24 container px-4 md:px-8 relative mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-red-100 to-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <div className="space-y-3 mb-6 md:mb-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Zap className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Hot Deals
              </h2>
              <p className="text-gray-600 text-lg mt-1">
                Limited time offers on our best products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotDeals.map((product, index) => {
          const discountPercentage = product.discountPrice 
            ? calculateDiscount(product.originalPrice, product.discountPrice)
            : 0;
            
          return (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative bg-white rounded-xl"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease'
              }}
            >
              {/* Discount badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 px-3 py-1 text-sm font-semibold shadow-lg shadow-red-500/30">
                    -{discountPercentage}%
                  </Badge>
                </div>
              )}
              
              {/* Hot deal badge */}
              {product.isHotDeal && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-amber-500 text-white border-0 px-2 py-1 text-xs font-bold">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    HOT
                  </Badge>
                </div>
              )}

              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl">
                <Image
                  src={product.displayImage}
                  alt={product.title}
                  fill
                  className="object-contain p-5 group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Hover overlay with quick actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-5">
                  <div className="flex space-x-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-50 border-0 shadow-md rounded-full px-4" asChild>
                      <Link href={`/products/${product.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Quick View
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 border-0 shadow-md shadow-red-500/40 rounded-full px-4" asChild>
                      <Link href={`/products/${product.id}`}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors min-h-[56px]">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px] mb-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline space-x-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {product.isFeatured && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Featured
                    </Badge>
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-11 text-base font-medium border-0 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 rounded-lg" 
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Buy Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-12">
        <Button variant="outline" className="rounded-full px-8 py-5 border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700">
          View All Deals
        </Button>
      </div>
    </section>
  );
}