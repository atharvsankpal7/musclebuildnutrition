'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Package, Shield, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { config } from '@/lib/config';

interface BundlePurchaseModalProps {
  bundle: {
    id: string;
    name: string;
    originalPrice: number;
    discountPrice?: number;
    products: Array<{
      id: string;
      title: string;
    }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BundlePurchaseModal({ bundle, isOpen, onClose }: BundlePurchaseModalProps) {
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
    if (!bundle) return;

    // Get the current bundle URL (assuming bundles have their own route)
    const bundleUrl = `${window.location.origin}/bundles/${bundle.id}`;

    // Create the WhatsApp message using the template from config
    let message = config.whatsapp.bundleMessageTemplate.replace('{bundleUrl}', bundleUrl);

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

  const finalPrice = bundle?.discountPrice || bundle?.originalPrice || 0;
  const savings = bundle?.discountPrice ? bundle.originalPrice - bundle.discountPrice : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetModal();
        onClose();
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-emerald-600" />
            Buy About Bundle
          </DialogTitle>
        </DialogHeader>

        {bundle && (
          <div className="mb-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-2">{bundle.name}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-emerald-600">
                ₹{finalPrice.toLocaleString()}
              </span>
              {savings > 0 && (
                <Badge className="bg-red-100 text-red-700">
                  Save ₹{savings.toLocaleString()}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-emerald-700">
              <Package className="h-4 w-4 mr-1" />
              {bundle.products.length} premium designs included
            </div>
          </div>
        )}

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
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="mb-4">
                <MessageCircle className="h-16 w-16 mx-auto text-green-600 mb-2" />
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Ready to Send WhatsApp Message</span>
                </div>
                <p className="text-green-700">
                  Bundle: {bundle?.name}
                </p>
                {email && (
                  <p className="text-sm text-green-600 mt-2">
                    Email: {email}
                  </p>
                )}
                <p className="text-sm text-green-600 mt-2">
                  Click the button below to open WhatsApp with a pre-filled message about your interest in this bundle.
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