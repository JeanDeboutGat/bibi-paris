import { ProductDataProvider } from './types';
import { mockProducts } from './mockData';
import { Product, ProductCategory } from '@/types/product';

export const mockProductProvider: ProductDataProvider = {
  async getAll(): Promise<Product[]> {
    return mockProducts;
  },
  async getById(id: string): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const product = mockProducts.find((p) => p.id === id);
    if (product) return product;
    return {
      id,
      name: 'Luxury Product',
      description: 'High-end luxury product with premium materials.',
      images: [
        '/images/handmades/gobolet.jpg',
        '/images/handmades/gobolet.jpg',
        '/images/handmades/gobolet.jpg',
      ],
      category: 'handmades',
      price: 999.99,
      inStock: false,
      sku: `SKU-${id.toUpperCase()}`,
      details: ['Product details not available'],
    };
  },
  async getRelated(category: string, excludeId: string): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts.filter((p) => p.category === category && p.id !== excludeId).slice(0, 4);
  },
  async getByCategory(category: ProductCategory): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts.filter((p) => p.category === category);
  },
}; 