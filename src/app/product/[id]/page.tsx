import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import { productApi } from '@/lib/api';

// Define types for params that match Next.js requirements
type PageProps = {
  params: Promise<{ id: string }>;
};

// ✅ Next.js will wrap this in a Promise due to async `generateMetadata`
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await productApi.getById(id);

    return {
      title: `${product.name} | BIBI Paris`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found | BIBI Paris',
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await productApi.getById(id);

    // If product not found, show 404
    if (!product) {
      notFound();
    }

    // Transform the product to match the expected shape
    const enhancedProduct = {
      ...product,
      details: [
        'Premium quality',
        'Handcrafted with care',
        'Sustainably sourced materials',
      ],
      images: [product.image],
    };

    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <ProductDetail product={enhancedProduct} />

        <div className="mt-24">
          <h2 className="font-serif text-2xl font-light text-center mb-12">
            You May Also Like
          </h2>
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>
    );
  } catch {
    // If there's an error fetching the product, show 404
    notFound();
  }
}
