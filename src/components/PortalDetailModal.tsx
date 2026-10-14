import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Calendar,
  Building,
  CheckCircle,
  HelpCircle,
  Users,
  Flag,
  PhoneCall
} from 'lucide-react';
import { Portal, Language } from '../types/index.ts';

interface PortalDetailModalProps {
  portal: Portal | null;
  onClose: () => void;
  onReportIssue: (portal: Portal) => void;
  onContactAssistance: (portal: Portal) => void;
  language: Language;
}

export const PortalDetailModal: React.FC<PortalDetailModalProps> = ({
  portal,
  onClose,
  onReportIssue,
  onContactAssistance,
  language,
}) => {
  if (!portal) return null;

  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B1F3A] to-[#123B7A] text-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F28C28] text-white shadow-sm">
                  क्र. सं. #{portal.serialNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  portal.level === 'bihar' 
                    ? 'bg-emerald-600/80 text-white' 
                    : portal.level === 'central'
                    ? 'bg-blue-600/80 text-white'
                    : 'bg-purple-600/80 text-white'
                }`}>
                  {portal.level === 'bihar' ? 'बिहार सरकार (Bihar)' : portal.level === 'central' ? 'भारत सरकार (Central)' : 'केंद्र एवं बिहार'}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/20 text-slate-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{portal.verificationStatus}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-1">
                {isHi ? portal.nameHi : portal.nameEn || portal.nameHi}
              </h2>
              {portal.nameEn && portal.nameEn !== portal.nameHi && (
                <p className="text-xs sm:text-sm text-slate-300">
                  {portal.nameEn}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-slate-800 text-sm">
          
          {/* Department & Verification Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#123B7A] shrink-0" />
              <span className="font-semibold text-slate-700">विभाग / संस्था:</span>
              <span className="text-slate-900 font-medium">{portal.department}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>सत्यापन तिथि: {portal.lastVerifiedAt}</span>
            </div>
          </div>

          {/* 1. What the Portal is / Summary */}
          <div>
            <h3 className="font-bold text-base text-[#0B1F3A] mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F28C28]" />
              <span>यह पोर्टल क्या है? (About Portal)</span>
            </h3>
            <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              {portal.summaryHi}
            </p>
          </div>

          {/* 2. Detailed Description */}
          <div>
            <h3 className="font-bold text-base text-[#0B1F3A] mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#123B7A]" />
              <span>विस्तृत विवरण (Purpose & Scope)</span>
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {portal.descriptionHi}
            </p>
          </div>

          {/* 3. How It Works */}
          <div>
            <h3 className="font-bold text-base text-[#0B1F3A] mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#168447]" />
              <span>यह कैसे काम करता है? (How It Works)</span>
            </h3>
            <p className="text-slate-700 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
              {portal.howItWorksHi}
            </p>
          </div>

          {/* 4. Eligibility & Documents (Only when verified) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portal.eligibilityNotes && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>पात्रता (Eligibility)</span>
                </h4>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {portal.eligibilityNotes}
                </p>
              </div>
            )}

            {portal.documentNotes && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200">
                <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-700" />
                  <span>आवश्यक दस्तावेज़ (Required Documents)</span>
                </h4>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  {portal.documentNotes}
                </p>
              </div>
            )}
          </div>

          {/* Official Website URL Display */}
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">आधिकारिक वेब पता (Official URL):</span>
              <p className="font-mono text-xs text-[#123B7A] font-semibold break-all">
                {portal.officialUrl}
              </p>
            </div>
            <a
              href={portal.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-[#123B7A] hover:bg-[#0B1F3A] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
            >
              <span>आधिकारिक पोर्टल खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>सूचना:</strong> इस जानकारी की आधिकारिक पोर्टल पर पुष्टि करें। सरकारी प्रक्रियाओं या नियमों में समय-समय पर परिवर्तन हो सकता है। शशांक सीएससी केंद्र एक स्वतंत्र नागरिक सहायता केंद्र है।
            </p>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="bg-slate-50 px-5 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onReportIssue(portal)}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>लिंक की समस्या रिपोर्ट करें</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onContactAssistance(portal);
              }}
              className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>सीएससी केंद्र सहायता लें</span>
            </button>

            <a
              href={portal.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#F28C28] hover:bg-[#d9771d] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <span>सीधे वेबसाइट खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
