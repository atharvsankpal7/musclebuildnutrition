import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models"
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/actions';


interface HotDealProduct {
  id: string;
  title: string;
  displayImage: string;
  originalPrice: number;
  discountPrice?: number;
  isFeatured: boolean;
  isHotDeal: boolean;
}



export async function HotDeals() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hot Deals Of The Week
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Don't miss out on these incredible offers! Limited time deals on premium supplements.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => {
            
              return (
                <div
                  key={product.id}
                  className="group hover:-translate-y-1 transition-transform duration-300"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                      

                      {/* Product Image */}
                      <div className="w-full h-40 sm:h-48 relative bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4">
                        <Image
                          src={product.displayImage}
                          alt={product.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 text-sm sm:text-base line-clamp-2">
                          {product.title}
                        </h3>

                        {/* Pricing */}
                        <div className="mb-3">
                          {product.discountPrice && product.discountPrice < product.originalPrice ? (
                            <>
                              
                              <div className="text-red-600 font-bold text-base sm:text-lg">
                                ₹{product.originalPrice.toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-900 font-bold text-base sm:text-lg">
                              ₹{product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>

                        
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hot deals available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for exciting offers!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 text-sm sm:text-base"
          >
            View All Products
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}