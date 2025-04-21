'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { DataFetchingRoute, StaticContentRoute, SpinnerStyle } from '@/types';

type PageLoadWrapperProps = {
  children: React.ReactNode;
};

// Routes that likely require data fetching or are complex enough to warrant a loading spinner
const DATA_FETCHING_ROUTES: DataFetchingRoute[] = [
  '/products',
  '/cart',
  '/checkout',
  '/account',
  '/orders',
  '/search',
  '/categories',
  '/collection',
];

// Simple content pages that load quickly
const STATIC_CONTENT_ROUTES: StaticContentRoute[] = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/faq',
  '/shipping',
  '/returns',
  '/track',
  '/product',
];

export default function PageLoadWrapper({ children }: PageLoadWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to determine if the current route requires loading animation
  const shouldShowLoading = (path: string): boolean => {
    // Show loading for routes that typically fetch data
    const needsLoading = DATA_FETCHING_ROUTES.some((route) =>
      path.startsWith(route)
    );

    // Skip loading for simple content pages
    const isStaticContent = STATIC_CONTENT_ROUTES.some(
      (route) => path === route || path === route + '/'
    );

    // Special case: always show for homepage initial load, but not for returns to home
    const isInitialHomeLoad =
      path === '/' && !document.referrer.includes(window.location.host);

    return (
      needsLoading || isInitialHomeLoad || (!isStaticContent && path !== '/')
    );
  };

  // Clear all timers to prevent memory leaks
  const clearAllTimers = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  // Reset loading state when the route changes
  useEffect(() => {
    // Safety function to ensure loading state is eventually cleared
    const ensureLoadingEnds = () => {
      safetyTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 3000); // Safety timeout after 3 seconds maximum
    };

    const handleStart = () => {
      clearAllTimers();

      // Only show loading for routes that likely need it
      if (typeof window !== 'undefined') {
        const newPath = window.location.pathname;
        if (shouldShowLoading(newPath)) {
          setIsLoading(true);
          setShowContent(false);
          ensureLoadingEnds();
        }
      }
    };

    const handleStop = () => {
      // Use a shorter delay for simple routes
      const isDataFetchingRoute = DATA_FETCHING_ROUTES.some(
        (route) => !!pathname?.startsWith(route)
      );

      const delay = isDataFetchingRoute ? 400 : 200;

      // First hide the spinner
      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        // Then show the content after a brief delay
        setTimeout(() => {
          setShowContent(true);
        }, 50);
      }, delay);
    };

    // For first load of the application
    if (typeof window !== 'undefined') {
      // Initial content should be visible by default
      setShowContent(true);

      // Handle browser back/forward buttons more reliably
      window.addEventListener('popstate', () => {
        handleStart();
        handleStop();
      });
    }

    // Check for navigation events manually since Next.js App Router doesn't expose these directly
    let currentPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    const observer = new MutationObserver(() => {
      const newPath = window.location.pathname + window.location.search;
      if (currentPath !== newPath) {
        currentPath = newPath;

        // Only trigger loading for routes that need it
        if (shouldShowLoading(window.location.pathname)) {
          handleStart();
          // Adjust timeout based on type of page
          const isComplexPage = DATA_FETCHING_ROUTES.some((route) =>
            window.location.pathname.startsWith(route)
          );

          // Always ensure the loading eventually stops
          setTimeout(handleStop, isComplexPage ? 600 : 300);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearAllTimers();
      window.removeEventListener('popstate', handleStart);
      observer.disconnect();
    };
  }, [pathname, searchParams]);

  // Adjust loading spinner style based on the type of route
  const getLoadingStyle = (): SpinnerStyle => {
    const isProductPage = !!pathname?.startsWith('/product/');
    const isCheckoutFlow =
      !!pathname?.startsWith('/cart') || !!pathname?.startsWith('/checkout');

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
          delay={0}
          size={!!pathname?.startsWith('/product/') ? 'lg' : 'md'}
        />
      )}
      <div
        className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </>
  );
}
