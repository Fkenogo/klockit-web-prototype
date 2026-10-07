import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { GuidesPage } from './pages/GuidesPage';
import { TrialModal } from './components/TrialModal';
import { ContactModal } from './components/ContactModal';
import { Monitor, Smartphone, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Sync scroll to top on page change
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#00C2FF]/20 selection:text-[#0A266B]">
      {/* 
        Prototype Mode Toolbar:
        Enables instant switching between Desktop layout (1440px) and Mobile Frame (390px iPhone)
        as requested by the brief ("with desktop and mobile layouts").
      */}
      <aside aria-label="Prototype View Mode Controls" className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#00C2FF] flex items-center gap-1.5">
              <span>Klockit Visual Prototype</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">
              Page: <strong className="text-white capitalize">{currentPage.replace('-', ' ')}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  viewMode === 'desktop'
                    ? 'bg-[#009FF5] text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Full Responsive Desktop View"
              >
                <Monitor size={13} />
                <span>Desktop (1440px)</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  viewMode === 'mobile'
                    ? 'bg-[#009FF5] text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Phone Frame Preview (390px)"
              >
                <Smartphone size={13} />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Direct 14-day trial CTA */}
            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-2.5 py-1 rounded-md text-[11px] transition-colors shadow-2xs"
            >
              Test Trial Modal
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Conditioned on View Mode */}
      {viewMode === 'desktop' ? (
        /* Full Responsive Viewport */
        <div className="flex-1 flex flex-col">
          <Navbar
            currentPage={currentPage}
            onNavigate={navigateTo}
            onOpenTrialModal={() => setIsTrialModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />

          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            )}
            {currentPage === 'pricing' && (
              <PricingPage
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            )}
            {(currentPage === 'guides' || currentPage === 'guide-article') && (
              <GuidesPage
                onNavigate={navigateTo}
                onOpenContactModal={() => setIsContactModalOpen(true)}
                initialGuideId="qr-attendance-works"
              />
            )}
          </main>

          <Footer
            onNavigate={navigateTo}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenTrialModal={() => setIsTrialModalOpen(true)}
          />
        </div>
      ) : (
        /* Mobile Device Frame Simulation (390px viewport container) */
        <div className="flex-1 py-8 px-4 flex flex-col items-center justify-center bg-slate-900/95 min-h-[calc(100vh-42px)]">
          <div className="text-center pb-4 text-xs text-slate-400">
            <span>Simulated Mobile Viewport (390px width) · </span>
            <button
              onClick={() => setViewMode('desktop')}
              className="text-[#00C2FF] hover:underline font-semibold"
            >
              Return to full desktop
            </button>
          </div>

          {/* Smartphone Bezel */}
          <div className="w-full max-w-[400px] bg-slate-950 p-3 rounded-[44px] shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-800">
            {/* Screen Notch & Speaker */}
            <div className="h-5 w-32 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Inner Mobile Scrollable Canvas */}
            <div className="w-full h-[760px] bg-[#F8FAFC] rounded-[32px] overflow-y-auto overflow-x-hidden flex flex-col border border-slate-200/50 shadow-inner">
              <Navbar
                currentPage={currentPage}
                onNavigate={navigateTo}
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />

              <main className="flex-1">
                {currentPage === 'home' && (
                  <HomePage
                    onNavigate={navigateTo}
                    onOpenTrialModal={() => setIsTrialModalOpen(true)}
                    onOpenContactModal={() => setIsContactModalOpen(true)}
                  />
                )}
                {currentPage === 'pricing' && (
                  <PricingPage
                    onOpenTrialModal={() => setIsTrialModalOpen(true)}
                    onOpenContactModal={() => setIsContactModalOpen(true)}
                  />
                )}
                {(currentPage === 'guides' || currentPage === 'guide-article') && (
                  <GuidesPage
                    onNavigate={navigateTo}
                    onOpenContactModal={() => setIsContactModalOpen(true)}
                    initialGuideId="qr-attendance-works"
                  />
                )}
              </main>

              <Footer
                onNavigate={navigateTo}
                onOpenContactModal={() => setIsContactModalOpen(true)}
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
