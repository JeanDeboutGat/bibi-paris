import { ProductDataProvider } from './types';
import { Product, ProductListItem, ProductCategory } from '@/types/product';
import { fetchWithErrorHandling } from '@/lib/apiError';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realProductProvider: ProductDataProvider = {
  async getAll() {
    return fetchWithErrorHandling<ProductListItem[]>(`${API_BASE}/api/products`);
  },
  
  async getById(id: string) {
    return fetchWithErrorHandling<Product>(`${API_BASE}/api/products/${id}`);
  },
  
  async getRelated(category: string, excludeId: string) {
    return fetchWithErrorHandling<ProductListItem[]>(
      `${API_BASE}/api/products/related?category=${encodeURIComponent(category)}&excludeId=${encodeURIComponent(excludeId)}`
    );
  },
  
  async getByCategory(category: ProductCategory) {
    return fetchWithErrorHandling<ProductListItem[]>(
      `${API_BASE}/api/products/category/${category}`
    );
  },
}; 