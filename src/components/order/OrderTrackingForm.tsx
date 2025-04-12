'use client';

import { useState } from 'react';
import { orderApi } from '@/lib/api';

export type OrderStatus = {
    orderId: string;
    status: 'processing' | 'shipped' | 'delivered';
    estimatedDelivery?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    items: Array<{
        name: string;
        quantity: number;
    }>;
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    timeline: Array<{
        status: string;
        date: string;
        description: string;
    }>;
};

export default function OrderTrackingForm() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderId.trim() || !email.trim()) {
            setError('Please enter both order ID and email address');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await orderApi.getStatus(orderId, email);
            setOrderStatus(data);
        } catch (err) {
            console.error('Failed to fetch order status:', err);
            setError('We could not find an order with the provided information. Please check and try again.');

            // For development, use mock data if API fails
            if (process.env.NODE_ENV === 'development') {
                setOrderStatus({
                    orderId: orderId,
                    status: 'shipped',
                    estimatedDelivery: '2023-11-15',
                    trackingNumber: 'TRK123456789',
                    trackingUrl: 'https://example.com/track',
                    items: [
                        { name: 'Leather Handbag', quantity: 1 },
                        { name: 'Silk Scarf', quantity: 2 },
                    ],
                    shippingAddress: {
                        address: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        zipCode: '10001',
                        country: 'United States',
                    },
                    timeline: [
                        {
                            status: 'Order Placed',
                            date: '2023-11-01',
                            description: 'Your order has been received and is being processed.',
                        },
                        {
                            status: 'Payment Confirmed',
                            date: '2023-11-01',
                            description: 'Your payment has been confirmed.',
                        },
                        {
                            status: 'Shipped',
                            date: '2023-11-05',
                            description: 'Your order has been shipped.',
                        },
                    ],
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-500';
            case 'shipped':
                return 'bg-blue-500';
            case 'delivered':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div>
            {!orderStatus ? (
                <div className="bg-gray-50 p-8">
                    <p className="text-center text-gray-700 mb-8">
                        Enter your order ID and email address to check the status of your order.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="orderId" className="block text-sm mb-1">
                                Order ID
                            </label>
                            <input
                                type="text"
                                id="orderId"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="e.g. ORD12345678"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="The email used for your order"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 text-sm tracking-wider ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800'
                            } transition-colors`}
                        >
                            {isLoading ? 'SEARCHING...' : 'TRACK ORDER'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-gray-50 p-8">
                    {/* Order Status Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h2 className="text-xl font-light mb-2">Order #{orderStatus.orderId}</h2>
                            <div className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(orderStatus.status)} mr-2`}></span>
                                <span className="text-sm capitalize">{orderStatus.status}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setOrderStatus(null)}
                            className="text-sm text-gray-600 hover:text-black underline mt-4 md:mt-0"
                        >
                            Track another order
                        </button>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Shipping Information */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Shipping Address</h3>
                            <p className="text-sm text-gray-700">
                                {orderStatus.shippingAddress.address}<br />
                                {orderStatus.shippingAddress.city}, {orderStatus.shippingAddress.state} {orderStatus.shippingAddress.zipCode}<br />
                                {orderStatus.shippingAddress.country}
                            </p>
                        </div>

                        {/* Delivery Information */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Delivery Information</h3>
                            {orderStatus.estimatedDelivery && (
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-medium">Estimated Delivery:</span> {new Date(orderStatus.estimatedDelivery).toLocaleDateString()}
                                </p>
                            )}
                            {orderStatus.trackingNumber && (
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-medium">Tracking Number:</span> {orderStatus.trackingNumber}
                                </p>
                            )}
                            {orderStatus.trackingUrl && (
                                <a
                                    href={orderStatus.trackingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-black underline hover:text-gray-600"
                                >
                                    Track with carrier
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium mb-3">Items in Your Order</h3>
                        <div className="space-y-3">
                            {orderStatus.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{item.name}</span>
                                    <span>Qty: {item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div>
                        <h3 className="text-sm font-medium mb-4">Order Timeline</h3>
                        <div className="space-y-6">
                            {orderStatus.timeline.map((event, index) => (
                                <div key={index} className="relative pl-8">
                                    {/* Timeline connector */}
                                    {index < orderStatus.timeline.length - 1 && (
                                        <div className="absolute left-[7px] top-[14px] h-full w-0.5 bg-gray-200"></div>
                                    )}

                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-black"></div>

                                    {/* Event content */}
                                    <div>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                                            <h4 className="text-sm font-medium">{event.status}</h4>
                                            <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}