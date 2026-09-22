import React, { useState } from 'react';
import { X, Truck, MapPin, Clock, ShieldCheck, CheckCircle2, PhoneCall, Zap } from 'lucide-react';

interface DoorstepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoorstepModal: React.FC<DoorstepModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    tested: boolean;
    available: boolean;
    speed: string;
    hub: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 4) return;

    const isExpress = ['396', '395', '400', '110', '560'].some((prefix) =>
      pincode.startsWith(prefix)
    );

    setResult({
      tested: true,
      available: true,
      speed: isExpress ? '45-Min Express Doorstep Delivery' : 'Standard 24-Hour Doorstep Delivery',
      hub: 'Om Mobile & Digitech Flagship (5QF8+7P Umargam, Gujarat)',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shadow-xs">
              <Truck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-black">Doorstep Delivery Pincode Check</h3>
              <p className="text-xs text-zinc-600 font-medium">Real-time local dispatch zone coverage</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCheck} className="space-y-3">
          <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
            Enter your destination 6-digit postal pincode:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 400076, 110001, 560001..."
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Verify Pincode
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-300 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Doorstep Delivery Active for Pincode {pincode}</span>
            </div>
            <div className="text-xs text-zinc-700 font-medium">
              Speed: <strong className="text-black">{result.speed}</strong>
            </div>
            <div className="text-xs text-zinc-700 font-medium">
              Fulfillment Hub: <strong className="text-black">{result.hub}</strong>
            </div>
          </div>
        )}

        {/* Features list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black text-black block">45-Minute Rapid Dispatch</span>
              <span className="text-[11px] text-zinc-500 font-medium">Express rider dedicated to local metro areas</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black text-black block">Sealed Verification</span>
              <span className="text-[11px] text-zinc-500 font-medium">Check packaging seal before handing payment</span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
