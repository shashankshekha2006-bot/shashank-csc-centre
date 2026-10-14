import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileText,
  Users,
  Award,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { Scheme, Language } from '../types/index.ts';

interface GovernmentSchemesSectionProps {
  schemes: Scheme[];
  onOpenContact: (schemeName: string) => void;
  language: Language;
}

export const GovernmentSchemesSection: React.FC<GovernmentSchemesSectionProps> = ({
  schemes,
  onOpenContact,
  language,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'bihar' | 'central'>('all');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const isHi = language === 'hi';

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      if (typeFilter !== 'all' && s.governmentType !== typeFilter) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchHi = s.nameHi.toLowerCase().includes(q);
        const matchEn = s.nameEn.toLowerCase().includes(q);
        const matchSummary = s.summaryHi.toLowerCase().includes(q);
        const matchDept = s.department.toLowerCase().includes(q);
        if (!matchHi && !matchEn && !matchSummary && !matchDept) return false;
      }
      return true;
    });
  }, [schemes, typeFilter, search]);

  return (
    <section id="government-schemes" className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#168447]/15 text-[#168447] mb-2 border border-[#168447]/20">
          <Award className="w-3.5 h-3.5" />
          <span>{isHi ? 'जन-कल्याणकारी योजनाएं' : 'Welfare Schemes'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
          {isHi ? 'बिहार एवं केंद्र सरकार की प्रमुख सरकारी योजनाएँ' : 'Key Bihar & Central Government Schemes'}
        </h2>
        <p className="text-sm text-slate-600 font-medium max-w-2xl mt-1">
          {isHi 
            ? 'पात्रता, अनुदान लाभ, आवश्यक कागजात और आवेदन प्रक्रिया की प्रामाणिक जानकारी।' 
            : 'Authentic information on eligibility, benefits, required documents and application process.'}
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isHi ? "योजना का नाम खोजें... (उदा: PM Kisan, उद्यमी योजना, आवास)" : "Search schemes by name..."}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
          />
        </div>

        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              typeFilter === 'all' ? 'bg-[#123B7A] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            सभी योजनाएं ({schemes.length})
          </button>
          <button
            onClick={() => setTypeFilter('bihar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              typeFilter === 'bihar' ? 'bg-[#168447] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            बिहार सरकार
          </button>
          <button
            onClick={() => setTypeFilter('central')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              typeFilter === 'central' ? 'bg-[#0B1F3A] text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            केंद्र सरकार
          </button>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const isBihar = scheme.governmentType === 'bihar';
          return (
            <div
              key={scheme.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isBihar ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isBihar ? 'बिहार सरकार योजना' : 'केंद्र सरकार योजना'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    सत्यापित: {scheme.lastVerifiedAt}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] hover:text-[#123B7A] transition-colors">
                    {scheme.nameHi}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{scheme.department}</p>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {scheme.summaryHi}
                </p>

                {/* Key Benefits */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>योजना के लाभ (Benefits):</span>
                  </span>
                  <p className="leading-snug">{scheme.benefitsHi}</p>
                </div>

                {/* Eligibility & Documents Snippet */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700">पात्रता: </span>
                    <span className="text-slate-600">{scheme.eligibilityHi}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700">आवश्यक दस्तावेज़: </span>
                    <span className="text-slate-600">{scheme.documentsHi}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenContact(scheme.nameHi)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#123B7A] text-[#123B7A] font-bold text-xs transition-colors cursor-pointer"
                  >
                    सहायता लें
                  </button>

                  <button
                    onClick={() => onOpenContact(`${scheme.nameHi} - SMS डेडलाइन रिमाइंडर`)}
                    className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    title="इस योजना की अंतिम तिथि व स्थिति का निःशुल्क SMS प्राप्त करें"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SMS रिमाइंडर</span>
                  </button>
                </div>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#123B7A] hover:bg-[#0B1F3A] text-white font-bold text-xs flex items-center gap-1 shadow transition-colors"
                >
                  <span>आधिकारिक पोर्टल</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
