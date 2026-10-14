import React, { useState } from 'react';
import { X, Flag, CheckCircle2, AlertCircle } from 'lucide-react';
import { Portal } from '../types/index.ts';

interface ReportIssueModalProps {
  portal: Portal | null;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ portal, onClose }) => {
  const [issueType, setIssueType] = useState('Site Not Opening');
  const [userComment, setUserComment] = useState('');
  const [userContact, setUserContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!portal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) {
      setErrorMsg('कृपया समस्या का संक्षिप्त विवरण लिखें।');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/report-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portalSerialNumber: portal.serialNumber,
          portalName: portal.nameHi,
          issueType,
          userComment: userComment.trim(),
          userContact: userContact.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || 'रिपोर्ट दर्ज नहीं हो सकी।');
      }
    } catch (err) {
      setErrorMsg('सर्वर से कनेक्ट करने में विफल।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#0B1F3A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-[#F28C28]" />
            <h3 className="font-bold text-base">लिंक की समस्या रिपोर्ट करें</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-slate-900">धन्यवाद! रिपोर्ट प्राप्त हुई</h4>
              <p className="text-sm text-slate-600">
                शशांक सीएससी केंद्र टीम इस पोर्टल लिंक ({portal.nameHi}) की शीघ्र जांच करेगी और आवश्यक होने पर सुधार करेगी।
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2 bg-[#123B7A] text-white text-sm font-semibold rounded-xl"
              >
                बंद करें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                <span className="font-semibold text-slate-500">पोर्टल:</span>
                <p className="font-bold text-slate-800">#{portal.serialNumber} - {portal.nameHi}</p>
                <p className="font-mono text-slate-600 truncate">{portal.officialUrl}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">समस्या का प्रकार</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                >
                  <option value="Site Not Opening">वेबसाइट नहीं खुल रही (Site Not Opening / 404)</option>
                  <option value="Wrong URL">गलत लिंक है (Wrong URL)</option>
                  <option value="Procedure Changed">सरकारी प्रक्रिया बदल चुकी है (Procedure Changed)</option>
                  <option value="Verification Required">सत्यापन आवश्यक है (Verification Required)</option>
                  <option value="Other">अन्य समस्या (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">विवरण (आप क्या समस्या देख रहे हैं?)*</label>
                <textarea
                  rows={3}
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="उदा: यह लिंक सर्वर डाउन बता रहा है अथवा नया पोर्टल चालू हुआ है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">आपका मोबाइल नंबर या ईमेल (वैकल्पिक)</label>
                <input
                  type="text"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                  placeholder="यदि आप अपडेट पाना चाहते हैं"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'भेज रहे हैं...' : 'रिपोर्ट भेजें'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
