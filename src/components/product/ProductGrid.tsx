'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocalCartStore } from '@/lib/store';
import {
  ProductCategory,
  ProductListItem,
  ProductSortOption,
} from '@/types/product';

type ProductGridProps = {
  category?: ProductCategory;
  sort?: ProductSortOption;
};

export default function ProductGrid({ category, sort }: ProductGridProps) {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { addItem } = useLocalCartStore();

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
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Use actual image filenames based on category
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

        // Create mock data for all categories
        let data: ProductListItem[] = [];

        // Only generate products for the selected category, or all categories if none selected
        const categoriesToGenerate = category
          ? [category]
          : ([
              'handmades',
              'secondHands',
              'paintings',
              'decoratives',
            ] as ProductCategory[]);

        // Enhanced product names to convey luxury
        const productNamesByCategory = {
          handmades: [
            'Artisanal Wooden Goblet',
            'Hand-carved Oak Table',
            'Sculpted Maple Vessel',
            'Handcrafted Walnut Box',
          ],
          secondHands: [
            'Vintage Dining Table',
            'Mid-century Lounge Chair',
            'Antique Oak Cabinet',
            'Classic Rattan Armchair',
          ],
          paintings: [
            'Abstract Forest Canvas',
            'Botanical Study Print',
            'Heritage Portrait',
            'Landscape Oil Painting',
          ],
          decoratives: [
            'Sculptural Ceramic Vase',
            'Handblown Glass Bowl',
            'Modernist Bronze Object',
            'Woven Rattan Basket',
          ],
        };

        categoriesToGenerate.forEach((cat) => {
          const categoryImages = mockImages[cat as keyof typeof mockImages];
          const categoryNames =
            productNamesByCategory[cat as keyof typeof productNamesByCategory];

          if (categoryImages) {
            const categoryProducts = Array.from({ length: 4 }, (_, i) => {
              // Generate 3 images per product by reusing images from the category
              const productImages = [
                categoryImages[i % categoryImages.length],
                categoryImages[(i + 1) % categoryImages.length],
                categoryImages[(i + 2) % categoryImages.length],
              ];

              return {
                id: `${cat}-${i + 1}`,
                name:
                  categoryNames[i] ||
                  `${
                    cat === 'handmades'
                      ? 'Handcrafted'
                      : cat === 'secondHands'
                        ? 'Vintage'
                        : cat === 'paintings'
                          ? 'Artwork'
                          : 'Decorative'
                  } Piece ${i + 1}`,
                price: Math.floor(Math.random() * 1500) + 500,
                images: productImages,
                category: cat,
              };
            });
            data = [...data, ...categoryProducts];
          }
        });

        // Sort products
        if (sort) {
          switch (sort) {
            case 'price_asc':
              data.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              data.sort((a, b) => b.price - a.price);
              break;
            case 'newest':
              data.reverse();
              break;
          }
        }

        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort]);

  const handleQuickAdd = (e: React.MouseEvent, product: ProductListItem) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });

    // Trigger subtle bounce animation on cart icon
    document
      .querySelector('.cart-icon')
      ?.classList.add('animate-subtle-bounce');
    setTimeout(() => {
      document
        .querySelector('.cart-icon')
        ?.classList.remove('animate-subtle-bounce');
    }, 500);
  };

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-[#f6f1eb] /30 h-[400px] mb-6"></div>
            <div className="bg-[#f6f1eb] /30 h-5 w-3/4 mb-3"></div>
            <div className="bg-[#f6f1eb] /30 h-4 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-luxury-charcoal">
        <p className="text-lg mb-6 font-light">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="font-light border border-luxury-charcoal text-luxury-charcoal py-3 px-10 hover:bg-luxury-charcoal hover:text-white transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-lg text-luxury-charcoal mb-6">
          No products match your selected criteria.
        </p>
        <button
          onClick={() => window.history.back()}
          className="font-light border border-luxury-charcoal text-luxury-charcoal py-3 px-10 hover:bg-luxury-charcoal hover:text-white transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="font-light text-sm text-luxury-charcoal/60 mb-10">
        Showing {products.length} {products.length === 1 ? 'item' : 'items'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {products.map((product) => {
          const isHovered = hoveredProduct === product.id;
          const isSelected = selectedProduct === product.id;
          const currentIndex = currentImageIndex[product.id] || 0;

          return (
            <div
              key={product.id}
              className="group block focus-visible"
              onClick={(e) => handleProductClick(e, product.id)}
              onMouseEnter={() => !isMobile && setHoveredProduct(product.id)}
              onMouseLeave={() => !isMobile && setHoveredProduct(null)}
            >
              <div className="relative mb-6 overflow-hidden">
                {/* Aspect ratio container for consistent image heights */}
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={product.images[currentIndex]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-in-out"
                    priority={product.id.endsWith('-1')}
                  />

                  {/* Previous image with fade-out effect */}
                  {isHovered && (
                    <div className="absolute inset-0 animate-fadeOut">
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} - previous view`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg"
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-luxury-charcoal hover:bg-white flex items-center justify-center transition-all duration-300 focus-visible shadow-lg"
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

                {/* Add to cart button */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={`absolute bottom-4 right-4 bg-white text-luxury-charcoal/90 px-4 py-2 text-xs font-light tracking-wide border border-luxury-charcoal/10 transition-all duration-500 focus-visible z-10 ${
                    isHovered
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>

              <h3 className="font-serif text-base mb-2 transition-colors duration-300 group-hover:text-luxury-gold">
                {product.name}
              </h3>
              <p className="text-luxury-charcoal/70 text-sm font-light">
                ${product.price.toLocaleString()}
              </p>

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
    </>
  );
}
