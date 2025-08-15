'use client';

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

export function PurchaseModal({}: PurchaseModalProps) {
  return null;
}