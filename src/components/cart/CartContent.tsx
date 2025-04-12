'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function CartContent() {
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();
    const [isUpdating, setIsUpdating] = useState(false);

    // Calculate subtotal
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Calculate estimated tax (e.g., 8%)
    const tax = subtotal * 0.08;

    // Calculate total
    const total = subtotal + tax;

    // Handle quantity change
    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setIsUpdating(true);
        updateQuantity(id, newQuantity);

        // Simulate a short delay to show the updating state
        setTimeout(() => {
            setIsUpdating(false);
        }, 300);
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-700 mb-8">Your cart is empty.</p>
                <Link
                    href="/products"
                    className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
                >
                    CONTINUE SHOPPING
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* cart Items */}
            <div className="lg:col-span-2">
                <div className="border-b border-gray-200 pb-2 mb-6">
                    <div className="grid grid-cols-12 text-sm text-gray-500">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>
                </div>

                {/* cart Item List */}
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 items-center py-4 border-b border-gray-100">
                            {/* Product Image and Name */}
                            <div className="col-span-6 flex items-center space-x-4">
                                <div className="relative w-20 h-20">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-light">{item.name}</h3>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs text-gray-500 hover:text-black mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 text-center">
                                ${item.price.toLocaleString()}
                            </div>

                            {/* Quantity */}
                            <div className="col-span-2 flex justify-center">
                                <div className="flex items-center border border-gray-300">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-2 py-1 min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="col-span-2 text-right">
                                ${(item.price * item.quantity).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* cart Actions */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={clearCart}
                        className="text-sm text-gray-600 hover:text-black underline"
                    >
                        Clear cart
                    </button>
                    <Link
                        href="/products"
                        className="text-sm text-gray-600 hover:text-black underline"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6">
                    <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Estimated Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link
                        href="/checkout"
                        className={`w-full block text-center py-3 text-sm tracking-wider ${
                            isUpdating
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-black text-white hover:bg-gray-800'
                        } transition-colors`}
                        aria-disabled={isUpdating}
                    >
                        {isUpdating ? 'UPDATING...' : 'PROCEED TO CHECKOUT'}
                    </Link>
                </div>
            </div>
        </div>
    );
}