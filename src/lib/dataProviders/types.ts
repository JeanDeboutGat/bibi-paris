import { Product, ProductListItem, ProductCategory } from '@/types/product';
import { Order, OrderStatusDetail } from '@/types/order';
import { PaginatedProducts } from '@/types/product';

export interface ProductDataProvider {
  getById(id: string): Promise<Product>;
  getRelated(category: string, excludeId: string): Promise<ProductListItem[]>;
  getByCategory(category: ProductCategory): Promise<ProductListItem[]>;
  getPaginated(params: { category?: ProductCategory; page: number; pageSize: number }): Promise<PaginatedProducts>;
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