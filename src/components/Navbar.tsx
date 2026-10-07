import React, { useState } from 'react';
import { KlockitLogo } from './Brand';
import { Menu, X, ArrowRight } from 'lucide-react';

export type PageId = 'home' | 'pricing' | 'guides' | 'guide-article';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenTrialModal: () => void;
  onOpenContactModal: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  onOpenTrialModal,
  onOpenContactModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand mark wordmark (clean, single element) */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009FF5] rounded-lg"
              aria-label="Klockit Home"
            >
              <KlockitLogo variant="full" size="md" />
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 ${
                currentPage === 'home'
                  ? 'text-[#0A266B] border-b-2 border-[#0A266B]'
                  : 'text-slate-600 hover:text-[#0A266B]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`transition-colors py-1 ${
                currentPage === 'pricing'
                  ? 'text-[#0A266B] border-b-2 border-[#0A266B]'
                  : 'text-slate-600 hover:text-[#0A266B]'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('guides')}
              className={`transition-colors py-1 ${
                currentPage === 'guides' || currentPage === 'guide-article'
                  ? 'text-[#0A266B] border-b-2 border-[#0A266B]'
                  : 'text-slate-600 hover:text-[#0A266B]'
              }`}
            >
              Guides
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => alert('Sign-in placeholder: Existing users access their organisation or worker portal via organisation invite.')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A266B] transition-colors whitespace-nowrap"
            >
              Sign in
            </button>
            <button
              onClick={onOpenTrialModal}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0A266B] hover:bg-[#071c4f] rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap active:scale-[0.99]"
            >
              <span>Start 14-day free trial</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTrialModal}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A266B] rounded-lg shadow-xs"
            >
              Start trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-lg ${
                currentPage === 'home' ? 'bg-slate-100 text-[#0A266B]' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`text-left px-3 py-2 rounded-lg ${
                currentPage === 'pricing' ? 'bg-slate-100 text-[#0A266B]' : 'text-slate-700'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('guides')}
              className={`text-left px-3 py-2 rounded-lg ${
                currentPage === 'guides' || currentPage === 'guide-article'
                  ? 'bg-slate-100 text-[#0A266B]'
                  : 'text-slate-700'
              }`}
            >
              Guides
            </button>
            <button
              onClick={() => handleNavClick('guide-article')}
              className={`text-left px-3 py-2 rounded-lg pl-6 text-xs text-slate-600 ${
                currentPage === 'guide-article' ? 'font-bold text-[#0A266B]' : ''
              }`}
            >
              ↳ Guide: How QR attendance works
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                alert('Sign-in placeholder: Existing users access their organisation or worker portal.');
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#0A266B] rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
