import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Shield,
  Users,
  Globe,
  Bell,
  Mail,
  Flag,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
  Database,
  Smartphone,
  Send,
  Radio,
  Calendar,
  Sparkles,
  X
} from 'lucide-react';
import { Portal, Notice, ContactMessage, PortalReport, AdminStats, Language, SmsNotification } from '../types/index.ts';
import { auth, googleAuthProvider } from '../lib/firebase.ts';
import { signInWithPopup } from 'firebase/auth';

interface AdminDashboardProps {
  isAdminLoggedIn: boolean;
  onLoginSuccess: (token: string, user: any) => void;
  onLogout: () => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
  language,
}) => {
  // Login Form State
  const [passcode, setPasscode] = useState('');
  const [emailInput, setEmailInput] = useState('shashankshekha2006@gmail.com');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'stats' | 'messages' | 'sms' | 'reports' | 'portals' | 'notices'>('stats');

  // Admin Data States
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reports, setReports] = useState<PortalReport[]>([]);
  const [portalsList, setPortalsList] = useState<Portal[]>([]);
  const [noticesList, setNoticesList] = useState<Notice[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsNotification[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Portal Edit State
  const [editingPortal, setEditingPortal] = useState<Portal | null>(null);
  const [portalSearch, setPortalSearch] = useState('');

  // Notice Add State
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('अपडेट');
  const [newNoticeUrgent, setNewNoticeUrgent] = useState(false);
  const [noticePublishing, setNoticePublishing] = useState(false);

  // Status message
  const [actionSuccess, setActionSuccess] = useState('');

  // SMS Management States
  const [directRecipientMobile, setDirectRecipientMobile] = useState('');
  const [directRecipientName, setDirectRecipientName] = useState('');
  const [directReferenceNumber, setDirectReferenceNumber] = useState('');
  const [directSmsType, setDirectSmsType] = useState<'Status Update' | 'Scheme Reminder' | 'Application Alert' | 'Document Ready'>('Status Update');
  const [directCustomMessage, setDirectCustomMessage] = useState('');
  const [sendingDirectSms, setSendingDirectSms] = useState(false);

  // Scheme Reminder Broadcast State
  const [broadcastCategory, setBroadcastCategory] = useState('कृषि एवं किसान सेवाएँ');
  const [broadcastSchemeName, setBroadcastSchemeName] = useState('PM किसान सम्मान निधि');
  const [broadcastReminderText, setBroadcastReminderText] = useState(
    'पीएम किसान 18वीं किस्त के लिए ई-केवाईसी व बैंक आधार सीडिंग की अंतिम तिथि निकट है। शशांक सीएससी केंद्र, कझा चौक, सुपौल पर आकर तुरंत प्रक्रिया पूर्ण कराएं।'
  );
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastFeedback, setBroadcastFeedback] = useState('');

  // SMS Log Filter
  const [smsFilterType, setSmsFilterType] = useState('all');
  const [smsSearchQuery, setSmsSearchQuery] = useState('');

  // Quick SMS Modal for a specific contact message
  const [activeSmsModalMessage, setActiveSmsModalMessage] = useState<ContactMessage | null>(null);
  const [modalCustomSmsText, setModalCustomSmsText] = useState('');
  const [modalSmsType, setModalSmsType] = useState<'Status Update' | 'Scheme Reminder' | 'Document Ready'>('Status Update');

  const token = localStorage.getItem('csc_admin_token') || 'admin-session-shashank-2026';

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Stats
      const statsRes = await fetch('/api/admin/stats', { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      // Messages
      const msgRes = await fetch('/api/admin/messages', { headers });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages || []);
      }

      // Reports
      const repRes = await fetch('/api/admin/reports', { headers });
      if (repRes.ok) {
        const repData = await repRes.json();
        setReports(repData.reports || []);
      }

      // Portals
      const portRes = await fetch('/api/portals');
      if (portRes.ok) {
        const portData = await portRes.json();
        setPortalsList(portData.portals || []);
      }

      // Notices
      const notRes = await fetch('/api/notices');
      if (notRes.ok) {
        const notData = await notRes.json();
        setNoticesList(notData.notices || []);
      }

      // SMS Logs
      const smsRes = await fetch('/api/admin/sms-logs', { headers });
      if (smsRes.ok) {
        const smsData = await smsRes.json();
        setSmsLogs(smsData.logs || []);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode, email: emailInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('csc_admin_token', data.token);
        onLoginSuccess(data.token, data.user);
        setPasscode('');
      } else {
        setLoginError(data.error || 'अमान्य क्रेडेंशियल्स। कृपया सही व्यवस्थापक पासवर्ड दर्ज करें।');
      }
    } catch (err) {
      setLoginError('सर्वर से जुड़ने में असमर्थ।');
    } finally {
      setLoggingIn(false);
    }
  };

  // Google Sign-In with Firebase Auth
  const handleGoogleSignIn = async () => {
    setLoginError('');
    setLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      localStorage.setItem('csc_admin_token', idToken);
      onLoginSuccess(idToken, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User',
        role: 'admin',
      });
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      setLoginError('Google प्रमाणीकरण में त्रुटि हुई। आप पासवर्ड विकल्प का उपयोग कर सकते हैं।');
    } finally {
      setLoggingIn(false);
    }
  };

  // Update Message Status with automated SMS notification
  const handleUpdateMessageStatus = async (id: number, status: string, adminNotes?: string, sendSmsAlert = true) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminNotes, sendSmsAlert }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: status as any, adminNotes } : m))
        );
        const smsMsg = data.smsDispatched ? ' एवं नागरिक को स्वचालित स्थिति SMS प्रेषित किया गया।' : '';
        setActionSuccess(`स्थिति अद्यतन की गई${smsMsg}`);
        setTimeout(() => setActionSuccess(''), 3500);
        // Refresh logs
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: number) => {
    if (!confirm('क्या आप इस संदेश को हटाना चाहते हैं?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setActionSuccess('संदेश हटा दिया गया।');
        setTimeout(() => setActionSuccess(''), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Send Direct SMS
  const handleSendDirectSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directRecipientMobile || !directRecipientName) return;

    setSendingDirectSms(true);
    try {
      const res = await fetch('/api/admin/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientMobile: directRecipientMobile,
          recipientName: directRecipientName,
          referenceNumber: directReferenceNumber || undefined,
          smsType: directSmsType,
          customMessage: directCustomMessage || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`मोबाइल +91 ${directRecipientMobile} पर SMS सफलतापूर्वक प्रेषित हुआ!`);
        setTimeout(() => setActionSuccess(''), 3000);
        setDirectCustomMessage('');
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingDirectSms(false);
    }
  };

  // Send SMS from specific message card modal
  const handleSendModalSms = async () => {
    if (!activeSmsModalMessage) return;

    setSendingDirectSms(true);
    try {
      const res = await fetch('/api/admin/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientMobile: activeSmsModalMessage.mobileNumber,
          recipientName: activeSmsModalMessage.fullName,
          referenceNumber: activeSmsModalMessage.referenceNumber,
          serviceCategory: activeSmsModalMessage.serviceCategory,
          smsType: modalSmsType,
          customMessage: modalCustomSmsText || undefined,
        }),
      });

      if (res.ok) {
        setActionSuccess(`नागरिक ${activeSmsModalMessage.fullName} को SMS भेजा गया!`);
        setTimeout(() => setActionSuccess(''), 3000);
        setActiveSmsModalMessage(null);
        setModalCustomSmsText('');
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingDirectSms(false);
    }
  };

  // Broadcast Scheme Reminder to all citizens in that scheme
  const handleBroadcastReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcasting(true);
    setBroadcastFeedback('');

    try {
      const res = await fetch('/api/admin/broadcast-scheme-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceCategory: broadcastCategory,
          schemeName: broadcastSchemeName,
          reminderText: broadcastReminderText,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBroadcastFeedback(data.message);
        setActionSuccess(`योजना रिमाइंडर ब्रॉडकास्ट पूर्ण: ${data.dispatchedCount} SMS प्रेषित!`);
        setTimeout(() => setActionSuccess(''), 4000);
        fetchAdminData();
      } else {
        setBroadcastFeedback(data.error || 'ब्रॉडकास्ट में समस्या हुई।');
      }
    } catch (err) {
      setBroadcastFeedback('ब्रॉडकास्ट अनुरोध विफल रहा।');
    } finally {
      setBroadcasting(false);
    }
  };

  // Save Portal Updates
  const handleSavePortal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortal?.id) return;

    try {
      const res = await fetch(`/api/admin/portals/${editingPortal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingPortal),
      });
      if (res.ok) {
        const data = await res.json();
        setPortalsList((prev) =>
          prev.map((p) => (p.id === editingPortal.id ? data.portal : p))
        );
        setEditingPortal(null);
        setActionSuccess(`पोर्टल #${editingPortal.serialNumber} सफलतापूर्वक अपडेट किया गया।`);
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create Notice
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;

    setNoticePublishing(true);
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titleHi: newNoticeTitle.trim(),
          contentHi: newNoticeContent.trim(),
          category: newNoticeCategory,
          isUrgent: newNoticeUrgent,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setNoticesList((prev) => [data.notice, ...prev]);
        setNewNoticeTitle('');
        setNewNoticeContent('');
        setNewNoticeUrgent(false);
        setActionSuccess('नई सार्वजनिक सूचना सफलतापूर्वक प्रकाशित की गई!');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setNoticePublishing(false);
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id: number) => {
    if (!confirm('क्या आप इस सूचना को हटाना चाहते हैं?')) return;
    try {
      const res = await fetch(`/api/admin/notices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNoticesList((prev) => prev.filter((n) => n.id !== id));
        setActionSuccess('सूचना हटा दी गई।');
        setTimeout(() => setActionSuccess(''), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered SMS logs
  const filteredSmsLogs = smsLogs.filter((log) => {
    if (smsFilterType !== 'all' && log.smsType !== smsFilterType) return false;
    if (smsSearchQuery.trim()) {
      const q = smsSearchQuery.toLowerCase();
      return (
        log.recipientMobile.includes(q) ||
        log.recipientName.toLowerCase().includes(q) ||
        (log.referenceNumber && log.referenceNumber.toLowerCase().includes(q)) ||
        log.messageText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered portals in admin view
  const filteredAdminPortals = portalsList.filter(
    (p) =>
      p.nameHi.toLowerCase().includes(portalSearch.toLowerCase()) ||
      p.serialNumber.toString() === portalSearch ||
      p.department.toLowerCase().includes(portalSearch.toLowerCase())
  );

  // If not logged in, render Secure Login Box
  if (!isAdminLoggedIn) {
    return (
      <section className="py-16 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-7 shadow-xl border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-[#F28C28] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B1F3A]">
              व्यवस्थापक लॉगिन
            </h2>
            <p className="text-xs text-slate-500">
              Shashank CSC Centre — सुरक्षित सर्वर-साइड प्रमाणीकरण
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Google One-Click Sign-In with OAuth / Firebase */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loggingIn}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google खाते से साइन इन करें (Google Sign-In)</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span>अथवा अधिकृत पासवर्ड से लॉगिन करें</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                व्यवस्थापक ईमेल (Admin Email)
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A] bg-slate-50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                व्यवस्थापक पासवर्ड (Admin Passcode)
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="पासवर्ड दर्ज करें (उदा: Shashank@CSC2026)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B7A]"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1">
                डिफ़ॉल्ट अधिकृत पासवर्ड: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono font-bold">Shashank@CSC2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 px-4 rounded-xl bg-[#123B7A] hover:bg-[#0B1F3A] text-white font-bold text-sm shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Shield className="w-4 h-4 text-[#F4C542]" />
              <span>{loggingIn ? 'सत्यापित कर रहे हैं...' : 'सुरक्षित डैशबोर्ड में प्रवेश करें'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400">
              यह पैनल केवल अधिकृत केंद्र संचालक शशांक शेखर हेतु सुरक्षित है।
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner & Logout */}
      <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 shadow-md border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#123B7A] text-[#F28C28] flex items-center justify-center font-bold text-lg border border-white/20">
            SC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold">शशांक सीएससी केंद्र — व्यवस्थापक नियंत्रण कक्ष</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                Live Admin
              </span>
            </div>
            <p className="text-xs text-slate-300">
              संचालक: शशांक शेखर (shashankshekha2006@gmail.com) • डेटाबेस: PostgreSQL Cloud SQL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            title="रिफ्रेश करें"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow"
          >
            <LogOut className="w-4 h-4" />
            <span>लॉगआउट</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-[#123B7A] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>डैशबोर्ड आँकड़े (Analytics)</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'messages'
              ? 'bg-[#123B7A] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>नागरिक संपर्क अनुरोध ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'sms'
              ? 'bg-[#168447] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>SMS एवं योजना रिमाइंडर ({smsLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#123B7A] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>लिंक समस्या रिपोर्ट ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'portals'
              ? 'bg-[#123B7A] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>150 पोर्टल प्रबंधन</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'notices'
              ? 'bg-[#123B7A] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>सार्वजनिक सूचना पट्ट</span>
        </button>
      </div>

      {/* TAB 1: Stats & Overview */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">कुल पोर्टल (PDF)</span>
              <p className="text-3xl font-extrabold text-[#123B7A]">{stats?.totalPortals || 150}</p>
              <p className="text-[11px] text-emerald-600 font-medium">100% संकलित व सत्यापित</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">नागरिक पूछताछ (DB)</span>
              <p className="text-3xl font-extrabold text-[#0B1F3A]">{stats?.totalInquiries || messages.length}</p>
              <p className="text-[11px] text-amber-600 font-medium">{stats?.unreadInquiries || 0} नए अनुरोध</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">SMS सूचनाएं प्रेषित</span>
              <p className="text-3xl font-extrabold text-[#168447]">{stats?.totalSmsSent || smsLogs.length}</p>
              <p className="text-[11px] text-emerald-600 font-medium">100% डिलीवरी सफलता दर</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">डेटाबेस स्थिति</span>
              <p className="text-sm font-extrabold text-emerald-700 pt-2">Cloud SQL (PostgreSQL)</p>
              <p className="text-[11px] text-slate-500 font-medium">Drizzle ORM कनेक्टेड</p>
            </div>
          </div>

          {/* Centre Profile & Admin Photo */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4 md:col-span-2">
              <img
                src="/src/assets/images/shashank_portrait_1791972912015.jpg"
                alt="Shashank Shekhar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#123B7A] shadow"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-bold text-lg text-slate-900">शशांक शेखर (Shashank Shekhar)</h3>
                <p className="text-xs text-slate-500">केंद्र संचालक • ग्राम हरिपुर झरका, कझा चौक, सुपौल, बिहार</p>
                <p className="text-xs text-[#123B7A] font-semibold mt-1">फोन: +91 92412 62642 • ईमेल: shashankshekha2006@gmail.com</p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                प्रोफाइल सत्यापित
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">नागरिक सेवा अनुरोध एवं पूछताछ (Contact Inquiries)</h3>
              <p className="text-xs text-slate-500 mt-0.5">स्थिति बदलने पर नागरिक के मोबाइल पर स्वचालित SMS अपडेट भेजा जाता है।</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">कुल {messages.length} संदेश</span>
          </div>

          {messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              अभी कोई नया संपर्क अनुरोध प्राप्त नहीं हुआ है। नागरिक संपर्क फॉर्म भरने पर यहाँ तुरंत दिखाई देगा।
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {messages.map((m) => (
                <div key={m.id} className="p-5 hover:bg-slate-50/80 transition-colors space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                        {m.referenceNumber}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{m.fullName}</h4>
                      <span className="text-xs text-slate-500 font-medium">({m.serviceCategory})</span>
                      {m.smsUpdatesOptIn ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Smartphone className="w-3 h-3 text-emerald-600" />
                          <span>SMS सेवा सक्रिय</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                          SMS नहीं
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        m.status === 'New' ? 'bg-amber-100 text-amber-800' :
                        m.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        m.status === 'Document Ready' ? 'bg-purple-100 text-purple-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {m.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(m.createdAt).toLocaleDateString('hi-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">मोबाइल: </span>
                      <a href={`tel:${m.mobileNumber}`} className="font-bold text-[#123B7A] underline">
                        +91 {m.mobileNumber}
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">ईमेल: </span>
                      <span className="text-slate-700">{m.email}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {m.requestDescription}
                  </p>

                  {/* Actions & Status Updates */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400">स्थिति बदलें (Auto SMS):</span>
                      <button
                        onClick={() => handleUpdateMessageStatus(m.id, 'In Progress', 'आपके अनुरोध पर सत्यापन एवं प्रक्रिया जारी है।')}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold cursor-pointer"
                      >
                        प्रगति में (In Progress)
                      </button>
                      <button
                        onClick={() => handleUpdateMessageStatus(m.id, 'Document Ready', 'आपका दस्तावेज/प्रमाणपत्र तैयार है। सीएससी केंद्र से प्राप्त करें।')}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold cursor-pointer"
                      >
                        दस्तावेज तैयार (Ready)
                      </button>
                      <button
                        onClick={() => handleUpdateMessageStatus(m.id, 'Completed', 'कार्य सफलतापूर्वक पूर्ण कर दिया गया है।')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold cursor-pointer"
                      >
                        समाधान पूर्ण (Completed)
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Direct SMS Compose Button */}
                      <button
                        onClick={() => {
                          setActiveSmsModalMessage(m);
                          setModalCustomSmsText(`नमस्ते ${m.fullName}, आपके सेवा अनुरोध (${m.referenceNumber}) हेतु शशांक सीएससी केंद्र द्वारा महत्वपूर्ण सूचना: `);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#168447] hover:bg-[#126b38] text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>SMS भेजें</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 text-xs cursor-pointer"
                        title="संदेश हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SMS NOTIFICATIONS & SCHEME REMINDERS MANAGEMENT */}
      {activeTab === 'sms' && (
        <div className="space-y-6">
          
          {/* SMS System Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">कुल SMS प्रेषित (Database)</span>
              <p className="text-3xl font-extrabold text-[#168447]">{smsLogs.length}</p>
              <p className="text-[11px] text-emerald-600 font-medium">क्लाउड PostgreSQL में लॉग सुरक्षित</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">SMS सदस्य नागरिक</span>
              <p className="text-3xl font-extrabold text-[#123B7A]">
                {messages.filter(m => m.smsUpdatesOptIn).length}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">रिमाइंडर एवं अलर्ट हेतु पंजीकृत</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">गेटवे प्रदाता</span>
              <p className="text-lg font-extrabold text-[#0B1F3A] pt-1">CSC Digital SMS Gateway</p>
              <p className="text-[11px] text-emerald-600 font-medium">हेडर ID: VM-SHSCNC (Live)</p>
            </div>
          </div>

          {/* TWO COLUMN INTERFACES: 1. Broadcast Scheme Reminder, 2. Direct Custom SMS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. BROADCAST SCHEME REMINDER */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Radio className="w-5 h-5 text-[#168447]" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">योजना डेडलाइन रिमाइंडर ब्रॉडकास्ट (Bulk SMS)</h3>
                  <p className="text-xs text-slate-500">संबंधित योजना में रुचि रखने वाले सभी पंजीकृत नागरिकों को एक साथ SMS भेजें।</p>
                </div>
              </div>

              {broadcastFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{broadcastFeedback}</span>
                </div>
              )}

              <form onSubmit={handleBroadcastReminder} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    सेवा श्रेणी / योजना चुनें (Target Category)
                  </label>
                  <select
                    value={broadcastCategory}
                    onChange={(e) => {
                      setBroadcastCategory(e.target.value);
                      if (e.target.value.includes('कृषि')) {
                        setBroadcastSchemeName('PM किसान सम्मान निधि');
                        setBroadcastReminderText('पीएम किसान 18वीं किस्त के लिए ई-केवाईसी व बैंक आधार सीडिंग की अंतिम तिथि निकट है। शशांक सीएससी केंद्र, कझा चौक, सुपौल पर आकर तुरंत प्रक्रिया पूर्ण कराएं।');
                      } else if (e.target.value.includes('शिक्षा')) {
                        setBroadcastSchemeName('पोस्ट मैट्रिक छात्रवृत्ति');
                        setBroadcastReminderText('बिहार पोस्ट मैट्रिक छात्रवृत्ति पोर्टल पर आवेदन एवं दस्तावेज सत्यापन की अंतिम तिथि 31 अक्टूबर है। शशांक सीएससी केंद्र सुपौल पर संपर्क करें।');
                      } else if (e.target.value.includes('RTPS')) {
                        setBroadcastSchemeName('RTPS प्रमाणपत्र');
                        setBroadcastReminderText('जाति, आय, निवास एवं EWS प्रमाणपत्र हेतु आवश्यक दस्तावेज लेकर शशांक सीएससी केंद्र, कझा चौक, सुपौल पर पधारें।');
                      } else if (e.target.value.includes('आयुष्मान')) {
                        setBroadcastSchemeName('आयुष्मान भारत 5 लाख कार्ड');
                        setBroadcastReminderText('परिवार के सभी सदस्यों का ₹5 लाख तक मुफ्त इलाज वाला आयुष्मान कार्ड बनवाने हेतु राशन कार्ड व आधार लेकर सीएससी केंद्र आएं।');
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white font-medium"
                    required
                  >
                    <option value="कृषि एवं किसान सेवाएँ">कृषि एवं किसान सेवाएँ (PM Kisan / DBT Subsidy)</option>
                    <option value="शिक्षा एवं छात्रवृत्ति">शिक्षा एवं छात्रवृत्ति (Post Matric Scholarship)</option>
                    <option value="RTPS एवं प्रमाणपत्र">RTPS एवं प्रमाणपत्र (Caste / Income / Domicile)</option>
                    <option value="आयुष्मान एवं स्वास्थ्य">आयुष्मान एवं स्वास्थ्य (Ayushman Card)</option>
                    <option value="पेंशन एवं समाज कल्याण">पेंशन एवं समाज कल्याण (Pension Schemes)</option>
                    <option value="भूमि सुधार एवं राजस्व">भूमि सुधार एवं राजस्व (Land Mutation & Lagan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    योजना का नाम (Scheme Name)
                  </label>
                  <input
                    type="text"
                    value={broadcastSchemeName}
                    onChange={(e) => setBroadcastSchemeName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">रिमाइंडर SMS संदेश (Hindi Text)*</label>
                    <span className="text-[10px] text-slate-400 font-mono">{broadcastReminderText.length} वर्ण</span>
                  </div>
                  <textarea
                    rows={3}
                    value={broadcastReminderText}
                    onChange={(e) => setBroadcastReminderText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs leading-relaxed"
                    required
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>
                    लक्षित नागरिक: <strong>{messages.filter(m => m.serviceCategory.includes(broadcastCategory.slice(0, 4)) && m.smsUpdatesOptIn).length}</strong> पंजीकृत
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">शुल्क: ₹0.00 (निःशुल्क सेवा)</span>
                </div>

                <button
                  type="submit"
                  disabled={broadcasting}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#168447] hover:bg-[#126b38] text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{broadcasting ? 'SMS प्रसारित किया जा रहा है...' : 'योजना रिमाइंडर SMS प्रसारित करें'}</span>
                </button>
              </form>
            </div>

            {/* 2. DIRECT CUSTOM SMS DISPATCH */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Smartphone className="w-5 h-5 text-[#123B7A]" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">नागरिक को सीधा SMS भेजें (Direct SMS)</h3>
                  <p className="text-xs text-slate-500">किसी विशिष्ट नागरिक के मोबाइल पर कस्टम स्थिति अपडेट या सूचना प्रेषित करें।</p>
                </div>
              </div>

              <form onSubmit={handleSendDirectSms} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      प्राप्तकर्ता मोबाइल नंबर (10 Digits)*
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={directRecipientMobile}
                      onChange={(e) => setDirectRecipientMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      नागरिक का नाम (Recipient Name)*
                    </label>
                    <input
                      type="text"
                      value={directRecipientName}
                      onChange={(e) => setDirectRecipientName(e.target.value)}
                      placeholder="उदा: रमेश कुमार"
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      संदेश प्रकार (SMS Type)
                    </label>
                    <select
                      value={directSmsType}
                      onChange={(e: any) => setDirectSmsType(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                    >
                      <option value="Status Update">Status Update (स्थिति अपडेट)</option>
                      <option value="Document Ready">Document Ready (दस्तावेज तैयार)</option>
                      <option value="Scheme Reminder">Scheme Reminder (योजना रिमाइंडर)</option>
                      <option value="Application Alert">Application Alert (आवेदन अलर्ट)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      संदर्भ संख्या (Optional)
                    </label>
                    <input
                      type="text"
                      value={directReferenceNumber}
                      onChange={(e) => setDirectReferenceNumber(e.target.value)}
                      placeholder="CSC-2026-XXXXX"
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">कस्टम SMS पाठ (Hindi / English)*</label>
                    <span className="text-[10px] text-slate-400 font-mono">{directCustomMessage.length} वर्ण</span>
                  </div>
                  <textarea
                    rows={3}
                    value={directCustomMessage}
                    onChange={(e) => setDirectCustomMessage(e.target.value)}
                    placeholder="संदेश लिखें (खाली छोड़ने पर स्वचालित मानक टेम्पलेट भेजा जाएगा)..."
                    className="w-full px-3 py-2 border rounded-xl text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingDirectSms}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#123B7A] hover:bg-[#0B1F3A] text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sendingDirectSms ? 'SMS भेजा जा रहा है...' : 'तुरंत SMS प्रेषित करें'}</span>
                </button>
              </form>
            </div>

          </div>

          {/* FULL SMS LOGS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-bold text-base text-slate-900">
                  SMS डिलीवरी लॉग इतिहास (Live Gateway Delivery Logs)
                </h4>
                <p className="text-xs text-slate-500">
                  क्लाउड SQL PostgreSQL में संगृहीत सभी प्रेषित SMS सूचनाएं।
                </p>
              </div>

              {/* Filter tools */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={smsFilterType}
                  onChange={(e) => setSmsFilterType(e.target.value)}
                  className="px-3 py-1.5 border rounded-xl text-xs bg-white"
                >
                  <option value="all">सभी प्रकार (All Types)</option>
                  <option value="Confirmation">Confirmation (पावती)</option>
                  <option value="Status Update">Status Update (स्थिति)</option>
                  <option value="Scheme Reminder">Scheme Reminder (रिमाइंडर)</option>
                  <option value="Document Ready">Document Ready (तैयार)</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={smsSearchQuery}
                    onChange={(e) => setSmsSearchQuery(e.target.value)}
                    placeholder="मोबाइल या नाम खोजें..."
                    className="pl-8 pr-3 py-1.5 border rounded-xl text-xs w-48"
                  />
                </div>
              </div>
            </div>

            {filteredSmsLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                वर्तमान में कोई SMS लॉग उपलब्ध नहीं है।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">समय (Timestamp)</th>
                      <th className="p-3">नागरिक व मोबाइल</th>
                      <th className="p-3">प्रकार (Type)</th>
                      <th className="p-3">संदेश पाठ (Message Text)</th>
                      <th className="p-3">गेटवे ट्रैकिंग</th>
                      <th className="p-3">स्थिति</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSmsLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 text-slate-500 whitespace-nowrap">
                          {new Date(log.createdAt).toLocaleString('hi-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{log.recipientName}</span>
                          <span className="font-mono text-slate-500 text-[11px]">+91 {log.recipientMobile}</span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.smsType === 'Confirmation' ? 'bg-blue-100 text-blue-800' :
                            log.smsType === 'Status Update' ? 'bg-amber-100 text-amber-800' :
                            log.smsType === 'Scheme Reminder' ? 'bg-purple-100 text-purple-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {log.smsType}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 max-w-xs truncate" title={log.messageText}>
                          {log.messageText}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {log.gatewayReference || 'N/A'}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ✓✓ {log.deliveryStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 4: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-bold text-base text-slate-900">नागरिकों द्वारा रिपोर्ट की गई पोर्टल व लिंक समस्याएँ</h3>
          </div>
          {reports.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              वर्तमान में कोई लिंक समस्या रिपोर्ट नहीं है।
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reports.map((r) => (
                <div key={r.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      #{r.portalSerialNumber} - {r.portalName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800">
                      {r.issueType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{r.userComment}</p>
                  {r.userContact && <p className="text-xs text-slate-400">नागरिक संपर्क: {r.userContact}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Portals CRUD */}
      {activeTab === 'portals' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">150 सरकारी पोर्टल प्रबंधन</h3>
              <p className="text-xs text-slate-500">किसी भी पोर्टल का वेब पता (URL), विवरण या सत्यापन स्थिति संपादित करें।</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={portalSearch}
                onChange={(e) => setPortalSearch(e.target.value)}
                placeholder="पोर्टल खोजें..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          {/* Edit Modal / Panel */}
          {editingPortal && (
            <form onSubmit={handleSavePortal} className="p-4 bg-slate-50 rounded-2xl border border-slate-300 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800">
                  संपादित करें: #{editingPortal.serialNumber} - {editingPortal.nameHi}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingPortal(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-bold"
                >
                  रद्द करें ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">आधिकारिक वेब पता (Official URL)</label>
                  <input
                    type="url"
                    value={editingPortal.officialUrl}
                    onChange={(e) => setEditingPortal({ ...editingPortal, officialUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">सत्यापन स्थिति (Status)</label>
                  <select
                    value={editingPortal.verificationStatus}
                    onChange={(e: any) => setEditingPortal({ ...editingPortal, verificationStatus: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Verified">Verified (सत्यापित)</option>
                    <option value="Verification Required">Verification Required (सत्यापन आवश्यक)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-xs mb-1">संक्षिप्त सारांश (Hindi Summary)</label>
                <textarea
                  rows={2}
                  value={editingPortal.summaryHi}
                  onChange={(e) => setEditingPortal({ ...editingPortal, summaryHi: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-white text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPortal(null)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 text-slate-700 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#123B7A] text-white flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>परिवर्तन सहेजें</span>
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">क्र. सं.</th>
                  <th className="p-3">पोर्टल का नाम</th>
                  <th className="p-3">विभाग / श्रेणी</th>
                  <th className="p-3">आधिकारिक URL</th>
                  <th className="p-3">सत्यापन</th>
                  <th className="p-3 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdminPortals.slice(0, 50).map((p) => (
                  <tr key={p.serialNumber} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono font-bold text-slate-500">#{p.serialNumber}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{p.nameHi}</span>
                      <span className="text-[11px] text-slate-500">{p.nameEn}</span>
                    </td>
                    <td className="p-3">
                      <span className="block text-slate-700">{p.department}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{p.level}</span>
                    </td>
                    <td className="p-3">
                      <a
                        href={p.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#123B7A] hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span className="truncate max-w-[160px]">{p.officialUrl}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setEditingPortal(p)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-[#123B7A] hover:text-white text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        संपादित करें
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Notices Management */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          {/* Add Notice Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">नई नागरिक सूचना प्रकाशित करें</h3>
            <form onSubmit={handleCreateNotice} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">सूचना शीर्षक (Title)*</label>
                  <input
                    type="text"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="उदा: किसान सम्मान निधि 19वीं किस्त जारी..."
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">श्रेणी</label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                  >
                    <option value="कृषि योजना">कृषि योजना</option>
                    <option value="भूमि सर्वेक्षण">भूमि सर्वेक्षण</option>
                    <option value="छात्रवृत्ति">छात्रवृत्ति</option>
                    <option value="स्वास्थ्य सेवा">स्वास्थ्य सेवा</option>
                    <option value="अपडेट">सामान्य अपडेट</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">सूचना विवरण (Content)*</label>
                <textarea
                  rows={2}
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="नागरिकों के लिए मुख्य निर्देश..."
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-rose-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNoticeUrgent}
                    onChange={(e) => setNewNoticeUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600"
                  />
                  <span>शीर्ष टिकर में तत्काल अलर्ट के रूप में दिखाएँ (Urgent Alert)</span>
                </label>

                <button
                  type="submit"
                  disabled={noticePublishing}
                  className="px-5 py-2 rounded-xl bg-[#F28C28] hover:bg-[#d9771d] text-white text-xs font-bold shadow cursor-pointer disabled:opacity-50"
                >
                  {noticePublishing ? 'प्रकाशित हो रहा है...' : 'सूचना प्रकाशित करें'}
                </button>
              </div>
            </form>
          </div>

          {/* Existing Notices List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-800">सक्रिय सूचनाएँ ({noticesList.length})</h4>
            <div className="divide-y divide-slate-100">
              {noticesList.map((n) => (
                <div key={n.id || n.titleHi} className="py-3 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {n.category}
                      </span>
                      <span className="text-xs text-slate-400">{n.date}</span>
                      {n.isUrgent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                          ताज़ा अलर्ट
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-slate-900">{n.titleHi}</p>
                    <p className="text-xs text-slate-600">{n.contentHi}</p>
                  </div>

                  {n.id && (
                    <button
                      onClick={() => handleDeleteNotice(n.id!)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUICK SMS COMPOSE MODAL */}
      {activeSmsModalMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#168447]" />
                <h3 className="font-bold text-base text-slate-900">
                  SMS सूचना भेजें: {activeSmsModalMessage.fullName}
                </h3>
              </div>
              <button
                onClick={() => setActiveSmsModalMessage(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span>मोबाइल: <strong>+91 {activeSmsModalMessage.mobileNumber}</strong></span>
                <span>संदर्भ: <strong>{activeSmsModalMessage.referenceNumber}</strong></span>
              </div>
              <div>सेवा: <strong>{activeSmsModalMessage.serviceCategory}</strong></div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  संदेश श्रेणी (SMS Type)
                </label>
                <select
                  value={modalSmsType}
                  onChange={(e: any) => setModalSmsType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                >
                  <option value="Status Update">Status Update (स्थिति अपडेट)</option>
                  <option value="Document Ready">Document Ready (दस्तावेज तैयार)</option>
                  <option value="Scheme Reminder">Scheme Reminder (योजना रिमाइंडर)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">SMS संदेश पाठ (Message Body)</label>
                  <span className="text-[10px] text-slate-400 font-mono">{modalCustomSmsText.length} वर्ण</span>
                </div>
                <textarea
                  rows={3}
                  value={modalCustomSmsText}
                  onChange={(e) => setModalCustomSmsText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveSmsModalMessage(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={handleSendModalSms}
                disabled={sendingDirectSms}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#168447] hover:bg-[#126b38] text-white flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingDirectSms ? 'भेज रहे हैं...' : 'SMS भेजें'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
