import React, { useState, useRef, useEffect } from 'react';
import {
  Smartphone,
  Tablet,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Building,
  Info,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
  MoveHorizontal,
} from 'lucide-react';
import { SAMPLE_ATTENDANCE_DATA, SampleAttendanceRecord, WorkerAttendanceStatus } from '../data/klockitData';

/**
 * High-fidelity Illustrative Attendance Record Component.
 * Framed preview of the Klockit manager console ("Who is at work today?"):
 * - Fits within a bounded right-side frame in the hero
 * - Drag-to-pan horizontally across columns to see the other end
 * - Interactive mouse/touch drag + quick nudge buttons
 * - Aligned precisely with Klockit manager interface fields:
 *   WORKER, EXPECTED SITE, PLANNED TIME, ARRIVAL, DEPARTURE, STATUS, DETAILS
 */
export function IllustrativeRecordDiagram({ className = '' }: { className?: string }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<string>('All Sites');
  const [inspectedWorker, setInspectedWorker] = useState<SampleAttendanceRecord | null>(null);

  // Horizontal Drag to Pan state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds
  const updateScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    updateScrollBounds();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollBounds, { passive: true });
      return () => el.removeEventListener('scroll', updateScrollBounds);
    }
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    updateScrollBounds();
  };

  const scrollNudge = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -220 : 220;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(updateScrollBounds, 300);
  };

  // Derive counts
  const totalExpected = SAMPLE_ATTENDANCE_DATA.length;
  const atWorkCount = SAMPLE_ATTENDANCE_DATA.filter((r) => r.status === 'At work now').length;
  const completedCount = SAMPLE_ATTENDANCE_DATA.filter((r) => r.status === 'Completed').length;
  const notArrivedCount = SAMPLE_ATTENDANCE_DATA.filter((r) => r.status === 'Not yet arrived').length;
  const needsAttentionCount = SAMPLE_ATTENDANCE_DATA.filter((r) => r.status === 'Needs attention').length;

  // Filter logic
  const filteredData = SAMPLE_ATTENDANCE_DATA.filter((record) => {
    if (selectedStatusFilter === 'at-work' && record.status !== 'At work now') return false;
    if (selectedStatusFilter === 'completed' && record.status !== 'Completed') return false;
    if (selectedStatusFilter === 'not-arrived' && record.status !== 'Not yet arrived') return false;
    if (selectedStatusFilter === 'needs-attention' && record.status !== 'Needs attention') return false;

    if (selectedSite !== 'All Sites' && record.expectedSite !== selectedSite) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = record.workerName.toLowerCase().includes(q);
      const matchSite = record.expectedSite.toLowerCase().includes(q);
      const matchCode = record.workerCode.toLowerCase().includes(q);
      if (!matchName && !matchSite && !matchCode) return false;
    }

    return true;
  });

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden text-slate-800 flex flex-col relative ${className}`}>
      {/* 1. TOP OPERATIONAL CONTEXT STRIP */}
      <div className="px-4 py-2.5 bg-[#0A266B] text-white flex items-center justify-between gap-2 text-xs shrink-0 select-none">
        <div className="flex items-center gap-2 truncate">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-semibold text-white truncate text-[11px] sm:text-xs">
            Evaluation Institution · K-76CE1F5C54E2
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-amber-400/25 text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
            <AlertTriangle size={10} />
            <span>Attention · {needsAttentionCount}</span>
          </span>
          <span className="text-[10px] font-medium text-slate-300 bg-white/10 px-2 py-0.5 rounded hidden sm:inline">
            Example record
          </span>
        </div>
      </div>

      {/* 2. SECTION HEADER & DRAG CONTROLS */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0A266B] leading-tight">
            Who is at work today?
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-1">
            Verified via Site QR or Worker QR card. Effective occurrence times.
          </p>
        </div>

        {/* Date box & Quick Nudge Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-700">
            <Calendar size={11} className="text-[#009FF5]" />
            <span>10/07/2026</span>
          </div>

          {/* Drag scroll indicator buttons */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 ml-1">
            <button
              onClick={() => scrollNudge('left')}
              disabled={!canScrollLeft}
              className={`p-1 rounded transition-colors ${
                canScrollLeft ? 'text-slate-700 hover:bg-white hover:shadow-2xs' : 'text-slate-300 cursor-not-allowed'
              }`}
              title="Pan left"
              aria-label="Pan left"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => scrollNudge('right')}
              disabled={!canScrollRight}
              className={`p-1 rounded transition-colors ${
                canScrollRight ? 'text-slate-700 hover:bg-white hover:shadow-2xs' : 'text-slate-300 cursor-not-allowed'
              }`}
              title="Pan right"
              aria-label="Pan right"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPACT ATTENDANCE SUMMARY STRIP */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 grid grid-cols-3 gap-2 text-center shrink-0 select-none">
        <div className="bg-white py-1.5 px-2 rounded-lg border border-slate-200/80">
          <div className="text-[10px] text-slate-500 font-medium">Expected</div>
          <div className="text-base font-extrabold text-[#0A266B] tabular-nums">
            {totalExpected}
          </div>
        </div>
        <div className="bg-white py-1.5 px-2 rounded-lg border border-slate-200/80">
          <div className="text-[10px] text-slate-500 font-medium">At Work Now</div>
          <div className="text-base font-extrabold text-emerald-600 tabular-nums">
            {atWorkCount}
          </div>
        </div>
        <div className="bg-white py-1.5 px-2 rounded-lg border border-slate-200/80">
          <div className="text-[10px] text-slate-500 font-medium">Needs Attention</div>
          <div className="text-base font-extrabold text-amber-600 tabular-nums">
            {needsAttentionCount}
          </div>
        </div>
      </div>

      {/* 4. COMPACT FILTER TABS & SEARCH BAR */}
      <div className="px-4 py-2 bg-white border-b border-slate-100 space-y-1.5 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedStatusFilter === 'all'
                ? 'bg-[#0A266B] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({totalExpected})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('at-work')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedStatusFilter === 'at-work'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            At Work ({atWorkCount})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('completed')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedStatusFilter === 'completed'
                ? 'bg-sky-700 text-white'
                : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('needs-attention')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedStatusFilter === 'needs-attention'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Attention ({needsAttentionCount})
          </button>
        </div>

        {/* Search & Site filter */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-7 relative">
            <Search className="absolute left-2.5 top-2 text-slate-400" size={12} />
            <input
              type="text"
              placeholder="Search worker or site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:bg-white"
            />
          </div>
          <div className="col-span-5">
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700 focus:outline-none focus:bg-white"
            >
              <option value="All Sites">All Sites</option>
              <option value="Main Site">Main Site</option>
              <option value="Harbour Warehouse">Harbour Warehouse</option>
              <option value="Central Workshop">Central Workshop</option>
              <option value="Parkway Yard">Parkway Yard</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. DRAGGABLE TABLE FRAME CONTAINER */}
      <div className="relative group">
        {/* Drag affordance prompt banner */}
        <div className="px-4 py-1 bg-sky-50/80 border-b border-sky-100/80 flex items-center justify-between text-[10px] text-sky-900 select-none">
          <span className="flex items-center gap-1.5 font-medium">
            <MoveHorizontal size={12} className="text-[#009FF5] animate-pulse" />
            <span>Click and drag table horizontally to explore all columns</span>
          </span>
          <span className="text-slate-500 font-mono">
            {filteredData.length} shifts
          </span>
        </div>

        {/* Scrollable & Draggable Box */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`overflow-x-auto overflow-y-hidden max-h-[280px] select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Table with fixed min-width so visitor must drag to see the other end */}
          <table className="min-w-[760px] w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-medium text-[10px]">
                <th className="py-2 px-4 font-semibold uppercase tracking-wider sticky left-0 bg-slate-50/95 z-10 shadow-2xs">
                  Worker
                </th>
                <th className="py-2 px-3 font-semibold uppercase tracking-wider">Expected Site</th>
                <th className="py-2 px-3 font-semibold uppercase tracking-wider">Planned Time</th>
                <th className="py-2 px-3 font-semibold uppercase tracking-wider">Arrival</th>
                <th className="py-2 px-3 font-semibold uppercase tracking-wider">Departure</th>
                <th className="py-2 px-3 font-semibold uppercase tracking-wider">Status</th>
                <th className="py-2 px-4 font-semibold uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500 text-xs">
                    No matching worker records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* WORKER (Sticky left on horizontal scroll so row stays identifiable) */}
                    <td className="py-2.5 px-4 sticky left-0 bg-white/95 z-10 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">
                          {record.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs leading-none">{record.workerName}</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">{record.workerCode}</div>
                        </div>
                      </div>
                    </td>

                    {/* EXPECTED SITE */}
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap text-xs">
                      {record.expectedSite}
                    </td>

                    {/* PLANNED TIME */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {record.plannedTime}
                    </td>

                    {/* ARRIVAL */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-800 whitespace-nowrap font-medium">
                      {record.arrival}
                    </td>

                    {/* DEPARTURE */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-800 whitespace-nowrap font-medium">
                      {record.departure}
                    </td>

                    {/* STATUS */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      {record.status === 'At work now' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>At work now</span>
                        </span>
                      )}
                      {record.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-50 text-sky-800 border border-sky-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          <span>Completed</span>
                        </span>
                      )}
                      {record.status === 'Not yet arrived' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>Not yet arrived</span>
                        </span>
                      )}
                      {record.status === 'Needs attention' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Needs attention</span>
                        </span>
                      )}
                    </td>

                    {/* DETAILS */}
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedWorker(record);
                        }}
                        className="text-[11px] font-semibold text-[#009FF5] hover:text-[#0A266B] hover:underline cursor-pointer"
                      >
                        View Worker
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right Gradient Overflow Cue (fades when scrolled to end) */}
        {canScrollRight && (
          <div
            onClick={() => scrollNudge('right')}
            className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-auto cursor-pointer flex items-center justify-end pr-1 transition-opacity"
            title="Click to pan right"
          >
            <ChevronRight size={18} className="text-[#009FF5] animate-pulse" />
          </div>
        )}

        {/* Left Gradient Overflow Cue */}
        {canScrollLeft && (
          <div
            onClick={() => scrollNudge('left')}
            className="absolute left-32 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent pointer-events-auto cursor-pointer flex items-center justify-start pl-1"
            title="Click to pan left"
          >
            <ChevronLeft size={16} className="text-[#009FF5]" />
          </div>
        )}
      </div>

      {/* 6. COMPACT RECORD INTEGRITY STRIP */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center gap-1 truncate">
          <ShieldCheck size={12} className="text-[#009FF5] shrink-0" />
          <span className="truncate">Evidence kept as recorded · Corrections appended</span>
        </span>
        <span className="font-semibold text-slate-700 shrink-0">
          ● 12 Sites
        </span>
      </div>

      {/* 7. INSPECT WORKER DETAIL MODAL / DRAWER */}
      {inspectedWorker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-sm border border-slate-200">
                  {inspectedWorker.initials}
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0A266B]">{inspectedWorker.workerName}</h4>
                  <div className="text-xs font-mono text-slate-400">{inspectedWorker.workerCode}</div>
                </div>
              </div>
              <button
                onClick={() => setInspectedWorker(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Expected Site:</span>
                <span className="font-semibold text-slate-800">{inspectedWorker.expectedSite}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Planned Shift:</span>
                <span className="font-mono text-slate-800">{inspectedWorker.plannedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Recorded Arrival:</span>
                <span className="font-mono font-semibold text-slate-900">{inspectedWorker.arrival}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Recorded Departure:</span>
                <span className="font-mono font-semibold text-slate-900">{inspectedWorker.departure}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Attendance Status:</span>
                <span className="font-semibold text-[#0A266B]">{inspectedWorker.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Verification Flow:</span>
                <span className="font-semibold text-slate-800">{inspectedWorker.method}</span>
              </div>
            </div>

            <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-[#0A266B]">Verification Evidence:</div>
              <p>{inspectedWorker.details}</p>
              {inspectedWorker.contextNote && (
                <div className="mt-2 pt-2 border-t border-sky-200/60 text-amber-900">
                  <strong>Manager Context:</strong> {inspectedWorker.contextNote}
                </div>
              )}
            </div>

            <button
              onClick={() => setInspectedWorker(null)}
              className="w-full py-2.5 bg-[#0A266B] text-white font-semibold text-xs rounded-xl hover:bg-[#071c4f] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Interactive diagram showing the two attendance methods side-by-side:
 * Method 1: Worker uses smartphone to scan Site QR poster.
 * Method 2: Worker presents QR card to shared site tablet ("Not every worker needs a smartphone").
 */
export function TwoMethodsInteractiveDiagram() {
  const [activeTab, setActiveTab] = useState<'method1' | 'method2'>('method1');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
      {/* Segmented Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-[#0A266B]">
            Two attendance paths. One unified record.
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Flexible for tech-enabled staff and field workforces without personal smartphones.
          </p>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('method1')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'method1'
                ? 'bg-white text-[#0A266B] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Site QR (Worker Phone)
          </button>
          <button
            onClick={() => setActiveTab('method2')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'method2'
                ? 'bg-white text-[#0A266B] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Worker QR Card (Shared Device)
          </button>
        </div>
      </div>

      {/* Tab 1 Content: Site QR on Worker's Phone */}
      {activeTab === 'method1' && (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#009FF5]">
              <Smartphone size={16} />
              <span>Personal or Company Smartphone</span>
            </div>
            <h4 className="text-xl font-bold text-[#0A266B]">
              Worker opens Klockit and scans the verified Site QR poster
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ideal for workers who have their own smartphone. The organisation prints and displays the verified Site QR at the workplace entrance, workshop, or project gate.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-[#009FF5] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </div>
                <span>
                  <strong>Arrive at site:</strong> Worker opens the Klockit app or mobile web session at their scheduled workplace.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-[#009FF5] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </div>
                <span>
                  <strong>Scan Site QR:</strong> Worker points camera at the physical Site poster to confirm arrival or departure.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-[#009FF5] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  3
                </div>
                <span>
                  <strong>Instant verification:</strong> Timestamp, location context, and worker identity are logged immediately to the organisation record.
                </span>
              </li>
            </ul>
          </div>

          {/* Illustrative Schematic Graphic */}
          <div className="lg:col-span-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="text-right pb-3">
              <span className="text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                Example diagram · Illustrative layout
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
              {/* Site QR Poster Card */}
              <div className="w-40 bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center space-y-2">
                <div className="text-[11px] font-bold text-[#0A266B]">Site QR Poster</div>
                <div className="w-24 h-24 mx-auto bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white">
                  <QrCode size={64} className="text-white" />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">SITE-EAST-YARD</div>
                <div className="text-[9px] text-emerald-600 font-semibold uppercase tracking-wider">
                  Verified Workplace
                </div>
              </div>

              {/* Connecting Flow Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-xs font-semibold text-[#009FF5]">Scans</span>
                <span className="text-lg">➔</span>
              </div>

              {/* Worker Phone Mockup */}
              <div className="w-48 bg-white rounded-2xl p-3 shadow-md border-2 border-slate-300 space-y-2">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
                <div className="p-2.5 bg-sky-50/70 rounded-xl border border-sky-100 text-center space-y-1">
                  <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-[#0A266B]">Arrival Recorded</div>
                  <div className="text-[10px] text-slate-600 font-medium">Amina Yusuf</div>
                  <div className="text-[10px] text-slate-500 tabular-nums">07:55 AM · Main Site</div>
                </div>
                <div className="text-[10px] text-center text-slate-400">
                  Worker sees their own record
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 Content: Worker QR Card on Shared Workplace Device */}
      {activeTab === 'method2' && (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <Tablet size={16} />
              <span>Organisation-Controlled Shared Device</span>
            </div>
            <h4 className="text-xl font-bold text-[#0A266B]">
              Not every worker needs a smartphone.
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Workers can present their individual printed or laminated Klockit QR card to a fixed, organisation-controlled phone or tablet stationed at the workplace entrance.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </div>
                <span>
                  <strong>Individual QR Card:</strong> Each accounted worker receives an individual, durable QR credential or badge.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </div>
                <span>
                  <strong>Present to Shared Device:</strong> Worker holds their card up to the shared site camera upon arriving or leaving.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  3
                </div>
                <span>
                  <strong>Equal Participation:</strong> Full participation across factory floors, warehouses, agricultural depots, and construction sites without requiring personal device ownership.
                </span>
              </li>
            </ul>

            {/* Guardrail status notice */}
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
              <Info size={14} className="shrink-0 mt-0.5 text-amber-700" />
              <span>
                <strong>Planned launch capability:</strong> Shared-device Worker QR card scanning is scheduled for rollout following operational validation.
              </span>
            </div>
          </div>

          {/* Illustrative Schematic Graphic */}
          <div className="lg:col-span-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="text-right pb-3">
              <span className="text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                Example diagram · Illustrative layout
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
              {/* Worker QR Card */}
              <div className="w-40 bg-white rounded-xl p-3.5 shadow-sm border border-slate-200 text-center space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Worker Card</div>
                <div className="w-20 h-20 mx-auto bg-slate-900 rounded-md p-1.5 flex items-center justify-center text-white">
                  <QrCode size={52} className="text-white" />
                </div>
                <div className="font-semibold text-xs text-slate-800">Grace Uwimana</div>
                <div className="text-[10px] text-slate-400 font-mono">W-FX-02</div>
              </div>

              {/* Connecting Flow Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-xs font-semibold text-indigo-600">Presents</span>
                <span className="text-lg">➔</span>
              </div>

              {/* Shared Site Device (Tablet) */}
              <div className="w-48 bg-white rounded-xl p-3 shadow-md border-2 border-indigo-200 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-[#0A266B]">Shared Site Kiosk</div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-center space-y-1">
                  <CheckCircle2 size={22} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-900">Recorded: 07:58</div>
                  <div className="text-[10px] text-slate-600">Arrival Logged</div>
                </div>
                <div className="text-[10px] text-center text-slate-400">
                  Controlled by Organisation
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
