import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Check, 
  Filter, 
  RotateCcw,
  Tag
} from 'lucide-react';
import { FilterState } from '../types';
import { formatPrice } from '../utils/formatters';

interface SearchAndFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableBrands: string[];
  totalResults: number;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  filters,
  onFilterChange,
  availableBrands,
  totalResults,
}) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'audio', label: 'Earbuds & Audio' },
    { id: 'power-chargers', label: 'Fast Chargers' },
    { id: 'accessories', label: 'Accessories & Cases' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const clearSearch = () => {
    onFilterChange({ ...filters, searchQuery: '' });
  };

  const handleCategory = (catId: string) => {
    onFilterChange({ ...filters, category: catId });
  };

  const handleBrand = (brand: string) => {
    onFilterChange({ ...filters, brand: filters.brand === brand ? 'all' : brand });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = parseInt(e.target.value, 10);
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxVal] });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] });
  };

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      category: 'all',
      brand: 'all',
      priceRange: [1000, 160000],
      inStockOnly: false,
      expressDeliveryOnly: false,
      sortBy: 'featured',
    });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.category !== 'all' || 
    filters.brand !== 'all' || 
    filters.inStockOnly || 
    filters.expressDeliveryOnly || 
    filters.priceRange[1] < 160000;

  return (
    <div className="w-full space-y-4 my-6">
      
      {/* 1. Main Search Bar & Quick Controls */}
      <div className="bg-white border-2 border-black rounded-2xl p-2 sm:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-2 sm:gap-3">
        
        {/* Search Input Field */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="product-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={handleSearch}
            placeholder="Search phones, brands, accessories (e.g. iPhone 16, Samsung S25, 120W Charger)..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/70 focus:bg-white text-zinc-900 placeholder-zinc-400 text-sm font-medium border border-zinc-200 focus:border-black focus:outline-none transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <select
              id="product-sort-select"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 hover:bg-zinc-100 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock_desc">Highest In-Stock First</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {/* Toggle Filter Panel Button */}
          <button
            onClick={() => setShowFiltersModal(!showFiltersModal)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              showFiltersModal || hasActiveFilters
                ? 'bg-[#FEE500] border-black text-black shadow-sm'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-black" />
            )}
          </button>
        </div>

      </div>

      {/* 2. Brand Categorization Pills Row */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-black text-black uppercase tracking-wider text-[11px]">
            <Tag className="w-3.5 h-3.5 text-black" />
            <span>Filter &amp; Categorize by Brand:</span>
          </div>
          {filters.brand !== 'all' && (
            <button
              onClick={() => handleBrand('all')}
              className="text-[11px] font-black text-black hover:underline cursor-pointer flex items-center gap-1 bg-[#FEE500] px-2 py-0.5 rounded border border-black"
            >
              <span>Showing: <strong>{filters.brand}</strong></span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleBrand('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
              filters.brand === 'all'
                ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'
            }`}
          >
            All Brands ({totalResults})
          </button>

          {availableBrands.map((brand) => {
            const isSelected = filters.brand === brand;
            return (
              <button
                key={brand}
                id={`filter-brand-${brand.toLowerCase()}`}
                onClick={() => handleBrand(brand)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#FEE500] text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-[1.02]'
                    : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'
                }`}
              >
                <span>{brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Device Category Pills (Secondary filter) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white border-black'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Expandable Detailed Filter Drawer/Box (Simple & Direct) */}
      {showFiltersModal && (
        <div className="bg-zinc-50 border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-5 animate-in fade-in slide-in-from-top-2">
          
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-black" />
              <h4 className="text-sm font-black text-black uppercase tracking-wider">Refine Catalog Selection</h4>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
                Filter by Brand
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleBrand('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    filters.brand === 'all'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  All Brands
                </button>
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrand(brand)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      filters.brand === brand
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-zinc-700 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-black text-black px-2 py-0.5 rounded bg-zinc-200">
                  {formatPrice(filters.priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="160000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="w-full accent-black h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-bold">
                <span>₹1,000</span>
                <span>₹1,60,000+</span>
              </div>
            </div>

            {/* Quick Toggles: Stock & Doorstep */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
                Availability Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
                    className="w-4 h-4 rounded text-black accent-black focus:ring-0 cursor-pointer"
                  />
                  <span>Show In-Stock Items Only ({'>'}0 units)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.expressDeliveryOnly}
                    onChange={(e) => onFilterChange({ ...filters, expressDeliveryOnly: e.target.checked })}
                    className="w-4 h-4 rounded text-black accent-black focus:ring-0 cursor-pointer"
                  />
                  <span>45-Minute Express Doorstep Eligible</span>
                </label>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. Active Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-bold text-zinc-500 px-1">
        <span>
          Showing <strong className="text-black">{totalResults}</strong> products with real-time stock
        </span>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-black hover:underline font-black"
          >
            Clear all filters
          </button>
        )}
      </div>

    </div>
  );
};
