'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { config } from '@/lib/config';

interface Product {
  id: string;
  title: string;
  description: string;
  displayImage: string;
  originalPrice: number;
  discountPrice?: number;
  isFeatured: boolean;
}

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const openWhatsApp = () => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    const message = config.whatsapp.messageTemplate.replace('{productUrl}', productUrl);
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = config.whatsapp.businessNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error: any) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="space-y-4">
        <Button
          size="lg"
          onClick={openWhatsApp}
          className="w-full text-lg py-6"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Buy on WhatsApp
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="w-full"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Product
        </Button>
      </div>

      <div
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => setExpandedImage(product.displayImage)}
      >
      </div>

      <Dialog
        open={!!expandedImage}
        onOpenChange={(open) => !open && setExpandedImage(null)}
      >
        <DialogContent className="p-0 bg-transparent border-none max-w-[95vw] max-h-[90vh] w-auto h-auto flex items-center justify-center">
          {expandedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={expandedImage}
                alt="Expanded product view"
                width={1200}
                height={1200}
                className="object-contain max-w-full max-h-[85vh]"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}