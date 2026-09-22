import React from 'react';
import { X, Layers, ShoppingBag, Trash2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onClear,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black font-black shadow-xs">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">
                Side-by-Side Device Comparison
              </h2>
              <p className="text-xs text-zinc-600 font-medium">
                Comparing {products.length} model{products.length > 1 ? 's' : ''} on price, real-time in-store stock &amp; technical specifications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-zinc-600 hover:text-rose-600 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black transition-all cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Content */}
        {products.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center mx-auto text-zinc-400">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-base font-black text-black">No devices selected for comparison</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto font-medium">
              Click the "Compare" button on any product card in the catalog to add devices side-by-side.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 font-bold text-xs cursor-pointer shadow-sm"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <table className="w-full border-collapse min-w-[650px] text-xs">
              <thead>
                <tr>
                  <th className="p-3 text-left font-black text-zinc-500 uppercase tracking-wider w-40 bg-zinc-50 border-b border-zinc-200">
                    Feature / Spec
                  </th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 text-center border-b border-zinc-200 bg-white">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-24 object-contain rounded-lg drop-shadow-sm"
                          />
                          <button
                            onClick={() => onRemove(product.id)}
                            className="absolute -top-2 -right-2 p-1 rounded-full bg-zinc-100 hover:bg-rose-100 text-zinc-600 hover:text-rose-600 border border-zinc-300 cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-[10px] uppercase font-bold text-zinc-500">{product.brand}</div>
                        <h4 className="font-black text-black text-xs line-clamp-1">{product.name}</h4>
                        <div className="text-sm font-black text-black">{formatPrice(product.price)}</div>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-1.5 rounded-lg bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-medium text-zinc-800">
                {/* Stock Availability */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Real-Time Stock</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-black ${
                        p.stockCount > 0 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {p.stockCount > 0 ? `In Stock (${p.stockCount} units)` : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Doorstep Delivery */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Doorstep Delivery</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-black">
                      {p.doorstepEligible ? '⚡ 45-Min Express Option' : 'Standard Delivery'}
                    </td>
                  ))}
                </tr>

                {/* Processor */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Processor</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold">
                      {p.specs.processor || '—'}
                    </td>
                  ))}
                </tr>

                {/* Display */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Display</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {p.specs.display || '—'}
                    </td>
                  ))}
                </tr>

                {/* Camera System */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Camera System</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {p.specs.camera || '—'}
                    </td>
                  ))}
                </tr>

                {/* Battery & Charging */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Battery &amp; Speed</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {p.specs.battery || '—'}
                    </td>
                  ))}
                </tr>

                {/* RAM / Storage */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Memory / RAM</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-black">
                      {p.specs.ramStorage || '—'}
                    </td>
                  ))}
                </tr>

                {/* Official Warranty */}
                <tr>
                  <td className="p-3 font-black text-zinc-700 bg-zinc-50">Warranty</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-center text-emerald-800 font-bold">
                      {p.specs.warranty || '1 Year Brand Warranty'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
