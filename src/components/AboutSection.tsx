import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Store, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { OmShopLogo } from './OmShopLogo';

interface AboutSectionProps {
  onExploreCatalog: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreCatalog,
  onContactClick,
}) => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: '100% Genuine & Sealed',
      description: 'Official manufacturer warranty, genuine GST retail invoices, and verified brand packaging.',
    },
    {
      icon: Clock,
      title: '45-Minute Doorstep Dispatch',
      description: 'Our dedicated store delivery partners bring new devices straight to your door with seal inspection.',
    },
    {
      icon: HeartHandshake,
      title: 'Expert In-Store Setup',
      description: 'Free comprehensive data transfer, screen protector application, and device configuration.',
    },
    {
      icon: Award,
      title: 'Fair Exchange Valuation',
      description: 'Upgrade your old smartphone with transparent on-the-spot physical evaluation and instant discount.',
    },
  ];

  const milestones = [
    { number: '12+', label: 'Years of Trust' },
    { number: '50K+', label: 'Devices Delivered' },
    { number: '4.9★', label: 'Store Customer Rating' },
    { number: '100%', label: 'Sealed Authorized Stock' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-zinc-50 border-t-2 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE500] border border-black text-xs font-black text-black uppercase tracking-wider shadow-xs">
            <Store className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>About Om Mobile &amp; Digitech</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase">
            Your Trusted Local Destination For Genuine Tech
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed">
            Founded with a commitment to authenticity and customer-first service, Om Mobile &amp; Digitech bridges the gap between reliable brick-and-mortar hospitality and ultra-fast doorstep convenience.
          </p>
        </div>

        {/* Story & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Store Crest Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pb-4 border-b border-zinc-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-1.5 border-black p-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0">
                <OmShopLogo className="w-full h-full" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block">
                  Official Store Crest &amp; Emblem
                </span>
                <h3 className="text-lg sm:text-xl font-black text-black">
                  Om Mobile &amp; Digitech
                </h3>
                <p className="text-xs text-zinc-600 font-semibold mt-0.5">
                  Authorized Retail Showroom • Serving Gadget Lovers Since 2012
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-black text-black">
                Personalized Care, Direct Brand Partnerships, Zero Compromises
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                At Om Mobile &amp; Digitech, we believe purchasing a smartphone or flagship audio gear should be transparent and reassuring. Unlike generic online marketplaces where open-box units and delayed shipments can happen, every device on our counter is sourced directly from authorized brand distributors.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                Whether you walk into our physical showroom to try out flagship cameras on live display tables, or request a 45-minute doorstep express dispatch to your home or office, you receive full peace of mind with original warranty support.
              </p>
            </div>

            {/* Milestones bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-200">
              {milestones.map((m, idx) => (
                <div key={idx} className="text-center p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <div className="text-2xl font-black text-black tracking-tight">{m.number}</div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Browse Live Store Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs border border-black shadow-xs cursor-pointer transition-all active:scale-95"
              >
                Talk to Store Team
              </button>
            </div>
          </div>

          {/* 4 Pillars Card List */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-black p-5 space-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shadow-xs shrink-0">
                      <IconComp className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-sm font-black text-black">{item.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed pl-13">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
