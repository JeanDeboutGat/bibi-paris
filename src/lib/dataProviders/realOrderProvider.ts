import { OrderDataProvider } from './types';
import { Order, OrderStatusDetail } from '@/types/order';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realOrderProvider: OrderDataProvider = {
  async create(orderData: Order): Promise<{ orderId: string }> {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },
  async getStatus(orderId: string, email: string): Promise<OrderStatusDetail> {
    const url = `${API_BASE}/api/orders/status?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch order status');
    return res.json();
  },
}; 