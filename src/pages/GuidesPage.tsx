import React, { useState } from 'react';
import { PageId } from '../components/Navbar';
import {
  BookOpen,
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
  ChevronRight,
  Bookmark,
  Share2,
  ExternalLink,
  Calendar,
  Layers,
} from 'lucide-react';

interface GuidesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: () => void;
  initialGuideId?: string;
}

interface GuideItem {
  id: string;
  category: string;
  title: string;
  readTime: string;
  type: string;
  onThisPage: { id: string; label: string }[];
}

const GUIDES_LIST: GuideItem[] = [
  {
    id: 'qr-attendance-works',
    category: 'Recording attendance',
    title: 'How QR attendance works',
    readTime: '5 min read',
    type: 'Concept guide',
    onThisPage: [
      { id: 'shared-record', label: 'A shared attendance record' },
      { id: 'site-qr', label: 'Using the Site QR' },
      { id: 'worker-qr', label: 'Using a Worker QR card' },
      { id: 'what-record-tells-you', label: 'What the record tells you' },
      { id: 'common-questions', label: 'Common questions' },
    ],
  },
  {
    id: 'first-site-setup',
    category: 'Sites and locations',
    title: 'Setting up your first workplace Site',
    readTime: '3 min read',
    type: 'Operational guide',
    onThisPage: [
      { id: 'site-definition', label: 'What counts as a Site' },
      { id: 'qr-placard', label: 'Printing the Site QR placard' },
      { id: 'site-locations', label: 'Managing multi-site workforces' },
    ],
  },
  {
    id: 'worker-qr-cards',
    category: 'Workers and invitations',
    title: 'Issuing Worker QR cards',
    readTime: '4 min read',
    type: 'Hardware & cards',
    onThisPage: [
      { id: 'card-generation', label: 'Generating individual QR credentials' },
      { id: 'shared-device-kiosk', label: 'Setting up the shared Site device' },
      { id: 'replacement-cards', label: 'Managing lost or reissued cards' },
    ],
  },
  {
    id: 'manager-review-guide',
    category: 'Manager review',
    title: 'Reviewing presence and exceptions',
    readTime: '4 min read',
    type: 'Manager workflow',
    onThisPage: [
      { id: 'daily-review', label: 'Daily presence review' },
      { id: 'context-notes', label: 'Adding context for field work' },
      { id: 'evidence-rule', label: 'Record integrity guarantees' },
    ],
  },
  {
    id: 'plans-billing-guide',
    category: 'Plans and billing',
    title: 'Workforce bands and subscriptions',
    readTime: '3 min read',
    type: 'Commercial policy',
    onThisPage: [
      { id: 'accounted-workers', label: 'How Accounted Workers are counted' },
      { id: 'prepaid-cycles', label: 'Prepaid start-of-period terms' },
      { id: 'trial-expiry', label: 'Data retention on expiry' },
    ],
  },
];

export function GuidesPage({ onNavigate, onOpenContactModal, initialGuideId = 'qr-attendance-works' }: GuidesPageProps) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(initialGuideId);

  const selectedGuide = GUIDES_LIST.find((g) => g.id === selectedGuideId) || GUIDES_LIST[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Sub-header Breadcrumb Row */}
      <div className="border-b border-slate-100 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0A266B] transition-colors">
            Home
          </button>
          <span>›</span>
          <button onClick={() => setSelectedGuideId('qr-attendance-works')} className="hover:text-[#0A266B] transition-colors font-medium text-slate-700">
            Guides
          </button>
          <span>›</span>
          <span className="text-slate-900 font-semibold">{selectedGuide.category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= LEFT SIDEBAR (GUIDE MENU) ================= */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 pr-2">
            {/* Guide Menu Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <BookOpen size={15} className="text-[#0A266B]" />
                <span>Klockit Guides</span>
              </div>

              {/* Grouped Guides List */}
              <div className="space-y-5 text-xs">
                {/* Category 1: Recording Attendance */}
                <div className="space-y-1.5">
                  <div className="font-bold text-[#0A266B] text-xs px-1">
                    Recording attendance
                  </div>
                  <div className="space-y-1">
                    {GUIDES_LIST.filter((g) => g.category === 'Recording attendance').map((guide) => {
                      const isActive = guide.id === selectedGuideId;
                      return (
                        <button
                          key={guide.id}
                          onClick={() => setSelectedGuideId(guide.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-[#EBF5FF] text-[#0A266B] font-semibold border-l-3 border-[#009FF5]'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{guide.title}</span>
                          <ArrowRight
                            size={13}
                            className={`shrink-0 ml-1 transition-transform ${
                              isActive ? 'text-[#009FF5] translate-x-0.5' : 'text-slate-400'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Other Guide Categories */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                  <div className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider px-1">
                    Other Documentation
                  </div>
                  <div className="space-y-1">
                    {GUIDES_LIST.filter((g) => g.category !== 'Recording attendance').map((guide) => {
                      const isActive = guide.id === selectedGuideId;
                      return (
                        <button
                          key={guide.id}
                          onClick={() => setSelectedGuideId(guide.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-[#EBF5FF] text-[#0A266B] font-semibold border-l-3 border-[#009FF5]'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{guide.title}</span>
                          {isActive && <ArrowRight size={13} className="text-[#009FF5] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* In-page Table of Contents: "ON THIS PAGE" */}
            <div className="pt-6 border-t border-slate-200/90 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                On this page
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {selectedGuide.onThisPage.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-left hover:text-[#0A266B] hover:underline transition-colors block py-0.5 leading-snug"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Callout Link */}
            <div className="pt-6 border-t border-slate-200/90 space-y-1 text-xs">
              <span className="text-slate-500 block">Need a little help?</span>
              <button
                onClick={onOpenContactModal}
                className="font-semibold text-[#0A266B] hover:text-[#009FF5] transition-colors flex items-center gap-1.5"
              >
                <span>Talk to the Klockit team</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </aside>

          {/* ================= RIGHT DISPLAY WINDOW (THE ACTUAL ARTIFACT) ================= */}
          <main className="lg:col-span-9 max-w-4xl space-y-12">
            {selectedGuideId === 'qr-attendance-works' ? (
              /* ARTIFACT 1: How Klockit QR Attendance Works (Exact Screenshot Format) */
              <div className="space-y-12">
                {/* 1. Header & Lead */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
                    Recording Attendance
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A266B] tracking-tight leading-[1.15]">
                    How Klockit QR attendance works.
                  </h1>

                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Two ways to record arrival and departure. One clear attendance record for your organisation.
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <Clock size={14} className="text-slate-400" />
                    <span>5 min read</span>
                    <span aria-hidden="true">·</span>
                    <span>Concept guide</span>
                  </div>
                </div>

                {/* 2. Blue Callout Box: Intended experience notice */}
                <div className="p-4 sm:p-5 bg-sky-50/70 border-l-4 border-[#009FF5] rounded-r-xl text-xs sm:text-sm text-slate-700 flex items-start gap-3.5 leading-relaxed">
                  <div className="p-1 rounded-full bg-white text-[#009FF5] shrink-0 mt-0.5 border border-sky-200">
                    <Info size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900">A guide to the intended experience.</strong> All QR visuals are illustrative examples. The shared-device Worker QR method is a planned launch capability; public release depends on implementation and validation.
                  </div>
                </div>

                {/* 3. Section: A shared attendance record */}
                <section id="shared-record" className="space-y-4 pt-2">
                  <h2 className="text-2xl font-bold text-[#0A266B] tracking-tight">
                    A shared attendance record
                  </h2>
                  <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                    <p>
                      Klockit brings planned work and supported attendance events together across your organisation’s Sites. A Worker can use a suitable phone with the Site QR, or present an individual Worker QR card to an organisation-controlled shared Site device.
                    </p>
                    <p>
                      Both methods contribute to the organisation’s attendance record. Not every Worker needs to own a smartphone.
                    </p>
                  </div>
                </section>

                {/* 4. Section 01: The Site QR */}
                <section id="site-qr" className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      01 / The Site QR
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A266B] tracking-tight">
                      The Worker uses their own phone.
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      The Site QR identifies the workplace attendance path. A Worker uses a suitable phone with that Site QR to record supported arrival and departure events.
                    </p>
                  </div>

                  {/* Visual Diagram Box 1 (Matches user screenshot) */}
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full max-w-lg">
                      {/* Left: Site QR Poster */}
                      <div className="w-44 bg-white rounded-xl p-4 shadow-xs border border-slate-200 text-center space-y-2">
                        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          Klockit · Main Site
                        </div>
                        <div className="w-24 h-24 mx-auto bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white">
                          <QrCode size={64} className="text-white" />
                        </div>
                        <div className="text-xs font-bold text-[#0A266B]">
                          Site QR
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-slate-400">
                        <ArrowRight size={22} className="text-[#009FF5]" />
                      </div>

                      {/* Right: Worker Phone */}
                      <div className="w-44 bg-white rounded-2xl p-3.5 shadow-sm border-2 border-slate-300 text-center space-y-2">
                        <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-1" />
                        <div className="w-20 h-20 mx-auto bg-sky-50 rounded-lg p-2 border border-sky-200 flex items-center justify-center text-[#0A266B]">
                          <QrCode size={48} className="text-[#009FF5]" />
                        </div>
                        <div className="text-xs font-bold text-slate-800">
                          Worker's phone
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
                      Illustrative Example
                    </div>
                  </div>

                  {/* 3 Steps List */}
                  <div className="space-y-4 pt-2 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-slate-900">The Worker is at the organisation’s Site.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          They use the Site QR for the applicable attendance session.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-900">The Worker uses their phone with the Site QR.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          The supported attendance flow records an arrival or departure event.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-900">The event becomes part of the attendance record.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Managers can review it alongside planned work and relevant context.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. Section 02: The Worker QR Card */}
                <section id="worker-qr" className="space-y-5 pt-6 border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      02 / The Worker QR Card
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A266B] tracking-tight">
                      A card for the Worker. A shared device at the Site.
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      The individual Worker QR card identifies the Worker, not the Site. The Worker presents the card to an organisation-controlled shared Site device to record arrival or departure.
                    </p>
                  </div>

                  {/* Visual Diagram Box 2 (Matches user screenshot) */}
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full max-w-lg">
                      {/* Left: Worker QR Card */}
                      <div className="w-44 bg-white rounded-xl p-4 shadow-xs border border-slate-200 text-center space-y-2">
                        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          Klockit · Worker Card
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center">
                            AM
                          </span>
                          <span>Amina M.</span>
                        </div>
                        <div className="w-20 h-20 mx-auto bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white">
                          <QrCode size={52} className="text-white" />
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-slate-400">
                        <ArrowRight size={22} className="text-[#009FF5]" />
                      </div>

                      {/* Right: Shared Site Device */}
                      <div className="w-44 bg-white rounded-2xl p-3.5 shadow-sm border-2 border-indigo-200 text-center space-y-2">
                        <div className="text-[10px] font-bold text-[#0A266B]">
                          Shared Site device
                        </div>
                        <div className="w-20 h-20 mx-auto bg-indigo-50/70 rounded-lg p-2 border border-indigo-100 flex items-center justify-center text-indigo-700">
                          <QrCode size={48} className="text-indigo-600" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          Controlled by organisation
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
                      Illustrative Example
                    </div>
                  </div>

                  {/* 3 Steps List */}
                  <div className="space-y-4 pt-2 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-slate-900">The Worker carries their individual card.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Each Worker receives an individual physical or printed card with their unique QR credential.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-900">The organisation provides a shared device.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          An organisation-controlled tablet or phone is positioned at the workplace entry or site gate.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-900">Arrival and departure are recorded in seconds.</strong>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Presenting the card logs the event into the shared attendance record without requiring a smartphone.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 6. Section: What the record tells you */}
                <section id="what-record-tells-you" className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-2xl font-bold text-[#0A266B] tracking-tight">
                    What the record tells you
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Klockit attendance records are designed to be unambiguous and auditable. Every verified scan event records:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Occurrence timestamp:</strong> Exact verified time of arrival or departure.</span>
                    </li>
                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Site verification:</strong> Physical location identifier where the scan occurred.</span>
                    </li>
                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Worker credential:</strong> Cryptographic confirmation of worker identity.</span>
                    </li>
                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Shift reconciliation:</strong> Side-by-side comparison with scheduled work.</span>
                    </li>
                  </ul>
                </section>

                {/* 7. Section: Common questions */}
                <section id="common-questions" className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="text-2xl font-bold text-[#0A266B] tracking-tight">
                    Common questions
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-sm text-[#0A266B]">
                        What does a QR scan actually record?
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A QR scan records supported attendance events: arrival and departure times, worker identity, and the verified Site. It creates a cryptographic presence log for managers to review with context.
                      </p>
                    </div>

                    <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-sm text-[#0A266B]">
                        Does Klockit prove worker productivity?
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong>No.</strong> Klockit records workforce presence at approved Sites. It does not measure output, monitor software keystrokes, or rate employee productivity. Evaluating workplace contribution remains the role of human managers.
                      </p>
                    </div>

                    <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-1.5">
                      <h4 className="font-bold text-sm text-[#0A266B]">
                        Does Klockit determine why someone was absent?
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong>No.</strong> Klockit flags deviations against scheduled shifts so authorised managers can review and record context—such as approved field deployments, off-site deliveries, sick leave, or transport delays.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* COMPANION ARTIFACT TEMPLATE: Rendered when user highlights other guides in the menu */
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
                    {selectedGuide.category}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A266B] tracking-tight">
                    {selectedGuide.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} className="text-slate-400" />
                    <span>{selectedGuide.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedGuide.type}</span>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-700">
                  <strong className="text-slate-900">Approved Documentation:</strong> This guide provides official operational instructions for {selectedGuide.category.toLowerCase()} in Klockit.
                </div>

                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <section className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0A266B]">Overview & Scope</h3>
                    <p>
                      In Klockit, operations are centered around workforce presence accountability. Every standard plan has access to the full platform capabilities without artificial feature gating.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xl font-bold text-[#0A266B]">Key Operational Principles</h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {selectedGuide.onThisPage.map((item, idx) => (
                        <li key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                          <span className="font-bold text-[#009FF5]">{idx + 1}.</span>
                          <div>
                            <strong className="text-slate-800">{item.label}:</strong> Instructions and verification criteria established in accordance with Klockit governing rules.
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedGuideId('qr-attendance-works')}
                    className="text-xs font-semibold text-[#009FF5] hover:underline flex items-center gap-1"
                  >
                    <span>← Return to "How QR attendance works"</span>
                  </button>

                  <button
                    onClick={onOpenContactModal}
                    className="px-4 py-2 bg-[#0A266B] text-white text-xs font-semibold rounded-lg hover:bg-[#071c4f] transition-colors"
                  >
                    Contact Klockit Support
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
