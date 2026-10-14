import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Filter,
  CheckCircle,
  Building,
  Flag,
  Info,
  ChevronRight,
  ArrowUpDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Portal, Category, Language } from '../types/index.ts';

interface PortalsDirectoryProps {
  portals: Portal[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (key: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenPortalModal: (portal: Portal) => void;
  onReportIssue: (portal: Portal) => void;
  language: Language;
}

export const PortalsDirectory: React.FC<PortalsDirectoryProps> = ({
  portals,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenPortalModal,
  onReportIssue,
  language,
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'bihar' | 'central'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'Verified' | 'Verification Required'>('all');
  const [sortBy, setSortBy] = useState<'serial' | 'name' | 'popular'>('serial');
  const [visibleCount, setVisibleCount] = useState<number>(30);

  const isHi = language === 'hi';

  // Filter & Search Logic
  const filteredPortals = useMemo(() => {
    return portals.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categoryKey !== selectedCategory) {
        return false;
      }
      // Level match
      if (levelFilter === 'bihar' && p.level !== 'bihar' && p.level !== 'both') {
        return false;
      }
      if (levelFilter === 'central' && p.level !== 'central' && p.level !== 'both') {
        return false;
      }
      // Verification match
      if (verificationFilter !== 'all' && p.verificationStatus !== verificationFilter) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchHindi = p.nameHi.toLowerCase().includes(q);
        const matchEnglish = (p.nameEn || '').toLowerCase().includes(q);
        const matchDept = p.department.toLowerCase().includes(q);
        const matchSummary = p.summaryHi.toLowerCase().includes(q);
        const matchUrl = p.officialUrl.toLowerCase().includes(q);
        const matchSerial = String(p.serialNumber) === q;
        if (!matchHindi && !matchEnglish && !matchDept && !matchSummary && !matchUrl && !matchSerial) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.nameHi.localeCompare(b.nameHi, 'hi');
      }
      if (sortBy === 'popular') {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      return a.serialNumber - b.serialNumber;
    });
  }, [portals, selectedCategory, levelFilter, verificationFilter, searchQuery, sortBy]);

  const displayedPortals = useMemo(() => {
    return filteredPortals.slice(0, visibleCount);
  }, [filteredPortals, visibleCount]);

  const handleClearFilters = () => {
    onSelectCategory('all');
    setLevelFilter('all');
    setVerificationFilter('all');
    onSearchChange('');
    setSortBy('serial');
    setVisibleCount(30);
  };

  const currentCategoryObj = categories.find((c) => c.key === selectedCategory);

  return (
    <section id="portals-directory" className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Title & Section Header */}
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#123B7A]/10 text-[#123B7A] mb-2 border border-[#123B7A]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#168447]" />
              <span>{isHi ? 'बिहार सरकार एवं केंद्र सरकार' : 'Government of Bihar & India'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {isHi ? 'आधिकारिक सरकारी पोर्टल डायरेक्टरी' : 'Official Government Portals Directory'}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {isHi 
                ? 'मूल पीडीएफ के सभी 150 प्रमाणित सरकारी पोर्टल — सीधे आधिकारिक वेबसाइट पर जाएँ।' 
                : 'All 150 verified government portals from source list with direct links.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-center sm:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
              कुल {filteredPortals.length} पोर्टल प्रदर्शित
            </span>
          </div>
        </div>
      </div>

      {/* Control Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-6 space-y-4">
        
        {/* Search Input Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isHi 
                ? "पोर्टल का नाम, विभाग, क्रम संख्या या कीवर्ड से खोजें... (उदा: 5, RTPS, दाखिल खारिज, PM Kisan)" 
                : "Search by portal name, department, serial #, or keywords..."}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A] bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Level Filter: All / Bihar / Central */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
            <button
              onClick={() => setLevelFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                levelFilter === 'all' ? 'bg-[#123B7A] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'सभी स्तर' : 'All Levels'}
            </button>
            <button
              onClick={() => setLevelFilter('bihar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                levelFilter === 'bihar' ? 'bg-[#168447] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'बिहार सरकार' : 'Bihar Govt'}
            </button>
            <button
              onClick={() => setLevelFilter('central')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                levelFilter === 'central' ? 'bg-[#0B1F3A] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'केंद्र सरकार' : 'Central Govt'}
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
            >
              <option value="serial">क्रम संख्या (1-150)</option>
              <option value="popular">लोकप्रिय पोर्टल पहले</option>
              <option value="name">नाम अनुसार (अ-ज्ञ)</option>
            </select>
          </div>
        </div>

        {/* Categories Horizontal Scroll Pills */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>{isHi ? 'सेवा श्रेणी के अनुसार फ़िल्टर करें:' : 'Filter by Service Category:'}</span>
            {(selectedCategory !== 'all' || levelFilter !== 'all' || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-[#F28C28] hover:text-[#d9771d] flex items-center gap-1 cursor-pointer font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>फ़िल्टर रीसेट करें</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#123B7A] text-white shadow-md ring-2 ring-[#F28C28]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{isHi ? cat.nameHi : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Active Category Description Banner */}
      {currentCategoryObj && selectedCategory !== 'all' && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-[#0B1F3A]">
              {isHi ? currentCategoryObj.nameHi : currentCategoryObj.nameEn}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {currentCategoryObj.descriptionHi}
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 shrink-0 cursor-pointer"
          >
            सभी 150 देखें ✕
          </button>
        </div>
      )}

      {/* Portals Cards Grid */}
      {displayedPortals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedPortals.map((portal) => {
            const isBihar = portal.level === 'bihar';
            return (
              <div
                key={`${portal.serialNumber}-${portal.slug}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-[#123B7A]/40"
              >
                {/* Card Header Top */}
                <div className="p-4 sm:p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        #{portal.serialNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isBihar 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : portal.level === 'central'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {isBihar ? 'बिहार सरकार' : portal.level === 'central' ? 'भारत सरकार' : 'केंद्र / बिहार'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>सत्यापित</span>
                      </span>
                    </div>
                  </div>

                  {/* Portal Title */}
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-[#123B7A] transition-colors leading-snug">
                      {portal.nameHi}
                    </h3>
                    {portal.nameEn && portal.nameEn !== portal.nameHi && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                        {portal.nameEn}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="flex items-start gap-1.5 text-xs text-slate-600">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">{portal.department}</span>
                  </div>

                  {/* Summary Hindi */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {portal.summaryHi}
                  </p>
                </div>

                {/* Card Bottom / Actions */}
                <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-2">
                  
                  {/* Clean Official URL preview */}
                  <div className="text-[11px] font-mono text-slate-400 truncate flex items-center justify-between">
                    <span className="truncate">{portal.officialUrl}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">सत्यापित: {portal.lastVerifiedAt}</span>
                  </div>

                  {/* 2 Primary Buttons: Open Official Site & View Full Details */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onOpenPortalModal(portal)}
                      className="w-full py-2 px-3 rounded-xl border border-[#123B7A]/30 text-[#123B7A] hover:bg-[#123B7A]/10 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>पूरी जानकारी देखें</span>
                    </button>

                    <a
                      href={portal.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#123B7A] hover:bg-[#0B1F3A] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 group-hover:bg-[#F28C28]"
                      title="Open Official Website in new tab"
                    >
                      <span>आधिकारिक वेबसाइट</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Report issue link */}
                  <div className="text-center pt-1">
                    <button
                      onClick={() => onReportIssue(portal)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                    >
                      <Flag className="w-3 h-3" />
                      <span>लिंक की समस्या रिपोर्ट करें</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            {isHi ? 'कोई पोर्टल नहीं मिला' : 'No Portals Found'}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {isHi 
              ? 'आपके द्वारा खोजे गए शब्द या चुने गए फ़िल्टर के अनुसार कोई परिणाम नहीं मिला। कृपया दूसरा शब्द खोजें या फ़िल्टर रीसेट करें।'
              : 'No portals matched your search terms or active filters. Please try another keyword or reset filters.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-[#123B7A] text-white text-sm font-bold rounded-xl shadow hover:bg-[#0B1F3A] transition-colors cursor-pointer"
          >
            सभी 150 पोर्टल देखें
          </button>
        </div>
      )}

      {/* Load More Button for progressive mobile loading */}
      {visibleCount < filteredPortals.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 30, filteredPortals.length))}
            className="px-6 py-3 bg-white border border-slate-300 hover:border-[#123B7A] text-[#123B7A] font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            और पोर्टल लोड करें ({filteredPortals.length - visibleCount} शेष)
          </button>
        </div>
      )}

      {/* Directory Disclaimer */}
      <div className="mt-10 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 text-center max-w-4xl mx-auto space-y-1">
        <p className="font-semibold text-slate-700">
          अस्वीकरण (Disclaimer):
        </p>
        <p>
          शशांक सीएससी केंद्र एक स्वतंत्र सूचना एवं नागरिक सहायता केंद्र है। यह वेबसाइट भारत सरकार या बिहार सरकार का आधिकारिक पोर्टल नहीं है। सभी बाहरी लिंक संबंधित सरकारी विभागों के आधिकारिक वेब पतों पर ले जाते हैं।
        </p>
      </div>

    </section>
  );
};
