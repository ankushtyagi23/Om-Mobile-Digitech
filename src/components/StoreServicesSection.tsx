import React, { useState } from 'react';
import { 
  CreditCard, 
  Printer, 
  Zap, 
  FileText, 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Droplets, 
  Flame, 
  Car, 
  Layers, 
  Copy, 
  FileCheck, 
  HelpCircle,
  Clock,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  Phone
} from 'lucide-react';
import { CustomerQuery } from '../types';

interface StoreServicesSectionProps {
  onRequestService?: (serviceName: string) => void;
  onSubmitQuery?: (query: Omit<CustomerQuery, 'id' | 'timestamp' | 'status'>) => void;
}

export const StoreServicesSection: React.FC<StoreServicesSectionProps> = ({ 
  onRequestService,
  onSubmitQuery 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pan' | 'print' | 'bills'>('all');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceCustomerName, setServiceCustomerName] = useState('');
  const [serviceCustomerPhone, setServiceCustomerPhone] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuickRequest = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    if (onRequestService) {
      onRequestService(serviceTitle);
    }
  };

  const handleSubmitServiceInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceCustomerName.trim() || !serviceCustomerPhone.trim()) return;

    if (onSubmitQuery) {
      onSubmitQuery({
        customerName: serviceCustomerName.trim(),
        customerContact: serviceCustomerPhone.trim(),
        category: 'digital_services',
        subject: `Service Desk: ${selectedService || 'General In-Store Service'}`,
        message: serviceNotes.trim() 
          ? `Service: ${selectedService}. Details: ${serviceNotes.trim()}`
          : `Customer requested assistance with ${selectedService} at Om Mobile & Digitech service counter.`,
      });
    }

    setSubmitted(true);
    setServiceNotes('');
    setTimeout(() => {
      setSubmitted(false);
      setSelectedService(null);
    }, 4000);
  };

  const serviceCategories = [
    {
      id: 'pan',
      title: 'PAN Card & Document Services',
      taglineHindi: 'पैन कार्ड एवं सरकारी दस्तावेज सेवा',
      badge: 'NSDL Authorized Counter',
      icon: CreditCard,
      accentColor: 'border-rose-500 bg-rose-50 text-rose-700',
      headerBg: 'bg-gradient-to-r from-rose-600 to-red-600 text-white',
      bannerTag: 'आयकर विभाग • GOVT. OF INDIA NSDL',
      features: [
        {
          titleHindi: 'नया पैन कार्ड बनवाएं',
          titleEng: 'New PAN Card Application',
          desc: 'Instant biometric & paperless e-KYC filing. Receive digital e-PAN within 2-4 hours, physical sealed card to your address.',
        },
        {
          titleHindi: 'पैन कार्ड में सुधार',
          titleEng: 'PAN Card Correction / Update',
          desc: 'Quick updates for Date of Birth, Father’s name, permanent address, or mobile number linking.',
        },
        {
          titleHindi: 'पैन कार्ड फ़ोटो / नाम सुधार',
          titleEng: 'Photo & Signature Update',
          desc: 'Update legacy or faded photograph, signature mismatch, and name spelling directly matched with Aadhaar.',
        },
        {
          titleHindi: 'NSDL पैन सर्विस',
          titleEng: 'Authorized NSDL & UTIITSL Services',
          desc: 'Lost card reissue, reprint, Aadhaar-PAN linking status verification, and physical plastic PVC card print.',
        },
      ],
    },
    {
      id: 'print',
      title: 'Xerox & Print Services',
      taglineHindi: 'जेरॉक्स, प्रिंट एवं लैमिनेशन सेवा',
      badge: 'High-Speed Laser Printing',
      icon: Printer,
      accentColor: 'border-orange-500 bg-orange-50 text-orange-700',
      headerBg: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white',
      bannerTag: 'सभी साइज के डॉक्यूमेंट • All Sizes Supported',
      features: [
        {
          titleHindi: 'जेरॉक्स',
          titleEng: 'High-Definition Xerox (B&W / Color)',
          desc: 'Crisp photocopying for ID proofs, legal papers, land records, marksheets, and bulk office copying.',
        },
        {
          titleHindi: 'प्रिंट आउट',
          titleEng: 'Digital Print Out (Color & Laser Mono)',
          desc: 'Direct WhatsApp/Email file printing, PDF tickets, boarding passes, exam admit cards, and color presentations.',
        },
        {
          titleHindi: 'स्कैनिंग',
          titleEng: 'High-Res Optical Scanning',
          desc: 'Ultra high-definition PDF & JPEG document scanning. Converted and sent straight to your WhatsApp or Email.',
        },
        {
          titleHindi: 'लेमिनेशन',
          titleEng: 'Thermal Waterproof Lamination',
          desc: 'Heavy-duty 250+ micron lamination for Aadhaar cards, PAN cards, marks cards, certificates, and vehicle RC.',
        },
      ],
    },
    {
      id: 'bills',
      title: 'Recharge & Bill Payment',
      taglineHindi: 'रिचार्ज एवं सभी प्रकार के बिल भुगतान',
      badge: 'Bharat Bill Payment (BBPS)',
      icon: Zap,
      accentColor: 'border-blue-500 bg-blue-50 text-blue-700',
      headerBg: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
      bannerTag: 'Instant Confirmation & Official Receipt',
      features: [
        {
          titleHindi: 'Mobile Recharge',
          titleEng: 'Prepaid & Postpaid Recharge',
          desc: 'All operators: Jio, Airtel, Vi, BSNL with best full-talktime and unlimited 5G data booster packs.',
          icon: Smartphone,
        },
        {
          titleHindi: 'DTH Recharge',
          titleEng: 'Direct-to-Home Satellite TV',
          desc: 'Instant channel activation for Tata Play, Airtel DTH, Dish TV, Sun Direct, and Videocon d2h.',
          icon: Tv,
        },
        {
          titleHindi: 'Electricity Bill',
          titleEng: 'Power & Electric Utility Bills',
          desc: 'Zero-fee immediate payment for State Electricity Boards, Adani, Tata Power, and Torrent with instant receipt.',
          icon: Zap,
        },
        {
          titleHindi: 'Water Bill',
          titleEng: 'Municipal & Water Board Bills',
          desc: 'Municipal corporation water connection dues cleared with official government transaction acknowledgement.',
          icon: Droplets,
        },
        {
          titleHindi: 'Gas Bill',
          titleEng: 'Piped Natural Gas & Cylinder',
          desc: 'Piped PNG monthly invoices (MGL, IGL, Adani Gas) and HP/Indane/Bharat Gas cylinder booking.',
          icon: Flame,
        },
        {
          titleHindi: 'FASTag Recharge',
          titleEng: 'National Tollway FASTag',
          desc: 'Fast balance top-up for all bank NETC FASTags before your highway road trip with immediate SMS activation.',
          icon: Car,
        },
      ],
    },
  ];

  const displayedCategories = activeTab === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(c => c.id === activeTab);

  return (
    <section id="services" className="py-10 sm:py-12 bg-zinc-100 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEE500] border border-black text-[11px] font-black text-black uppercase tracking-wider shadow-xs">
              <Layers className="w-3 h-3 stroke-[2.5]" />
              <span>In-Store Digital &amp; Citizen Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase">
              All-in-One Store Services Counter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Authorized community desk for PAN card applications, high-speed laser Xerox/print, and instant utility bill payments.
            </p>
          </div>

          {/* Tab Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-black text-[#FEE500]' 
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('pan')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                activeTab === 'pan' 
                  ? 'bg-black text-[#FEE500]' 
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              PAN Services
            </button>
            <button
              onClick={() => setActiveTab('print')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                activeTab === 'print' 
                  ? 'bg-black text-[#FEE500]' 
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Xerox &amp; Print
            </button>
            <button
              onClick={() => setActiveTab('bills')}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all cursor-pointer ${
                activeTab === 'bills' 
                  ? 'bg-black text-[#FEE500]' 
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Recharge &amp; Bills
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayedCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id}
                className="flex flex-col justify-between rounded-2xl bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
              >
                {/* Header Banner */}
                <div className={`p-4 ${cat.headerBg} border-b-2 border-black space-y-1`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[9px] font-black uppercase tracking-wider">
                      {cat.badge}
                    </span>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                    {cat.title}
                  </h3>
                  <div className="text-[11px] font-bold text-white/90">
                    {cat.taglineHindi}
                  </div>
                  <div className="pt-0.5 text-[10px] font-black uppercase tracking-wider text-white/75">
                    {cat.bannerTag}
                  </div>
                </div>

                {/* Features List */}
                <div className="p-4 space-y-2.5 flex-1">
                  {cat.features.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-0.5 hover:border-black transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <h4 className="text-xs font-black text-black">
                            {feat.titleHindi}
                          </h4>
                        </div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider text-right truncate">
                          {feat.titleEng}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 font-medium pl-5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="p-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                    <Clock className="w-3 h-3 text-black shrink-0" />
                    <span>In-Store Service</span>
                  </div>

                  <button
                    onClick={() => handleQuickRequest(cat.title)}
                    className="px-3 py-1.5 rounded-lg bg-black text-[#FEE500] hover:bg-zinc-800 font-black text-[11px] border border-black shadow-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Request Token</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive In-Store Service Desk Bar (Compact) */}
        <div className="bg-zinc-900 rounded-2xl border-2 border-black p-5 sm:p-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEE500] text-black text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Visit Counter or WhatsApp Documents</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Urgent PAN card, high-speed Xerox, or utility bills?
              </h3>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                Bring originals or WhatsApp your PDFs. Instant token generation with zero waiting queues.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-bold text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Immediate processing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official BBPS Receipt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open 7 Days 10 AM - 10 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-zinc-800 border border-zinc-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                <h4 className="text-xs font-black text-[#FEE500] uppercase tracking-wider">
                  {selectedService ? `Book Service: ${selectedService}` : 'In-Store Service Token Booking'}
                </h4>
                {selectedService && (
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Change
                  </button>
                )}
              </div>

              {submitted ? (
                <div className="py-4 text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs font-black text-white">Token Generated &amp; Sent!</h5>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    Our counter staff is ready to assist you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitServiceInquiry} className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceCustomerName}
                        onChange={(e) => setServiceCustomerName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-bold focus:outline-none focus:border-[#FEE500]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-300 mb-1">
                        Contact / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={serviceCustomerPhone}
                        onChange={(e) => setServiceCustomerPhone(e.target.value)}
                        placeholder="e.g. +91 92743 05279"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-bold focus:outline-none focus:border-[#FEE500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-300 mb-1">
                      Service Requirement
                    </label>
                    <input
                      type="text"
                      value={selectedService || 'New PAN Card / Urgent Color Xerox / Electricity Bill'}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-bold focus:outline-none focus:border-[#FEE500]"
                    />
                  </div>

                  <div className="pt-0.5 flex items-center justify-between gap-3">
                    <div className="text-[10px] text-zinc-400 font-medium">
                      Store assistance guaranteed
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      <span>Confirm Request</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
