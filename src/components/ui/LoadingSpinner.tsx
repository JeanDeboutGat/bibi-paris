'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  delay?: number; // delay in ms before showing the spinner
  style?: 'default' | 'minimal' | 'elegant'; // different animation styles
  size?: 'sm' | 'md' | 'lg'; // different size options
}

export default function LoadingSpinner({ 
  fullScreen = true, 
  delay = 300, 
  style = 'default',
  size = 'md'
}: LoadingSpinnerProps) {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  // Size mapping
  const sizeMap = {
    sm: { container: 'w-16 h-16', bar: 'w-16' },
    md: { container: 'w-20 h-20', bar: 'w-20' },
    lg: { container: 'w-28 h-28', bar: 'w-28' },
  };

  // Render different animation styles
  const renderLoadingAnimation = () => {
    switch (style) {
      case 'minimal':
        return (
          <div className={`relative ${sizeMap[size].container}`}>
            <Image 
              src="/logo.png" 
              alt="BIBI Paris" 
              fill
              className="object-contain animate-logo-float" 
              priority
            />
          </div>
        );
        
      case 'elegant':
        return (
          <div className={`relative ${sizeMap[size].container}`}>
            <div className="absolute inset-0 rounded-full border-2 border-luxury-gold/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-luxury-sienna/80 border-t-transparent animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center animate-logo-float">
              <Image 
                src="/logo.png" 
                alt="BIBI Paris" 
                width={size === 'lg' ? 80 : size === 'md' ? 60 : 40}
                height={size === 'lg' ? 80 : size === 'md' ? 60 : 40}
                className="object-contain" 
                priority
              />
            </div>
          </div>
        );
        
      default: // default style
        return (
          <>
            <div className={`relative ${sizeMap[size].container} mb-4`}>
              <div className="animate-pulsate absolute inset-0 rounded-full bg-luxury-cream opacity-30"></div>
              <div className="animate-spin-slow absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="BIBI Paris" 
                  fill
                  className="object-contain" 
                  priority
                />
              </div>
            </div>
            <div className={`overflow-hidden h-0.5 ${sizeMap[size].bar} bg-luxury-gold/10 rounded-full`}>
              <div className="animate-loading-bar h-full bg-luxury-sienna"></div>
            </div>
          </>
        );
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center ${
        fullScreen ? 'fixed inset-0 z-[9999] bg-[#FBF9F6]/90 backdrop-blur-sm' : 'w-full py-12'
      }`}
    >
      {renderLoadingAnimation()}
    </div>
  );
} 