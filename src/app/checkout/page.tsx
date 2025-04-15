'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, clearCart } = useCartStore((state) => ({
        items: state.items,
        clearCart: state.clearCart,
    }));

    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        city: '',
        country: 'France',
        state: '',
        postalCode: '',
        phone: '',
        saveInfo: false,
        shippingMethod: 'standard',
        paymentMethod: 'credit',
    });
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = mounted
        ? items.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    
    const shippingCost = formData.shippingMethod === 'express' ? 35 : (subtotal >= 500 ? 0 : 25);
    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
        
        // Clear error when field is edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (step: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.email) {
                newErrors.email = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
                isValid = false;
            }

            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
                isValid = false;
            }

            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
                isValid = false;
            }

            if (!formData.address) {
                newErrors.address = 'Address is required';
                isValid = false;
            }

            if (!formData.city) {
                newErrors.city = 'City is required';
                isValid = false;
            }

            if (!formData.postalCode) {
                newErrors.postalCode = 'Postal code is required';
                isValid = false;
            }

            if (!formData.phone) {
                newErrors.phone = 'Phone is required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (step === 1 && validateForm(1)) {
            setStep(2);
            window.scrollTo(0, 0);
            return;
        }

        if (step === 2) {
            try {
                setIsSubmitting(true);
                
                // Here you would normally send the data to your payment processor
                // For this demo, we'll just simulate a successful payment
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Clear cart and redirect to success page
                clearCart();
                router.push('/order/success');
            } catch (error) {
                setIsSubmitting(false);
                console.error('Payment failed:', error);
            }
        }
    };

    if (!mounted) {
        return (
            <div className="container-luxury min-h-[70vh] flex items-center justify-center">
                <div className="animate-pulse w-full max-w-3xl">
                    <div className="h-8 bg-[#f6f1eb]  w-1/4 mb-8 mx-auto"></div>
                    <div className="h-64 bg-[#f6f1eb]  w-full mb-8"></div>
                    <div className="h-12 bg-[#f6f1eb]  w-1/2 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container-luxury min-h-[70vh] flex flex-col items-center justify-center text-center">
                <h1 className="font-serif text-3xl mb-6">Checkout</h1>
                <p className="text-luxury-charcoal/70 mb-8">Your shopping bag is empty.</p>
                <Link href="/products" className="btn-primary">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container-luxury">
            <h1 className="font-serif text-3xl text-center mb-12">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-3/5">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-10 animate-fade-in">
                                <div>
                                    <h2 className="font-serif text-xl mb-6">Contact Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.email ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                            />
                                            {errors.email && (
                                                <p id="email-error" className="text-red-500 text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-serif text-xl mb-6">Shipping Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm mb-1">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.firstName ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.firstName}
                                                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                            />
                                            {errors.firstName && (
                                                <p id="firstName-error" className="text-red-500 text-xs mt-1">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm mb-1">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.lastName ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.lastName}
                                                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                            />
                                            {errors.lastName && (
                                                <p id="lastName-error" className="text-red-500 text-xs mt-1">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="company" className="block text-sm mb-1">
                                                Company (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="input-luxury w-full"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="address" className="block text-sm mb-1">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.address ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.address}
                                                aria-describedby={errors.address ? 'address-error' : undefined}
                                            />
                                            {errors.address && (
                                                <p id="address-error" className="text-red-500 text-xs mt-1">
                                                    {errors.address}
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="apartment" className="block text-sm mb-1">
                                                Apartment, suite, etc. (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="apartment"
                                                name="apartment"
                                                value={formData.apartment}
                                                onChange={handleInputChange}
                                                className="input-luxury w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.city ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.city}
                                                aria-describedby={errors.city ? 'city-error' : undefined}
                                            />
                                            {errors.city && (
                                                <p id="city-error" className="text-red-500 text-xs mt-1">
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="postalCode" className="block text-sm mb-1">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.postalCode}
                                                aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                                            />
                                            {errors.postalCode && (
                                                <p id="postalCode-error" className="text-red-500 text-xs mt-1">
                                                    {errors.postalCode}
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="phone" className="block text-sm mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`input-luxury w-full ${errors.phone ? 'border-red-500' : ''}`}
                                                aria-invalid={!!errors.phone}
                                                aria-describedby={errors.phone ? 'phone-error' : undefined}
                                            />
                                            {errors.phone && (
                                                <p id="phone-error" className="text-red-500 text-xs mt-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                            <p className="text-xs text-luxury-charcoal/60 mt-1">
                                                For delivery questions only
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-serif text-xl mb-6">Shipping Method</h2>
                                    <div className="space-y-3">
                                        <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                value="standard"
                                                checked={formData.shippingMethod === 'standard'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Standard Shipping</span>
                                                    <span>{subtotal >= 500 ? 'Free' : '$25.00'}</span>
                                                </div>
                                                <p className="text-sm text-luxury-charcoal/60 mt-1">
                                                    7-10 business days
                                                </p>
                                            </div>
                                        </label>
                                        <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                value="express"
                                                checked={formData.shippingMethod === 'express'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Express Shipping</span>
                                                    <span>$35.00</span>
                                                </div>
                                                <p className="text-sm text-luxury-charcoal/60 mt-1">
                                                    2-3 business days
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="btn-primary w-full">
                                        Continue to Payment
                                    </button>
                                    <Link href="/cart" className="text-center block mt-4 text-sm text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300">
                                        Return to Cart
                                    </Link>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-10 animate-fade-in">
                                <div>
                                    <h2 className="font-serif text-xl mb-6">Payment Method</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="credit"
                                                    checked={formData.paymentMethod === 'credit'}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                                                />
                                                <div className="flex-1">
                                                    <span className="font-medium">Credit Card</span>
                                                </div>
                                            </label>
                                            
                                            <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="paypal"
                                                    checked={formData.paymentMethod === 'paypal'}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                                                />
                                                <div className="flex-1">
                                                    <span className="font-medium">PayPal</span>
                                                </div>
                                            </label>
                                        </div>
                                        
                                        {formData.paymentMethod === 'credit' && (
                                            <div className="mt-6 space-y-4 p-4 border border-luxury-gold/10 bg-[#f6f1eb] /30">
                                                <div>
                                                    <label htmlFor="cardName" className="block text-sm mb-1">
                                                        Name on Card
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cardName"
                                                        className="input-luxury w-full"
                                                        placeholder="John Smith"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="cardNumber" className="block text-sm mb-1">
                                                        Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cardNumber"
                                                        className="input-luxury w-full"
                                                        placeholder="•••• •••• •••• ••••"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="cardExpiry" className="block text-sm mb-1">
                                                            Expiration Date
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="cardExpiry"
                                                            className="input-luxury w-full"
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="cardCvv" className="block text-sm mb-1">
                                                            Security Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="cardCvv"
                                                            className="input-luxury w-full"
                                                            placeholder="CVV"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button 
                                        type="submit" 
                                        className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Processing...' : `Pay $${total.toLocaleString()}`}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="text-center block w-full mt-4 text-sm text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300"
                                        onClick={() => setStep(1)}
                                        disabled={isSubmitting}
                                    >
                                        Return to Shipping
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="lg:w-2/5">
                    <div className="bg-[#f6f1eb] /30 p-6 lg:p-8 sticky top-32">
                        <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                        <div className="max-h-[300px] overflow-y-auto mb-6 pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-luxury-gold/10 last:border-0">
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-luxury-charcoal text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                        <p className="text-sm text-luxury-charcoal/70">${item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-luxury-charcoal/70">Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-luxury-charcoal/70">Shipping</span>
                                <span>
                                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toLocaleString()}`}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-luxury-gold/10 pt-4">
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}