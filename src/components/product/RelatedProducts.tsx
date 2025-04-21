'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productApi } from '@/lib/api';
import { Product, ProductCategory } from '@/types/product';

type RelatedProductsProps = {
  currentProductId: string;
  category: ProductCategory;
};

export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  // Reset image index when hover changes and set to second image on hover
  useEffect(() => {
    if (!hoveredProduct) {
      setCurrentImageIndex({});
    } else {
      // Set to second image (index 1) when hovering
      setCurrentImageIndex(prev => ({
        ...prev,
        [hoveredProduct]: 1
      }));
    }
  }, [hoveredProduct]);

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
            images: [
              categoryImages[0],
              categoryImages[1],
              categoryImages[2],
            ],
            category,
            description: 'Related product description',
            inStock: true,
            sku: `SKU-${category.toUpperCase()}-1`,
            details: ['Quality craftsmanship', 'Sustainable materials', 'Unique design']
          },
          {
            id: `${category}-2`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 2`,
            price: 699,
            images: [
              categoryImages[1],
              categoryImages[2],
              categoryImages[3],
            ],
            category,
            description: 'Related product description',
            inStock: true,
            sku: `SKU-${category.toUpperCase()}-2`,
            details: ['Quality craftsmanship', 'Sustainable materials', 'Unique design']
          },
          {
            id: `${category}-3`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 3`,
            price: 799,
            images: [
              categoryImages[2],
              categoryImages[3],
              categoryImages[0],
            ],
            category,
            description: 'Related product description',
            inStock: true,
            sku: `SKU-${category.toUpperCase()}-3`,
            details: ['Quality craftsmanship', 'Sustainable materials', 'Unique design']
          },
          {
            id: `${category}-4`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Item 4`,
            price: 899,
            images: [
              categoryImages[3],
              categoryImages[0],
              categoryImages[1],
            ],
            category,
            description: 'Related product description',
            inStock: true,
            sku: `SKU-${category.toUpperCase()}-4`,
            details: ['Quality craftsmanship', 'Sustainable materials', 'Unique design']
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category]);

  const handleImageNavigation = (e: React.MouseEvent, productId: string, direction: 'prev' | 'next') => {
    e.preventDefault();
    e.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const currentIndex = currentImageIndex[productId] || 0;
    const imageCount = product.images.length;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % imageCount;
    } else {
      newIndex = (currentIndex - 1 + imageCount) % imageCount;
    }
    
    setCurrentImageIndex({
      ...currentImageIndex,
      [productId]: newIndex
    });
  };

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
      {products.map((product) => {
        const isHovered = hoveredProduct === product.id;
        const currentIndex = currentImageIndex[product.id] || 0;
        
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative h-64 mb-4 overflow-hidden">
              <Image
                src={product.images[currentIndex]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500"
              />
              
              {/* Subtle overlay effect on hover */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  isHovered ? 'bg-opacity-10' : 'bg-opacity-0'
                }`}
              />
              
              {/* Navigation arrows - only shown on hover and if there are multiple images */}
              {isHovered && product.images.length > 1 && (
                <>
                  {/* Left navigation arrow */}
                  <button
                    onClick={(e) => handleImageNavigation(e, product.id, 'prev')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  
                  {/* Right navigation arrow */}
                  <button
                    onClick={(e) => handleImageNavigation(e, product.id, 'next')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                    {product.images.map((_, index) => (
                      <span 
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === index 
                            ? 'bg-white w-2.5' 
                            : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <h3 className="text-base font-light mb-1">{product.name}</h3>
            <p className="text-gray-700">${product.price.toLocaleString()}</p>
          </Link>
        );
      })}
    </div>
  );
}
