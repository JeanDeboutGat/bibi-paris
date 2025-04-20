/**
 * Product-related type definitions
 */

export type ProductCategory = 'handmades' | 'secondHands' | 'paintings' | 'decoratives';


export type ProductSortOption = 'price_asc' | 'price_desc' | 'newest';

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductDimension = {
  height: number;
  width: number;
  depth: number;
  unit: 'cm' | 'in';
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];  // For now, only using string[] to avoid rendering issues
  images: string[];
  category: ProductCategory;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  discount?: number;
  dimensions?: ProductDimension;
  materials?: string[];
  handmade?: boolean;
  sustainableMaterials?: boolean;
  care?: string[];
  sku: string;
};

export type ProductListItem = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: ProductCategory;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type ProductFilterOptions = {
  category?: ProductCategory;
  sort?: ProductSortOption;
  priceRange?: {
    min?: number;
    max?: number;
  };
  materials?: string[];
  inStock?: boolean;
}; 