import { Metadata } from 'next';
import OrderTrackingForm from '@/components/order/OrderTrackingForm';

export const metadata: Metadata = {
    title: 'Track Your Order | LUXE',
    description: 'Check the status of your order',
};

export default function TrackOrderPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-light text-center mb-12">Track Your Order</h1>
                <OrderTrackingForm />
            </div>
        </div>
    );
}