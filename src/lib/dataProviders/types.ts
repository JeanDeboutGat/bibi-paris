import { Product, ProductListItem, ProductCategory } from '@/types/product';
import { Order, OrderStatusDetail } from '@/types/order';

export interface ProductDataProvider {
  getAll(): Promise<ProductListItem[]>;
  getById(id: string): Promise<Product>;
  getRelated(category: string, excludeId: string): Promise<ProductListItem[]>;
  getByCategory(category: ProductCategory): Promise<ProductListItem[]>;
}

export interface OrderDataProvider {
  create(orderData: Order): Promise<{ orderId: string }>;
  getStatus(orderId: string, email: string): Promise<OrderStatusDetail>;
}

// Homepage types
export type FeaturedGridItem = {
  image: string;
  title: string;
  href: string;
  alt?: string;
};

export type HomepageData = {
  heroVideo: string;
  heroPoster: string;
  featuredGrid: FeaturedGridItem[];
}; 