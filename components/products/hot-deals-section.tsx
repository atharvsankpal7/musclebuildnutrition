import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { getHotDealProducts } from '@/lib/actions';

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

export async function HotDealsSection() {
  const hotDeals = await getHotDealProducts();

  if (hotDeals.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            🔥 Hot Deals
          </h2>
          <p className="text-gray-600">
            Limited time offers on our best products
          </p>
        </div>
        <Badge className="bg-red-600 text-white px-3 py-1 text-sm">
          {hotDeals.length} Deal{hotDeals.length !== 1 ? 's' : ''} Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {hotDeals.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-red-200">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.displayImage}
                alt={product.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <Badge className="bg-red-600 text-white">
                  🔥 Hot Deal
                </Badge>
                {product.isFeatured && (
                  <Badge className="bg-yellow-500 text-yellow-900">
                    Featured
                  </Badge>
                )}
              </div>

              {product.discountPrice && (
                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                  {calculateDiscount(product.originalPrice, product.discountPrice)}% OFF
                </Badge>
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-red-600">
                        ₹{product.discountPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                <Link href={`/products/${product.id}`}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
