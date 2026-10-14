import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Heart, Shield, ExternalLink } from 'lucide-react';
import { Language } from '../types/index.ts';

interface FooterProps {
  onNavigate: (view: string, categoryKey?: string) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const isHi = language === 'hi';

  const handleNav = (view: string, categoryKey?: string) => {
    onNavigate(view, categoryKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-white/10 mt-16 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Centre & Developer Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#123B7A] flex items-center justify-center font-bold text-lg text-[#F28C28] border border-white/20">
                SC
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Shashank CSC Centre</h3>
                <p className="text-xs text-[#F4C542] font-medium">शशांक सीएससी केंद्र</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              बिहार एवं भारत सरकार के 150+ आधिकारिक पोर्टलों, योजनाओं, कृषि, राशन, भूमि सुधार व नागरिक सेवाओं की एक समग्र डिजिटल डायरेक्टरी।
            </p>

            <div className="pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">संचालक एवं निर्माता:</span>
              <p className="font-bold text-white text-sm">शशांक शेखर (Shashank Shekhar)</p>
              <p className="text-[11px] text-[#F28C28]">Developed by Shashank Shekhar</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              त्वरित लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'होम (Home)' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portals')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'सभी 150 सरकारी पोर्टल' : 'All Government Portals'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('agriculture', 'agriculture')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'कृषि एवं किसान सेवाएँ' : 'Agriculture & Farmers'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('animal_husbandry', 'animal_husbandry')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'पशुपालन एवं डेयरी' : 'Animal Husbandry & Dairy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('schemes')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'सरकारी योजनाएँ' : 'Government Schemes'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('track')} className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-bold flex items-center gap-1">
                  <span>📱 {isHi ? 'आवेदन व SMS स्थिति ट्रैकर' : 'Track Request & SMS Status'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('digital_naari')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'Digital Naari सेवा सहयोगी' : 'Digital Naari Partner'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'हमारे बारे में' : 'About Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  {isHi ? 'संपर्क करें' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              कानूनी एवं नीतियाँ (Legal Links)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  गोपनीयता नीति (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  नियम और शर्तें (Terms & Conditions)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('disclaimer')} className="hover:text-[#F28C28] transition-colors cursor-pointer">
                  कानूनी अस्वीकरण (Disclaimer)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1">
                  <span>व्यवस्थापक पैनल (Admin Panel)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('api_docs')} className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer flex items-center gap-1">
                  <span>RESTful API Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Phone */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              संपर्क पता (Centre Address)
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <p>
                  Haripur Jharka, Kajhi Chowk, Ward No. 14, Supaul, Bihar, India.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#168447] shrink-0" />
                <a href="tel:+919241262642" className="hover:text-[#F28C28] font-bold text-white transition-colors">
                  +91 92412 62642
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:shashankshekha2006@gmail.com" className="hover:text-[#F28C28] transition-colors break-all">
                  shashankshekha2006@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <a
                  href="https://wa.me/919241262642"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline font-semibold"
                >
                  WhatsApp: 919241262642
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-400 leading-relaxed text-center space-y-1">
          <p className="font-semibold text-slate-300">
            महत्वपूर्ण कानूनी अस्वीकरण (Important Legal Disclaimer):
          </p>
          <p>
            This website is an independent information and assistance directory. It is not an official Government of India or Government of Bihar website. Government portals and schemes may change their procedures, eligibility rules, and URLs. Users should confirm final details on the relevant official website before submitting applications or making payments.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 Shashank CSC Centre. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>सेवा सहयोगी: Digital Naari</span>
            <span>•</span>
            <span>संचालक: शशांक शेखर</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
