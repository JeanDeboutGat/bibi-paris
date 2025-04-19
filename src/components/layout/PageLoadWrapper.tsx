'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type PageLoadWrapperProps = {
  children: React.ReactNode;
};

export default function PageLoadWrapper({ children }: PageLoadWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset loading state when the route changes
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setTimeout(() => setIsLoading(false), 500); // Small delay for smoother transitions
    };

    // For initial page load
    window.addEventListener('load', handleStop);

    // Check for navigation events manually since Next.js App Router doesn't expose these directly
    let currentPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    const observer = new MutationObserver(() => {
      const newPath = window.location.pathname + window.location.search;
      if (currentPath !== newPath) {
        currentPath = newPath;
        handleStart();
        setTimeout(handleStop, 800); // Simulate navigation completion
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('load', handleStop);
      observer.disconnect();
    };
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && (
        <LoadingSpinner style="elegant" fullScreen={true} delay={100} />
      )}
      {children}
    </>
  );
}