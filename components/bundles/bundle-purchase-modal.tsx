'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { config } from '@/lib/config';

interface BundlePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: {
    id: string;
    name: string;
    description: string;
    displayImage: string;
    originalPrice: number;
    discountPrice?: number;
  } | null;
}

export function BundlePurchaseModal({ isOpen, onClose, bundle }: BundlePurchaseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bundle) return;

    const bundleUrl = `${window.location.origin}/bundles/${bundle.id}`;
    let message = config.whatsapp.messageTemplate.replace('{productUrl}', bundleUrl);
    
    if (formData.message) {
      message += `\n\nAdditional Message: ${formData.message}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = config.whatsapp.businessNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('WhatsApp opened! Please send the message to complete your inquiry.');
    onClose();
  };

  const handleDirectWhatsApp = () => {
    if (!bundle) return;

    const bundleUrl = `${window.location.origin}/bundles/${bundle.id}`;
    let message = config.whatsapp.messageTemplate.replace('{productUrl}', bundleUrl);
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = config.whatsapp.businessNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('WhatsApp opened! Please send the message to complete your inquiry.');
    onClose();
  };

  if (!bundle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inquire About {bundle.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Get in touch with us about this bundle through WhatsApp
            </p>
            <Button 
              onClick={handleDirectWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Open WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
