import React from 'react';
import { Shield, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Language } from '../types/index.ts';

interface LegalPagesProps {
  pageType: 'privacy' | 'terms' | 'disclaimer';
  onBack: () => void;
  language: Language;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType, onBack, language }) => {
  const isHi = language === 'hi';

  return (
    <div className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#123B7A] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isHi ? 'मुख्य पृष्ठ पर वापस जाएँ' : 'Back to Home'}</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-800 text-sm leading-relaxed">
        
        {/* DISCLAIMER PAGE */}
        {pageType === 'disclaimer' && (
          <>
            <div className="border-b border-slate-200 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>महत्वपूर्ण कानूनी सूचना</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                अस्वीकरण (Disclaimer)
              </h1>
              <p className="text-xs text-slate-500 mt-1">अंतिम समीक्षा: 14 अक्टूबर 2026</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 font-medium">
              "This website is an independent information and assistance directory. It is not an official Government of India or Government of Bihar website. Government portals and schemes may change their procedures, eligibility rules, and URLs. Users should confirm final details on the relevant official website before submitting applications or making payments."
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0B1F3A]">1. स्वतंत्र सहायता केंद्र की स्थिति</h3>
              <p>
                <strong>शशांक सीएससी केंद्र (Shashank CSC Centre)</strong>, ग्राम हरिपुर झरका, कझा चौक, सुपौल (बिहार) में स्थित एक स्वतंत्र डिजिटल सेवा एवं नागरिक सहायता केंद्र है। यह वेबसाइट किसी भी सरकारी विभाग, मंत्रालय अथवा भारत सरकार/बिहार सरकार द्वारा प्रत्यक्ष रूप से संचालित, स्वामित्व वाली या वैधानिक रूप से संबद्ध नहीं है।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">2. आधिकारिक लिंक एवं बाहरी वेबसाइटें</h3>
              <p>
                इस वेबसाइट पर सूचीबद्ध सभी 150 पोर्टल संबंधित सरकारी विभागों एवं मंत्रालयों के आधिकारिक वेब पते (URLs) हैं। जब आप 'आधिकारिक वेबसाइट खोलें' बटन पर क्लिक करते हैं, तो आप सीधे उस सरकारी वेबसाइट पर प्रेषित होते हैं। शशांक सीएससी केंद्र बाहरी वेबसाइटों की सामग्री, सर्वर उपलब्धता, नियमों में बदलाव अथवा किसी विसंगति के लिए उत्तरदायी नहीं है।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">3. कोई सरकारी निर्णय की गारंटी नहीं</h3>
              <p>
                हम किसी भी नागरिक को राशन कार्ड, पेंशन, किसान सब्सिडी, जाति/आय/निवास प्रमाणपत्र अथवा सरकारी नौकरी की स्वीकृति की गारंटी नहीं देते। सभी स्वीकृतियां संबंधित सरकारी प्राधिकारियों (BDO, CO, DM अथवा मंत्रालयों) के क्षेत्राधिकार में हैं।
              </p>
            </div>
          </>
        )}

        {/* PRIVACY POLICY PAGE */}
        {pageType === 'privacy' && (
          <>
            <div className="border-b border-slate-200 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 mb-2">
                <Shield className="w-3.5 h-3.5 text-[#123B7A]" />
                <span>नागरिक डेटा सुरक्षा</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                गोपनीयता नीति (Privacy Policy)
              </h1>
              <p className="text-xs text-slate-500 mt-1">अंतिम समीक्षा: 14 अक्टूबर 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0B1F3A]">1. हम कौन सी जानकारी एकत्र करते हैं?</h3>
              <p>
                नागरिक जब हमारी वेबसाइट के संपर्क फॉर्म (Contact Form) के माध्यम से सेवा सहायता का अनुरोध करते हैं, तब हम केवल निम्नलिखित सामान्य संपर्क विवरण एकत्र करते हैं:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                <li>आपका पूरा नाम (Full Name)</li>
                <li>सक्रिय मोबाइल नंबर (Mobile Number)</li>
                <li>ईमेल पता (Email Address)</li>
                <li>इच्छित सेवा श्रेणी एवं समस्या का संक्षिप्त विवरण</li>
              </ul>

              <h3 className="text-base font-bold text-[#0B1F3A]">2. संवेदनशील पहचान डेटा संग्रह का पूर्ण निषेध</h3>
              <p className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-rose-900 font-medium">
                <strong>सख्त नियम:</strong> हम इस वेबसाइट के माध्यम से कभी भी आपकी आधार संख्या (Aadhaar Number), पैन नंबर, बैंक खाता पासवर्ड, यूपीआई पिन, ओटीपी कोड अथवा बायोमेट्रिक फिंगरप्रिंट डेटा एकत्र या संगृहीत नहीं करते। यदि कोई आपसे ऐसी संवेदनशील जानकारी की मांग करे, तो तुरंत सूचित करें।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">3. डेटा का उपयोग और भंडारण</h3>
              <p>
                एकत्रित जानकारी केवल शशांक सीएससी केंद्र के व्यवस्थापक द्वारा आपके सेवा अनुरोध के समाधान और आपसे संपर्क करने हेतु उपयोग की जाती है। डेटा को हमारे सुरक्षित PostgreSQL Cloud SQL डेटाबेस में एन्क्रिप्टेड रूप से सुरक्षित रखा जाता है।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">4. डेटा हटाने का अनुरोध (Data Deletion)</h3>
              <p>
                यदि कोई नागरिक अपना दर्ज किया गया संपर्क संदेश या डेटाबेस रिकॉर्ड हटवाना चाहता है, तो वह सीधे <a href="mailto:shashankshekha2006@gmail.com" className="text-[#123B7A] font-bold underline">shashankshekha2006@gmail.com</a> पर ईमेल भेजकर या +91 92412 62642 पर कॉल करके तुरंत डेटा डिलीट करवा सकता है।
              </p>
            </div>
          </>
        )}

        {/* TERMS AND CONDITIONS PAGE */}
        {pageType === 'terms' && (
          <>
            <div className="border-b border-slate-200 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-2">
                <FileText className="w-3.5 h-3.5 text-[#168447]" />
                <span>नियम एवं शर्तें</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                नियम और शर्तें (Terms & Conditions)
              </h1>
              <p className="text-xs text-slate-500 mt-1">अंतिम समीक्षा: 14 अक्टूबर 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0B1F3A]">1. स्वीकार्य उपयोग (Acceptable Use)</h3>
              <p>
                इस वेबसाइट का उपयोग केवल प्रामाणिक नागरिक सेवा सूचना प्राप्त करने, आधिकारिक सरकारी पोर्टलों के लिंक खोजने तथा शशांक सीएससी केंद्र से सहायता प्राप्त करने के उद्देश्य से किया जा सकता है। किसी भी प्रकार का दुर्भावनापूर्ण उपयोग, स्पैम संदेश भेजना या स्वचालित बॉट चलाना प्रतिबंधित है।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">2. सरकारी शुल्क एवं सीएससी सहायता शुल्क</h3>
              <p>
                सरकारी पोर्टल्स पर निर्धारित आधिकारिक शुल्क (जैसे पैन कार्ड शुल्क ₹107, आधार पीवीसी ₹50, आदि) सीधे संबंधित विभाग द्वारा लिया जाता है। शशांक सीएससी केंद्र पर भौतिक रूप से फॉर्म भरने और दस्तावेजीकरण में दी जाने वाली सहायता के लिए राज्य सरकार/सीएससी ई-गवर्नेंस द्वारा अनुशंसित मामूली सेवा शुल्क ही लागू होता है।
              </p>

              <h3 className="text-base font-bold text-[#0B1F3A]">3. संपर्क एवं क्षेत्राधिकार</h3>
              <p>
                वेबसाइट अथवा सेवाओं से संबंधित किसी भी विवाद या स्पष्टीकरण हेतु न्यायक्षेत्र सुपौल (बिहार), भारत रहेगा। संपर्क ईमेल: shashankshekha2006@gmail.com.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
