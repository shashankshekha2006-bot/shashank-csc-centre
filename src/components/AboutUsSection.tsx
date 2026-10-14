import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types/index.ts';

interface AboutUsSectionProps {
  onContactClick: () => void;
  language: Language;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onContactClick,
  language,
}) => {
  const isHi = language === 'hi';

  const capabilities = [
    { title: isHi ? 'आधार एवं पहचान पत्र सहायता' : 'Aadhaar & Identity Support', desc: isHi ? 'डाउनलोड, पीवीसी कार्ड ऑर्डर, केंद्र खोज व पता अपडेट मार्गदर्शन।' : 'Download, PVC order, locator and update guidance.' },
    { title: isHi ? 'ऑनलाइन प्रमाणपत्र (RTPS)' : 'RTPS Certificates', desc: isHi ? 'जाति, आवासीय, आय, EWS एवं नॉन-क्रीमी लेयर प्रमाण पत्र आवेदन।' : 'Caste, Residence, Income, EWS, and NCL certificates.' },
    { title: isHi ? 'जमीन लगान व दाखिल-खारिज' : 'Land Records & Revenue', desc: isHi ? 'बिहार भूमि खाता/खेसरा, ऑनलाइन लगान रसीद व परिमार्जन प्रपत्र।' : 'Bhumi records, online lagan payment & mutation status.' },
    { title: isHi ? 'किसान एवं कृषि सब्सिडी' : 'Farmer Subsidies & DBT', desc: isHi ? 'किसान पंजीकरण, PM-Kisan eKYC, डीजल अनुदान व कृषि यंत्रीकरण।' : 'Farmer registration, PM-Kisan eKYC, diesel & equipment subsidy.' },
    { title: isHi ? 'छात्रवृत्ति व प्रतियोगी परीक्षा' : 'Scholarships & Exams', desc: isHi ? 'बिहार पोस्ट मैट्रिक छात्रवृत्ति, नेशनल स्कॉलरशिप व BPSC/BSSC फॉर्म।' : 'Post matric scholarships, NSP, and recruitment form filling.' },
    { title: isHi ? 'वित्तीय समावेशन व बैंकिंग' : 'Banking & Inclusion', desc: isHi ? 'Digital Naari सहयोगी के साथ आधार सक्षम नकद निकासी व परामर्श।' : 'Assisted cash withdrawal and DBT support via Digital Naari.' },
  ];

  return (
    <section id="about-us" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Owner Photograph Column */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-[#123B7A] shadow-xl bg-slate-900 p-1">
              <img
                src="/src/assets/images/shashank_portrait_1791972912015.jpg"
                alt="Shashank Shekhar - Shashank CSC Centre"
                className="w-full h-full object-cover object-top rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 inset-x-2 bg-[#0B1F3A]/90 backdrop-blur-md py-2 px-3 rounded-xl border border-white/20 text-xs text-white">
                <p className="font-bold">शशांक शेखर (Shashank Shekhar)</p>
                <p className="text-[11px] text-[#F4C542]">संचालक / संस्थापक, Shashank CSC Centre</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm">
              <span className="font-bold text-slate-800">सेवा संकल्प:</span> "हमारा उद्देश्य सुपौल एवं ग्रामीण बिहार के प्रत्येक नागरिक को पारदर्शी, त्वरित और सुरक्षित डिजिटल सरकारी सेवाएँ उपलब्ध कराना है।"
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#123B7A]/10 text-[#123B7A] mb-2 border border-[#123B7A]/20">
                <HeartHandshake className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>{isHi ? 'हमारे बारे में' : 'About Shashank CSC Centre'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                {isHi ? 'शशांक सीएससी केंद्र — आपका विश्वसनीय डिजिटल साथी' : 'Shashank CSC Centre — Your Trusted Digital Partner'}
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {isHi
                ? 'शशांक सीएससी केंद्र, सुपौल (बिहार) में स्थित एक स्वतंत्र डिजिटल सेवा एवं नागरिक परामर्श सहायता केंद्र है। हम स्थानीय किसानों, छात्रों, वरिष्ठ नागरिकों, महिलाओं और सामान्य नागरिकों को सरकारी पोर्टल्स, योजनाओं और ऑनलाइन सेवाओं का सुलभ और सही मार्गदर्शन प्रदान करते हैं।'
                : 'Shashank CSC Centre is an independent digital service and citizen assistance centre located in Supaul, Bihar. We provide accessible, transparent, and accurate guidance on government portals, welfare schemes, and digital citizen services to local farmers, students, senior citizens, and families.'}
            </p>

            {/* Address & Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-slate-500 uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>केंद्र का पता (Address)</span>
                </span>
                <p className="font-semibold text-slate-800 text-sm">
                  ग्राम हरिपुर झरका, कझा चौक, वार्ड नं. 14
                </p>
                <p className="text-slate-600">
                  जिला सुपौल, बिहार, भारत
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#168447]" />
                  <span>संपर्क सूत्र (Contact)</span>
                </span>
                <p className="font-semibold text-slate-800 text-sm">
                  +91 92412 62642
                </p>
                <p className="text-slate-600">
                  shashankshekha2006@gmail.com
                </p>
              </div>
            </div>

            {/* Core Capabilities Grid */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-sm text-[#0B1F3A]">
                {isHi ? 'हमारे केंद्र पर उपलब्ध प्रमुख सहायता सेवाएँ:' : 'Key Assistance Services Provided:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capabilities.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-blue-50/50 border border-blue-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">{c.title}: </span>
                      <span className="text-slate-600">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Transparency */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-snug">
              <strong>कानूनी स्पष्टीकरण:</strong> शशांक सीएससी केंद्र एक स्वतंत्र नागरिक सहायता केंद्र है। हम किसी भी सरकारी लाभ, पेंशन या नौकरी की मंजूरी की गारंटी नहीं देते; हम केवल वैध सरकारी प्रक्रियाओं और आधिकारिक पोर्टल्स के माध्यम से आवेदन में सहायता प्रदान करते हैं।
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
