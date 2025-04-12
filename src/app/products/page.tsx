import { Metadata } from 'next';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';

export const metadata: Metadata = {
    title: 'LUXE | Products',
    description: 'Browse our collection of luxury products.',
};

export default async function ProductsPage({
    searchParams,
  }: {
    searchParams: Promise< { [key: string]: string | string[] | undefined }>;
  }) {
    // Extract filter parameters from URL - await searchParams first
    const params = await searchParams;
    
    const category = typeof params.category === 'string' ? params.category : undefined;
    const collection = typeof params.collection === 'string' ? params.collection : undefined;
    const sort = typeof params.sort === 'string' ? params.sort : undefined;
  
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-light text-center mb-12">Our Products</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ProductFilters 
              selectedCategory={category}
              selectedCollection={collection}
              selectedSort={sort}
            />
          </div>
          
          <div className="lg:w-3/4">
            <ProductGrid 
              category={category}
              collection={collection}
              sort={sort}
            />
          </div>
        </div>
      </div>
    );
  }