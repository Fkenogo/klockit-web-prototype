import React from 'react';
import { KlockitLogo } from './Brand';
import { PageId } from './Navbar';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: () => void;
  onOpenTrialModal: () => void;
}

export function Footer({ onNavigate, onOpenContactModal, onOpenTrialModal }: FooterProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block">
              <KlockitLogo variant="full" size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Klockit helps organisations see planned shifts alongside recorded arrivals, departures and attendance history.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck size={16} className="text-[#00C2FF]" />
              <span>Attendance records for your organisation and team</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Product & Help
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricing')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Workforce Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guides')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Guides & Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guide-article')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>How QR attendance works</span>
                  <ArrowUpRight size={13} className="text-sky-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Get Started & Talk to Us
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start your organisation’s 14-day free trial, or talk to our team about plans for larger teams and fixed-duration projects.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onOpenTrialModal}
                className="px-4 py-2 bg-[#009FF5] hover:bg-[#0088e0] text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Start 14-day trial
              </button>
              <button
                onClick={onOpenContactModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors text-center border border-slate-700"
              >
                Talk to us (Custom)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Quiet Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Klockit. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Prices shown include applicable taxes.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={onOpenContactModal}
              className="hover:text-slate-300 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => alert('Trust & Privacy: Klockit records attendance presence timestamps on verified sites. Klockit does not track background locations, monitor keystrokes, or rate productivity.')}
              className="hover:text-slate-300 transition-colors"
            >
              Trust & Privacy
            </button>
            <button
              onClick={() => alert('Privacy Notice: Detailed terms and data protection policies.')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Notice
            </button>
            <button
              onClick={() => alert('Terms of Service: Standard subscription terms and organisation account agreement.')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
