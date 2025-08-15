import { Metadata } from 'next';
import { WhatsAppDemo } from '@/components/demo/whatsapp-demo';

export const metadata: Metadata = {
  title: 'WhatsApp Integration Demo - Muscle Build Nutrition',
  description: 'See how our WhatsApp integration works for all fitness goal products and hot deals. Test the inquiry system with real products and special offers.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            WhatsApp Integration Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            This page demonstrates how customers can Buy about all fitness goal products and hot deals through WhatsApp instead of making direct payments.
          </p>
        </div>

        <WhatsAppDemo />
      </main>
    </div>
  );
}
