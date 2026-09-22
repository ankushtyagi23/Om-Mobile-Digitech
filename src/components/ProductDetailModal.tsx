import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Check, 
  Star, 
  Cpu, 
  Maximize, 
  Battery, 
  Camera, 
  HardDrive,
  MessageSquare,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onBuyNow: (product: Product, selectedColor?: string) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onAskQuery: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleCompare,
  isCompared,
  onAskQuery,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(
    product.specs.colorOptions?.[0] || 'Default'
  );
  const [pincode, setPincode] = useState<string>('');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(false);
  const [deliveryEta, setDeliveryEta] = useState<string>('');

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeChecked(true);
      if (product.deliverySpeed.includes('2-Hour') || product.doorstepEligible) {
        setDeliveryEta('⚡ Eligible for Express 45-Min Doorstep Delivery by Om Mobile Rider! Order now to receive today.');
      } else {
        setDeliveryEta('🚚 Standard Doorstep Delivery available. Expected delivery tomorrow by 2:00 PM.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black transition-all z-10 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Product Image & Shelf Location */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl bg-zinc-50 border-2 border-black p-6 flex items-center justify-center min-h-[280px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-64 object-contain drop-shadow-lg z-10 rounded-xl"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-black bg-[#FEE500] text-black border border-black shadow-xs">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* In-Store Real-Time Shelf Location Card */}
            <div className="rounded-2xl bg-zinc-50 border border-zinc-300 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Live In-Store Shelf Location</span>
              </div>
              <div className="text-xs text-zinc-700">
                <span className="font-bold text-black">{product.storeAvailability.storeName}</span>
                <p className="text-zinc-600 mt-0.5">{product.storeAvailability.aisle}</p>
                <p className="text-zinc-600">{product.storeAvailability.shelfLocation}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-200">
                <span className="text-zinc-500 font-bold">Physical Shelf Count:</span>
                <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  {product.stockCount} Units Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right: Info, Specs, Delivery & Actions */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-black">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#FEE500]" />
                  <span className="text-black">{product.rating}</span>
                  <span className="text-zinc-500 font-normal">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-zinc-300">•</span>
                <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Genuine Sealed
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-300">
              <div className="text-2xl sm:text-3xl font-black text-black">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-sm text-zinc-400 line-through">
                  MRP {formatPrice(product.originalPrice)}
                </div>
              )}
              <span className="text-xs font-black text-black bg-[#FEE500] px-2 py-0.5 rounded border border-black">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Color selection if available */}
            {product.specs.colorOptions && product.specs.colorOptions.length > 0 && (
              <div>
                <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-2">
                  Color Finish: <span className="text-black font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.specs.colorOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        selectedColor === c
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Grid */}
            <div>
              <h4 className="text-xs font-black text-zinc-700 uppercase tracking-wider mb-2.5">
                Key Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.specs.display && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <Maximize className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Display</span>
                      <span className="text-black font-bold">{product.specs.display}</span>
                    </div>
                  </div>
                )}

                {product.specs.processor && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Processor</span>
                      <span className="text-black font-bold">{product.specs.processor}</span>
                    </div>
                  </div>
                )}

                {product.specs.camera && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <Camera className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Camera</span>
                      <span className="text-black font-bold">{product.specs.camera}</span>
                    </div>
                  </div>
                )}

                {product.specs.battery && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <Battery className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Battery &amp; Speed</span>
                      <span className="text-black font-bold">{product.specs.battery}</span>
                    </div>
                  </div>
                )}

                {product.specs.ramStorage && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <HardDrive className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Memory</span>
                      <span className="text-black font-bold">{product.specs.ramStorage}</span>
                    </div>
                  </div>
                )}

                {product.specs.warranty && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Warranty</span>
                      <span className="text-black font-bold">{product.specs.warranty}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pincode Doorstep Delivery Checker */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-black flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Check Doorstep Delivery to your Pincode
                </span>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Express 45-Min Option
                </span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 400076)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs text-black placeholder-zinc-400 focus:outline-none focus:border-black font-bold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </form>
              {pincodeChecked && (
                <p className="text-xs text-emerald-800 pt-1 font-bold animate-in fade-in">
                  {deliveryEta}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(product, selectedColor)}
                  className="py-3.5 rounded-full border-2 border-black bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onBuyNow(product, selectedColor)}
                  className="py-3.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Buy Now (Doorstep)</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => onToggleCompare(product)}
                  className="text-zinc-600 hover:text-black font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>{isCompared ? 'Remove from Compare List' : 'Compare with Other Devices'}</span>
                </button>

                <button
                  onClick={() => onAskQuery(product)}
                  className="text-zinc-600 hover:text-black font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Om Mobile Representative</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
