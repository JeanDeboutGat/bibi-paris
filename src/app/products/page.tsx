import { Metadata } from 'next';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { ProductCategory, ProductSortOption } from '@/types/product';

export const metadata: Metadata = {
  title: 'Bibi Paris | Collections',
  description:
    'Browse our collection of luxury wooden furniture, including handmade pieces, second-hand items, paintings, and decorative objects.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Extract filter parameters from URL - await searchParams first
  const params = await searchParams;

  const category =
    typeof params.category === 'string'
      ? (params.category as ProductCategory)
      : undefined;
  const sort =
    typeof params.sort === 'string'
      ? (params.sort as ProductSortOption)
      : undefined;

  // Determine page title based on filters
  let pageTitle = 'All Collections';
  if (category === 'handmades') pageTitle = 'Handmade Pieces';
  if (category === 'secondHands') pageTitle = 'Second-Hand';
  if (category === 'paintings') pageTitle = 'Paintings';
  if (category === 'decoratives') pageTitle = 'Decorative Objects';

  return (
    <div className="container-luxury pt-32">
      <div className="text-center mb-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-4">{pageTitle}</h1>
        <p className="text-luxury-charcoal/70 max-w-2xl mx-auto">
          Discover thoughtfully crafted pieces that combine timeless elegance
          with exceptional quality, designed to elevate your living spaces.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Filters sidebar */}
        <div className="lg:w-1/5">
          <ProductFilters selectedCategory={category} selectedSort={sort} />
        </div>

        {/* Product grid */}
        <div className="lg:w-4/5">
          <ProductGrid category={category} sort={sort} />
        </div>
      </div>
    </div>
  );
}
