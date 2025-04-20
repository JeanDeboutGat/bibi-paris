/**
 * Order and checkout related type definitions
 */

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned';

export type PaymentMethod = 'credit' | 'paypal' | 'bank_transfer';

export type ShippingMethod = 'standard' | 'express' | 'white_glove';

export type ShippingAddress = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type OrderTimeline = {
  status: string;
  date: string;
  description: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  shippingCost: number;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  timeline: OrderTimeline[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type OrderStatusDetail = {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  timeline: OrderTimeline[];
};

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}; 