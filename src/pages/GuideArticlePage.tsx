import React from 'react';
import { PageId } from '../components/Navbar';
import {
  TwoMethodsInteractiveDiagram,
  IllustrativeRecordDiagram,
} from '../components/IllustrativeDiagrams';
import {
  ArrowLeft,
  QrCode,
  Smartphone,
  Tablet,
  CheckCircle2,
  Clock,
  HelpCircle,
  ShieldCheck,
  Building2,
  Users,
  ArrowRight,
  Info,
} from 'lucide-react';

interface GuideArticlePageProps {
  onNavigate: (page: PageId) => void;
  onOpenTrialModal: () => void;
}

export function GuideArticlePage({
  onNavigate,
  onOpenTrialModal,
}: GuideArticlePageProps) {
  return (
    <article className="space-y-16 pb-24 pt-6 md:pt-10">
      {/* Article Header & Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => onNavigate('guides')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0A266B] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Guides</span>
        </button>

        {/* Clean unboxed metadata (zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Recording Attendance</span>
          <span aria-hidden="true">·</span>
          <span>Core Platform Guide</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A266B] tracking-tight leading-tight">
          How Klockit QR attendance works
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          Learn the two attendance methods and the ways your team can use them on a personal phone or shared Site device.
        </p>

        {/* Key Takeaways Callout Box */}
        <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0A266B] flex items-center gap-1.5">
            <Info size={14} className="text-[#009FF5]" />
            <span>Key Summary</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-[#009FF5] font-bold">•</span>
              <span>
                <strong>Two attendance methods:</strong> QR code and Manual Worker Ref. Each can be used on a worker’s phone or a shared Site device, with the right approval steps.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#009FF5] font-bold">•</span>
              <span>
                <strong>Use a personal or shared device:</strong> Attendance from either method is saved to the organisation’s records.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#009FF5] font-bold">•</span>
              <span>
                <strong>Attendance records for review:</strong> Managers can compare recorded attendance with planned work and review sessions that need attention.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: Who uses what? */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0A266B]">
            1. What are the two ways to record attendance?
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            The QR method gives your team two ways to record attendance: a worker can scan the Site QR on their phone, or the shared Site device can scan the worker’s QR.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0A266B]">
                <Smartphone size={16} className="text-[#009FF5]" />
                <span>Worker scans Site QR</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Who uses it:</strong> Workers with personal or company smartphones.<br />
                <strong>How:</strong> The worker uses their phone to scan the Site QR and record an arrival or departure.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0A266B]">
                <Tablet size={16} className="text-indigo-600" />
                <span>Site device scans Worker QR</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Who uses it:</strong> Workers without smartphones, temporary workers, or rotating shop-floor teams.<br />
                <strong>How:</strong> The shared Site device scans the worker’s QR to record an arrival or departure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Diagram */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0A266B]">
            2. Step-by-step visual workflow
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Explore how each method works in daily workplace operations:
          </p>
          <TwoMethodsInteractiveDiagram />
        </section>

        {/* Section 3: One unified attendance record */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0A266B]">
            3. Both methods contribute to one organisational record
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Whether your team uses QR code or Manual Worker Ref, attendance records are kept together for your organisation.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Your organisation’s attendance records bring together:
          </p>

          <IllustrativeRecordDiagram className="mt-4" />
        </section>

        {/* Section 4: Concise FAQs (Core Brief Requirement) */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-[#0A266B]">
            Common Questions & Trust Boundaries
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-base text-[#0A266B]">
                What does a Klockit QR scan actually record?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                An attendance record shows the worker, the Site, the recorded arrival or departure time, and the method used. Managers can review the record alongside planned work.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-base text-[#0A266B]">
                Does Klockit prove or measure productivity?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>No.</strong> Klockit records attendance events. It does not continuously track a worker’s location or measure productivity.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-base text-[#0A266B]">
                Does Klockit decide why someone was absent?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>No.</strong> A missing attendance record does not tell you why someone was absent. Managers can review the situation and add context.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Subscription Expiry & Data Preservation */}
        <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-bold text-base text-[#0A266B] flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Data preservation & subscription pause</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your organisation’s dashboard and past attendance records remain accessible if a trial or subscription period ends. Workers can’t record new attendance while the account is inactive. Reactivate at any time to continue; the inactive days remain a gap in the record.
          </p>
        </section>

        {/* Bottom Navigation & Conversion */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('guides')}
            className="text-xs font-semibold text-slate-600 hover:text-[#0A266B] flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Explore other Guide topics</span>
          </button>

          <button
            onClick={onOpenTrialModal}
            className="px-6 py-3 bg-[#0A266B] hover:bg-[#071c4f] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <span>Start your 14-day free trial</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
