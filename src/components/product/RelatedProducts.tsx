'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productApi } from '@/lib/api';
import { ProductListItem, ProductCategory } from '@/types/product';

type RelatedProductsProps = {
  currentProductId: string;
  category: ProductCategory;
};

export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        // Get all products first
        const allProducts = await productApi.getAll();
        console.log(allProducts)

        // Filter products from the same category, excluding current product
        const relatedProducts = allProducts
          .filter(
            (product) =>
              product.category === category && product.id !== currentProductId
          )
          .slice(0, 4);

        console.log("related",relatedProducts)
        setProducts(relatedProducts);
      } catch (err) {
        console.error('Failed to fetch related products:', err);

        // Fallback to category-specific mock data if API fails
        const mockImages = {
          handmades: [
            '/images/handmades/gobolet.jpg',
            '/images/handmades/pull.jpg',
            '/images/handmades/cousin.jpg',
            '/images/handmades/sac.jpg',
          ],
          secondHands: [
            '/images/secondHands/table.jpg',
            '/images/secondHands/chair.jpg',
            '/images/secondHands/chairdark.jpg',
            '/images/secondHands/smallChair.jpg',
          ],
          paintings: [
            '/images/paintings/girl.jpg',
            '/images/paintings/gate.jpg',
            '/images/paintings/girl-boy.jpg',
            '/images/paintings/flower.jpg',
          ],
          decoratives: [
            '/images/decoratives/vase.jpg',
            '/images/decoratives/pot.jpg',
            '/images/decoratives/flower.jpg',
            '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
          ],
        };

        // Use the appropriate image array based on category
        const categoryImages =
          mockImages[category as keyof typeof mockImages] ||
          mockImages.decoratives; // Default fallback

        setProducts([
          {
            id: `${category}-1`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 1`,
            price: 599,
            image: categoryImages[0],
            category,
          },
          {
            id: `${category}-2`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 2`,
            price: 699,
            image: categoryImages[1],
            category,
          },
          {
            id: `${category}-3`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 3`,
            price: 799,
            image: categoryImages[2],
            category,
          },
          {
            id: `${category}-4`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 4`,
            price: 899,
            image: categoryImages[3],
            category,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-64 mb-4"></div>
            <div className="bg-gray-200 h-5 w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group"
        >
          <div className="relative h-64 mb-4 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <h3 className="text-base font-light mb-1">{product.name}</h3>
          <p className="text-gray-700">${product.price.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  );
}
