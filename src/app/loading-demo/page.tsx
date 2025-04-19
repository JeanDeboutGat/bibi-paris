'use client';

import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import DataLoadingExample from '@/components/ui/DataLoadingExample';

export default function LoadingDemoPage() {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [style, setStyle] = useState<'default' | 'minimal' | 'elegant'>('default');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl mb-8">Loading Animation Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 shadow-sm">
          <h2 className="font-serif text-2xl mb-4">Inline Loading</h2>
          <p className="mb-4 text-luxury-charcoal/80">
            These loading spinners can be used within components when loading data.
          </p>
          
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Style:</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value as any)}
                className="border border-luxury-gold/20 px-2 py-1 rounded"
              >
                <option value="default">Default</option>
                <option value="minimal">Minimal</option>
                <option value="elegant">Elegant</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Size:</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value as any)}
                className="border border-luxury-gold/20 px-2 py-1 rounded"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
          
          <div className="h-40 bg-[#f8f5f2] rounded flex items-center justify-center">
            <LoadingSpinner fullScreen={false} style={style} size={size} />
          </div>
        </div>
        
        <div className="bg-white p-8 shadow-sm">
          <h2 className="font-serif text-2xl mb-4">Fullscreen Loading</h2>
          <p className="mb-6 text-luxury-charcoal/80">
            This loading spinner can be used during page transitions or when loading the entire page.
          </p>
          
          <button
            onClick={() => {
              setShowFullscreen(true);
              setTimeout(() => setShowFullscreen(false), 3000);
            }}
            className="btn-primary w-full"
          >
            Show Fullscreen Loader (3s)
          </button>
          
          {showFullscreen && (
            <LoadingSpinner fullScreen={true} style="elegant" size="lg" />
          )}
        </div>
      </div>
      
      <div className="mt-12 bg-white p-8 shadow-sm">
        <h2 className="font-serif text-2xl mb-4">Data Loading Example</h2>
        <p className="mb-6 text-luxury-charcoal/80">
          This example shows how to use the loading spinner when fetching data.
        </p>
        
        <DataLoadingExample />
      </div>
    </div>
  );
} 