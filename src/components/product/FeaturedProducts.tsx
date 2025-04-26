'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productApi } from '@/lib/api';
import { Product, ProductCategory } from '@/types/product';

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [productsByCategory, setProductsByCategory] = useState<Record<ProductCategory, Product[]>>({
    handmades: [],
    secondHands: [],
    paintings: [],
    decoratives: []
  });

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

  // Fetch products for each category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        const categories: ProductCategory[] = ['handmades', 'secondHands', 'paintings', 'decoratives'];
        
        // Create an object to hold products by category
        const products: Record<ProductCategory, Product[]> = {
          handmades: [],
          secondHands: [],
          paintings: [],
          decoratives: []
        };
        
        // Fetch products for each category
        await Promise.all(
          categories.map(async (category) => {
            const categoryProducts = await productApi.getByCategory(category);
            products[category] = categoryProducts.slice(0, 4); // Limit to 4 products per category
          })
        );
        
        setProductsByCategory(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Collections data to display with featured image and product images
  const collections = [
    {
      id: 'handmades',
      name: 'Handmade Pieces',
      description:
        'Expertly crafted furniture that celebrates the beauty of natural wood and artisanal techniques.',
      featuredImage: productsByCategory.handmades[0]?.images[0] || '/images/handmades/gobolet.jpg',
      categoryHref: '/products?category=handmades',
      productHref: '/product/handmades-1', // Example product page link
      products: productsByCategory.handmades.map(p => ({
        id: p.id,
        images: p.images,
        name: p.name,
        price: p.price
      }))
    },
    {
      id: 'secondHands',
      name: 'Second-Hand',
      description:
        'Curated vintage pieces with history and character, restored to their original splendor.',
      featuredImage: productsByCategory.secondHands[0]?.images[0] || '/images/secondHands/table.jpg',
      categoryHref: '/products?category=secondHands',
      productHref: '/product/secondHands-1', // Example product page link
      products: productsByCategory.secondHands.map(p => ({
        id: p.id,
        images: p.images,
        name: p.name,
        price: p.price
      }))
    },
    {
      id: 'paintings',
      name: 'Paintings',
      description:
        'Original artworks that complement our furniture and bring emotional depth to any space.',
      featuredImage: productsByCategory.paintings[0]?.images[0] || '/images/paintings/girl.jpg',
      categoryHref: '/products?category=paintings',
      productHref: '/product/paintings-1', // Example product page link
      products: productsByCategory.paintings.map(p => ({
        id: p.id,
        images: p.images,
        name: p.name,
        price: p.price
      }))
    },
    {
      id: 'decoratives',
      name: 'Decorative Objects',
      description:
        'Refined accessories that add the perfect finishing touch to your carefully curated interiors.',
      featuredImage: productsByCategory.decoratives[0]?.images[0] || '/images/decoratives/vase.jpg',
      categoryHref: '/products?category=decoratives',
      productHref: '/product/decoratives-1', // Example product page link
      products: productsByCategory.decoratives.map(p => ({
        id: p.id,
        images: p.images,
        name: p.name,
        price: p.price
      }))
    },
  ];

  const handleImageNavigation = (
    e: React.MouseEvent,
    productId: string,
    direction: 'prev' | 'next'
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const collection = collections.find((c) =>
      c.products.some((p) => p.id === productId)
    );
    if (!collection) return;

    const product = collection.products.find((p) => p.id === productId);
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

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((_, index) => (
          <section
            key={index}
            className={`py-24 ${index % 2 === 0 ? 'bg-[#f6f1eb]' : 'bg-[#f6f1eb]'}`}
          >
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-16">
                <div className="animate-pulse bg-gray-200 h-10 w-64 mx-auto mb-4"></div>
                <div className="animate-pulse bg-gray-200 h-4 max-w-2xl mx-auto"></div>
              </div>
              <div className="mb-16 max-w-5xl mx-auto">
                <div className="animate-pulse bg-gray-200 aspect-[21/9] w-full"></div>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 aspect-square w-full mb-3"></div>
                      <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                      <div className="bg-gray-200 h-3 w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </>
    );
  }

  return (
    <>
      {collections.map((collection, index) => (
        <section
          key={collection.id}
          className={`py-24 ${index % 2 === 0 ? 'bg-[#f6f1eb]' : 'bg-[#f6f1eb]'}`}
        >
          <div className="container mx-auto px-4 md:px-8">
            {/* Collection Title and Description */}
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                {collection.name}
              </h2>
              <p className="text-luxury-charcoal/80 max-w-2xl mx-auto">
                {collection.description}
              </p>
            </div>

            {/* Featured Image - Now links to product page instead of category */}
            <div className="mb-16 max-w-5xl mx-auto">
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Link href={`/product/${collection.products[0].id}`}>
                  <Image
                    src={collection.featuredImage}
                    alt={`${collection.name} collection`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </Link>
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={collection.categoryHref}
                  className="inline-flex items-center text-sm text-luxury-charcoal/80 hover:text-luxury-gold transition-colors duration-300"
                >
                  Explore Collection
                  <span className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Product Grid - Aligned with featured image width */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {collection.products.map((product) => {
                  const isHovered = hoveredProduct === product.id;
                  const isSelected = selectedProduct === product.id;
                  const currentIndex = currentImageIndex[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="block group relative"
                      onClick={(e) => handleProductClick(e, product.id)}
                      onMouseEnter={() =>
                        !isMobile && setHoveredProduct(product.id)
                      }
                      onMouseLeave={() => !isMobile && setHoveredProduct(null)}
                    >
                      <div className="relative aspect-square overflow-hidden mb-3">
                        <Image
                          src={product.images[currentIndex]}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-700 ease-in-out"
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
                            isHovered || isSelected
                              ? 'bg-opacity-10'
                              : 'bg-opacity-0'
                          }`}
                        />

                        {/* Navigation arrows - shown on hover or when selected on mobile */}
                        {((isHovered && !isMobile) ||
                          (isSelected && isMobile)) &&
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
                      <h3 className="font-serif text-sm mb-1">
                        {product.name}
                      </h3>
                      <p className="text-luxury-charcoal/70 text-sm">
                        ${product.price}
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
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
