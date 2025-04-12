import { Metadata } from 'next';
import CartContent from '@/components/cart/CartContent';

export const metadata: Metadata = {
    title: 'Your cart | LUXE',
    description: 'Review and checkout your selected items',
};

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="text-3xl font-light text-center mb-12">Your Shopping Cart</h1>
            <CartContent />
        </div>
    );
}