import React from 'react';
import { 
  ShoppingBag, 
  Layers, 
  Check, 
  Eye, 
  Truck, 
  ShieldCheck, 
  MessageSquare,
  Star,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onAskQuery: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleCompare,
  isCompared,
  onAskQuery,
}) => {
  const isLowStock = product.stockCount > 0 && product.stockCount <= product.minStockAlert;
  const isOutOfStock = product.stockCount === 0;

  return (
    <div className="group relative rounded-2xl bg-white border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all flex flex-col justify-between overflow-hidden">
      
      {/* Top Bar: Brand, Real-Time Stock indicator & Compare toggle */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          
          {/* Stock availability indicator with pulse */}
          <div>
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 border border-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                Only {product.stockCount} left in store!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                In Stock ({product.stockCount} units)
              </span>
            )}
          </div>

          {/* Compare toggle button */}
          <button
            onClick={() => onToggleCompare(product)}
            title={isCompared ? 'Remove from comparison' : 'Compare specifications'}
            className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 border transition-all cursor-pointer ${
              isCompared
                ? 'bg-black text-white border-black'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>

        </div>

        {/* Product Image Showcase with Clean Hover Zoom */}
        <div 
          onClick={() => onQuickView(product)}
          className="relative py-4 flex items-center justify-center min-h-[160px] sm:min-h-[190px] bg-zinc-50 rounded-xl cursor-pointer group-hover:bg-zinc-100/70 transition-colors"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-36 sm:max-h-44 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 rounded-lg"
          />

          {/* Discount Pill */}
          {product.discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-black bg-[#FEE500] text-black border border-black shadow-sm">
              -{product.discountPercent}% OFF
            </span>
          )}

          {/* Doorstep Badge */}
          {product.doorstepEligible && (
            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-emerald-700 border border-zinc-200 shadow-sm">
              <Truck className="w-3 h-3 text-emerald-600" />
              <span>45m Delivery</span>
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-3.5 space-y-2">
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-zinc-500 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 font-bold text-zinc-700">
              <Star className="w-3.5 h-3.5 fill-[#FEE500] text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-zinc-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-black text-black line-clamp-1 hover:underline cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Key Specs tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {product.specs?.ramStorage && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                {product.specs.ramStorage}
              </span>
            )}
            {product.specs?.processor && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                {product.specs.processor}
              </span>
            )}
            {product.specs?.display && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200 hidden sm:inline-block">
                {product.specs.display.split(',')[0]}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Section: Pricing & Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100 space-y-3">
        
        {/* Price Row */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-lg sm:text-xl font-black text-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-xs text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            Official Warranty
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-12 gap-2">
          
          <button
            onClick={() => onQuickView(product)}
            title="View Specifications & In-Store Availability"
            className="col-span-3 py-2.5 rounded-xl border border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs flex items-center justify-center transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onAskQuery(product)}
            title="Ask a Question About This Device"
            className="col-span-3 py-2.5 rounded-xl border border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs flex items-center justify-center transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`col-span-6 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
              isOutOfStock
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
                : 'bg-[#FEE500] hover:bg-[#ebd300] text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
