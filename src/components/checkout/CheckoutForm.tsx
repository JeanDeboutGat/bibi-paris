'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import OrderSummary from '../order/OrderSummary';
import { orderApi } from '@/lib/api';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentMethod: 'credit_card' | 'paypal';
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
};

export default function CheckoutForm() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        paymentMethod: 'credit_card',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    // Calculate order totals
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle payment method selection
    const handlePaymentMethodChange = (method: 'credit_card' | 'paypal') => {
        setFormData((prev) => ({ ...prev, paymentMethod: method }));
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        // Required fields
        const requiredFields: (keyof FormData)[] = [
            'firstName', 'lastName', 'email', 'phone',
            'address', 'city', 'state', 'zipCode', 'country'
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Credit card validation if credit card is selected
        if (formData.paymentMethod === 'credit_card') {
            if (!formData.cardNumber) {
                newErrors.cardNumber = 'Card number is required';
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
                newErrors.cardNumber = 'Please enter a valid card number';
            }

            if (!formData.cardExpiry) {
                newErrors.cardExpiry = 'Expiry date is required';
            } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
                newErrors.cardExpiry = 'Please use MM/YY format';
            }

            if (!formData.cardCvc) {
                newErrors.cardCvc = 'CVC is required';
            } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
                newErrors.cardCvc = 'Please enter a valid CVC';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare order data
            const orderData = {
                customer: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                },
                shipping: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                payment: {
                    method: formData.paymentMethod,
                    // In a real app, you would handle payment securely
                    // Don't send raw card details to your backend
                },
                totals: {
                    subtotal,
                    tax,
                    total,
                },
            };

            // Submit order to API
            const response = await orderApi.create(orderData);

            // Clear cart
            clearCart();

            // Redirect to confirmation page
            router.push(`/order-confirmation?id=${response.orderId}`);
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // If cart is empty, redirect to products
    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-700 mb-8">Your cart is empty.</p>
                <button
                    onClick={() => router.push('/products')}
                    className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
                >
                    CONTINUE SHOPPING
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                    {/* Contact Information */}
                    <div className="mb-10">
                        <h2 className="text-xl font-light mb-6">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm mb-1">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${
                                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm mb-1">
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${
                                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm mb-1">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm mb-1">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${
                                        errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-10">
                        <h2 className="text-xl font-light mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="address" className="block text-sm mb-1">
                                    Street Address*
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${
                                        errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm mb-1">
                                        City*
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${
                                            errors.city ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="state" className="block text-sm mb-1">
                                        State/Province*
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${
                                            errors.state ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.state && (
                                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="zipCode" className="block text-sm mb-1">
                                        ZIP/Postal Code*
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${
                                            errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.zipCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm mb-1">
                                    Country*
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300"
                                >
                                    <option value="United States">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Japan">Japan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-10">
                        <h2 className="text-xl font-light mb-6">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="credit_card"
                                    name="paymentMethod"
                                    checked={formData.paymentMethod === 'credit_card'}
                                    onChange={() => handlePaymentMethodChange('credit_card')}
                                    className="h-4 w-4 border-gray-300"
                                />
                                <label htmlFor="credit_card" className="ml-2 text-sm">
                                    Credit Card
                                </label>
                            </div>

                            {formData.paymentMethod === 'credit_card' && (
                                <div className="pl-6 space-y-4 mt-4">
                                    <div>
                                        <label htmlFor="cardNumber" className="block text-sm mb-1">
                                            Card Number*
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="1234 5678 9012 3456"
                                            className={`w-full p-3 border ${
                                                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="cardExpiry" className="block text-sm mb-1">
                                                Expiry Date*
                                            </label>
                                            <input
                                                type="text"
                                                id="cardExpiry"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                className={`w-full p-3 border ${
                                                    errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.cardExpiry && (
                                                <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="cardCvc" className="block text-sm mb-1">
                                                CVC*
                                            </label>
                                            <input
                                                type="text"
                                                id="cardCvc"
                                                name="cardCvc"
                                                value={formData.cardCvc}
                                                onChange={handleChange}
                                                placeholder="123"
                                                className={`w-full p-3 border ${
                                                    errors.cardCvc ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.cardCvc && (
                                                <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={() => handlePaymentMethodChange('paypal')}
                                    className="h-4 w-4 border-gray-300"
                                />
                                <label htmlFor="paypal" className="ml-2 text-sm">
                                    PayPal
                                </label>
                            </div>

                            {formData.paymentMethod === 'paypal' && (
                                <div className="pl-6 mt-4">
                                    <p className="text-sm text-gray-600">
                                        You will be redirected to PayPal to complete your payment.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 text-sm tracking-wider ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-black text-white hover:bg-gray-800'
                        } transition-colors`}
                    >
                        {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <OrderSummary items={items} subtotal={subtotal} tax={tax} total={total} />
            </div>
        </div>
    );
}