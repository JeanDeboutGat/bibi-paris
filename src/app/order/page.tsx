import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Order Confirmation | LUXE',
    description: 'Thank you for your order',
    robots: {
        index: false,
        follow: false,
    },
};

export default function OrderConfirmationPage({
                                                  searchParams,
                                              }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const orderId = typeof searchParams.id === 'string' ? searchParams.id : null;

    if (!orderId) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="max-w-2xl mx-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto mb-6 text-green-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>

                <h1 className="text-3xl font-light mb-4">Thank You for Your Order</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Your order has been received and is being processed.
                </p>

                <div className="bg-gray-50 p-6 mb-8">
                    <h2 className="text-lg font-medium mb-4">Order Details</h2>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <p className="text-gray-700 mb-8">
                    A confirmation email has been sent to your email address with all the details of your order.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/track"
                        className="bg-white border border-black text-black px-8 py-3 text-sm tracking-wider hover:bg-gray-100 transition-colors"
                    >
                        TRACK YOUR ORDER
                    </Link>
                    <Link
                        href="/products"
                        className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
                    >
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        </div>
    );
}