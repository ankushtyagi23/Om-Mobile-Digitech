import React from 'react';
import { Smartphone, ShieldCheck, Truck, Clock, MapPin, Phone, Mail, Award, Lock } from 'lucide-react';
import { OmShopLogo } from './OmShopLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenDoorstep: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenDoorstep,
  onSelectCategory,
}) => {
  return (
    <footer className="border-t-2 border-black bg-zinc-50 pt-12 pb-10 text-zinc-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-zinc-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-xs">
              <Truck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-black text-black text-sm">45-Min Doorstep Delivery</h4>
              <p className="text-zinc-600 mt-0.5 text-[11px] font-medium">
                Instant rider dispatch from our physical store counter directly to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-black text-black text-sm">100% Sealed &amp; Authorized</h4>
              <p className="text-zinc-600 mt-0.5 text-[11px] font-medium">
                Official brand warranty with genuine GST billing and sealed pack verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-xs">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-black text-black text-sm">Live In-Store Stock Sync</h4>
              <p className="text-zinc-600 mt-0.5 text-[11px] font-medium">
                Know exact shelf counts before visiting or ordering online.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center text-amber-800 shrink-0 shadow-xs">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-black text-black text-sm">Best Price Guarantee</h4>
              <p className="text-zinc-600 mt-0.5 text-[11px] font-medium">
                Competitive local retail rates with instant exchange bonus and festival discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Brand Info, Links, and Physical Store Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border-1.5 border-black flex items-center justify-center p-0.5 shadow-xs overflow-hidden shrink-0">
                <OmShopLogo className="w-full h-full" />
              </div>
              <div>
                <span className="font-black text-black text-base tracking-tight block">
                  Om Mobile &amp; Digitech
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Authorized Store Counter
                </span>
              </div>
            </div>
            <p className="text-zinc-600 font-medium leading-relaxed">
              Your premier local destination for high-end smartphones, genuine accessories, and rapid 45-minute doorstep fulfillment.
            </p>
            <div className="text-zinc-500 text-[11px]">
              Store Hours: 10:00 AM – 10:00 PM (Open 7 Days a Week)
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-black text-black uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <a href="#home" className="hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-black">
                  Products (Live Inventory)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-black">
                  In-Store Services (PAN, Xerox, Bills)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black">
                  About Om Mobile
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-black">
                  Store Location &amp; Directions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black">
                  Contact Store Helpdesk
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 space-y-3">
            <h4 className="font-black text-black uppercase tracking-wider text-xs">Visit Our Store Counter</h4>
            <div className="space-y-2 font-medium text-zinc-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=5QF8%2B7P+Umargam%2C+Gujarat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-black"
                >
                  5QF8+7P Umargam, Gujarat, India
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Phone className="w-4 h-4 text-black shrink-0" />
                <a href="tel:+919274305279" className="hover:underline hover:text-black font-bold">
                  +91 92743 05279
                </a>
                <span className="text-zinc-400">•</span>
                <a 
                  href="https://wa.me/918013040486?text=Hello%20Om%20Mobile%20Store%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-emerald-700 font-bold"
                >
                  WhatsApp: +91 80130 40486
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black shrink-0" />
                <a href="mailto:ommobiledigitech@gmail.com" className="hover:underline hover:text-black font-bold">
                  ommobiledigitech@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-zinc-500">
          <div>
            © {new Date().getFullYear()} Om Mobile &amp; Digitech. All rights reserved. Authorized Reseller.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDoorstep}
              className="hover:text-black font-bold cursor-pointer"
            >
              Doorstep Coverage
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-200 hover:bg-black hover:text-white text-zinc-900 font-black transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
