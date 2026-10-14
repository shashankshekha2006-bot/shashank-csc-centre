/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PortalsDirectory } from './components/PortalsDirectory.tsx';
import { PortalDetailModal } from './components/PortalDetailModal.tsx';
import { ReportIssueModal } from './components/ReportIssueModal.tsx';
import { GovernmentSchemesSection } from './components/GovernmentSchemesSection.tsx';
import { DigitalNaariSection } from './components/DigitalNaariSection.tsx';
import { AboutUsSection } from './components/AboutUsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { LegalPages } from './components/LegalPages.tsx';
import { Footer } from './components/Footer.tsx';
import { ApiDocsModal } from './components/ApiDocsModal.tsx';
import { ALL_150_GOVERNMENT_PORTALS, PORTAL_CATEGORIES } from './data/portalData.ts';
import { ALL_GOVERNMENT_SCHEMES } from './data/schemesData.ts';
import { LATEST_PUBLIC_NOTICES } from './data/noticesData.ts';
import { Portal, Scheme, Notice, Language } from './types/index.ts';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [reportingPortal, setReportingPortal] = useState<Portal | null>(null);
  const [showApiDocs, setShowApiDocs] = useState<boolean>(false);

  // Contact pre-fill
  const [contactInitialCategory, setContactInitialCategory] = useState<string>('कृषि एवं किसान सेवाएँ');
  const [contactInitialService, setContactInitialService] = useState<string>('');

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('csc_admin_token'));
  });

  // Data states (instantly available from memory, hydrated from real API)
  const [portals, setPortals] = useState<Portal[]>(ALL_150_GOVERNMENT_PORTALS);
  const [schemes, setSchemes] = useState<Scheme[]>(ALL_GOVERNMENT_SCHEMES);
  const [notices, setNotices] = useState<Notice[]>(LATEST_PUBLIC_NOTICES);

  // Fetch real database records on mount
  useEffect(() => {
    async function loadBackendData() {
      try {
        const pRes = await fetch('/api/portals');
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData.portals && pData.portals.length >= 150) {
            setPortals(pData.portals);
          }
        }

        const sRes = await fetch('/api/schemes');
        if (sRes.ok) {
          const sData = await sRes.json();
          if (sData.schemes) setSchemes(sData.schemes);
        }

        const nRes = await fetch('/api/notices');
        if (nRes.ok) {
          const nData = await nRes.json();
          if (nData.notices) setNotices(nData.notices);
        }
      } catch (e) {
        console.warn('API hydration note:', e);
      }
    }
    loadBackendData();
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleNavigate = (view: string, categoryKey?: string) => {
    if (view === 'api_docs') {
      setShowApiDocs(true);
      return;
    }
    if (categoryKey) {
      setSelectedCategory(categoryKey);
      setCurrentView('portals');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactAssistance = (portal: Portal) => {
    setContactInitialCategory(portal.categoryKey || 'सामान्य सेवा');
    setContactInitialService(`पोर्टल #${portal.serialNumber}: ${portal.nameHi} पर सेवा हेतु सहायता`);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactForScheme = (schemeName: string) => {
    setContactInitialCategory('सरकारी योजनाएँ');
    setContactInitialService(`${schemeName} के लिए ऑनलाइन आवेदन सहायता`);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#0B1F3A]">
      
      {/* Header with sticky navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div className="space-y-4">
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={handleNavigate}
              language={language}
              latestNotices={notices}
              totalPortalsCount={portals.length}
            />

            {/* Complete Portals Directory Section with full 150 entries */}
            <PortalsDirectory
              portals={portals}
              categories={PORTAL_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenPortalModal={setSelectedPortal}
              onReportIssue={setReportingPortal}
              language={language}
            />

            {/* Key Government Schemes Section */}
            <GovernmentSchemesSection
              schemes={schemes}
              onOpenContact={handleOpenContactForScheme}
              language={language}
            />

            {/* Digital Naari Partner Section */}
            <DigitalNaariSection
              onContactClick={() => {
                setContactInitialCategory('बैंकिंग एवं वित्तीय समावेशन');
                setContactInitialService('Digital Naari बैंकिंग एवं नकद निकासी सेवा सहायता');
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
            />

            {/* About Centre Section with real photograph */}
            <AboutUsSection
              onContactClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
            />

            {/* Citizen Contact Section */}
            <ContactSection
              categories={PORTAL_CATEGORIES}
              initialCategory={contactInitialCategory}
              initialService={contactInitialService}
              language={language}
            />
          </div>
        )}

        {/* VIEW: ALL PORTALS DIRECTORY */}
        {currentView === 'portals' && (
          <div className="py-4">
            <PortalsDirectory
              portals={portals}
              categories={PORTAL_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenPortalModal={setSelectedPortal}
              onReportIssue={setReportingPortal}
              language={language}
            />
          </div>
        )}

        {/* VIEW: SCHEMES */}
        {currentView === 'schemes' && (
          <div className="py-4">
            <GovernmentSchemesSection
              schemes={schemes}
              onOpenContact={handleOpenContactForScheme}
              language={language}
            />
          </div>
        )}

        {/* VIEW: DIGITAL NAARI */}
        {currentView === 'digital_naari' && (
          <div className="py-6">
            <DigitalNaariSection
              onContactClick={() => {
                setContactInitialCategory('बैंकिंग एवं वित्तीय समावेशन');
                setContactInitialService('Digital Naari बैंकिंग एवं नकद निकासी सेवा सहायता');
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
            />
          </div>
        )}

        {/* VIEW: ABOUT */}
        {currentView === 'about' && (
          <div className="py-6">
            <AboutUsSection
              onContactClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
            />
          </div>
        )}

        {/* VIEW: CONTACT */}
        {currentView === 'contact' && (
          <div className="py-6">
            <ContactSection
              categories={PORTAL_CATEGORIES}
              initialCategory={contactInitialCategory}
              initialService={contactInitialService}
              language={language}
              initialMode="form"
            />
          </div>
        )}

        {/* VIEW: CITIZEN STATUS & SMS TRACKER */}
        {currentView === 'track' && (
          <div className="py-6">
            <ContactSection
              categories={PORTAL_CATEGORIES}
              initialCategory={contactInitialCategory}
              initialService={contactInitialService}
              language={language}
              initialMode="track"
            />
          </div>
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard
            isAdminLoggedIn={isAdminLoggedIn}
            onLoginSuccess={(token) => {
              setIsAdminLoggedIn(true);
            }}
            onLogout={() => {
              localStorage.removeItem('csc_admin_token');
              setIsAdminLoggedIn(false);
              setCurrentView('home');
            }}
            language={language}
          />
        )}

        {/* LEGAL VIEWS */}
        {(currentView === 'privacy' || currentView === 'terms' || currentView === 'disclaimer') && (
          <LegalPages
            pageType={currentView as any}
            onBack={() => setCurrentView('home')}
            language={language}
          />
        )}

      </main>

      {/* Floating Action Button for instant WhatsApp assistance */}
      <aside aria-label="Quick contact links" className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/919241262642?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20Shashank%20CSC%20Centre%2C%20%E0%A4%AE%E0%A5%81%E0%A4%97%E0%A5%87%20%E0%A4%B8%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%AC%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 transition-transform border-2 border-white focus:outline-none"
          title="WhatsApp पर तुरंत सहायता प्राप्त करें"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </aside>

      {/* Portal Details Deep-Dive Modal */}
      {selectedPortal && (
        <PortalDetailModal
          portal={selectedPortal}
          onClose={() => setSelectedPortal(null)}
          onReportIssue={(p) => {
            setSelectedPortal(null);
            setReportingPortal(p);
          }}
          onContactAssistance={handleContactAssistance}
          language={language}
        />
      )}

      {/* Report Link Issue Modal */}
      {reportingPortal && (
        <ReportIssueModal
          portal={reportingPortal}
          onClose={() => setReportingPortal(null)}
        />
      )}

      {/* API Documentation Modal */}
      {showApiDocs && (
        <ApiDocsModal onClose={() => setShowApiDocs(false)} />
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        language={language}
      />

    </div>
  );
}
