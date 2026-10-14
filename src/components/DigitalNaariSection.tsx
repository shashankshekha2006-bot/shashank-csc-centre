import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users
} from 'lucide-react';
import { Language } from '../types/index.ts';

interface DigitalNaariSectionProps {
  onContactClick: () => void;
  language: Language;
}

export const DigitalNaariSection: React.FC<DigitalNaariSectionProps> = ({
  onContactClick,
  language,
}) => {
  const isHi = language === 'hi';

  const services = [
    {
      title: isHi ? 'आधार सक्षम भुगतान (AePS)' : 'Aadhaar Enabled Payment (AePS)',
      desc: isHi 
        ? 'आधार प्रमाणीकरण द्वारा बैंक खाते से नकद निकासी एवं शेष राशि (बैलेंस) की जांच की सुविधा।' 
        : 'Cash withdrawal and balance enquiry from bank account via Aadhaar authentication.',
      icon: Banknote,
    },
    {
      title: isHi ? 'नकद जमा एवं मिनी स्टेटमेंट' : 'Cash Deposit & Mini Statement',
      desc: isHi 
        ? 'सहयोगी बैंकों के खातों में नकद जमा सहायता एवं पिछले लेनदेन का मिनी स्टेटमेंट प्रिंट।' 
        : 'Cash deposit assistance in partner banks and mini statement printout.',
      icon: CreditCard,
    },
    {
      title: isHi ? 'चेहरा प्रमाणीकरण (Face Auth) सहायता' : 'Face Auth Banking Support',
      desc: isHi 
        ? 'जहाँ अधिकृत सेवा प्रदाता व संबंधित बैंक द्वारा समर्थित हो, वहाँ चेहरा प्रमाणीकरण से सहायता।' 
        : 'Assistance via Face Authentication only where supported by authorized provider and bank.',
      icon: Smartphone,
    },
    {
      title: isHi ? 'डीबीटी व पेंशन आहरण परामर्श' : 'DBT & Pension Cash Support',
      desc: isHi 
        ? 'वृद्धजन, विधवा, दिव्यांग पेंशन एवं किसान सम्मान निधि के भुगतान की सुरक्षित निकासी।' 
        : 'Safe cash withdrawal for government pensions and PM-Kisan welfare payments.',
      icon: Users,
    },
  ];

  return (
    <section id="digital-naari" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#0B1F3A] via-[#123B7A] to-[#071527] rounded-3xl text-white p-6 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
        
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F28C28]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#F4C542]">
              <ShieldCheck className="w-4 h-4 text-[#168447]" />
              <span>{isHi ? 'आधिकारिक सेवा सहयोगी' : 'Official Service Partner'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {isHi ? 'हमारे सेवा सहयोगी — Digital Naari' : 'Our Service Partner — Digital Naari'}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {isHi
                ? 'शशांक सीएससी केंद्र, Digital Naari के साथ मिलकर ग्रामीण एवं स्थानीय नागरिकों को बैंकिंग और वित्तीय समावेशन सहायता प्रदान करता है। हमारे केंद्र पर आधार आधारित नकद निकासी, बैलेंस पूछताछ और सरकारी डीबीटी सहायता उपलब्ध है।'
                : 'Shashank CSC Centre collaborates with Digital Naari to provide banking and financial inclusion support to rural and local citizens. Assisted cash withdrawal, balance check and DBT support are available at our centre.'}
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {services.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#F28C28]/20 text-[#F4C542] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Important Transparent Boundaries Notice */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>पारदर्शी सूचना:</strong> बायोमेट्रिक एवं फेस-ऑथेंटिकेशन सेवाएँ केवल उन्हीं लेनदेन के लिए उपलब्ध हैं जहाँ संबंधित बैंक और अधिकृत सेवा प्रदाता अनुमति देते हैं। यह दावा नहीं किया जाता कि प्रत्येक लेनदेन बिना फिंगरप्रिंट के हो सकता है।
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-xl bg-[#F28C28] hover:bg-[#d9771d] text-white text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                बैंकिंग सेवा हेतु संपर्क करें
              </button>
            </div>
          </div>

          {/* Right Emblem Column */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 p-2">
              <img
                src="/src/assets/images/digital_naari_service_1791972913430.jpg"
                alt="Digital Naari Service Partner Badge"
                className="w-full h-full object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
