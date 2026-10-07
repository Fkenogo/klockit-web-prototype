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
          A practical guide to how workers record presence across organisation Sites using personal smartphones or shared workplace devices, and how managers review recorded evidence with human context.
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
                <strong>Two complementary methods:</strong> Workers with a smartphone scan the Site QR poster; workers without a smartphone use an individual Worker QR card at a shared workplace device.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#009FF5] font-bold">•</span>
              <span>
                <strong>Not every worker needs a smartphone:</strong> Both paths write seamlessly to the same organisation attendance record.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#009FF5] font-bold">•</span>
              <span>
                <strong>Context over surveillance:</strong> Klockit records supported presence timestamps for managers to review with context; it never rates productivity or guesses why someone was absent.
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
            1. Who uses the Site QR and who uses the Worker QR card?
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            In any modern workplace—whether a manufacturing facility, distribution warehouse, retail branch, or construction site—teams have varied access to personal technology. Klockit was purposefully designed so that no worker is left out of the verified attendance record.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0A266B]">
                <Smartphone size={16} className="text-[#009FF5]" />
                <span>The Site QR Poster Flow</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Who uses it:</strong> Workers with personal or company smartphones.<br />
                <strong>How:</strong> The organisation generates a verified Site QR poster and displays it at the site entry. The worker scans the poster with their camera in the Klockit app or mobile session to log arrival and departure.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0A266B]">
                <Tablet size={16} className="text-indigo-600" />
                <span>The Worker QR Card Flow</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Who uses it:</strong> Workers without smartphones, temporary workers, or rotating shop-floor teams.<br />
                <strong>How:</strong> Each worker holds a physical, laminated Klockit QR card. They present this card to an organisation-controlled shared tablet or phone stationed at the workplace entrance.
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
            Regardless of whether a team member scanned the Site QR on their phone or badged in with a Worker QR card at a shared station, their attendance event is processed into the organisation’s centralized presence log in real time.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Managers see a single, unified view across all company Sites:
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
                A QR scan records the specific supported attendance event: the exact verified timestamp (arrival or departure), the identity of the worker, the verified Site location, and the verification method used. It creates a cryptographic, unalterable log entry of physical presence at work.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-base text-[#0A266B]">
                Does Klockit prove or measure productivity?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>No.</strong> Klockit records workforce presence—it does not measure work output, monitor computer activity, track continuous GPS movements, or rate employee productivity. Evaluating how well work is done remains the role of human managers and supervisors, not an automated algorithm.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-base text-[#0A266B]">
                Does Klockit decide why someone was absent?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>No.</strong> When a scheduled worker has no recorded arrival, Klockit marks the session as requiring manager review. It never presumes reasons or makes punitive deductions automatically. Managers use Klockit to review situations with context—such as authorized field deployments, customer deliveries, approved leave, or unexpected delays.
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
            Your records stay with your organisation. If your 14-day trial ends or a subscription period expires before reactivation, organisation Administrators retain full access to the dashboard and historical attendance data. New attendance recording pauses until reactivated; inactive days are never backfilled, ensuring historical integrity.
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
