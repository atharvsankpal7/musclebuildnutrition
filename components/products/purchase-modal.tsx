'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';
import { config } from '@/lib/config';

interface PurchaseModalProps {
  product: {
    id: string;
    title: string;
    originalPrice: number;
    discountPrice?: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PurchaseModal({ product, isOpen, onClose }: PurchaseModalProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'contact' | 'whatsapp'>('contact');

  const handleDirectWhatsApp = () => {
    // Go directly to WhatsApp without email
    handleWhatsAppMessage();
  };

  const handleWithContact = () => {
    if (email.trim()) {
      setStep('whatsapp');
    } else {
      toast.error('Please enter your email');
    }
  };

  const handleWhatsAppMessage = () => {
    if (!product) return;

    // Get the current product URL
    const productUrl = `${window.location.origin}/products/${product.id}`;

    // Create the WhatsApp message
    let message = config.whatsapp.messageTemplate.replace('{productUrl}', productUrl);

    // Add email if provided
    if (email.trim()) {
      message += `\n\nMy email: ${email}`;
    }

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp business number from config
    const whatsappNumber = config.whatsapp.businessNumber;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Show success message
    toast.success('WhatsApp opened! Please send the message to complete your inquiry.');

    // Close the modal
    onClose();
  };

  const resetModal = () => {
    setEmail('');
    setStep('contact');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetModal();
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy About {product?.title}</DialogTitle>
        </DialogHeader>

        {step === 'contact' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <MessageCircle className="h-16 w-16 mx-auto text-green-600 mb-2" />
              <p className="text-lg font-semibold">How would you like to proceed?</p>
              <p className="text-sm text-gray-600 mt-2">
                Choose to go directly to WhatsApp or add your email for better follow-up.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleDirectWhatsApp}
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Go directly to WhatsApp
              </Button>

              <div className="text-center text-sm text-gray-500">OR</div>

              <div>
                <Label htmlFor="email">Add your email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email (optional)"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleWithContact}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send WhatsApp Message with Email
              </Button>
            </div>
          </div>
        )}

        {step === 'whatsapp' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-4">
                <MessageCircle className="h-16 w-16 mx-auto text-green-600 mb-2" />
                <p className="text-lg font-semibold">Ready to Send WhatsApp Message</p>
                <p className="text-gray-600">
                  Product: {product?.title}
                </p>
                {email && (
                  <p className="text-sm text-green-600 mt-2">
                    Email: {email}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Click the button below to open WhatsApp with a pre-filled message about your interest in this product.
                </p>
              </div>
            </div>

            <Button
              onClick={handleWhatsAppMessage}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send WhatsApp Message
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep('contact')}
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}