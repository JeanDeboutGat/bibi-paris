import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import { productApi } from '@/lib/api';

// ✅ Next.js will wrap this in a Promise due to async `generateMetadata`
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const product = await productApi.getById(id);

        return {
            title: `${product.name} | LUXE`,
            description: product.description,
        };
    } catch {
        return {
            title: 'Product Not Found | LUXE',
        };
    }
}
export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const product = await productApi.getById(id);

        // If product not found, show 404
        if (!product) {
            notFound();
        }

        // Transform the product to match the expected shape
        // TODO: Remove this once the API is updated
        const enhancedProduct = {
            ...product,
            details:['Premium quality', 'Handcrafted with care'],
            images: [product.image]
        };

        return (
            <div className="container mx-auto px-4 py-16">
                <ProductDetail product={enhancedProduct} />

                <div className="mt-24">
                    <h2 className="text-2xl font-light text-center mb-12">You May Also Like</h2>
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