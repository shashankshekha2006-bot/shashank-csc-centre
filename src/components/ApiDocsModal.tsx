import React, { useState } from 'react';
import { X, Play, Code, CheckCircle, Database, Lock, Copy, Check } from 'lucide-react';

interface ApiDocsModalProps {
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ onClose }) => {
  const [activeEndpoint, setActiveEndpoint] = useState<string>('/api/portals');
  const [responseOutput, setResponseOutput] = useState<string>('Click "Execute Query" to test this endpoint in real-time...');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/portals',
      desc: 'List all 150 government portals with search & category filters',
      params: '?category=agriculture&level=bihar&search=kisan',
      sampleUrl: '/api/portals?category=agriculture'
    },
    {
      method: 'GET',
      path: '/api/portals/5',
      desc: 'Get portal details by serial number or slug (e.g. #5 RTPS)',
      params: '',
      sampleUrl: '/api/portals/5'
    },
    {
      method: 'GET',
      path: '/api/categories',
      desc: 'Get all 29 portal categories with names in Hindi and English',
      params: '',
      sampleUrl: '/api/categories'
    },
    {
      method: 'GET',
      path: '/api/schemes',
      desc: 'Get key welfare schemes with eligibility & document notes',
      params: '',
      sampleUrl: '/api/schemes'
    },
    {
      method: 'GET',
      path: '/api/notices',
      desc: 'Get latest public notices and urgent alerts',
      params: '',
      sampleUrl: '/api/notices'
    },
    {
      method: 'GET',
      path: '/api/settings',
      desc: 'Get centre details, owner info, address and WhatsApp links',
      params: '',
      sampleUrl: '/api/settings'
    },
    {
      method: 'POST',
      path: '/api/contact',
      desc: 'Submit citizen inquiry, saves to PostgreSQL, generates CSC ref number',
      isPost: true,
      sampleBody: {
        fullName: "नागरिक परीक्षण",
        mobileNumber: "9241262642",
        email: "citizen@example.com",
        serviceCategory: "RTPS एवं प्रमाणपत्र",
        requestDescription: "जाति एवं निवास प्रमाणपत्र आवेदन सहायता",
        privacyAccepted: true
      }
    },
    {
      method: 'GET',
      path: '/api/docs',
      desc: 'OpenAPI 3.0 compatible specification for the CSC system',
      params: '',
      sampleUrl: '/api/docs'
    }
  ];

  const handleExecute = async (ep: typeof endpoints[0]) => {
    setLoading(true);
    try {
      if (ep.isPost) {
        const res = await fetch(ep.path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ep.sampleBody),
        });
        const data = await res.json();
        setResponseOutput(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch(ep.sampleUrl || ep.path);
        const data = await res.json();
        setResponseOutput(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-6">
        
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#123B7A] text-[#F28C28]">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Shashank CSC Centre — RESTful API Documentation</h3>
              <p className="text-xs text-slate-300">PostgreSQL Backend • Real Endpoints • OpenAPI 3.0 Standard</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Endpoints List */}
          <div className="md:col-span-5 space-y-2">
            <h4 className="font-bold text-slate-700 uppercase tracking-wide text-[11px] mb-2">
              उपलब्ध API एंडपॉइंट्स (Available Endpoints)
            </h4>
            <div className="space-y-1.5">
              {endpoints.map((ep) => {
                const isSelected = activeEndpoint === ep.path;
                return (
                  <div
                    key={ep.path}
                    onClick={() => {
                      setActiveEndpoint(ep.path);
                      handleExecute(ep);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#123B7A] ring-1 ring-[#123B7A]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="font-mono font-bold text-slate-900 truncate">
                        {ep.path}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 line-clamp-1">{ep.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Tester & Response Console */}
          <div className="md:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 uppercase tracking-wide text-[11px]">
                वास्तविक समय प्रतिक्रिया (Real Server Response)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'कॉपी हुआ' : 'JSON कॉपी करें'}</span>
              </button>
            </div>

            <div className="flex-1 bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-auto max-h-[380px] border border-slate-800 shadow-inner">
              <pre>{loading ? 'Loading response from PostgreSQL Cloud SQL...' : responseOutput}</pre>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-[#123B7A]" />
                <span>सुरक्षित प्रमाणीकरण (Security & Authorization):</span>
              </p>
              <p className="text-[11px]">
                प्रशासनिक एंडपॉइंट्स (<code className="bg-slate-200 px-1 py-0.5 rounded text-[#0B1F3A]">/api/admin/*</code>) Bearer टोकन द्वारा सुरक्षित हैं।
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#123B7A] text-white text-xs font-bold rounded-xl shadow cursor-pointer"
          >
            बंद करें
          </button>
        </div>

      </div>
    </div>
  );
};
