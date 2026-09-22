import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Smartphone } from 'lucide-react';
import { Product, CustomerQuery } from '../types';

interface AskQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmitQuery: (query: Omit<CustomerQuery, 'id' | 'timestamp' | 'status'>) => void;
}

export const AskQueryModal: React.FC<AskQueryModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitQuery,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [category, setCategory] = useState<CustomerQuery['category']>('stock_inquiry');
  const [subject, setSubject] = useState(
    product ? `Inquire about stock for ${product.name}` : 'General store & stock inquiry'
  );
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || (!customerEmail.trim() && !customerPhone.trim()) || !message.trim()) return;

    onSubmitQuery({
      customerName,
      customerContact: customerPhone || customerEmail || 'N/A',
      productId: product?.id,
      productName: product?.name,
      subject,
      message,
      category,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-black p-6 sm:p-8 space-y-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shadow-xs">
              <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-black">Ask Om Mobile Store Representative</h3>
              <p className="text-[11px] text-zinc-500 font-medium">Fast real-time response from on-duty store staff</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-500">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-black">Inquiry Logged!</h4>
            <p className="text-xs text-zinc-600 font-medium">
              A store executive from Om Mobile &amp; Digitech will respond directly to your WhatsApp / Phone shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {product && (
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">{product.brand}</span>
                  <span className="font-black text-black truncate block">{product.name}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Inquiry Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
              >
                <option value="stock_inquiry">Stock &amp; Color Availability</option>
                <option value="doorstep_query">Doorstep Dispatch &amp; Delivery ETA</option>
                <option value="price_match">Best Price &amp; Exchange Offers</option>
                <option value="warranty_repair">Official Brand Warranty &amp; Invoice</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Your Message *</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about storage variants, color availability in-store, or delivery timing..."
                className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-300 font-medium text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                Send Question
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
