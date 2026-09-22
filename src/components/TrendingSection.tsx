import React from 'react';
import { ArrowRight, Flame, ShoppingBag, Eye, Zap, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface TrendingSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSeeAll: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onSeeAll,
}) => {
  // Take first 4 trending products for the 2x2 grid
  const trendingItems = products.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-zinc-50/70 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: 2x2 Grid with high contrast cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {trendingItems.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-2xl p-4 sm:p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {product.stockCount} in stock
                    </span>

                    <span className="text-[10px] font-black text-black uppercase tracking-wider bg-[#FEE500] px-2 py-0.5 rounded border border-black shadow-xs">
                      -{product.discountPercent}%
                    </span>
                  </div>

                  {/* Image */}
                  <div 
                    onClick={() => onQuickView(product)}
                    className="relative py-3 flex items-center justify-center min-h-[140px] cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-32 sm:max-h-36 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  </div>

                  {/* Info and Actions */}
                  <div className="space-y-1.5 z-10 pt-2 border-t border-zinc-100">
                    <div className="text-[11px] text-zinc-500 font-bold uppercase">{product.brand}</div>
                    <h4 
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-black text-black line-clamp-1 hover:underline cursor-pointer"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs sm:text-sm font-black text-black block">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-zinc-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onQuickView(product)}
                          title="View Specifications"
                          className="p-2 rounded-xl border border-zinc-300 hover:border-black bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          title="Add to Cart"
                          className="p-2 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Typography directly inspired by reference image */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEE500] border border-black text-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>Om Mobile Weekly Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-[1.05]">
              Hot Trending <br />
              <span className="bg-[#00F0FF] px-2 py-0.5 inline-block text-black">This Week.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed">
              Explore the latest mobile devices and accessories at authorized store rates. 
              Enjoy 100% verified real-time shelf stock, full manufacturer warranty, 
              and lightning-fast 45-minute doorstep delivery directly to your home or office.
            </p>

            {/* Quick Feature Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-black">Express Doorstep Option</h4>
                  <p className="text-[11px] text-zinc-500">Rider dispatched right after online order confirmation</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-black">100% Sealed &amp; Authorized</h4>
                  <p className="text-[11px] text-zinc-500">Genuine GST invoice &amp; brand warranty card included</p>
                </div>
              </div>
            </div>

            {/* Explore All Button */}
            <div className="pt-2">
              <button
                onClick={onSeeAll}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:bg-zinc-800 font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
