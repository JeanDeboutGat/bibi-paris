'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);

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
          image: '/images/handmades/pull.jpg',
          name: 'Hand-carved Oak Table',
          price: 1825,
        },
        {
          id: 'handmades-2',
          image: '/images/handmades/cousin.jpg',
          name: 'Sculpted Maple Vessel',
          price: 2125,
        },
        {
          id: 'handmades-3',
          image: '/images/handmades/sac.jpg',
          name: 'Handcrafted Walnut Box',
          price: 907,
        },
        {
          id: 'handmades-4',
          image: '/images/handmades/gobolet.jpg',
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
          image: '/images/secondHands/chair.jpg',
          name: 'Mid-century Lounge Chair',
          price: 1825,
        },
        {
          id: 'secondHands-2',
          image: '/images/secondHands/chairdark.jpg',
          name: 'Antique Oak Cabinet',
          price: 2125,
        },
        {
          id: 'secondHands-3',
          image: '/images/secondHands/smallChair.jpg',
          name: 'Classic Rattan Armchair',
          price: 907,
        },
        {
          id: 'secondHands-4',
          image: '/images/secondHands/table.jpg',
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
          image: '/images/paintings/gate.jpg',
          name: 'Botanical Study Print',
          price: 1825,
        },
        {
          id: 'paintings-2',
          image: '/images/paintings/girl-boy.jpg',
          name: 'Heritage Portrait',
          price: 2125,
        },
        {
          id: 'paintings-3',
          image: '/images/paintings/flower.jpg',
          name: 'Landscape Oil Painting',
          price: 907,
        },
        {
          id: 'paintings-4',
          image: '/images/paintings/girl.jpg',
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
          image: '/images/decoratives/pot.jpg',
          name: 'Handblown Glass Bowl',
          price: 1825,
        },
        {
          id: 'decoratives-2',
          image: '/images/decoratives/flower.jpg',
          name: 'Modernist Bronze Object',
          price: 2125,
        },
        {
          id: 'decoratives-3',
          image: '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
          name: 'Woven Rattan Basket',
          price: 907,
        },
        {
          id: 'decoratives-4',
          image: '/images/decoratives/vase.jpg',
          name: 'Sculptural Ceramic Vase',
          price: 2107,
        },
      ],
    },
  ];

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
                {collection.products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="block group">
                    <div className="relative aspect-square overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif text-sm mb-1">{product.name}</h3>
                    <p className="text-luxury-charcoal/70 text-sm">
                      ${product.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
