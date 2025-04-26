import { OrderDataProvider } from './types';
import { Order, OrderStatusDetail } from '@/types/order';
import { fetchWithErrorHandling } from '@/lib/apiError';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realOrderProvider: OrderDataProvider = {
  async create(orderData: Order): Promise<{ orderId: string }> {
    return fetchWithErrorHandling<{ orderId: string }>(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  },
  async getStatus(orderId: string, email: string): Promise<OrderStatusDetail> {
    const url = `${API_BASE}/api/orders/status?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`;
    return fetchWithErrorHandling<OrderStatusDetail>(url);
  },
}; 