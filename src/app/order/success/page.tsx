'use client';

import { useEffect } from 'react';
// import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Metadata can't be exported from client components
// export const metadata: Metadata = {
//     title: 'Bibi Paris | Order Confirmation',
//     description: 'Your order has been confirmed.',
//     robots: {
//         index: false,
//         follow: false,
//     },
// };

export default function OrderSuccessPage() {
  const router = useRouter();

  // Redirect to home if accessed directly without an order
  useEffect(() => {
    // In a real app, you'd check for a successful order token
    const hasOrderToken = localStorage.getItem('orderCompleted');

    if (!hasOrderToken) {
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else {
      // Clear the token after successful page load
      localStorage.removeItem('orderCompleted');
    }
  }, [router]);

  return (
    <div className="container-luxury min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 text-luxury-sienna">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl mb-6">
          Thank You for Your Order
        </h1>

        <p className="text-luxury-charcoal/80 mb-6">
          Your order has been successfully placed. A confirmation email has been
          sent to your email address.
        </p>

        <div className="bg-[#f6f1eb] /30 p-6 mb-8 inline-block">
          <div className="text-left">
            <p className="mb-2">
              <span className="font-medium">Order Number:</span> 78923146
            </p>
            <p>
              <span className="font-medium">Order Date:</span>{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <p className="text-luxury-charcoal/70 mb-12">
          We&apos;ll notify you once your order has been shipped. You can track
          your order status at any time by visiting the{' '}
          <Link href="/track" className="text-luxury-sienna hover:underline">
            order tracking page
          </Link>
          .
        </p>

        <div className="space-x-4">
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>

          <Link href="/track" className="btn-secondary">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
