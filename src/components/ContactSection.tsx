import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Navigation,
  ShieldCheck,
  Clock,
  Copy,
  Check,
  Smartphone,
  Bell,
  RefreshCw,
  Search,
  CheckCircle,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Language, Category, SmsNotification } from '../types/index.ts';

interface ContactSectionProps {
  categories: Category[];
  initialCategory?: string;
  initialService?: string;
  language: Language;
  initialMode?: 'form' | 'track';
}

interface TrackedInquiry {
  referenceNumber: string;
  fullName: string;
  maskedMobile: string;
  serviceCategory: string;
  requestDescription: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Archived' | 'Document Ready';
  smsUpdatesOptIn: boolean;
  adminNotes?: string;
  createdAt: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  categories,
  initialCategory,
  initialService,
  language,
  initialMode = 'form',
}) => {
  const [activeMode, setActiveMode] = useState<'form' | 'track'>(initialMode);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(initialCategory || 'कृषि एवं किसान सेवाएँ (PM Kisan / DBT)');
  const [requestDescription, setRequestDescription] = useState(initialService || '');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [smsUpdatesOptIn, setSmsUpdatesOptIn] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceNumber: string;
    message: string;
    submittedAt: string;
    mobile: string;
    smsNotification?: {
      trackingId: string;
      recipientMobile: string;
      messageText: string;
      deliveryStatus: string;
      sentAt: string;
    } | null;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Tracking State
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedInquiry, setTrackedInquiry] = useState<TrackedInquiry | null>(null);
  const [smsHistory, setSmsHistory] = useState<SmsNotification[]>([]);
  const [trackingError, setTrackingError] = useState('');
  const [requestingSms, setRequestingSms] = useState(false);
  const [smsRequestFeedback, setSmsRequestFeedback] = useState('');
  const [togglingReminder, setTogglingReminder] = useState(false);

  const isHi = language === 'hi';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Village Haripur Jharka, Kajhi Chowk, Ward No. 14, Supaul, Bihar, India'
  )}`;

  // Handle external pre-fill updates
  useEffect(() => {
    if (initialCategory) setServiceCategory(initialCategory);
    if (initialService) setRequestDescription(initialService);
  }, [initialCategory, initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें (Full Name is required).');
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('कृपया एक मान्य 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें (Valid 10-digit mobile required).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('कृपया एक मान्य ईमेल पता दर्ज करें (Valid email is required).');
      return;
    }

    if (!serviceCategory) {
      setErrorMsg('कृपया सेवा श्रेणी चुनें (Service category is required).');
      return;
    }

    if (!requestDescription.trim() || requestDescription.trim().length < 5) {
      setErrorMsg('कृपया आवश्यक सेवा का विवरण कम से कम 5 अक्षरों में लिखें।');
      return;
    }

    if (!privacyAccepted) {
      setErrorMsg('कृपया गोपनीयता नीति और नियम व शर्तों को स्वीकार करें।');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: cleanMobile,
          email: email.trim().toLowerCase(),
          serviceCategory,
          requestDescription: requestDescription.trim() + (additionalMessage.trim() ? ` | अतिरिक्त संदेश: ${additionalMessage.trim()}` : ''),
          privacyAccepted,
          smsUpdatesOptIn,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessData({
          referenceNumber: data.referenceNumber,
          message: data.message,
          submittedAt: data.submittedAt,
          mobile: cleanMobile,
          smsNotification: data.smsNotification,
        });

        // Set search query for easy tracking
        setSearchQuery(data.referenceNumber);

        // Reset form
        setFullName('');
        setMobileNumber('');
        setEmail('');
        setRequestDescription('');
        setAdditionalMessage('');
        setPrivacyAccepted(false);
      } else {
        setErrorMsg(data.error || 'अनुरोध दर्ज करने में समस्या हुई। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      setErrorMsg('सर्वर से संपर्क नहीं हो सका। कृपया अपनी इंटरनेट कनेक्टिविटी जांचें या सीधे WhatsApp/कॉल करें।');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyRef = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Perform Citizen Status & SMS Tracking Lookup
  const handleTrackInquiry = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || searchQuery).trim();
    if (!query) {
      setTrackingError('कृपया अपना 10-अंकीय मोबाइल नंबर अथवा संदर्भ संख्या दर्ज करें।');
      return;
    }

    setTrackingLoading(true);
    setTrackingError('');
    setSmsRequestFeedback('');

    try {
      const res = await fetch(`/api/citizen/track/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setTrackedInquiry(data.inquiry);
        setSmsHistory(data.smsHistory || []);
      } else {
        setTrackedInquiry(null);
        setSmsHistory([]);
        setTrackingError(data.error || 'इस संदर्भ संख्या अथवा मोबाइल नंबर से कोई अनुरोध नहीं मिला।');
      }
    } catch (err) {
      setTrackingError('सर्वर से स्थिति प्राप्त नहीं हो सकी। कृपया इंटरनेट जांचें।');
    } finally {
      setTrackingLoading(false);
    }
  };

  // Citizen requests instant status update SMS
  const handleRequestStatusSms = async () => {
    if (!trackedInquiry) return;
    setRequestingSms(true);
    setSmsRequestFeedback('');

    try {
      const res = await fetch('/api/citizen/request-status-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceNumber: trackedInquiry.referenceNumber }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSmsRequestFeedback(data.message || 'SMS सफलतापूर्वक प्रेषित!');
        // Refresh tracking data to show newly added SMS in history
        handleTrackInquiry(undefined, trackedInquiry.referenceNumber);
      } else {
        setSmsRequestFeedback(data.error || 'SMS भेजने में त्रुटि हुई।');
      }
    } catch (err) {
      setSmsRequestFeedback('SMS अनुरोध प्रेषित नहीं हो सका।');
    } finally {
      setRequestingSms(false);
    }
  };

  // Toggle Scheme Reminder Opt-In
  const handleToggleReminder = async () => {
    if (!trackedInquiry) return;
    setTogglingReminder(true);
    const newStatus = !trackedInquiry.smsUpdatesOptIn;

    try {
      const res = await fetch('/api/citizen/toggle-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: trackedInquiry.referenceNumber,
          optIn: newStatus,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTrackedInquiry({ ...trackedInquiry, smsUpdatesOptIn: newStatus });
        setSmsRequestFeedback(data.message);
        // Refresh SMS history
        handleTrackInquiry(undefined, trackedInquiry.referenceNumber);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingReminder(false);
    }
  };

  // Quick Scheme Preset selector
  const POPULAR_SCHEMES_PRESETS = [
    { title: 'PM किसान सम्मान निधि (eKYC / 18वीं किस्त)', category: 'कृषि एवं किसान सेवाएँ' },
    { title: 'बिहार DBT कृषि डीजल व इनपुट सब्सिडी अनुदान', category: 'कृषि एवं किसान सेवाएँ' },
    { title: 'RTPS जाति / आय / निवास प्रमाणपत्र', category: 'RTPS एवं प्रमाणपत्र' },
    { title: 'आयुष्मान भारत ₹5 लाख मुफ्त इलाज कार्ड', category: 'आयुष्मान एवं स्वास्थ्य' },
    { title: 'दाखिल खारिज, लगान रसीद व परिमार्जन', category: 'भूमि सुधार एवं राजस्व' },
    { title: 'पोस्ट मैट्रिक छात्रवृत्ति (PMS Bihar)', category: 'शिक्षा एवं छात्रवृत्ति' },
    { title: 'मुख्यमंत्री वृद्धजन / विधवा पेंशन', category: 'पेंशन एवं समाज कल्याण' },
    { title: 'Digital Naari बैंकिंग व डीबीटी नकद निकासी', category: 'बैंकिंग एवं वित्तीय समावेशन' },
  ];

  return (
    <section id="contact-us" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#123B7A]/10 text-[#123B7A] mb-2 border border-[#123B7A]/20">
            <Smartphone className="w-3.5 h-3.5 text-[#168447]" />
            <span>{isHi ? 'सहायता एवं SMS सेवा' : 'Support & SMS Service'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            {isHi ? 'शशांक सीएससी केंद्र • नागरिक सहायता एवं SMS ट्रैकर' : 'Shashank CSC Centre • Support & SMS Tracker'}
          </h2>
          <p className="text-sm text-slate-600 font-medium max-w-2xl mt-1">
            {isHi 
              ? 'सरकारी योजनाओं में सहायता प्राप्त करें और अपनी स्थिति व रिमाइंडर सीधे अपने मोबाइल पर पाएं।' 
              : 'Submit citizen service inquiries, receive instant SMS updates and deadline reminders on your phone.'}
          </p>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center rounded-2xl bg-slate-200 p-1 border border-slate-300 self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setActiveMode('form')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'form'
                ? 'bg-[#123B7A] text-white shadow-md'
                : 'text-slate-700 hover:text-black'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#F4C542]" />
            <span>{isHi ? 'सेवा सहायता अनुरोध फॉर्म' : 'Submit Service Request'}</span>
          </button>

          <button
            onClick={() => setActiveMode('track')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'track'
                ? 'bg-[#168447] text-white shadow-md'
                : 'text-slate-700 hover:text-black'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-white" />
            <span>{isHi ? 'आवेदन व SMS स्थिति जांचें' : 'Track Status & SMS'}</span>
          </button>
        </div>
      </div>

      {/* MODE 1: FORM VIEW */}
      {activeMode === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Centre details & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
              
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] text-[#F28C28] flex items-center justify-center font-bold text-lg shadow-sm">
                  SC
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0B1F3A]">शशांक सीएससी केंद्र</h3>
                  <p className="text-xs text-slate-500 font-medium">संचालक: शशांक शेखर (Shashank Shekhar)</p>
                </div>
              </div>

              {/* Contact info list */}
              <div className="space-y-4 text-xs">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#123B7A] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">केंद्र का भौतिक पता (Physical Address):</span>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      ग्राम हरिपुर झरका, कझा चौक, वार्ड नं. 14, जिला सुपौल, बिहार, भारत (पिन 852131)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-50 text-[#168447] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">सीधा फोन / हेल्पलाइन:</span>
                    <a href="tel:+919241262642" className="text-base font-extrabold text-[#123B7A] hover:underline">
                      +91 92412 62642
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">व्हाट्सएप सहायता (WhatsApp):</span>
                    <a
                      href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre%2C%20%E0%A4%AE%E0%A5%81%E0%A4%97%E0%A5%87%20%E0%A4%B8%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%AC%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#168447] hover:underline inline-flex items-center gap-1"
                    >
                      <span>+91 92412 62642 पर चैट करें</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#F28C28] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">आधिकारिक ईमेल:</span>
                    <a href="mailto:shashankshekha2006@gmail.com" className="text-slate-800 font-semibold hover:underline">
                      shashankshekha2006@gmail.com
                    </a>
                  </div>
                </div>

              </div>

              {/* SMS Notification Guarantee Feature Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>निःशुल्क SMS अलर्ट प्रणाली (Real-time SMS Updates)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  फॉर्म सबमिट करने पर आपको तुरंत एक <strong>पावती SMS</strong> प्राप्त होगा। व्यवस्थापक द्वारा आपके आवेदन पर कार्य प्रगति पर होने अथवा दस्तावेज तैयार होने पर आपके मोबाइल पर त्वरित अपडेट भेजा जाएगा।
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>SMS गेटवे सक्रिय • 100% डिलीवरी दर</span>
                </div>
              </div>

              {/* Directions Button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#123B7A] text-white font-semibold text-xs shadow transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#F4C542]" />
                <span>गूगल मैप्स पर केंद्र का रास्ता देखें (Directions)</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>गोपनीयता एवं सुरक्षा संकल्प:</span>
              </p>
              <p className="text-[11px]">
                शशांक सीएससी केंद्र कभी भी आपकी आधार संख्या, ओटीपी, पासवर्ड या बायोमेट्रिक विवरण इस फॉर्म के माध्यम से नहीं मांगता। आपका डेटा केवल आपके अनुरोध समाधान एवं SMS सूचना हेतु सुरक्षित रूप से PostgreSQL में संरक्षित है।
              </p>
            </div>

          </div>

          {/* Right Column: Contact & Scheme Reminder Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            
            {successData ? (
              <div className="py-6 space-y-6 animate-fade-in">
                
                {/* Success Header */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0B1F3A]">
                    अनुरोध सफलतापूर्वक दर्ज हुआ!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    {successData.message}
                  </p>
                </div>

                {/* Reference ID Card */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2 max-w-sm mx-auto shadow-xs">
                  <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                    आपकी अनुरोध संदर्भ संख्या (Reference #)
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-2xl font-extrabold text-[#0B1F3A]">
                      {successData.referenceNumber}
                    </span>
                    <button
                      onClick={() => handleCopyRef(successData.referenceNumber)}
                      className="p-1.5 rounded-lg bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 text-xs flex items-center gap-1 cursor-pointer"
                      title="Copy reference number"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRef ? 'कॉपी हुआ' : 'कॉपी'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    इस नंबर से आप कभी भी अपनी स्थिति एवं SMS सूचना ट्रैक कर सकते हैं।
                  </p>
                </div>

                {/* Simulated SMS Received Preview (High-Tech Citizen Phone Simulation) */}
                {successData.smsNotification && (
                  <div className="max-w-md mx-auto bg-slate-900 rounded-3xl p-4 text-white shadow-xl border-4 border-slate-700 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold text-white">संदेश ऐप (SMS Notification Received)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/40">
                        {successData.smsNotification.deliveryStatus} ✓✓
                      </span>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-3.5 space-y-2 border border-slate-700 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-[#F28C28]">प्रेषक: SHASHANK-CSC (VM-SHSCNC)</span>
                        <span>अभी-अभी</span>
                      </div>
                      <p className="text-slate-100 font-medium leading-relaxed">
                        {successData.smsNotification.messageText}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                        <span>गेटवे ट्रैकिंग: <code className="text-amber-300 font-mono">{successData.smsNotification.trackingId}</code></span>
                        <span>प्राप्तकर्ता: +91 {successData.mobile}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveMode('track');
                      handleTrackInquiry(undefined, successData.referenceNumber);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#168447] hover:bg-[#126b38] text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>आवेदन व SMS स्थिति ट्रैक करें</span>
                  </button>

                  <button
                    onClick={() => setSuccessData(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-300"
                  >
                    नया अनुरोध भेजें
                  </button>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
                    सरकारी सेवा एवं योजना सहायता अनुरोध फॉर्म
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    सभी आवश्यक जानकारी (*) भरें। आपका अनुरोध सीधे सुरक्षित डेटाबेस में दर्ज होगा और आपको तत्काल SMS पावती प्राप्त होगी।
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Popular Scheme Preset Pills for Fast Citizen Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    लोकप्रिय योजना अथवा सेवा त्वरित चुनें (Quick Scheme Select):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SCHEMES_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setServiceCategory(p.category);
                          setRequestDescription(`${p.title} के लिए आवेदन एवं SMS रिमाइंडर सहायता`);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-[#123B7A] hover:text-white text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                      >
                        + {p.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. आपका पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="उदा: रमेश कुमार / सीता देवी"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                    required
                  />
                </div>

                {/* 2 & 3. Mobile Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      2. मोबाइल नंबर (10-Digit Mobile - SMS प्राप्त करने हेतु) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      3. ईमेल पता (Email Address) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                      required
                    />
                  </div>
                </div>

                {/* 4. Service Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4. सरकारी सेवा श्रेणी (Service Category) *
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                    required
                  >
                    <option value="कृषि एवं किसान सेवाएँ">कृषि एवं किसान सेवाएँ (PM Kisan / DBT / सब्सिडी)</option>
                    <option value="RTPS एवं प्रमाणपत्र">RTPS प्रमाणपत्र (जाति / आय / निवास / EWS)</option>
                    <option value="भूमि सुधार एवं राजस्व">भूमि सुधार एवं राजस्व (दाखिल खारिज / लगान / परिमार्जन)</option>
                    <option value="आधार एवं पैन सेवाएँ">आधार एवं पैन सेवाएँ (PVC / सुधार / e-PAN)</option>
                    <option value="राशन कार्ड एवं खाद्य">राशन कार्ड एवं खाद्य सुरक्षा</option>
                    <option value="पेंशन एवं समाज कल्याण">पेंशन एवं समाज कल्याण (वृद्धजन / विधवा पेंशन)</option>
                    <option value="शिक्षा एवं छात्रवृत्ति">शिक्षा एवं छात्रवृत्ति (पोस्ट मैट्रिक / BSEB)</option>
                    <option value="आयुष्मान एवं स्वास्थ्य">आयुष्मान एवं स्वास्थ्य सेवाएँ</option>
                    <option value="बैंकिंग एवं वित्तीय समावेशन">बैंकिंग एवं वित्तीय समावेशन (Digital Naari)</option>
                    <option value="रोजगार एवं श्रम कार्ड">रोजगार, ई-श्रम एवं लेबर कार्ड</option>
                    <option value="बिजली बिल एवं अन्य">बिजली बिल एवं अन्य नागरिक सेवाएँ</option>
                  </select>
                </div>

                {/* 5. What service do you need? */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    5. आपको किस सेवा या योजना की आवश्यकता है? *
                  </label>
                  <textarea
                    rows={2}
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    placeholder="उदा: मुझे जाति व निवास प्रमाणपत्र बनवाना है अथवा पीएम किसान की ई-केवाईसी करानी है..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                    required
                  />
                </div>

                {/* 6. Additional Message (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    6. अतिरिक्त संदेश अथवा विशेष समय (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="कोई विशेष समय या दस्तावेज संबंधी जानकारी जो आप साझा करना चाहें..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                  />
                </div>

                {/* 7. Dedicated SMS Notification & Scheme Reminder Opt-In Box */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-800 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={smsUpdatesOptIn}
                      onChange={(e) => setSmsUpdatesOptIn(e.target.checked)}
                      className="mt-0.5 rounded text-[#168447] focus:ring-[#168447] w-4 h-4 cursor-pointer accent-[#168447]"
                    />
                    <div>
                      <span className="flex items-center gap-1.5 text-emerald-900">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>📱 निःशुल्क SMS स्थिति अपडेट एवं योजना रिमाइंडर प्राप्त करें (Recommended)</span>
                      </span>
                      <p className="font-normal text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        मुझे आवेदन संदर्भ संख्या, कार्य स्थिति परिवर्तन (प्रगति पर / पूर्ण / तैयार), एवं इस योजना की आगामी किस्तों अथवा अंतिम तिथियों की निःशुल्क SMS सूचना मेरे मोबाइल पर भेजें।
                      </p>
                    </div>
                  </label>
                </div>

                {/* 8. Privacy notice acknowledgement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-[#123B7A] focus:ring-[#123B7A] w-4 h-4 cursor-pointer"
                      required
                    />
                    <span>
                      मैं सहमत हूँ कि यह जानकारी शशांक सीएससी केंद्र को मेरे सेवा अनुरोध के समाधान हेतु प्रदान की जा रही है। मैंने <span className="font-semibold text-[#123B7A]">गोपनीयता नीति (Privacy Policy)</span> पढ़ ली है। *
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F28C28] hover:bg-[#d9771d] text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'अनुरोध दर्ज किया जा रहा है...' : 'अनुरोध भेजें एवं SMS पावती पाएं'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      )}

      {/* MODE 2: CITIZEN STATUS & SMS TRACKER VIEW */}
      {activeMode === 'track' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#168447] flex items-center justify-center mx-auto shadow-sm">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
              नागरिक आवेदन एवं SMS डिलीवरी ट्रैकर
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              अपनी <strong>संदर्भ संख्या (उदा: CSC-2026-48291)</strong> अथवा पंजीकृत <strong>10-अंकीय मोबाइल नंबर</strong> दर्ज करके अपने सेवा आवेदन की स्थिति और अपने फोन पर भेजे गए SMS का संपूर्ण विवरण देखें।
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={(e) => handleTrackInquiry(e)} className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="संदर्भ सं: CSC-2026-XXXXX या 10-अंकीय मोबाइल..."
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#168447]"
              />
            </div>
            <button
              type="submit"
              disabled={trackingLoading}
              className="px-5 py-3 rounded-xl bg-[#168447] hover:bg-[#126b38] text-white text-xs sm:text-sm font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${trackingLoading ? 'animate-spin' : ''}`} />
              <span>{trackingLoading ? 'खोज रहे हैं...' : 'स्थिति जांचें'}</span>
            </button>
          </form>

          {trackingError && (
            <div className="max-w-xl mx-auto p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{trackingError}</span>
            </div>
          )}

          {smsRequestFeedback && (
            <div className="max-w-xl mx-auto p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{smsRequestFeedback}</span>
            </div>
          )}

          {/* Tracked Record Display */}
          {trackedInquiry && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pt-2">
              
              {/* Overview Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">संदर्भ संख्या:</span>
                    <span className="font-mono text-xl font-extrabold text-[#0B1F3A]">
                      {trackedInquiry.referenceNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">वर्तमान स्थिति:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      trackedInquiry.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : trackedInquiry.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : trackedInquiry.status === 'Document Ready'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {trackedInquiry.status === 'New' ? 'नया अनुरोध (Received)' :
                       trackedInquiry.status === 'In Progress' ? 'प्रगति में (In Progress)' :
                       trackedInquiry.status === 'Document Ready' ? 'दस्तावेज तैयार (Ready)' :
                       trackedInquiry.status === 'Completed' ? 'पूर्ण (Completed)' : trackedInquiry.status}
                    </span>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    
                    <div className="space-y-1">
                      <div className="w-7 h-7 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow">
                        ✓
                      </div>
                      <span className="font-bold text-slate-800 block text-[11px]">1. अनुरोध प्राप्त</span>
                      <span className="text-[10px] text-slate-400">डेटाबेस में दर्ज</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${
                        trackedInquiry.status !== 'New' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {trackedInquiry.status !== 'New' ? '✓' : '2'}
                      </div>
                      <span className="font-bold text-slate-800 block text-[11px]">2. प्रसंस्करण जारी</span>
                      <span className="text-[10px] text-slate-400">पोर्टल जांच</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${
                        trackedInquiry.status === 'Document Ready' || trackedInquiry.status === 'Completed' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {trackedInquiry.status === 'Document Ready' || trackedInquiry.status === 'Completed' ? '✓' : '3'}
                      </div>
                      <span className="font-bold text-slate-800 block text-[11px]">3. दस्तावेज तैयार</span>
                      <span className="text-[10px] text-slate-400">प्रमाणपत्र / रसीद</span>
                    </div>

                    <div className="space-y-1">
                      <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${
                        trackedInquiry.status === 'Completed' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {trackedInquiry.status === 'Completed' ? '✓' : '4'}
                      </div>
                      <span className="font-bold text-slate-800 block text-[11px]">4. कार्य पूर्ण</span>
                      <span className="text-[10px] text-slate-400">सत्यापित समाधान</span>
                    </div>

                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 font-semibold block">नागरिक का नाम:</span>
                    <span className="font-bold text-slate-900">{trackedInquiry.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">पंजीकृत मोबाइल:</span>
                    <span className="font-mono font-bold text-slate-900">+91 {trackedInquiry.maskedMobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">सेवा श्रेणी:</span>
                    <span className="font-bold text-[#123B7A]">{trackedInquiry.serviceCategory}</span>
                  </div>
                </div>

                <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">अनुरोध विवरण:</span>
                  <p className="text-slate-600">{trackedInquiry.requestDescription}</p>
                  {trackedInquiry.adminNotes && (
                    <div className="mt-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-[#123B7A]">केंद्र संचालक नोट (Operator Note):</span>
                      <p className="text-slate-700 bg-blue-50/60 p-2 rounded-lg mt-0.5">{trackedInquiry.adminNotes}</p>
                    </div>
                  )}
                </div>

                {/* Quick Interactive Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">SMS रिमाइंडर सेवा:</span>
                    <button
                      onClick={handleToggleReminder}
                      disabled={togglingReminder}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        trackedInquiry.smsUpdatesOptIn
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {trackedInquiry.smsUpdatesOptIn ? '✓ SMS अलर्ट सक्रिय (Active)' : '✗ SMS अलर्ट निष्क्रिय (Click to Enable)'}
                    </button>
                  </div>

                  <button
                    onClick={handleRequestStatusSms}
                    disabled={requestingSms}
                    className="px-4 py-2 rounded-xl bg-[#123B7A] hover:bg-[#0B1F3A] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#F4C542]" />
                    <span>{requestingSms ? 'SMS भेजा जा रहा है...' : 'मेरे मोबाइल पर स्थिति का ताज़ा SMS भेजें'}</span>
                  </button>
                </div>

              </div>

              {/* SMS Notification Timeline & Delivery History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#0B1F3A] flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#168447]" />
                    <span>आपके मोबाइल पर भेजे गए SMS सूचना इतिहास (SMS Delivery Logs)</span>
                  </h4>
                  <span className="text-xs text-slate-500">
                    कुल {smsHistory.length} संदेश प्रेषित
                  </span>
                </div>

                {smsHistory.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    इस अनुरोध हेतु अभी कोई SMS इतिहास दर्ज नहीं हुआ है। ऊपर दिए गए बटन से ताजा SMS प्राप्त करें।
                  </div>
                ) : (
                  <div className="space-y-3">
                    {smsHistory.map((sms, index) => (
                      <div
                        key={sms.id || index}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sms.smsType === 'Confirmation' ? 'bg-blue-100 text-blue-800' :
                              sms.smsType === 'Status Update' ? 'bg-amber-100 text-amber-800' :
                              sms.smsType === 'Scheme Reminder' ? 'bg-purple-100 text-purple-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {sms.smsType}
                            </span>
                            <span className="font-mono text-slate-500 text-[11px]">
                              {sms.gatewayReference || 'SMS-BR-GATEWAY'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                              <span>✓✓ {sms.deliveryStatus}</span>
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {new Date(sms.createdAt).toLocaleString('hi-IN')}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-800 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed font-sans">
                          {sms.messageText}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Tracker Instructions / Features */}
          {!trackedInquiry && !trackingLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#123B7A] flex items-center justify-center font-bold">
                  1
                </div>
                <h5 className="font-bold text-slate-800">तत्काल पावती SMS</h5>
                <p className="text-slate-600 text-[11px]">
                  फॉर्म भरते ही आपके फोन पर संदर्भ संख्या के साथ पावती संदेश भेज दिया जाता है।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  2
                </div>
                <h5 className="font-bold text-slate-800">प्रगति व स्थिति अपडेट</h5>
                <p className="text-slate-600 text-[11px]">
                  जैसे ही आपका प्रमाणपत्र या आवेदन आगे बढ़ता है, आपको स्वचालित स्थिति SMS प्राप्त होता है।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  3
                </div>
                <h5 className="font-bold text-slate-800">योजना डेडलाइन रिमाइंडर</h5>
                <p className="text-slate-600 text-[11px]">
                  पीएम किसान e-KYC, छात्रवृत्ति एवं सब्सिडी की अंतिम तिथि समाप्त होने से पूर्व चेतावनी SMS प्राप्त करें।
                </p>
              </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
};
