import React from 'react';
import { PageId } from '../components/Navbar';
import {
  IllustrativeRecordDiagram,
  TwoMethodsInteractiveDiagram,
} from '../components/IllustrativeDiagrams';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Building2,
  QrCode,
  BookOpen,
  ArrowUpRight,
  Lock,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PLAN_BANDS, CURRENCIES, CurrencyCode } from '../data/klockitData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenTrialModal: () => void;
  onOpenContactModal: () => void;
}

export function HomePage({
  onNavigate,
  onOpenTrialModal,
  onOpenContactModal,
}: HomePageProps) {
  const previewCurrency: CurrencyCode = 'KES';

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Hero Column: Value Proposition & Trial CTA */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quiet editorial kicker (zero-pill text discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wide uppercase">
                <span>Workforce Presence Platform</span>
                <span aria-hidden="true">·</span>
                <span>East Africa & Global</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A266B] tracking-tight leading-[1.15] text-balance">
                Know who was at work each day.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Klockit helps you see planned shifts alongside recorded arrivals and departures across your work locations. Your team can check their own attendance records too.
              </p>

              {/* Primary Call to Action Block */}
              <div className="pt-1 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={onOpenTrialModal}
                    className="px-5 py-3.5 bg-[#0A266B] hover:bg-[#071c4f] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] whitespace-nowrap"
                  >
                    <span>Start your 14-day free trial</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={() => onNavigate('guide-article')}
                    className="px-4 py-3.5 bg-white hover:bg-slate-50 text-[#0A266B] border border-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>See QR attendance</span>
                  </button>
                </div>

                {/* Trial Guarantee subtext */}
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>
                    Starts as soon as you sign up. No credit card required.
                  </span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-[#0A266B] text-xs">Clear attendance records</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Arrival and departure times</div>
                </div>
                <div>
                  <div className="font-bold text-[#0A266B] text-xs">Workers can see their records</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Workers see own records</div>
                </div>
                <div>
                  <div className="font-bold text-[#0A266B] text-xs">Attendance, not location tracking</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">No continuous tracking</div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Illustration Inside a Smaller Draggable Frame */}
            <div className="lg:col-span-7 w-full overflow-hidden">
              <div className="space-y-2">
                <IllustrativeRecordDiagram className="w-full shadow-md border-slate-200" />
                <div className="text-right text-[11px] text-slate-500 flex items-center justify-end gap-1.5 pr-1">
                  <span>Pan or drag horizontally to view shift windows, departures & details</span>
                  <ArrowRight size={12} className="text-[#009FF5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE TWO ATTENDANCE METHODS SECTION */}
      <section className="bg-slate-50/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
              Attendance that fits your workplace
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A266B] tracking-tight">
              Two ways to record attendance. One clear record.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Choose QR code or Manual Worker Ref. Workers can record attendance on their own phone or use a shared device at the Site. Both methods add to the organisation’s attendance records.
            </p>
          </div>

          {/* Interactive diagram component */}
          <TwoMethodsInteractiveDiagram />
        </div>
      </section>

      {/* 3. BENEFIT SECTION: PLANNED WORK ALONGSIDE RECORDED ATTENDANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
            A clearer view of the workday
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A266B] tracking-tight">
            Review planned work alongside recorded arrivals and departures.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            See planned shifts alongside recorded arrivals, departures and sessions that may need review. Managers can understand how attendance is matching the plan and add context where needed.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#009FF5] flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-bold text-base text-[#0A266B]">
              Grounded in evidence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare planned shifts with recorded arrival and departure times in one attendance record.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
            <h3 className="font-bold text-base text-[#0A266B]">
              Context matters
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Give authorised Managers a way to review situations that need explanation, including legitimate field deployments and approved exceptions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users size={22} />
            </div>
            <h3 className="font-bold text-base text-[#0A266B]">
              Useful to workers too
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Workers can check their own attendance records, so they can see the same recorded information as their organisation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0A266B] flex items-center justify-center">
              <Building2 size={22} />
            </div>
            <h3 className="font-bold text-base text-[#0A266B]">
              Focused boundaries
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Klockit helps your organisation keep track of attendance. It is not payroll or a full HR system.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRICING PREVIEW SECTION */}
      <section className="bg-white py-16 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
                Straightforward Pricing
              </div>
              <h2 className="text-3xl font-extrabold text-[#0A266B] tracking-tight">
                Priced by workers, not Site count.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add as many Sites as your organisation needs without extra fees. Every standard plan includes the exact same core Klockit product.
              </p>
            </div>

            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0A266B] font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              <span>View full pricing table</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Preview Grid of First 4 Bands */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLAN_BANDS.slice(0, 4).map((plan) => (
              <div
                key={plan.id}
                className={`p-5 rounded-2xl border transition-all ${
                  plan.isPopular
                    ? 'border-[#009FF5] bg-sky-50/20 shadow-xs ring-1 ring-[#009FF5]/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between pb-2">
                  <h4 className="font-bold text-base text-[#0A266B]">{plan.name}</h4>
                  {plan.isPopular && (
                    <span className="text-[10px] font-bold text-[#009FF5] uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium pb-4">
                  {plan.workersLabel}
                </div>
                <div className="flex items-baseline gap-1 pb-3 border-b border-slate-100">
                  <span className="text-2xl font-extrabold text-[#0A266B] tabular-nums">
                    ${plan.prices.USD}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600 pt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <span>
              <strong>Market currencies available:</strong> USD, KES, UGX, RWF, and BIF. Prices include applicable taxes.
            </span>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-[#009FF5] font-semibold hover:underline flex items-center gap-1 shrink-0"
            >
              <span>See local market currency table</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. GUIDES ENTRY POINT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A266B] text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00C2FF] uppercase tracking-wider">
                <BookOpen size={15} />
                <span>Product Documentation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                How Klockit QR attendance works
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Read our in-depth guide on how workers use the Site QR poster or individual Worker QR cards, what an attendance scan actually records, and how managers review context without surveillance.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('guide-article')}
                  className="px-5 py-3 bg-[#00C2FF] hover:bg-[#00aff0] text-[#0A266B] font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Read Guide: How QR attendance works</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate('guides')}
                  className="px-4 py-3 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Browse all 8 Guide categories
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="text-xs font-semibold text-[#00C2FF] uppercase">
                Featured FAQs in this guide:
              </div>
              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#00C2FF] font-bold">Q:</span>
                  <span>What does a QR scan actually record?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C2FF] font-bold">Q:</span>
                  <span>Does Klockit prove worker productivity?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C2FF] font-bold">Q:</span>
                  <span>Does Klockit decide why someone was absent?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRIAL AND EXPIRY ASSURANCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-bold text-[#0A266B]">
              Your records stay with your organisation.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe in honest, predictable software governance. Here is exactly what happens during and after your trial:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>14-day automatic trial</span>
              </div>
              <p>
                Starts immediately upon signup. Full access to set up Sites, invite workers, and record attendance. No credit card required.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <Lock size={16} className="text-[#009FF5]" />
                <span>If a subscription pauses</span>
              </div>
              <p>
                Administrators retain full access to dashboard reports and past records. New attendance sessions pause, and no records are created for inactive days.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-indigo-600" />
                <span>Instant reactivation</span>
              </div>
              <p>
                Reactivate whenever ready. Your complete attendance history remains preserved in Klockit; inactive days are never backfilled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-[#0A266B] tracking-tight">
            Ready to know who was at work?
          </h2>
          <p className="text-sm text-slate-600">
            Set up your organisation in less than two minutes. See how Klockit brings clarity to your workplace presence records.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0A266B] hover:bg-[#071c4f] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start your 14-day free trial</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onOpenContactModal}
            className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl transition-colors"
          >
            <span>Need Custom or 200+? Talk to us</span>
          </button>
        </div>
      </section>
    </div>
  );
}
