import { ProductDataProvider } from './types';
import { Product, ProductCategory } from '@/types/product';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const realProductProvider: ProductDataProvider = {
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },
  async getById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },
  async getRelated(category: string, excludeId: string): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products/related?category=${encodeURIComponent(category)}&excludeId=${encodeURIComponent(excludeId)}`);
    if (!res.ok) throw new Error('Failed to fetch related products');
    return res.json();
  },
  async getByCategory(category: ProductCategory): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products/category/${category}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    return res.json();
  },
}; 