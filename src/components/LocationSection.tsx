import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  Car, 
  Train,
  ShieldCheck
} from 'lucide-react';
import { OmShopLogo } from './OmShopLogo';

interface LocationSectionProps {
  onOpenDoorstepModal: () => void;
  onCallStore: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenDoorstepModal,
  onCallStore,
}) => {
  return (
    <section id="location" className="py-16 sm:py-20 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF] border border-black text-xs font-black text-black uppercase tracking-wider shadow-xs">
              <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Flagship Store Counter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase">
              Visit Our Physical Store &amp; Experience Zone
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-medium">
              Prefer testing flagships before buying? Drop by our retail counter for hands-on experience, instant exchange valuation, and free data migration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-800 text-xs font-black shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>OPEN NOW • 10:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Store Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Details Card */}
          <div className="lg:col-span-6 bg-zinc-50 rounded-3xl border-2 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Primary Address */}
            <div className="space-y-3 pb-6 border-b border-zinc-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border-1.5 border-black flex items-center justify-center p-0.5 text-black shrink-0 shadow-xs overflow-hidden">
                  <OmShopLogo className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-black text-black">Om Mobile &amp; Digitech Flagship</h3>
                  <p className="text-xs sm:text-sm text-zinc-700 font-bold mt-1">
                    5QF8+7P Umargam, Gujarat
                  </p>
                  <p className="text-xs text-zinc-500 font-medium">
                    Plus Code: 5QF8+7P • Umargam 396170, Gujarat, India
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-zinc-600 font-semibold bg-zinc-200 px-2.5 py-1 rounded-lg">
                    <span>Google Plus Code:</span>
                    <strong className="text-black font-black">5QF8+7P Umargam</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-zinc-200 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-black" />
                  <span>Store Hours</span>
                </div>
                <div className="font-black text-black text-sm">10:00 AM – 10:00 PM</div>
                <div className="text-zinc-600 font-medium">Open All 7 Days (365 Days)</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-black" />
                  <span>Store Direct Hotline</span>
                </div>
                <a href="tel:+919274305279" className="font-black text-black text-sm hover:underline hover:text-amber-600 block">
                  +91 92743 05279
                </a>
                <a 
                  href="https://wa.me/918013040486?text=Hello%20Om%20Mobile%20Store%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 font-medium hover:text-emerald-700 hover:underline block"
                >
                  WhatsApp: +91 80130 40486
                </a>
              </div>
            </div>

            {/* In-Store Counter Perks */}
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-black text-zinc-400 block">
                Free Walk-In Counter Services
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-zinc-800">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Tempered Glass Fitting</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant 1-Click Phone Clone</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live Flagship Demo Tables</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Old Device Trade-In Spot Cash</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=5QF8%2B7P+Umargam%2C+Gujarat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs border border-black shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#FEE500]" />
                <span>Open in Google Maps (5QF8+7P)</span>
              </a>

              <button
                onClick={onOpenDoorstepModal}
                className="px-5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Truck className="w-4 h-4" />
                <span>Check 45-Min Doorstep Dispatch</span>
              </button>
            </div>

          </div>

          {/* Right Visual Map Card & Transit Info */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-zinc-900 rounded-3xl border-2 border-black p-6 sm:p-8 text-white space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            
            {/* Top Bar inside Map */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono font-bold text-zinc-400 ml-2">STORE_RADAR_NAV</span>
              </div>
              <span className="text-xs font-black bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">
                Umargam Hub, Gujarat
              </span>
            </div>

            {/* Stylized Interactive Map Schematic */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-zinc-950 border border-white/15 p-4 flex flex-col justify-between overflow-hidden">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Roads / Paths */}
              <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-zinc-800/80 border-y-2 border-zinc-700/80 flex items-center justify-center">
                <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                  UMARGAM MAIN ROAD • 5QF8+7P
                </span>
              </div>

              {/* Station Marker */}
              <div className="relative z-10 flex items-center gap-2 self-start bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-1.5 shadow-md">
                <Train className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-zinc-200">Umbergaon Town / Station Area</span>
              </div>

              {/* Central Store Pin */}
              <div className="relative z-10 self-center flex flex-col items-center animate-bounce">
                <div className="px-3 py-1.5 rounded-xl bg-[#FEE500] text-black border-2 border-black font-black text-xs shadow-lg flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 fill-black" />
                  <span>OM MOBILE &amp; DIGITECH</span>
                </div>
                <div className="w-2.5 h-2.5 bg-[#FEE500] rotate-45 -mt-1 border-r border-b border-black" />
              </div>

              {/* Parking Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-1.5">
                  <Car className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-zinc-200">Customer Parking &amp; Service Desk</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  CODE: 5QF8+7P Umargam
                </div>
              </div>
            </div>

            {/* Quick How to Reach */}
            <div className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-[#FEE500] flex items-center gap-1.5 mb-1">
                  <Train className="w-3.5 h-3.5" />
                  <span>By Train / Transit</span>
                </div>
                <p className="text-zinc-400 font-medium text-[11px]">
                  Close to Umargam Road Railway Station. Quick auto/rickshaw ride or short walk to 5QF8+7P.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-[#FEE500] flex items-center gap-1.5 mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span>By Road / Bike</span>
                </div>
                <p className="text-zinc-400 font-medium text-[11px]">
                  Search Google Maps Plus Code: <strong>5QF8+7P Umargam</strong> with easy parking right at store.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
