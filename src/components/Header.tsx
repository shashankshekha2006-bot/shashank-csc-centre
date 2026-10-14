import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Shield,
  Globe,
  Home,
  FileText,
  Landmark,
  Sprout,
  Milk,
  CreditCard,
  UserCheck,
  Building,
  Info,
  MapPin,
  ExternalLink,
  Lock,
  Smartphone
} from 'lucide-react';
import { Language } from '../types/index.ts';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, categoryKey?: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, categoryKey?: string) => {
    onNavigate(view, categoryKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home', icon: Home },
    { id: 'portals', labelHi: 'सभी 150 पोर्टल', labelEn: 'All 150 Portals', icon: Globe },
    { id: 'agriculture', labelHi: 'कृषि सेवाएँ', labelEn: 'Agriculture', icon: Sprout, categoryKey: 'agriculture' },
    { id: 'aadhaar_pan', labelHi: 'आधार व पैन', labelEn: 'Aadhaar & PAN', icon: CreditCard, categoryKey: 'aadhaar' },
    { id: 'rtps_land', labelHi: 'RTPS व भूमि', labelEn: 'RTPS & Land', icon: FileText, categoryKey: 'rtps_certificates' },
    { id: 'schemes', labelHi: 'सरकारी योजनाएँ', labelEn: 'Govt Schemes', icon: Landmark },
    { id: 'track', labelHi: 'स्थिति व SMS ट्रैकर', labelEn: 'Track Status & SMS', icon: Smartphone },
    { id: 'digital_naari', labelHi: 'Digital Naari', labelEn: 'Digital Naari', icon: UserCheck },
    { id: 'about', labelHi: 'हमारे बारे में', labelEn: 'About Us', icon: Info },
    { id: 'contact', labelHi: 'संपर्क करें', labelEn: 'Contact Us', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1F3A] text-white shadow-lg border-b border-[#123B7A]/60">
      {/* Top micro-bar for quick contact and official disclaimers */}
      <div className="bg-[#071527] py-1.5 px-4 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-[#168447] animate-pulse"></span>
            <span className="font-medium">
              {language === 'hi' 
                ? 'शशांक सीएससी केंद्र • ग्राम हरिपुर झरका, कझा चौक, सुपौल, बिहार' 
                : 'Shashank CSC Centre • Kajhi Chowk, Supaul, Bihar'}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-[#F4C542]">
              {language === 'hi' ? 'सहयोगी: Digital Naari' : 'Partner: Digital Naari'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919241262642"
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#F28C28] transition-colors"
              title="Call Centre"
            >
              <Phone className="w-3.5 h-3.5 text-[#168447]" />
              <span className="font-semibold">+91 92412 62642</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre%2C%20%E0%A4%AE%E0%A5%81%E0%A4%97%E0%A5%87%20%E0%A4%B8%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%AC%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-green-400 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Desktop Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123B7A] via-[#0B1F3A] to-[#168447] p-0.5 shadow-md flex items-center justify-center border border-[#F28C28]/40">
            <div className="w-full h-full bg-[#0B1F3A] rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-bold text-[#F28C28]">SC</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-[#F28C28] transition-colors">
                Shashank CSC Centre
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#168447]/30 text-green-300 rounded border border-[#168447]/50">
                Bihar
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {language === 'hi' 
                ? 'शशांक सीएससी केंद्र • संचालक: शशांक शेखर' 
                : 'Citizen Services Portal • Owner: Shashank Shekhar'}
            </p>
          </div>
        </button>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#123B7A] hover:bg-[#1a4a94] text-xs font-semibold text-white transition-all border border-blue-400/30 cursor-pointer shadow-sm"
            title="भाषा बदलें / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Track Status Button */}
          <button
            onClick={() => handleNavClick('track')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              currentView === 'track'
                ? 'bg-[#168447] text-white border-[#168447] shadow'
                : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white border-emerald-500/40'
            }`}
            title="आवेदन व SMS स्थिति जांचें / Track Status & SMS"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">
              {language === 'hi' ? 'SMS ट्रैकर' : 'Track SMS'}
            </span>
          </button>

          {/* Admin Dashboard Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
              currentView === 'admin'
                ? 'bg-[#F28C28] text-white border-[#F28C28]'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/15'
            }`}
            title="व्यवस्थापक लॉगिन / Admin Dashboard"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAdminLoggedIn ? (language === 'hi' ? 'डैशबोर्ड' : 'Dashboard') : (language === 'hi' ? 'व्यवस्थापक' : 'Admin')}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Secondary Desktop Horizontal Navigation Links */}
      <nav className="hidden lg:block bg-[#123B7A]/60 backdrop-blur-sm border-t border-white/10 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 scrollbar-none">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.categoryKey)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#F28C28] text-white shadow font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F4C542]'}`} />
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pl-3 py-1 flex items-center gap-2 text-xs text-amber-200">
            <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300 border border-amber-500/30">
              150+ पोर्टल लाइव
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1F3A] border-t border-white/10 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.categoryKey)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-base font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#F28C28] text-white font-semibold'
                      : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#F4C542]'}`} />
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-base font-medium text-amber-300 bg-amber-950/40 border border-amber-600/30 text-left mt-2"
            >
              <Lock className="w-5 h-5 text-amber-400" />
              <span>{language === 'hi' ? 'सुरक्षित व्यवस्थापक पैनल' : 'Secure Admin Panel'}</span>
            </button>
          </div>

          {/* Quick Direct Contacts in Mobile Drawer */}
          <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
            <a
              href="tel:+919241262642"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#168447] text-white font-semibold text-sm shadow hover:bg-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>कॉल करें (+91 92412 62642)</span>
            </a>
            <a
              href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre%2C%20%E0%A4%AE%E0%A5%81%E0%A4%97%E0%A5%87%20%E0%A4%B8%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%AC%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] text-slate-950 font-bold text-sm shadow hover:bg-green-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp पर सहायता लें</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
