"use client";

import { useMemo, useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";

// Database se aane wale data ki type
interface DBProduct {
  id: number;
  title: string;
  price: number;
  size: string;
  imageUrl: string;
}

const sizes = ["Single", "Standard", "Full", "Queen", "King Size"];
const priceRanges = [
  { label: "Under Rs. 2,000", min: 0, max: 2000 },
  { label: "Rs. 2,000 – Rs. 5,000", min: 2000, max: 5000 },
  { label: "Rs. 5,000 – Rs. 10,000", min: 5000, max: 10000 },
  { label: "Rs. 10,000+", min: 10000, max: Infinity },
];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function ShopPage() {
  // Database data ke liye state
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Jab page load ho, API se data le kar aao
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedPrice(null);
    setSortBy("Featured");
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(p.size);
      const priceRange = priceRanges.find((r) => r.label === selectedPrice);
      const priceMatch = !priceRange || (p.price >= priceRange.min && p.price < priceRange.max);
      return sizeMatch && priceMatch;
    });

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedSizes, selectedPrice, sortBy]);

  const activeFilterCount = selectedSizes.length + (selectedPrice ? 1 : 0);

  const FilterGroups = () => (
    <>
      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-navy-100">Size</h3>
        <ul className="mt-3 space-y-2.5">
          {sizes.map((size) => (
            <li key={size} className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
                className="h-4 w-4 rounded border-stone-300 text-accent-500 focus:ring-accent-300"
              />
              <label htmlFor={`size-${size}`} className="text-sm text-stone-600 dark:text-navy-400">
                {size}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-navy-100">Price Range</h3>
        <ul className="mt-3 space-y-2.5">
          {priceRanges.map((range) => (
            <li key={range.label} className="flex items-center gap-2.5">
              <input
                type="radio"
                name="price"
                id={`price-${range.label}`}
                checked={selectedPrice === range.label}
                onChange={() => setSelectedPrice(range.label)}
                className="h-4 w-4 border-stone-300 text-accent-500 focus:ring-accent-300"
              />
              <label htmlFor={`price-${range.label}`} className="text-sm text-stone-600 dark:text-navy-400">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-full border border-stone-300 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-navy-700 dark:text-navy-400"
      >
        Clear Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>
    </>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="mb-10">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Collection
        </span>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">Shop All Bedding</h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">{filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <FilterGroups />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 dark:border-navy-700 dark:text-navy-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-600 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 hidden justify-end lg:flex">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-600 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-navy-800 dark:bg-navy-900">
                  <div className="aspect-[4/5] w-full bg-stone-100 dark:bg-navy-800" />
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-3/4 rounded bg-stone-100 dark:bg-navy-800" />
                    <div className="h-3 w-1/2 rounded bg-stone-100 dark:bg-navy-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center dark:border-navy-700">
              <p className="text-sm font-medium text-stone-700 dark:text-navy-300">No products match your filters</p>
              <button onClick={clearFilters} className="mt-3 text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  size={product.size}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-xl dark:bg-navy-950">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-semibold text-stone-900 dark:text-navy-100">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 dark:text-navy-400 dark:hover:bg-navy-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-8">
              <FilterGroups />
            </div>
            <button onClick={() => setMobileFiltersOpen(false)} className="mt-6 w-full rounded-full bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-800 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}