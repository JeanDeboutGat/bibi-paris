'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/types';
import { useLocalCartStore } from '@/lib/store';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuToggleCount, setMenuToggleCount] = useState(0);
  const pathname = usePathname();
  const { items } = useLocalCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const lastScrollTop = useRef(0);
  const [hideHeader, setHideHeader] = useState(false);
  const isHomePage = pathname === '/';

  // Helper function to check if a menu item is active (for desktop nav)
  const isMenuItemActive = (itemPath: string) => {
    // For exact path matches
    if (itemPath === pathname) return true;
    
    // For product categories
    if (itemPath.includes('?category=') && !!pathname?.includes('/products')) {
      const itemCategory = itemPath.split('category=')[1];
      
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');
        return itemCategory === currentCategory;
      }
    }
    
    return false;
  };

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

  const navItems: NavigationItem[] = [
    { 
      title: 'Home',
      href: '/'
    },
    { 
      title: 'Handmade',
      href: '/products?category=handmades'
    },
    { 
      title: 'Second-Hand',
      href: '/products?category=secondHands'
    },
    { 
      title: 'Paintings',
      href: '/products?category=paintings'
    },
    { 
      title: 'Decorative',
      href: '/products?category=decoratives'
    }
  ];

  // Show transparent background only on homepage when not scrolled
  const showTransparentBackground = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed w-full z-[100] -mt-[2px] sm:mt-0 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-[#FBF9F6] shadow-sm py-3'
          : 'py-5 bg-transparent'
        } ${hideHeader ? 'md:translate-y-0' : 'translate-y-0'}`}
      // } ${hideHeader ? 'max-md:-translate-y-full md:translate-y-0' : 'translate-y-0'}`}
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
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-wider hover:text-luxury-sienna transition-colors duration-300 focus-visible ${
                isMenuItemActive(item.href) ? 'border-b border-luxury-gold pb-1' : ''
              } ${showTransparentBackground ? 'text-white' : 'text-luxury-charcoal'}`}
            >
              {item.title}
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
            className="md:hidden focus-visible p-2 -mr-2 rounded-full hover:bg-luxury-cream/30 transition-all duration-300"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setMenuToggleCount(prev => prev + 1);
            }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-[1.5px] absolute transition-all duration-300 ${
                  showTransparentBackground ? 'bg-[#FBF9F6]' : 'bg-luxury-charcoal/80'
                } ${isMobileMenuOpen ? 'top-[7px] rotate-45' : 'top-0'}`}
              ></span>
              <span
                className={`w-full h-[1.5px] absolute top-[7px] transition-opacity duration-300 ${
                  showTransparentBackground ? 'bg-white' : 'bg-luxury-charcoal/80'
                } ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span
                className={`w-full h-[1.5px] absolute transition-all duration-300 ${
                  showTransparentBackground ? 'bg-white' : 'bg-luxury-charcoal/80'
                } ${isMobileMenuOpen ? 'bottom-[7px] -rotate-45' : 'bottom-0'}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 w-full overflow-hidden transition-all duration-500 mx-auto px-4  ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="glass-effect mt-2 rounded-xl shadow-luxury border border-luxury-gold/10 overflow-hidden transform transition-all duration-300">
          <nav className="flex flex-col py-4" key={`mobile-nav-${menuToggleCount}-${pathname}`}>
            {navItems.map((item, index) => {
              // Direct check for active state
              let isActive = item.href === pathname;
              
              // Category check for product pages
              if (typeof window !== 'undefined' && !!pathname?.includes('/products') && item.href.includes('category=')) {
                const itemCategory = item.href.split('category=')[1];
                const urlParams = new URLSearchParams(window.location.search);
                const currentCategory = urlParams.get('category');
                isActive = itemCategory === currentCategory;
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-4 text-sm uppercase tracking-wider transition-all ${
                    index < navItems.length - 1 ? 'border-b border-luxury-gold/10' : ''
                  } ${
                    isActive ? 'text-luxury-sienna font-medium bg-luxury-cream/10' : 'text-luxury-charcoal/90'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              );
            })}
            <div className="px-6 pt-3 pb-1">
              <Link
                href="/track"
                className={`py-4 text-sm uppercase tracking-wider block -mx-6 px-6 transition-all ${
                  pathname === '/track' ? 'text-luxury-sienna font-medium bg-luxury-cream/10' : 'text-luxury-charcoal/90'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Order
              </Link>
            </div>
          </nav>
          
          <div className="bg-[#f8f5f2] py-4 px-6 border-t border-luxury-gold/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-luxury-charcoal/70">Customer Service</p>
              <a 
                href="tel:+33142123456" 
                className="text-xs text-luxury-sienna"
              >
                +33 1 42 12 34 56
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
