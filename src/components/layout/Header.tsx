'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocalCartStore } from '@/lib/store';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useLocalCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const lastScrollTop = useRef(0);
  const [hideHeader, setHideHeader] = useState(false);
  const isHomePage = pathname === '/';

  // Change header style on scroll and implement hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      setIsScrolled(st > 10);

      // Hide header on scroll down, show on scroll up
      if (st > 100) {
        // Only apply this behavior after scrolling a bit
        if (st > lastScrollTop.current) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }
      } else {
        setHideHeader(false);
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products?category=handmades', label: 'Handmade' },
    { path: '/products?category=secondHands', label: 'Second-Hand' },
    { path: '/products?category=paintings', label: 'Paintings' },
    { path: '/products?category=decoratives', label: 'Decorative' },
  ];

  // Show transparent background only on homepage when not scrolled
  const showTransparentBackground = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed w-full z-[100] -mt-[2px] sm:mt-0 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-[#FBF9F6] shadow-sm py-3'
          : 'py-5 bg-transparent'
      } ${hideHeader ? 'max-md:-translate-y-full md:translate-y-0' : 'translate-y-0'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 focus-visible"
          aria-label="Bibi Paris Home"
        >
          <div className="relative w-14 h-14">
            <Image
              src={showTransparentBackground ? '/logo-white.png' : '/logo.png'}
              alt="BIBI Paris"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm uppercase tracking-wider hover:text-luxury-sienna transition-colors duration-300 focus-visible ${
                pathname === item.path ||
                (pathname.startsWith('/products') &&
                  item.path.startsWith('/products') &&
                  item.path.includes(
                    new URLSearchParams(pathname.split('?')[1] || '').get(
                      'category'
                    ) || ''
                  ))
                  ? 'border-b border-luxury-gold pb-1'
                  : ''
              } ${showTransparentBackground ? 'text-white' : 'text-luxury-charcoal'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cart and Mobile Menu Toggle */}
        <div className="flex items-center space-x-6">
          <Link
            href="/cart"
            className="relative group focus-visible"
            aria-label={`Shopping Cart with ${itemCount} items`}
          >
            <span className="sr-only">Cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 transition-all duration-300 group-hover:text-luxury-sienna ${showTransparentBackground ? 'text-white' : 'text-luxury-charcoal'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-luxury-sienna text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-subtle-bounce cart-icon"
                aria-hidden="true"
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus-visible"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-px absolute transition-all duration-300 ${showTransparentBackground ? 'bg-white' : 'bg-luxury-charcoal'} ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}
              ></span>
              <span
                className={`w-full h-px absolute top-2 transition-opacity duration-300 ${showTransparentBackground ? 'bg-white' : 'bg-luxury-charcoal'} ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span
                className={`w-full h-px absolute transition-all duration-300 ${showTransparentBackground ? 'bg-white' : 'bg-luxury-charcoal'} ${isMobileMenuOpen ? 'bottom-2 -rotate-45' : 'bottom-0'}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-3 text-sm uppercase tracking-wider border-b border-luxury-cream/30 hover:text-luxury-sienna transition-colors ${
                pathname === item.path ||
                (pathname.startsWith('/products') &&
                  item.path.startsWith('/products') &&
                  item.path.includes(
                    new URLSearchParams(pathname.split('?')[1] || '').get(
                      'category'
                    ) || ''
                  ))
                  ? 'text-luxury-sienna font-medium'
                  : 'text-luxury-charcoal'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/track"
              className="py-3 text-sm uppercase tracking-wider block text-luxury-charcoal hover:text-luxury-sienna transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Order
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
