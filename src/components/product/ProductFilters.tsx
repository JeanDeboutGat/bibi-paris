"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type ProductFiltersProps = {
  selectedCategory?: string;
  selectedCollection?: string;
  selectedSort?: string;
};

export default function ProductFilters({
  selectedCategory,
  selectedCollection,
  selectedSort,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter options
  const categories = [
    { value: "handmades", label: "Handmade Pieces" },
    { value: "secondHands", label: "Second-Hand" },
    { value: "paintings", label: "Paintings" },
    { value: "decoratives", label: "Decorative Objects" },
  ];
  
  const collections = [
    { value: "spring", label: "Spring 2023" },
    { value: "signature", label: "Signature Collection" },
    { value: "limited", label: "Limited Edition" },
  ];
  
  const sortOptions = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
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
  };

  return (
    <div className="mb-12">
      {/* Mobile Filter Toggle */}
      <button
        className="w-full py-4 border-b border-luxury-gold/10 flex justify-between items-center lg:hidden mb-6 focus-visible"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-controls="filter-panel"
      >
        <span className="text-sm uppercase tracking-wider font-medium">Filters & Sorting</span>
        <span className={`transform transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        id="filter-panel"
        className={`space-y-10 ${isFilterOpen ? "block animate-fade-in" : "hidden lg:block"}`}
      >
        {/* Sort Options */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-medium mb-4 pb-2 border-b border-luxury-gold/10">Sort By</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="sort-recommended"
                type="radio"
                name="sort"
                checked={!selectedSort}
                onChange={() => updateFilters("sort", null)}
                className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
              />
              <label
                htmlFor="sort-recommended"
                className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
              >
                Recommended
              </label>
            </div>
            
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`sort-${option.value}`}
                  type="radio"
                  name="sort"
                  checked={selectedSort === option.value}
                  onChange={() => updateFilters("sort", option.value)}
                  className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
                />
                <label
                  htmlFor={`sort-${option.value}`}
                  className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-medium mb-4 pb-2 border-b border-luxury-gold/10">Category</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="category-all"
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => updateFilters("category", null)}
                className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
              />
              <label
                htmlFor="category-all"
                className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
              >
                All Categories
              </label>
            </div>

            {categories.map((category) => (
              <div key={category.value} className="flex items-center">
                <input
                  id={`category-${category.value}`}
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.value}
                  onChange={() => updateFilters("category", category.value)}
                  className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
                />
                <label
                  htmlFor={`category-${category.value}`}
                  className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Filter */}
        <div>
          <h3 className="text-sm uppercase tracking-wider font-medium mb-4 pb-2 border-b border-luxury-gold/10">Collection</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="collection-all"
                type="radio"
                name="collection"
                checked={!selectedCollection}
                onChange={() => updateFilters("collection", null)}
                className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
              />
              <label
                htmlFor="collection-all"
                className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
              >
                All Collections
              </label>
            </div>

            {collections.map((collection) => (
              <div key={collection.value} className="flex items-center">
                <input
                  id={`collection-${collection.value}`}
                  type="radio"
                  name="collection"
                  checked={selectedCollection === collection.value}
                  onChange={() => updateFilters("collection", collection.value)}
                  className="h-4 w-4 border-luxury-charcoal/30 text-luxury-sienna focus:ring-luxury-gold/50"
                />
                <label
                  htmlFor={`collection-${collection.value}`}
                  className="ml-3 text-sm text-luxury-charcoal/80 cursor-pointer"
                >
                  {collection.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear All Filters */}
        {(selectedCategory || selectedCollection || selectedSort) && (
          <button
            onClick={() => {
              router.push(pathname);
            }}
            className="text-sm text-luxury-sienna hover:text-luxury-charcoal border-b border-luxury-sienna pb-1 transition-colors duration-300 focus-visible"
            aria-label="Clear all filters and sorting options"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
