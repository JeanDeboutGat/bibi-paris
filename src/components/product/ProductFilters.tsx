'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProductCategory, ProductSortOption } from '@/types/product';

type ProductFiltersProps = {
  selectedCategory?: ProductCategory;
  selectedSort?: ProductSortOption;
};

export default function ProductFilters({
  selectedCategory,
  selectedSort,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Filter options
  const categories = [
    { value: 'handmades' as ProductCategory, label: 'Handmade Pieces' },
    { value: 'secondHands' as ProductCategory, label: 'Second-Hand' },
    { value: 'paintings' as ProductCategory, label: 'Paintings' },
    { value: 'decoratives' as ProductCategory, label: 'Decorative Objects' },
  ];

  // Simplified sort options - only newest and price
  const sortOptions = [
    { value: 'newest' as ProductSortOption, label: 'Newest Arrivals' },
    { value: 'price_asc' as ProductSortOption, label: 'Price: Low to High' },
    { value: 'price_desc' as ProductSortOption, label: 'Price: High to Low' },
  ];

  const updateFilters = (key: string, value: string | null) => {
    // Create a new URLSearchParams object based on the current URL
    const params = new URLSearchParams(window.location.search);

    if (value === null) {
      // Remove the parameter if value is null
      params.delete(key);
    } else {
      // Otherwise set/update the parameter
      params.set(key, value);
    }

    // Update the URL with the new search parameters
    router.push(`${pathname}?${params.toString()}`);

    // Close filter menu on mobile after applying filter
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  // Add a handler for sort change that toggles off if already selected.
  const handleSortChange = (option: ProductSortOption) => {
    if (selectedSort === option) {
      updateFilters('sort', null); // Remove sort if clicking the active one
    } else {
      updateFilters('sort', option);
    }
  };

  // Add a handler for category change that toggles off if already selected.
  const handleCategoryChange = (option: ProductCategory) => {
    if (selectedCategory === option) {
      updateFilters('category', null); // Remove category if clicking the active one
    } else {
      updateFilters('category', option);
    }
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory || selectedSort;

  const clearFilters = () => {
    router.push(pathname ?? '');

    // Close filter menu on mobile after clearing filters
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="mb-12">
      {/* Mobile Filter Toggle - Elegant Design */}
      <button
        className="w-full py-3 border-b border-luxury-gold/20 flex justify-between items-center lg:hidden mb-8 focus-visible group"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-controls="filter-panel"
      >
        <span className="font-serif text-base tracking-wide">Refine</span>
        <span
          className={`transform transition-transform duration-300 group-hover:text-luxury-gold ${isFilterOpen ? 'rotate-180' : ''}`}
        >
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
      </button>

      <div
        id="filter-panel"
        className={`space-y-12 ${isFilterOpen ? 'block animate-fade-in' : 'hidden lg:block'}`}
      >
        {/* Category Filter - Modern Luxury Design */}
        <div>
          <h3 className="font-serif text-lg mb-6 pb-2 border-b border-luxury-gold/10">
            Category
          </h3>
          <div className="space-y-4">
            <div className="group">
              <label className="flex items-center cursor-pointer">
                <span
                  className={`w-4 h-4 border ${!selectedCategory ? 'bg-luxury-gold/10 border-luxury-gold' : 'border-luxury-charcoal/20'} mr-3 transition-colors`}
                ></span>
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => updateFilters('category', null)}
                  className="sr-only"
                />
                <span
                  className={`text-sm ${!selectedCategory ? 'text-luxury-charcoal' : 'text-luxury-charcoal/60'}`}
                >
                  All Categories
                </span>
              </label>
            </div>

            {categories.map((category) => (
              <div key={category.value} className="group">
                <label className="flex items-center cursor-pointer">
                  <span
                    className={`w-4 h-4 border ${selectedCategory === category.value ? 'bg-luxury-gold/10 border-luxury-gold' : 'border-luxury-charcoal/20'} mr-3 transition-colors`}
                  ></span>
                  <input
                    type="button"
                    aria-pressed={selectedCategory === category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className="sr-only"
                    tabIndex={-1}
                  />
                  <span
                    className={`text-sm ${selectedCategory === category.value ? 'text-luxury-charcoal' : 'text-luxury-charcoal/60'}`}
                  >
                    {category.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sort Options - Modern Luxury Design */}
        <div>
          <h3 className="font-serif text-lg mb-6 pb-2 border-b border-luxury-gold/10">
            Sort By
          </h3>
          <div className="space-y-4">
            <div className="group">
              <label className="flex items-center cursor-pointer">
                <span
                  className={`w-4 h-4 border ${!selectedSort ? 'bg-luxury-gold/10 border-luxury-gold' : 'border-luxury-charcoal/20'} mr-3 transition-colors`}
                ></span>
                <input
                  type="radio"
                  name="sort"
                  checked={!selectedSort}
                  onChange={() => updateFilters('sort', null)}
                  className="sr-only"
                />
                <span
                  className={`text-sm ${!selectedSort ? 'text-luxury-charcoal' : 'text-luxury-charcoal/60'}`}
                >
                  Recommended
                </span>
              </label>
            </div>

            {sortOptions.map((option) => (
              <div key={option.value} className="group">
                <label className="flex items-center cursor-pointer">
                  <span
                    className={`w-4 h-4 border ${selectedSort === option.value ? 'bg-luxury-gold/10 border-luxury-gold' : 'border-luxury-charcoal/20'} mr-3 transition-colors`}
                  ></span>
                  <button
                    type="button"
                    aria-pressed={selectedSort === option.value}
                    onClick={() => handleSortChange(option.value)}
                    className="sr-only"
                    tabIndex={-1}
                  />
                  <span
                    className={`text-sm ${selectedSort === option.value ? 'text-luxury-charcoal' : 'text-luxury-charcoal/60'}`}
                  >
                    {option.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters - Elegant Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-luxury-charcoal hover:text-luxury-gold border-b border-luxury-gold/20 pb-1 transition-colors duration-300 focus-visible inline-flex items-center"
            aria-label="Clear all filters and sorting options"
          >
            <svg
              className="w-3 h-3 mr-2"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
