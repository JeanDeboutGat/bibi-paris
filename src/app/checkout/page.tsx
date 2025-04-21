'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { CheckoutFormData } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');

  // Form data state
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit',
  });

  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost =
    formData.shippingMethod === 'express' ? 35 : subtotal >= 500 ? 0 : 25;
  const total = subtotal + shippingCost;

  // Validate form fields
  const validateForm = (fields: (keyof CheckoutFormData)[]) => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (
        !formData[field] &&
        field !== 'cardCvc' &&
        field !== 'cardExpiry' &&
        field !== 'cardNumber'
      ) {
        newErrors[field] = 'This field is required';
        valid = false;
      }
    });

    // Validate email format
    if (
      fields.includes('email') &&
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate card details if payment method is credit
    if (
      fields.includes('paymentMethod') &&
      formData.paymentMethod === 'credit'
    ) {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
        valid = false;
      }
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiration date is required';
        valid = false;
      }
      if (!formData.cardCvc) {
        newErrors.cardCvc = 'Security code is required';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate: (keyof CheckoutFormData)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'country',
      'shippingMethod',
    ];

    if (validateForm(fieldsToValidate)) {
      setStep('payment');
      window.scrollTo(0, 0);
    }
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate: (keyof CheckoutFormData)[] = ['paymentMethod'];

    if (formData.paymentMethod === 'credit') {
      fieldsToValidate.push('cardNumber', 'cardExpiry', 'cardCvc');
    }

    if (!validateForm(fieldsToValidate)) {
      return;
    }

    setSubmitting(true);

    try {
      // Here you would normally send the data to your payment processor
      // For this demo, we'll just simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      localStorage.setItem('orderCompleted', 'true');
      router.push('/order/success');
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors({
        payment: 'Payment processing failed. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // If cart is empty, show message
  if (items.length === 0) {
    return (
      <div className="container-luxury py-20 text-center">
        <h1 className="font-serif text-3xl mb-6">Your Cart is Empty</h1>
        <p className="mb-10 text-luxury-charcoal/80">
          Add some products to your cart to proceed with checkout.
        </p>
        <Link href="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-luxury my-12">
      <h1 className="font-serif text-3xl mb-2">Checkout</h1>
      <p className="text-luxury-charcoal/70 mb-8">
        Complete your order by providing your details below.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit}>
              {/* Contact Information */}
              <div className="mb-8 bg-white p-8 shadow-sm">
                <h2 className="font-serif text-xl mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-luxury w-full ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8 bg-white p-8 shadow-sm">
                <h2 className="font-serif text-xl mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className={`input-luxury w-full ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
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
                      className={`input-luxury w-full ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm mb-1">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`input-luxury w-full ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
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
                      className={`input-luxury w-full ${errors.city ? 'border-red-500' : ''}`}
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
                      className={`input-luxury w-full ${errors.state ? 'border-red-500' : ''}`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm mb-1">
                      Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`input-luxury w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-luxury w-full ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mb-8 bg-white p-8 shadow-sm">
                <h2 className="font-serif text-xl mb-6">Shipping Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={() =>
                        setFormData({ ...formData, shippingMethod: 'standard' })
                      }
                      className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-medium">Standard Shipping</span>
                      <p className="text-sm text-luxury-charcoal/70">
                        {subtotal >= 500 ? 'Free' : '$25.00'} · 5-7 business
                        days
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={() =>
                        setFormData({ ...formData, shippingMethod: 'express' })
                      }
                      className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-medium">Express Shipping</span>
                      <p className="text-sm text-luxury-charcoal/70">
                        $35.00 · 2-3 business days
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              {/* Payment Method */}
              <div className="mb-8 bg-white p-8 shadow-sm">
                <h2 className="font-serif text-xl mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: 'credit' })
                      }
                      className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                    />
                    <span className="font-medium">Credit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-luxury-charcoal/20 transition-all cursor-pointer hover:border-luxury-gold/50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: 'paypal' })
                      }
                      className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50 mr-3"
                    />
                    <span className="font-medium">PayPal</span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit' && (
                  <div className="mt-6 space-y-4 p-4 border border-luxury-gold/10 bg-[#f6f1eb] /30">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm mb-1"
                      >
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber || ''}
                        onChange={handleChange}
                        className="input-luxury w-full"
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="cardExpiry"
                          className="block text-sm mb-1"
                        >
                          Expiration Date*
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry || ''}
                          onChange={handleChange}
                          className="input-luxury w-full"
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardExpiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm mb-1">
                          Security Code*
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc || ''}
                          onChange={handleChange}
                          className="input-luxury w-full"
                          placeholder="CVC"
                        />
                        {errors.cardCvc && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardCvc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {errors.payment && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 text-sm">
                  {errors.payment}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Complete Order'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="btn-secondary"
                >
                  Return to Shipping
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 shadow-sm sticky top-8">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 mb-4 pb-4 border-b border-luxury-gold/10 last:border-0"
                >
                  <div className="w-16 h-20 relative bg-[#f6f1eb] /30 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={80}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-luxury-charcoal/70 text-sm mb-1">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-luxury-gold text-sm">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm mb-8">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-luxury-charcoal/70">Shipping</span>
                <span>
                  {shippingCost === 0
                    ? 'Free'
                    : `$${shippingCost.toLocaleString()}`}
                </span>
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
    </div>
  );
}
