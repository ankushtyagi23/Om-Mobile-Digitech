import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Zap, 
  Star,
  Smartphone,
  Eye,
  Layers
} from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { formatPrice } from '../utils/formatters';
import { OmShopLogo } from './OmShopLogo';

interface HeroSectionProps {
  featuredProduct?: Product;
  products?: Product[];
  onExplore: () => void;
  onCompare: () => void;
  onQuickView: (product: Product) => void;
  onNavigateToServices?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products = INITIAL_PRODUCTS,
  onExplore,
  onCompare,
  onQuickView,
  onNavigateToServices,
}) => {
  // Select 5 diverse showcase items to suspend from the floating wire
  const wireCards = [
    {
      product: products.find((p) => p.id === 'om-phone-01') || products[0] || INITIAL_PRODUCTS[0],
      title: 'iPhone 16 Pro',
      caption: 'Desert Titanium • 48MP Pro',
      label: 'Flagship iOS',
      rotation: '-rotate-6 hover:rotate-0',
      mobileRotation: '-rotate-3',
      yOffset: 'translate-y-2 md:translate-y-4',
    },
    {
      product: products.find((p) => p.id === 'om-phone-02') || products[1] || INITIAL_PRODUCTS[1],
      title: 'Galaxy S24 Ultra',
      caption: 'Built-in S Pen • Galaxy AI',
      label: '200MP Optical',
      rotation: '-rotate-2 hover:rotate-0',
      mobileRotation: '-rotate-1',
      yOffset: 'translate-y-6 md:translate-y-10',
    },
    {
      product: products.find((p) => p.id === 'om-phone-03') || products[2] || INITIAL_PRODUCTS[2],
      title: 'OnePlus 12 5G',
      caption: 'Hasselblad 4th Gen • 100W',
      label: 'Best Performance',
      rotation: 'rotate-0 hover:-rotate-1',
      mobileRotation: 'rotate-0',
      yOffset: 'translate-y-8 md:translate-y-14',
    },
    {
      product: products.find((p) => p.id === 'om-phone-04') || products[3] || INITIAL_PRODUCTS[3],
      title: 'Pixel 9 Pro',
      caption: 'Super Actua • Gemini AI',
      label: 'Pure Android',
      rotation: 'rotate-2 hover:rotate-0',
      mobileRotation: 'rotate-1',
      yOffset: 'translate-y-6 md:translate-y-10',
    },
    {
      product: products.find((p) => p.id === 'om-audio-01') || products[4] || INITIAL_PRODUCTS[4],
      title: 'AirPods Pro 2',
      caption: 'Active Noise Cancelling • USB-C',
      label: 'Spatial Audio',
      rotation: 'rotate-6 hover:rotate-0',
      mobileRotation: 'rotate-3',
      yOffset: 'translate-y-2 md:translate-y-4',
    },
  ];

  const brandPartners = [
    { name: 'Apple', tag: 'Authorized Reseller' },
    { name: 'Samsung', tag: 'Flagship Partner' },
    { name: 'OnePlus', tag: 'Experience Store' },
    { name: 'Google Pixel', tag: 'Certified Desk' },
    { name: 'boAt', tag: 'Audio Partner' },
    { name: 'Anker', tag: 'GaN Fast Power' },
    { name: 'Sony', tag: 'Hi-Res Audio' },
  ];

  return (
    <section className="relative pt-10 sm:pt-14 pb-16 overflow-hidden bg-white text-zinc-900">
      
      {/* Background Ambient Radial Glow (Warm sunlight yellow matching uploaded reference style) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-b from-[#FEE500]/25 via-[#FEE500]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* 1. Official Store Emblem Pill Badge at the top */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-2 border-black text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-105">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-black shrink-0">
            <OmShopLogo className="w-full h-full" />
          </div>
          <span>Official Store Crest • 100% Genuine Sealed Tech • Direct Brand Warranty</span>
        </div>

        {/* 2. Bold Display Headline matching the reference typography with yellow accent highlight */}
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black uppercase leading-[1.05] sm:leading-[1]">
            OFFICIAL{' '}
            <span className="relative inline-block text-black bg-[#FEE500] px-3 sm:px-5 py-0.5 sm:py-1 rounded-2xl border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1 mx-1">
              PHONES
            </span>{' '}
            TO
            <br className="hidden sm:inline" />
            {' '}EXPERIENCE &amp; OWN
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-bold max-w-2xl mx-auto">
            With 45-Minute Express Doorstep Dispatch &amp; In-Store Live Demonstration
          </p>
        </div>

        {/* 3. Primary CTA Button (Prominent pill matching reference "Download App" button with yellow theme) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            id="hero-explore-cta-btn"
            onClick={onExplore}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-sm sm:text-base border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>Explore Store Catalog</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {onNavigateToServices && (
            <button
              id="hero-services-cta-btn"
              onClick={onNavigateToServices}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>In-Store Services (PAN, Print, Bills)</span>
            </button>
          )}

          <button
            id="hero-compare-cta-btn"
            onClick={onCompare}
            className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Compare Specifications</span>
          </button>
        </div>

      </div>

      {/* 4. The Floating Wire with Suspended Cards (Directly replicating the uploaded reference design!) */}
      <div className="relative mt-8 sm:mt-12 max-w-[1400px] mx-auto px-2 sm:px-4">
        
        {/* Floating Wire (SVG Curved Hanging Cable) */}
        <div className="relative w-full h-12 sm:h-16 pointer-events-none -mb-8 sm:-mb-10 z-20">
          <svg
            viewBox="0 0 1200 80"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Soft shadow of wire */}
            <path
              d="M -50,15 Q 600,75 1250,15"
              stroke="#000000"
              strokeWidth="5"
              strokeOpacity="0.08"
              strokeLinecap="round"
            />
            {/* Primary Solid Wire */}
            <path
              d="M -50,15 Q 600,75 1250,15"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Yellow Accent Strands on Wire */}
            <path
              d="M -50,15 Q 600,75 1250,15"
              stroke="#FEE500"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
          </svg>
        </div>

        {/* Suspended Cards Container along the curve */}
        <div className="relative z-10 pt-4 pb-8 overflow-x-auto scrollbar-none sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-5 gap-4 sm:gap-3 lg:gap-5 min-w-[780px] sm:min-w-0 px-4 sm:px-2 items-start justify-center">
            {wireCards.map((card, idx) => {
              const prod = card.product;
              return (
                <div
                  key={idx}
                  onClick={() => onQuickView(prod)}
                  className={`relative group cursor-pointer transition-all duration-300 ${card.yOffset} ${card.rotation}`}
                >
                  {/* Floating Yellow Hanging Clip (Connecting Card to Wire) */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                    {/* Upper Ring passing around wire */}
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-black bg-white shadow-xs -mb-1" />
                    {/* Hanging Clip Body in Yellow */}
                    <div className="w-5 h-6 rounded-md bg-[#FEE500] border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                  </div>

                  {/* Polaroid / Squircle Card Container */}
                  <div className="bg-white rounded-3xl border-2 border-black p-3 sm:p-3.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-all duration-300">
                    
                    {/* Product Image Frame */}
                    <div className="relative rounded-2xl bg-zinc-50 border border-zinc-200 overflow-hidden p-3 aspect-square flex items-center justify-center group-hover:bg-[#FEE500]/10 transition-colors">
                      
                      {/* Top Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black text-white">
                        {card.label}
                      </span>

                      {/* Stock Pill */}
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {prod.stockCount} left
                      </span>

                      <img
                        src={prod.image}
                        alt={card.title}
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Hover Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-opacity">
                        <span className="px-3 py-1.5 rounded-full bg-[#FEE500] text-black font-black text-xs border border-black shadow-sm flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Title & Information below image */}
                    <div className="pt-3 pb-1 space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {prod.brand}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-black truncate">
                        {card.title}
                      </h4>

                      <p className="text-[11px] text-zinc-500 font-medium truncate">
                        {card.caption}
                      </p>

                      <div className="pt-1 flex items-center justify-between border-t border-zinc-100">
                        <span className="text-xs font-black text-black">
                          {formatPrice(prod.price)}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          45-Min
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center -mt-2 mb-4">
          <span className="text-[11px] font-black text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            ← Swipe to explore devices on the wire →
          </span>
        </div>

      </div>

      {/* 5. Brand Logos Ribbon at Bottom (matching the logoipsum row in reference) */}
      <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
        <div className="text-center mb-4">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-zinc-400">
            Official Brand Authorization &amp; Direct Counter Stock
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-8">
          {brandPartners.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-800 hover:border-black hover:bg-white transition-all shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#FEE500] border border-black" />
              <span className="text-xs font-black text-black tracking-tight">{b.name}</span>
              <span className="text-[10px] text-zinc-500 font-medium hidden md:inline">• {b.tag}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
