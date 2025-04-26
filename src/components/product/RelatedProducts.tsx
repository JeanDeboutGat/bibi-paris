'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productApi } from '@/lib/api';
import { Product, ProductCategory } from '@/types/product';
import ErrorMessage from '@/components/ui/ErrorMessage';

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
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  // Reset image index when hover changes and set to second image on hover
  useEffect(() => {
    if (!hoveredProduct) {
      setCurrentImageIndex({});
    } else {
      // Set to second image (index 1) when hovering
      setCurrentImageIndex((prev) => ({
        ...prev,
        [hoveredProduct]: 1,
      }));
    }
  }, [hoveredProduct]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Get all products first
        const allProducts = await productApi.getAll();
        // Filter products from the same category, excluding current product
        const relatedProducts = allProducts
          .filter(
            (product) =>
              product.category === category && product.id !== currentProductId
          )
          .slice(0, 4);
        setProducts(relatedProducts);
      } catch (err) {
        setError(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [currentProductId, category]);

  const handleImageNavigation = (
    e: React.MouseEvent,
    productId: string,
    direction: 'prev' | 'next'
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const product = products.find((p) => p.id === productId);
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
      [productId]: newIndex,
    });
  };

  const handleProductClick = (e: React.MouseEvent, productId: string) => {
    if (!isMobile) return; // Only apply this logic on mobile

    e.preventDefault();

    // If this is the first click on this product, select it but don't navigate
    if (selectedProduct !== productId) {
      setSelectedProduct(productId);
      setHoveredProduct(productId);
      return;
    }

    // If this is the second click on the same product, navigate to product detail
    window.location.href = `/product/${productId}`;
  };

  if (error) {
    return <ErrorMessage error={error} className="py-8" onRetry={() => window.location.reload()} />;
  }

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

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {products.map((product) => {
        const isHovered = hoveredProduct === product.id;
        const isSelected = selectedProduct === product.id;
        const currentIndex = currentImageIndex[product.id] || 0;

        return (
          <div
            key={product.id}
            className="group relative"
            onClick={(e) => handleProductClick(e, product.id)}
            onMouseEnter={() => !isMobile && setHoveredProduct(product.id)}
            onMouseLeave={() => !isMobile && setHoveredProduct(null)}
          >
            <div className="relative h-64 mb-4 overflow-hidden">
              <Image
                src={product.images[currentIndex]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-in-out"
              />

              {/* Previous image with fade-out effect */}
              {isHovered && (
                <div className="absolute inset-0 animate-fadeOut">
                  <Image
                    src={product.images[0]}
                    alt={`${product.name} - previous view`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Subtle overlay effect on hover/selected */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  isHovered || isSelected ? 'bg-opacity-10' : 'bg-opacity-0'
                }`}
              />

              {/* Navigation arrows - shown on hover or when selected on mobile */}
              {((isHovered && !isMobile) || (isSelected && isMobile)) &&
                product.images.length > 1 && (
                  <>
                    {/* Left navigation arrow */}
                    <button
                      onClick={(e) =>
                        handleImageNavigation(e, product.id, 'prev')
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg z-20"
                      aria-label="Previous image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>

                    {/* Right navigation arrow */}
                    <button
                      onClick={(e) =>
                        handleImageNavigation(e, product.id, 'next')
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg z-20"
                      aria-label="Next image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
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

            {/* Non-mobile users get normal links; mobile uses the onClick handler */}
            {!isMobile && (
              <Link
                href={`/product/${product.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${product.name} details`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
