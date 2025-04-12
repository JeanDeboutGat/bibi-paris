import { Metadata } from 'next';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
    title: 'Checkout | LUXE',
    description: 'Complete your purchase',
    robots: {
        index: false,
        follow: false,
    },
};

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="text-3xl font-light text-center mb-12">Checkout</h1>
            <CheckoutForm />
        </div>
    );
}