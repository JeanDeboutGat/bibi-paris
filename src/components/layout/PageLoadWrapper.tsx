'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type PageLoadWrapperProps = {
  children: React.ReactNode;
};

// Routes that likely require data fetching or are complex enough to warrant a loading spinner
const DATA_FETCHING_ROUTES = [
  '/products',
  '/cart',
  '/checkout',
  '/account',
  '/orders',
  '/product/',
  '/search',
  '/categories',
  '/collection',
];

// Simple content pages that load quickly
const STATIC_CONTENT_ROUTES = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/faq',
  '/shipping',
  '/returns',
];

export default function PageLoadWrapper({ children }: PageLoadWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to determine if the current route requires loading animation
  const shouldShowLoading = (path: string): boolean => {
    // Show loading for routes that typically fetch data
    const needsLoading = DATA_FETCHING_ROUTES.some(route => path.startsWith(route));
    
    // Skip loading for simple content pages
    const isStaticContent = STATIC_CONTENT_ROUTES.some(route => path === route);
    
    // Special case: always show for homepage initial load, but not for returns to home
    const isInitialHomeLoad = path === '/' && !document.referrer.includes(window.location.host);
    
    return needsLoading || isInitialHomeLoad || (!isStaticContent && path !== '/');
  };

  // Reset loading state when the route changes
  useEffect(() => {
    const handleStart = () => {
      // Only show loading for routes that likely need it
      if (typeof window !== 'undefined') {
        const newPath = window.location.pathname;
        if (shouldShowLoading(newPath)) {
          setIsLoading(true);
        }
      }
    };

    const handleStop = () => {
      // Use a shorter delay for simple routes
      const isDataFetchingRoute = DATA_FETCHING_ROUTES.some(route => 
        pathname.startsWith(route)
      );
      
      const delay = isDataFetchingRoute ? 500 : 200;
      setTimeout(() => setIsLoading(false), delay);
    };

    // For initial page load
    window.addEventListener('load', handleStop);

    // Check for navigation events manually since Next.js App Router doesn't expose these directly
    let currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    const observer = new MutationObserver(() => {
      const newPath = window.location.pathname + window.location.search;
      if (currentPath !== newPath) {
        currentPath = newPath;
        
        // Only trigger loading for routes that need it
        if (shouldShowLoading(window.location.pathname)) {
          handleStart();
          // Adjust timeout based on type of page
          const isComplexPage = DATA_FETCHING_ROUTES.some(route => 
            window.location.pathname.startsWith(route)
          );
          setTimeout(handleStop, isComplexPage ? 800 : 400);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('load', handleStop);
      observer.disconnect();
    };
  }, [pathname, searchParams]);

  // Adjust loading spinner style based on the type of route
  const getLoadingStyle = (): 'default' | 'minimal' | 'elegant' => {
    const isProductPage = pathname.startsWith('/product/');
    const isCheckoutFlow = pathname.startsWith('/cart') || pathname.startsWith('/checkout');
    
    if (isProductPage) return 'elegant';
    if (isCheckoutFlow) return 'minimal'; // Simpler loading for checkout flow
    return 'elegant'; // Default elegant style for most pages
  };

  return (
    <>
      {isLoading && (
        <LoadingSpinner 
          style={getLoadingStyle()} 
          fullScreen={true} 
          delay={100}
          size={pathname.startsWith('/product/') ? 'lg' : 'md'}
        />
      )}
      {children}
    </>
  );
}