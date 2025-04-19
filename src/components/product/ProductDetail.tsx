'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocalCartStore } from '@/lib/store';

type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    details: string[];
    images: string[];
    category: string;
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const { addItem } = useLocalCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });

    setIsAddedToCart(true);

    // Trigger subtle bounce animation on cart icon
    document
      .querySelector('.cart-icon')
      ?.classList.add('animate-subtle-bounce');
    setTimeout(() => {
      document
        .querySelector('.cart-icon')
        ?.classList.remove('animate-subtle-bounce');
    }, 500);

    // Reset the "Added to cart" message after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  // Zoom functionality
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div>
        <div
          className={`relative h-[500px] md:h-[600px] mb-6 overflow-hidden cursor-zoom-in transition-all duration-500 ${isZoomed ? 'border border-luxury-gold/20' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          role="button"
          tabIndex={0}
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsZoomed(!isZoomed);
            }
          }}
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
            priority
          />
          {isZoomed && (
            <div className="absolute top-4 right-4 bg-white/80 text-luxury-charcoal text-xs py-1 px-3 rounded-full pointer-events-none">
              Click to exit zoom
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setIsZoomed(false);
                }}
                aria-label={`View ${product.name} image ${index + 1}`}
                aria-current={selectedImage === index}
                className={`relative h-20 transition-all duration-300 focus-visible ${
                  selectedImage === index
                    ? 'ring-1 ring-luxury-gold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="sticky top-32">
        <h1 className="font-serif text-3xl font-light mb-3">{product.name}</h1>
        <p className="text-luxury-gold text-lg mb-8">
          ${product.price.toLocaleString()}
        </p>

        <div className="prose prose-lg mb-8 text-luxury-charcoal/80">
          <p>{product.description}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-4 px-6 mb-8 text-sm uppercase tracking-widest transition-all duration-300 ${
            isAddedToCart ? 'bg-luxury-sage text-white' : 'btn-primary'
          }`}
          aria-live="polite"
        >
          {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>

        {/* Product Details Accordion */}
        <div className="border-t border-luxury-gold/10 mt-10">
          <details className="group py-4 border-b border-luxury-gold/10" open>
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h2 className="text-lg font-medium">Details</h2>
              <span className="transform transition-transform duration-300 group-open:-rotate-180">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pt-4 pb-2 text-luxury-charcoal/70 text-sm leading-relaxed">
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-luxury-gold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group py-4 border-b border-luxury-gold/10">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h2 className="text-lg font-medium">Dimensions & Materials</h2>
              <span className="transform transition-transform duration-300 group-open:-rotate-180">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pt-4 pb-2 text-luxury-charcoal/70 text-sm leading-relaxed">
              <p>
                Made with sustainable wood from responsibly managed forests.
                Each piece is unique with slight variations in grain and color
                that add to its individual character.
              </p>
            </div>
          </details>

          <details className="group py-4 border-b border-luxury-gold/10">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h2 className="text-lg font-medium">Shipping & Returns</h2>
              <span className="transform transition-transform duration-300 group-open:-rotate-180">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pt-4 pb-2 text-luxury-charcoal/70 text-sm leading-relaxed">
              <p className="mb-2">
                Free shipping on all orders over $500. For special or oversized
                items, our white-glove delivery service ensures your piece
                arrives safely.
              </p>
              <p>
                Returns accepted within 14 days of delivery. Please note that
                custom or made-to-order items are not eligible for return.
              </p>
            </div>
          </details>

          <details className="group py-4 border-b border-luxury-gold/10">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h2 className="text-lg font-medium">Care Instructions</h2>
              <span className="transform transition-transform duration-300 group-open:-rotate-180">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pt-4 pb-2 text-luxury-charcoal/70 text-sm leading-relaxed">
              <p>
                To maintain the beauty of your wooden furniture, dust regularly
                with a soft cloth and avoid direct sunlight. For cleaning, use a
                damp cloth and mild soap, then dry immediately. Apply a quality
                wood wax twice yearly to preserve the finish.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
