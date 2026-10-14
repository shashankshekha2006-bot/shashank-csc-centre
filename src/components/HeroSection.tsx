import React from 'react';
import {
  Search,
  Phone,
  MessageCircle,
  ExternalLink,
  MapPin,
  CheckCircle2,
  FileText,
  Sprout,
  CreditCard,
  Building2,
  Landmark,
  ArrowRight,
  ShieldAlert,
  Bell
} from 'lucide-react';
import { Language, Notice } from '../types/index.ts';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (view: string, categoryKey?: string) => void;
  language: Language;
  latestNotices: Notice[];
  totalPortalsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onNavigate,
  language,
  latestNotices,
  totalPortalsCount,
}) => {
  const isHi = language === 'hi';

  const quickCategories = [
    { name: isHi ? 'कृषि एवं किसान' : 'Agriculture', key: 'agriculture', icon: Sprout, count: '17 पोर्टल' },
    { name: isHi ? 'RTPS प्रमाणपत्र' : 'RTPS Certificates', key: 'rtps_certificates', icon: FileText, count: '7 पोर्टल' },
    { name: isHi ? 'आधार एवं पैन' : 'Aadhaar & PAN', key: 'aadhaar', icon: CreditCard, count: '14 पोर्टल' },
    { name: isHi ? 'बिहार सरकार' : 'Bihar Govt', key: 'bihar_gov', icon: Building2, count: '18 पोर्टल' },
    { name: isHi ? 'सरकारी योजनाएँ' : 'Govt Schemes', key: 'schemes', icon: Landmark, count: '8 प्रमुख योजना' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#123B7A] to-[#0d2b59] text-white pt-8 pb-14 px-4 sm:px-6">
      {/* Subtle background ornamentation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F28C28_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Urgent Notice Alert Ticker */}
      {latestNotices.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-amber-500/15 border border-amber-400/40 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F28C28] text-white shrink-0">
                <Bell className="w-4 h-4 animate-bounce" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4C542] mr-2">
                  {isHi ? 'ताज़ा सूचना:' : 'Latest Notice:'}
                </span>
                <span className="text-sm font-medium text-slate-100">
                  {isHi ? latestNotices[0].titleHi : latestNotices[0].titleEn}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('portals')}
              className="text-xs font-semibold text-[#F4C542] hover:text-white flex items-center gap-1 transition-colors self-end sm:self-center shrink-0 cursor-pointer"
            >
              <span>{isHi ? 'पोर्टल देखें' : 'View Portals'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Search Bar, Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-amber-300">
              <span className="w-2 h-2 rounded-full bg-[#168447]"></span>
              <span>{isHi ? 'बिहार एवं केंद्र सरकार के 150 आधिकारिक पोर्टल' : 'Directory of 150 Official Govt Portals'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.2]">
              {isHi ? 'आपकी सेवा, हमारा संकल्प।' : 'Your Service, Our Commitment.'}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#F4C542] leading-snug">
              {isHi 
                ? 'आपके अपने क्षेत्र में डिजिटल एवं सरकारी सेवाओं के लिए सहायता केंद्र।' 
                : 'Citizen Assistance Centre for Digital & Government Services in Your Area.'}
            </p>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {isHi
                ? 'बिहार सरकार और भारत सरकार के महत्वपूर्ण आधिकारिक पोर्टल एक ही स्थान पर खोजें। सेवाओं की जानकारी प्राप्त करें और संबंधित आधिकारिक वेबसाइट पर सीधे जाएँ।'
                : 'Find key official portals of the Government of Bihar and Government of India in one place. Access service information and navigate directly to official websites.'}
            </p>

            {/* Main Government Services Search Bar */}
            <div className="pt-2">
              <div className="relative max-w-2xl mx-auto lg:mx-0 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md p-1.5 border-2 border-[#F28C28]/60 focus-within:border-[#F28C28] transition-all">
                <div className="flex items-center">
                  <div className="pl-3.5 text-slate-400">
                    <Search className="w-6 h-6 text-[#123B7A]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (e.target.value.trim().length > 0) {
                        onNavigate('portals');
                      }
                    }}
                    placeholder={isHi 
                      ? "किसी सरकारी सेवा या पोर्टल का नाम खोजें... (उदा: आधार, राशन, दाखिल खारिज, किसान)" 
                      : "Search by service or portal name... (e.g. Aadhaar, Ration, Mutation, PM Kisan)"}
                    className="w-full px-3 py-3.5 text-[#0B1F3A] placeholder-slate-500 font-medium text-sm sm:text-base bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="px-2 text-slate-400 hover:text-slate-600 text-sm font-semibold"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('portals')}
                    className="shrink-0 px-5 sm:px-6 py-3 bg-[#F28C28] hover:bg-[#d9771d] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isHi ? 'खोजें' : 'Search'}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-2.5 text-xs text-slate-300">
                <span className="text-[#F4C542] font-semibold">{isHi ? 'लोकप्रिय खोज:' : 'Popular:'}</span>
                <button onClick={() => { onSearchChange('किसान'); onNavigate('portals'); }} className="hover:text-white underline decoration-white/30 cursor-pointer">किसान सम्मान निधि</button>
                <span>•</span>
                <button onClick={() => { onSearchChange('दाखिल खारिज'); onNavigate('portals'); }} className="hover:text-white underline decoration-white/30 cursor-pointer">दाखिल-खारिज</button>
                <span>•</span>
                <button onClick={() => { onSearchChange('जाति'); onNavigate('portals'); }} className="hover:text-white underline decoration-white/30 cursor-pointer">जाति/आय/निवास</button>
                <span>•</span>
                <button onClick={() => { onSearchChange('राशन'); onNavigate('portals'); }} className="hover:text-white underline decoration-white/30 cursor-pointer">राशन कार्ड</button>
                <span>•</span>
                <button onClick={() => { onSearchChange('बिजली'); onNavigate('portals'); }} className="hover:text-white underline decoration-white/30 cursor-pointer">बिजली बिल</button>
              </div>
            </div>

            {/* 4 Primary Action Buttons per prompt specifications */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
              <button
                onClick={() => onNavigate('portals')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F28C28] hover:bg-[#d9771d] text-white font-bold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>1. {isHi ? 'सभी सरकारी पोर्टल देखें' : 'View All Portals'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('schemes')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>2. {isHi ? 'हमारी सेवाएँ देखें' : 'View Our Services'}</span>
              </button>

              <a
                href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre%2C%20%E0%A4%AE%E0%A5%81%E0%A4%97%E0%A5%87%20%E0%A4%B8%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%AC%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-green-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>3. {isHi ? 'WhatsApp पर संपर्क करें' : 'Contact on WhatsApp'}</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#168447] hover:bg-green-700 text-white font-bold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>4. {isHi ? 'संपर्क करें' : 'Contact Us'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Shashank Shekhar Photograph & Centre Verified Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#F28C28] via-[#F4C542] to-[#168447] opacity-60 blur-sm"></div>

              {/* Verified Centre Badge Card */}
              <div className="relative rounded-2xl bg-[#071527] border-2 border-white/20 p-5 shadow-2xl text-center space-y-4">
                
                {/* Real Photograph of Shashank Shekhar */}
                <div className="relative mx-auto w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-white/90 shadow-xl bg-slate-800">
                  <img
                    src="/src/assets/images/shashank_portrait_1791972912015.jpg"
                    alt="Shashank Shekhar - Shashank CSC Centre"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent py-1.5 text-[11px] font-semibold text-emerald-300 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>सत्यापित संचालक (Operator)</span>
                  </div>
                </div>

                {/* Owner Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    शशांक शेखर (Shashank Shekhar)
                  </h2>
                  <p className="text-sm font-semibold text-[#F28C28] mt-0.5">
                    संचालक, शशांक सीएससी केंद्र
                  </p>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Shashank CSC Centre
                  </p>
                </div>

                {/* Address details */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs text-slate-200 text-left space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#F4C542] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        {isHi ? 'ग्राम हरिपुर झरका, कझा चौक, वार्ड नं. 14' : 'Village Haripur Jharka, Kajhi Chowk, Ward 14'}
                      </p>
                      <p className="text-slate-300">
                        {isHi ? 'जिला सुपौल, बिहार, भारत' : 'District Supaul, Bihar, India'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">सेवा सहयोगी:</span>
                    <span className="font-bold text-[#F4C542]">Digital Naari</span>
                  </div>
                </div>

                {/* Direct Connect Buttons inside card */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:+919241262642"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-green-400" />
                    <span>92412 62642</span>
                  </a>
                  <a
                    href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-green-500 text-slate-950 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Independent Disclaimer */}
                <p className="text-[10px] text-slate-400 italic">
                  {isHi 
                    ? '* स्वतंत्र नागरिक सेवा सहायता केंद्र। आधिकारिक जानकारी पोर्टल से सत्यापित करें।' 
                    : '* Independent digital service assistance centre. Verify with official portals.'}
                </p>

              </div>
            </div>
          </div>

        </div>

        {/* Quick Highlights / Department Counters */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickCategories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => onNavigate(c.key === 'schemes' ? 'schemes' : 'portals', c.key)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-[#123B7A] text-[#F4C542] group-hover:bg-[#F28C28] group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {c.name}
                  </h4>
                  <span className="text-xs text-slate-300 font-medium">{c.count}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
