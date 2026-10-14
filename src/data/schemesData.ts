export interface SchemeItem {
  id?: number;
  nameHi: string;
  nameEn: string;
  slug: string;
  categoryKey: string;
  department: string;
  governmentType: 'bihar' | 'central';
  summaryHi: string;
  benefitsHi: string;
  eligibilityHi: string;
  documentsHi: string;
  applyProcessHi: string;
  officialUrl: string;
  lastVerifiedAt: string;
  verificationStatus: 'Verified' | 'Verification Required';
}

export const ALL_GOVERNMENT_SCHEMES: SchemeItem[] = [
  {
    nameHi: "प्रधानमंत्री किसान सम्मान निधि (PM-Kisan)",
    nameEn: "Pradhan Mantri Kisan Samman Nidhi",
    slug: "pm-kisan-samman-nidhi",
    categoryKey: "agriculture",
    department: "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
    governmentType: "central",
    summaryHi: "पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता तीन समान किश्तों में सीधे बैंक खाते में (DBT)।",
    benefitsHi: "प्रति चार माह पर ₹2,000 की किस्त, वर्ष में कुल ₹6,000 डीबीटी के माध्यम से सीधे आधार लिंक्ड बैंक खाते में।",
    eligibilityHi: "खेती योग्य भूमि के स्वामी किसान परिवार। संस्थागत भूधारक, संवैधानिक पदधारक और आयकरदाता पात्र नहीं हैं।",
    documentsHi: "आधार कार्ड, जमीन की अद्यतन रसीद/जमाबंदी नकल, बैंक पासबुक (Aadhaar Seeded), सक्रिय मोबाइल नंबर।",
    applyProcessHi: "pmkisan.gov.in पर Farmers Corner > New Farmer Registration में ऑनलाइन आवेदन करें या शशांक सीएससी केंद्र पर आकर बायोमेट्रिक eKYC कराएं।",
    officialUrl: "https://pmkisan.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "बिहार मुख्यमंत्री उद्यमी योजना",
    nameEn: "Bihar Mukhyamantri Udyami Yojana",
    slug: "bihar-mukhyamantri-udyami-yojana",
    categoryKey: "business_msme",
    department: "उद्योग विभाग, बिहार सरकार",
    governmentType: "bihar",
    summaryHi: "बिहार के युवाओं, महिलाओं, अनुसूचित जाति, जनजाति एवं अत्यंत पिछड़ा वर्ग के उद्यमियों को ₹10 लाख तक की वित्तीय सहायता।",
    benefitsHi: "स्वीकृत परियोजना लागत का 50% (अधिकतम ₹5,00,000) सरकारी अनुदान (माफ) तथा 50% राशि ब्याजमुक्त अथवा मात्र 1% साधारण ब्याज पर 84 किश्तों में देय ऋण।",
    eligibilityHi: "बिहार के स्थायी निवासी, आयु 18 से 50 वर्ष, न्यूनतम 10+2 (इंटरमीडिएट) या आईटीआई/पॉलिटेक्निक उत्तीर्ण, प्रोप्राइटरशिप फर्म।",
    documentsHi: "आधार कार्ड, निवास प्रमाण पत्र, जाति प्रमाण पत्र, 10वीं व 12वीं अंकपत्र, पैन कार्ड, बैंक रद्द चेक/पासबुक, हस्ताक्षर व फोटो।",
    applyProcessHi: "उद्योग विभाग के पोर्टल udyami.bihar.gov.in पर वार्षिक आवेदन विंडो खुलने पर ऑनलाइन फॉर्म भरें।",
    officialUrl: "https://industries.bihar.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
    nameEn: "Ayushman Bharat PM-JAY",
    slug: "ayushman-bharat-pmjay",
    categoryKey: "healthcare",
    department: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA), स्वास्थ्य मंत्रालय",
    governmentType: "central",
    summaryHi: "प्रति पात्र परिवार को प्रति वर्ष ₹5,00,000 तक का निःशुल्क कैशलेस अस्पताल उपचार।",
    benefitsHi: "सूचीबद्ध सरकारी और निजी अस्पतालों में द्वितीयक और तृतीयक स्तर की बीमारियों का ₹5 लाख तक का कैशलेस इलाज, दवाएं और जांचें निःशुल्क।",
    eligibilityHi: "SECC-2011 सूची में शामिल परिवार तथा बिहार सरकार के राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) राशन कार्ड धारक परिवार।",
    documentsHi: "राशन कार्ड, आधार कार्ड (सभी पारिवारिक सदस्यों का), सक्रिय मोबाइल नंबर।",
    applyProcessHi: "beneficiary.nha.gov.in पर जाकर राशन कार्ड नंबर से नाम खोजें, ई-केवाईसी पूर्ण करें अथवा शशांक सीएससी केंद्र पर आकर कार्ड बनवाएं।",
    officialUrl: "https://beneficiary.nha.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "बिहार पोस्ट मैट्रिक छात्रवृत्ति योजना (PMS Online)",
    nameEn: "Bihar Post Matric Scholarship Scheme",
    slug: "bihar-post-matric-scholarship",
    categoryKey: "education",
    department: "शिक्षा विभाग / कल्याण विभाग, बिहार सरकार",
    governmentType: "bihar",
    summaryHi: "10वीं के बाद आईटीआई, डिप्लोमा, इंटर, बीए, बीएससी, बीकॉम, बीटेक, बीएड, मेडिकल करने वाले SC, ST, BC, EBC छात्रों को शिक्षण शुल्क प्रतिपूर्ति।",
    benefitsHi: "कोर्स के अनुसार अनिवार्य ट्यूशन फीस और मासिक अनुरक्षण भत्ता सीधे छात्र के आधार सीडेड बैंक खाते में।",
    eligibilityHi: "बिहार के स्थायी निवासी SC, ST, BC, EBC छात्र जिनके माता-पिता की कुल वार्षिक आय ₹3,00,000 से कम हो और वे मान्यता प्राप्त संस्थान में अध्ययनरत हों।",
    documentsHi: "10वीं की मार्कशीट, वर्तमान कक्षा का बोनाफाइड सर्टिफिकेट, फीस रसीद, जाति प्रमाण पत्र, आय प्रमाण पत्र (अद्यतन), आवासीय प्रमाण पत्र, आधार कार्ड।",
    applyProcessHi: "pmsonline.bihar.gov.in पर छात्र पंजीकरण करें, दस्तावेज अपलोड करें और संस्थान सत्यापन के बाद जिला स्तर से राशि स्वीकृत होती है।",
    officialUrl: "https://pmsonline.bihar.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "मुख्यमंत्री वृद्धजन पेंशन योजना (MVPY)",
    nameEn: "Mukhyamantri Vridhjan Pension Yojana",
    slug: "bihar-mukhyamantri-vridhjan-pension",
    categoryKey: "pension_welfare",
    department: "समाज कल्याण विभाग, बिहार सरकार",
    governmentType: "bihar",
    summaryHi: "बिहार के 60 वर्ष या उससे अधिक आयु के सभी वृद्धजनों को सम्मानपूर्वक जीवन यापन हेतु मासिक पेंशन।",
    benefitsHi: "60 से 79 वर्ष के वृद्धजनों को ₹400 प्रति माह तथा 80 वर्ष से अधिक आयु के बुजुर्गों को ₹500 प्रति माह सीधे बैंक खाते में।",
    eligibilityHi: "बिहार के 60 वर्ष या अधिक उम्र के वरिष्ठ नागरिक। आवेदक को केंद्र या राज्य सरकार से कोई अन्य पेंशन या पारिवारिक पेंशन न मिल रही हो।",
    documentsHi: "आधार कार्ड, बैंक पासबुक, मतदाता पहचान पत्र, आधार सहमति पत्र, पासपोर्ट साइज फोटो।",
    applyProcessHi: "RTPS पोर्टल serviceonline.bihar.gov.in या प्रखंड विकास पदाधिकारी (BDO) कार्यालय के सामाजिक सुरक्षा कोषांग में ऑनलाइन आवेदन करें।",
    officialUrl: "https://elabharthi.bihar.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "प्रधानमंत्री आवास योजना — ग्रामीण (PMAY-G)",
    nameEn: "Pradhan Mantri Awaas Yojana — Gramin",
    slug: "pm-awaas-yojana-gramin",
    categoryKey: "housing_livelihood",
    department: "ग्रामीण विकास मंत्रालय, भारत सरकार एवं बिहार ग्रामीण विकास विभाग",
    governmentType: "central",
    summaryHi: "ग्रामीण बेघर एवं कच्चे घरों में रहने वाले परिवारों को बुनियादी सुविधाओं से युक्त पक्का मकान निर्माण हेतु ₹1,20,000 की वित्तीय सहायता।",
    benefitsHi: "₹1,20,000 की वित्तीय सहायता तीन किश्तों (₹40,000 + ₹75,000 + ₹5,000) में, स्वच्छ भारत के तहत ₹12,000 शौचालय अनुदान और 90 दिन की मनरेगा मजदूरी।",
    eligibilityHi: "आवास प्लस सूची में दर्ज आवासहीन अथवा कच्चे/टूटे-फूटे मकानों में रहने वाले ग्रामीण परिवार।",
    documentsHi: "आधार कार्ड, जॉब कार्ड संख्या, बैंक पासबुक, जमीन पर घर निर्माण स्थल की जियो-टैग फोटो।",
    applyProcessHi: "ग्राम पंचायत की आवास प्लस सूची के आधार पर पंचायत सचिव/ग्रामीण आवास सहायक द्वारा जियो-टैगिंग के बाद सीधे स्वीकृति दी जाती है।",
    officialUrl: "https://pmayg.nic.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "प्रधानमंत्री मत्स्य संपदा योजना (PMMSY)",
    nameEn: "Pradhan Mantri Matsya Sampada Yojana",
    slug: "pm-matsya-sampada-yojana",
    categoryKey: "fisheries",
    department: "मत्स्य पालन विभाग, भारत सरकार",
    governmentType: "central",
    summaryHi: "मछली पालन हेतु नए तालाब निर्माण, बायोफ्लॉक, हैचरी, फिश फीड मिल और कोल्ड स्टोरेज पर 40% से 60% सरकारी अनुदान।",
    benefitsHi: "सामान्य वर्ग के लाभार्थियों को परियोजना लागत का 40% तथा महिला, एससी, एसटी लाभार्थियों को 60% तक पूंजीगत सब्सिडी।",
    eligibilityHi: "व्यक्तिगत किसान, मत्स्य पालक, स्वयं सहायता समूह (SHG), मत्स्य सहकारी समितियां एवं उद्यमी।",
    documentsHi: "आधार कार्ड, जमीन का दस्तावेज/पट्टा, बैंक पासबुक, विस्तृत परियोजना रिपोर्ट (DPR)।",
    applyProcessHi: "pmmsy.dof.gov.in पर ऑनलाइन पंजीकरण करें अथवा जिला मत्स्य पदाधिकारी के समक्ष आवेदन जमा करें।",
    officialUrl: "https://pmmsy.dof.gov.in",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  },
  {
    nameHi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    nameEn: "Prime Minister's Employment Generation Programme",
    slug: "pmegp-loan-scheme",
    categoryKey: "business_msme",
    department: "खादी एवं ग्रामोद्योग आयोग (KVIC) / MSME मंत्रालय",
    governmentType: "central",
    summaryHi: "विनिर्माण उद्योग (₹50 लाख तक) और सेवा इकाई (₹20 लाख तक) लगाने हेतु 15% से 35% तक सरकारी सब्सिडी वाला बैंक ऋण।",
    benefitsHi: "ग्रामीण क्षेत्रों में आरक्षित वर्ग (SC/ST/OBC/महिला/अल्पसंख्यक) को 35% तथा सामान्य वर्ग को 25% तक मार्जिन मनी (सब्सिडी) सहायता।",
    eligibilityHi: "18 वर्ष से अधिक आयु का कोई भी भारतीय नागरिक। विनिर्माण में ₹10 लाख से अधिक और सेवा में ₹5 लाख से अधिक प्रोजेक्ट के लिए कम से कम 8वीं पास।",
    documentsHi: "आधार कार्ड, पैन कार्ड, जाति प्रमाण पत्र, शैक्षणिक योग्यता प्रमाण पत्र, प्रोजेक्ट रिपोर्ट (DPR), फोटो।",
    applyProcessHi: "kviconline.gov.in/pmegpeportal पर ऑनलाइन आवेदन करें, बैंक चयन करें और ईडीपी प्रशिक्षण के बाद ऋण प्राप्त करें।",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal",
    lastVerifiedAt: "2026-10-14",
    verificationStatus: "Verified"
  }
];
