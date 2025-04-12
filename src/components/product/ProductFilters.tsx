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

  // Sample filter options
  const categories = ["Bags", "Accessories", "Clothing", "Home", "Jewelry"];
  const collections = ["Autumn", "Spring", "Timeless", "Limited Edition"];
  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
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
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <button
        className="w-full py-3 border border-gray-300 flex justify-between items-center lg:hidden mb-4"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span className="text-sm font-medium">Filters</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <div
        className={`space-y-8 ${isFilterOpen ? "block" : "hidden lg:block"}`}
      >
        {/* Sort Options */}
        <div>
          <h3 className="text-sm font-medium mb-4">Sort By</h3>
          <select
            className="w-full p-2 border border-gray-300 text-sm"
            value={selectedSort || ""}
            onChange={(e) => updateFilters("sort", e.target.value || null)}
          >
            <option value="">Recommended</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium mb-4">Category</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="category-all"
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => updateFilters("category", null)}
                className="h-4 w-4 border-gray-300"
              />
              <label
                htmlFor="category-all"
                className="ml-2 text-sm text-gray-700"
              >
                All Categories
              </label>
            </div>

            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category.toLowerCase()}`}
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.toLowerCase()}
                  onChange={() =>
                    updateFilters("category", category.toLowerCase())
                  }
                  className="h-4 w-4 border-gray-300"
                />
                <label
                  htmlFor={`category-${category.toLowerCase()}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Filter */}
        <div>
          <h3 className="text-sm font-medium mb-4">Collection</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="collection-all"
                type="radio"
                name="collection"
                checked={!selectedCollection}
                onChange={() => updateFilters("collection", null)}
                className="h-4 w-4 border-gray-300"
              />
              <label
                htmlFor="collection-all"
                className="ml-2 text-sm text-gray-700"
              >
                All Collections
              </label>
            </div>

            {collections.map((collection) => (
              <div key={collection} className="flex items-center">
                <input
                  id={`collection-${collection.toLowerCase()}`}
                  type="radio"
                  name="collection"
                  checked={selectedCollection === collection.toLowerCase()}
                  onChange={() =>
                    updateFilters("collection", collection.toLowerCase())
                  }
                  className="h-4 w-4 border-gray-300"
                />
                <label
                  htmlFor={`collection-${collection.toLowerCase()}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {collection}
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
            className="text-sm text-gray-600 hover:text-black underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
