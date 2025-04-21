'use client';

import { useState, useRef, useEffect, TouchEvent } from 'react';
import Image from 'next/image';
import { useLocalCartStore } from '@/lib/store';
import { CartItem, Product } from '@/types/product';

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { addItem } = useLocalCartStore();

  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    addItem(cartItem);

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

  // Make sure product.details is always treated as an array of strings for now
  const details = Array.isArray(product.details) ? product.details : [];

  // Touch handlers for mobile image slider
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (touchDiff > minSwipeDistance) {
      // Swiped left, go to next image
      if (selectedImage < product.images.length - 1) {
        setSelectedImage(selectedImage + 1);
      }
    } else if (touchDiff < -minSwipeDistance) {
      // Swiped right, go to previous image
      if (selectedImage > 0) {
        setSelectedImage(selectedImage - 1);
      }
    }

    // Reset touch coordinates
    touchStartX.current = 0;
    touchEndX.current = 0;
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
          ref={imageContainerRef}
          className={`relative h-[500px] md:h-[600px] mb-6 overflow-hidden ${!isMobile ? 'cursor-zoom-in' : ''} transition-all duration-500 ${isZoomed ? 'border border-luxury-gold/20' : ''}`}
          onClick={() => !isMobile && setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              return !isMobile && setIsZoomed(!isZoomed);
            }
          }}
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isZoomed && !isMobile ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed && !isMobile
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
            priority
          />
          {isZoomed && !isMobile && (
            <div className="absolute top-4 right-4 bg-white/80 text-luxury-charcoal text-xs py-1 px-3 rounded-full pointer-events-none">
              Click to exit zoom
            </div>
          )}

          {/* Mobile swipe indicators */}
          {isMobile && product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    selectedImage === index
                      ? 'bg-luxury-gold'
                      : 'bg-luxury-gold/30'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={selectedImage === index}
                />
              ))}
            </div>
          )}

          {/* Mobile touch hint overlay - shows briefly when component mounts */}
          {isMobile && product.images.length > 1 && (
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none animate-fadeout">
              <div className="bg-white/80 text-luxury-charcoal text-xs py-2 px-4 rounded-full">
                Swipe to see more images
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery - only show on larger screens */}
        {!isMobile && product.images.length > 1 && (
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
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-luxury-gold">•</span>
                    <span>
                      {typeof detail === 'string'
                        ? detail
                        : JSON.stringify(detail)}
                    </span>
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
