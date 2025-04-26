import { OrderDataProvider } from './types';
import { Order, OrderStatusDetail } from '@/types/order';

export const mockOrderProvider: OrderDataProvider = {
  async create(orderData: Order): Promise<{ orderId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Optionally log orderData for development
    console.log(orderData.id)
    return { orderId: `ORD-${Date.now()}` };
  },
  async getStatus(orderId: string, email: string): Promise<OrderStatusDetail> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!orderId || !email) {
      throw new Error('Order ID and email are required');
    }
    return {
      orderId: 'ORD123456789',
      status: 'shipped',
      estimatedDelivery: '2025-04-18',
      trackingNumber: '1Z999AA10123456784',
      trackingUrl: 'https://tracking.example.com/1Z999AA10123456784',
      items: [
        { name: 'LUXE Leather Handbag', quantity: 1 },
        { name: 'Gold-Plated Bracelet', quantity: 2 },
      ],
      shippingAddress: {
        address: '123 Luxury Blvd',
        city: 'Beverly Hills',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      timeline: [
        {
          status: 'processing',
          date: '2025-04-10T10:15:00Z',
          description: 'Your order is being prepared.',
        },
        {
          status: 'shipped',
          date: '2025-04-11T14:30:00Z',
          description: 'Your order has been shipped.',
        },
      ],
    };
  },
}; 