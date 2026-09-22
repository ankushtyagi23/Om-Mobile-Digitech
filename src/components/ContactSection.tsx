import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { CustomerQuery } from '../types';

interface ContactSectionProps {
  onSubmitQuery: (query: Omit<CustomerQuery, 'id' | 'timestamp' | 'status'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSubmitQuery }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [category, setCategory] = useState<CustomerQuery['category']>('stock_inquiry');
  const [subject, setSubject] = useState('Stock and Store Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerContact.trim() || !message.trim()) return;

    onSubmitQuery({
      customerName: customerName.trim(),
      customerContact: customerContact.trim(),
      category,
      subject: subject.trim(),
      message: message.trim(),
    });

    setSubmitted(true);
    setCustomerName('');
    setCustomerContact('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'Can I inspect the sealed box before paying at my doorstep?',
      a: 'Yes! Our express riders bring the sealed retail box to your doorstep so you can verify the factory seal and GST invoice before handing payment.',
    },
    {
      q: 'Do you offer on-the-spot data migration at the counter?',
      a: 'Absolutely. Our in-store technicians will transfer all your contacts, photos, WhatsApp chats, and apps from your old device for free.',
    },
    {
      q: 'How does old device exchange work?',
      a: 'Bring your old phone or tell our rider. We evaluate physical screen condition, battery, and provide an instant discount on your new smartphone.',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-zinc-50 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE500] border border-black text-xs font-black text-black uppercase tracking-wider shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Direct Store Helpdesk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase">
            Get In Touch With Om Mobile Store Staff
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-medium">
            Have a question about color variants in stock, live exchange rates, or doorstep dispatch? We're on standby 7 days a week.
          </p>
        </div>

        {/* Contact Channels & Direct Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info Cards & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Interactive Direct Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              
              {/* Phone Call Redirect */}
              <a
                href="tel:+919274305279"
                id="contact-call-link"
                className="group p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-between gap-3.5 cursor-pointer"
                title="Click to call Om Mobile store counter directly (+91 92743 05279)"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider block">Direct Counter Desk</span>
                    <span className="text-base font-black text-black group-hover:text-amber-600 transition-colors block truncate">+91 92743 05279</span>
                    <span className="text-xs text-zinc-500 font-medium block">10:00 AM to 10:00 PM • Tap to Call</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-black bg-[#FEE500] border-1.5 border-black px-3 py-1.5 rounded-xl shrink-0 group-hover:bg-black group-hover:text-[#FEE500] transition-colors shadow-xs">
                  <span>Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* WhatsApp Chat Redirect */}
              <a
                href="https://wa.me/918013040486?text=Hello%20Om%20Mobile%20Store%2C%20I%20have%20an%20inquiry%20regarding%20devices%20and%20services."
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-link"
                className="group p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-between gap-3.5 cursor-pointer"
                title="Click to chat with store staff on WhatsApp (+91 80130 40486)"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center text-emerald-800 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider block">WhatsApp Direct Inquiries</span>
                    <span className="text-base font-black text-black group-hover:text-emerald-700 transition-colors block truncate">+91 80130 40486</span>
                    <span className="text-xs text-zinc-500 font-medium block">Instant replies • Tap to Chat</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-950 bg-emerald-200 border-1.5 border-black px-3 py-1.5 rounded-xl shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                  <span>Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Email Client Redirect */}
              <a
                href="mailto:ommobiledigitech@gmail.com?subject=Store%20Inquiry%20-%20Om%20Mobile%20%26%20Digitech"
                id="contact-email-link"
                className="group p-4 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-between gap-3.5 cursor-pointer"
                title="Click to send an email to ommobiledigitech@gmail.com"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 border-2 border-black flex items-center justify-center text-cyan-800 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider block">Official Support Email</span>
                    <span className="text-sm font-black text-black group-hover:text-cyan-800 transition-colors block truncate">ommobiledigitech@gmail.com</span>
                    <span className="text-xs text-zinc-500 font-medium block">Inquiries &amp; Orders • Tap to Email</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-cyan-950 bg-cyan-200 border-1.5 border-black px-3 py-1.5 rounded-xl shrink-0 group-hover:bg-cyan-700 group-hover:text-white transition-colors shadow-xs">
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

            </div>

            {/* Quick Accordion / FAQ */}
            <div className="bg-white rounded-3xl border-2 border-black p-5 sm:p-6 space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 text-black font-black text-sm uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-black" />
                <span>Frequently Asked Store Questions</span>
              </div>
              <div className="space-y-3 pt-2">
                {faqs.map((f, idx) => (
                  <div key={idx} className="space-y-1 border-b border-zinc-100 pb-2.5 last:border-0 last:pb-0">
                    <h4 className="text-xs font-black text-black">{f.q}</h4>
                    <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            <div className="border-b border-zinc-200 pb-4">
              <h3 className="text-xl font-black text-black">Send a Message Directly to Store Counter</h3>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                Our on-duty store executive will receive this inquiry immediately and get back to you.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-black text-emerald-950">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-emerald-800 font-medium max-w-md mx-auto">
                  Thank you! Our store team will check shelf availability and contact your provided phone number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black text-black mb-1.5 uppercase tracking-wider text-[11px]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-200 text-black font-bold focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-black mb-1.5 uppercase tracking-wider text-[11px]">
                      Phone or WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-200 text-black font-bold focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black text-black mb-1.5 uppercase tracking-wider text-[11px]">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-200 text-black font-bold focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="stock_inquiry">Stock &amp; Color Availability</option>
                      <option value="doorstep_query">Doorstep Dispatch &amp; Delivery ETA</option>
                      <option value="digital_services">In-Store Services (PAN Card / Xerox / Bill Payment)</option>
                      <option value="price_match">Exchange Bonus &amp; Best Price</option>
                      <option value="warranty_repair">Official Brand Warranty &amp; Invoice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-black text-black mb-1.5 uppercase tracking-wider text-[11px]">
                      Subject / Device Model
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. iPhone 16 Pro 256GB Desert Titanium"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-200 text-black font-bold focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-black text-black mb-1.5 uppercase tracking-wider text-[11px]">
                    Your Question / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what product or service you need assistance with..."
                    className="w-full p-3.5 rounded-xl bg-zinc-50 border-2 border-zinc-200 text-black font-medium focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-zinc-500 font-medium">
                    Store hours: 10:00 AM – 10:00 PM • Fast response guaranteed
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Query to Store</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
