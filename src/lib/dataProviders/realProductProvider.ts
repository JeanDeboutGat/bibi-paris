import { ProductDataProvider } from './types';
import { Product, ProductCategory } from '@/types/product';
import { fetchWithErrorHandling } from '@/lib/apiError';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realProductProvider: ProductDataProvider = {
  async getAll(): Promise<Product[]> {
    return fetchWithErrorHandling<Product[]>(`${API_BASE}/api/products`);
  },
  
  async getById(id: string): Promise<Product> {
    return fetchWithErrorHandling<Product>(`${API_BASE}/api/products/${id}`);
  },
  
  async getRelated(category: string, excludeId: string): Promise<Product[]> {
    return fetchWithErrorHandling<Product[]>(
      `${API_BASE}/api/products/related?category=${encodeURIComponent(category)}&excludeId=${encodeURIComponent(excludeId)}`
    );
  },
  
  async getByCategory(category: ProductCategory): Promise<Product[]> {
    return fetchWithErrorHandling<Product[]>(
      `${API_BASE}/api/products/category/${category}`
    );
  },
}; 