import { ProductDataProvider } from './types';
import {
  PaginatedProducts,
  Product,
  ProductCategory,
  ProductListItem,
} from '@/types/product';
import { fetchWithErrorHandling } from '@/lib/apiError';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realProductProvider: ProductDataProvider = {
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

  async getPaginated({ category, page, pageSize }) {
    const params = new URLSearchParams();
    params.set('limit', String(Math.min(pageSize, 30)));
    params.set('offset', String((page - 1) * pageSize));
    if (category) params.set('category', category);
    return fetchWithErrorHandling<PaginatedProducts>(`${API_BASE}/api/products?${params.toString()}`);
  },
};