import { Product, ProductCategory } from '@/types/product';
import { Order, OrderStatusDetail } from '@/types/order';

export interface ProductDataProvider {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  getRelated(category: string, excludeId: string): Promise<Product[]>;
  getByCategory(category: ProductCategory): Promise<Product[]>;
}

export interface OrderDataProvider {
  create(orderData: Order): Promise<{ orderId: string }>;
  getStatus(orderId: string, email: string): Promise<OrderStatusDetail>;
} 