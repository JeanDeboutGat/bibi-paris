'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
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

  // Collections data to display with featured image and product images
  const collections = [
    {
      id: 'handmades',
      name: 'Handmade Pieces',
      description:
        'Expertly crafted furniture that celebrates the beauty of natural wood and artisanal techniques.',
      featuredImage: '/images/handmades/gobolet.jpg',
      categoryHref: '/products?category=handmades',
      productHref: '/product/handmades-1', // Example product page link
      products: [
        {
          id: 'handmades-1',
          images: [
            '/images/handmades/pull.jpg',
            '/images/handmades/cousin.jpg',
            '/images/handmades/gobolet.jpg',
          ],
          name: 'Hand-carved Oak Table',
          price: 1825,
        },
        {
          id: 'handmades-2',
          images: [
            '/images/handmades/cousin.jpg',
            '/images/handmades/pull.jpg',
            '/images/handmades/sac.jpg',
          ],
          name: 'Sculpted Maple Vessel',
          price: 2125,
        },
        {
          id: 'handmades-3',
          images: [
            '/images/handmades/sac.jpg',
            '/images/handmades/gobolet.jpg',
            '/images/handmades/pull.jpg',
          ],
          name: 'Handcrafted Walnut Box',
          price: 907,
        },
        {
          id: 'handmades-4',
          images: [
            '/images/handmades/gobolet.jpg',
            '/images/handmades/sac.jpg',
            '/images/handmades/cousin.jpg',
          ],
          name: 'Artisanal Wooden Goblet',
          price: 2107,
        },
      ],
    },
    {
      id: 'secondHands',
      name: 'Second-Hand',
      description:
        'Curated vintage pieces with history and character, restored to their original splendor.',
      featuredImage: '/images/secondHands/table.jpg',
      categoryHref: '/products?category=secondHands',
      productHref: '/product/secondHands-1', // Example product page link
      products: [
        {
          id: 'secondHands-1',
          images: [
            '/images/secondHands/chair.jpg',
            '/images/secondHands/table.jpg',
            '/images/secondHands/chairdark.jpg',
          ],
          name: 'Mid-century Lounge Chair',
          price: 1825,
        },
        {
          id: 'secondHands-2',
          images: [
            '/images/secondHands/chairdark.jpg',
            '/images/secondHands/smallChair.jpg',
            '/images/secondHands/chair.jpg',
          ],
          name: 'Antique Oak Cabinet',
          price: 2125,
        },
        {
          id: 'secondHands-3',
          images: [
            '/images/secondHands/smallChair.jpg',
            '/images/secondHands/chairdark.jpg',
            '/images/secondHands/table.jpg',
          ],
          name: 'Classic Rattan Armchair',
          price: 907,
        },
        {
          id: 'secondHands-4',
          images: [
            '/images/secondHands/table.jpg',
            '/images/secondHands/chair.jpg',
            '/images/secondHands/smallChair.jpg',
          ],
          name: 'Vintage Dining Table',
          price: 2107,
        },
      ],
    },
    {
      id: 'paintings',
      name: 'Paintings',
      description:
        'Original artworks that complement our furniture and bring emotional depth to any space.',
      featuredImage: '/images/paintings/girl.jpg',
      categoryHref: '/products?category=paintings',
      productHref: '/product/paintings-1', // Example product page link
      products: [
        {
          id: 'paintings-1',
          images: [
            '/images/paintings/gate.jpg',
            '/images/paintings/girl.jpg',
            '/images/paintings/flower.jpg',
          ],
          name: 'Botanical Study Print',
          price: 1825,
        },
        {
          id: 'paintings-2',
          images: [
            '/images/paintings/girl-boy.jpg',
            '/images/paintings/gate.jpg',
            '/images/paintings/girl.jpg',
          ],
          name: 'Heritage Portrait',
          price: 2125,
        },
        {
          id: 'paintings-3',
          images: [
            '/images/paintings/flower.jpg',
            '/images/paintings/girl-boy.jpg',
            '/images/paintings/gate.jpg',
          ],
          name: 'Landscape Oil Painting',
          price: 907,
        },
        {
          id: 'paintings-4',
          images: [
            '/images/paintings/girl.jpg',
            '/images/paintings/flower.jpg',
            '/images/paintings/girl-boy.jpg',
          ],
          name: 'Portrait Study',
          price: 2107,
        },
      ],
    },
    {
      id: 'decoratives',
      name: 'Decorative Objects',
      description:
        'Refined accessories that add the perfect finishing touch to your carefully curated interiors.',
      featuredImage: '/images/decoratives/vase.jpg',
      categoryHref: '/products?category=decoratives',
      productHref: '/product/decoratives-1', // Example product page link
      products: [
        {
          id: 'decoratives-1',
          images: [
            '/images/decoratives/pot.jpg',
            '/images/decoratives/vase.jpg',
            '/images/decoratives/flower.jpg',
          ],
          name: 'Handblown Glass Bowl',
          price: 1825,
        },
        {
          id: 'decoratives-2',
          images: [
            '/images/decoratives/flower.jpg',
            '/images/decoratives/pot.jpg',
            '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
          ],
          name: 'Modernist Bronze Object',
          price: 2125,
        },
        {
          id: 'decoratives-3',
          images: [
            '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
            '/images/decoratives/flower.jpg',
            '/images/decoratives/vase.jpg',
          ],
          name: 'Woven Rattan Basket',
          price: 907,
        },
        {
          id: 'decoratives-4',
          images: [
            '/images/decoratives/vase.jpg',
            '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
            '/images/decoratives/pot.jpg',
          ],
          name: 'Sculptural Ceramic Vase',
          price: 2107,
        },
      ],
    },
  ];

  const handleImageNavigation = (e: React.MouseEvent, productId: string, direction: 'prev' | 'next') => {
    e.preventDefault();
    e.stopPropagation();
    
    const collection = collections.find(c => c.products.some(p => p.id === productId));
    if (!collection) return;
    
    const product = collection.products.find(p => p.id === productId);
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
                  const currentIndex = currentImageIndex[product.id] || 0;
                  
                  return (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`} 
                      className="block group"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative aspect-square overflow-hidden mb-3">
                        <Image
                          src={product.images[currentIndex]}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-500"
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
                      <h3 className="font-serif text-sm mb-1">{product.name}</h3>
                      <p className="text-luxury-charcoal/70 text-sm">
                        ${product.price}
                      </p>
                    </Link>
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
