export interface NoticeItem {
  id?: number;
  titleHi: string;
  titleEn: string;
  contentHi: string;
  category: string;
  date: string;
  isUrgent?: boolean;
  linkUrl?: string;
}

export const LATEST_PUBLIC_NOTICES: NoticeItem[] = [
  {
    titleHi: "बिहार भूमि विशेष सर्वेक्षण: प्रपत्र-2 (स्व-घोषणा) एवं वंशावली सत्यापन जारी",
    titleEn: "Bihar Special Land Survey: Self-Declaration & Genealogy Verification Active",
    contentHi: "सुपौल जिले सहित बिहार के सभी मौजों में भूमि सर्वेक्षण कार्य प्रगति पर है। सभी रैयत dlrs.bihar.gov.in पर प्रपत्र-2 में स्व-घोषणा और वंशावली ऑनलाइन अवश्य अपलोड करें।",
    category: "भूमि सर्वेक्षण",
    date: "14 अक्टूबर 2026",
    isUrgent: true,
    linkUrl: "https://dlrs.bihar.gov.in"
  },
  {
    titleHi: "PM-Kisan 19वीं किस्त हेतु आधार ई-केवाईसी और बैंक खाता सीडिंग अनिवार्य",
    titleEn: "PM-Kisan 19th Installment: Aadhaar eKYC and NPCI Seeding Mandatory",
    contentHi: "प्रधानमंत्री किसान सम्मान निधि की आगामी किस्त पाने के लिए किसान अपने बैंक खाते में आधार NPCI डीबीटी मैपिंग और MyAadhaar/CSC से बायोमेट्रिक ई-केवाईसी शीघ्र पूरी करा लें।",
    category: "कृषि योजना",
    date: "12 अक्टूबर 2026",
    isUrgent: true,
    linkUrl: "https://pmkisan.gov.in"
  },
  {
    titleHi: "बिहार पोस्ट मैट्रिक छात्रवृत्ति (PMS Online) सत्र 2025-26 के आवेदन की अंतिम तिथि",
    titleEn: "Bihar Post Matric Scholarship (PMS) Application Deadline Reminder",
    contentHi: "10वीं उत्तीर्ण SC, ST, BC एवं EBC वर्ग के छात्र जो कॉलेज या तकनीकी संस्थान में नामांकित हैं, वे आवश्यक बोनाफाइड और फीस रसीद के साथ pmsonline.bihar.gov.in पर आवेदन करें।",
    category: "छात्रवृत्ति",
    date: "08 अक्टूबर 2026",
    isUrgent: false,
    linkUrl: "https://pmsonline.bihar.gov.in"
  },
  {
    titleHi: "आयुष्मान भारत: परिवार के सभी सदस्यों का आयुष्मान कार्ड सीएससी केंद्र पर बनाएं",
    titleEn: "Ayushman Bharat: Create Free Ayushman Card for Family Members",
    contentHi: "राशन कार्ड में नाम दर्ज प्रत्येक नागरिक का ₹5 लाख का कैशलेस आयुष्मान गोल्डन कार्ड शशांक सीएससी केंद्र पर आधार फेस या बायोमेट्रिक ऑथेंटिकेशन द्वारा उपलब्ध है।",
    category: "स्वास्थ्य सेवा",
    date: "05 अक्टूबर 2026",
    isUrgent: false,
    linkUrl: "https://beneficiary.nha.gov.in"
  },
  {
    titleHi: "नॉर्थ बिहार पावर: स्मार्ट प्रीपेड मीटर रिचार्ज एवं नया बिजली कनेक्शन",
    titleEn: "NBPDCL Smart Meter Recharge & New Connection Services Active",
    contentHi: "सुपौल जिले के उपभोक्ता 'सुविधा' ऐप या सीएससी केंद्र से अपना स्मार्ट मीटर बैलेंस चेक व तुरंत रिचार्ज कर सकते हैं।",
    category: "बिजली सेवा",
    date: "01 अक्टूबर 2026",
    isUrgent: false,
    linkUrl: "https://nbpdcl.co.in"
  }
];
