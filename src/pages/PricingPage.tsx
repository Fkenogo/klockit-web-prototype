import React, { useState } from 'react';
import {
  PLAN_BANDS,
  CURRENCIES,
  CurrencyCode,
  CORE_INCLUDED_FEATURES,
  PlanBand,
} from '../data/klockitData';
import {
  ShieldCheck,
  Check,
  HelpCircle,
  ArrowRight,
  Info,
  Building2,
  Users,
  CreditCard,
  Lock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface PricingPageProps {
  onOpenTrialModal: () => void;
  onOpenContactModal: () => void;
}

export function PricingPage({
  onOpenTrialModal,
  onOpenContactModal,
}: PricingPageProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('KES');
  const [selectedWorkers, setSelectedWorkers] = useState<number>(15);

  const currencyConfig = CURRENCIES[selectedCurrency];

  // Helper to match plan band from worker count
  const matchingPlan = PLAN_BANDS.find((band) => {
    if (band.maxWorkers === null) {
      return selectedWorkers >= band.minWorkers;
    }
    return selectedWorkers >= band.minWorkers && selectedWorkers <= band.maxWorkers;
  }) || PLAN_BANDS[2];

  const renderPriceString = (plan: PlanBand) => {
    const raw = plan.prices[selectedCurrency];
    if (raw === 'Talk to us') return 'Talk to us';
    return currencyConfig.format(raw);
  };

  return (
    <div className="space-y-20 pb-20 pt-8 md:pt-14">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Workforce Pricing</span>
            <span aria-hidden="true">·</span>
            <span>All Standard Plans Include Full Product</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A266B] tracking-tight leading-tight">
            Clear pricing for workforce accountability.
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            Choose a plan based on the number of workers in your organisation. Every standard plan includes the same core Klockit product.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenTrialModal}
              className="px-6 py-3.5 bg-[#0A266B] hover:bg-[#071c4f] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Start your 14-day free trial</span>
              <ArrowRight size={16} />
            </button>
            <span className="text-xs text-slate-500 sm:max-w-xs">
              No permanent free plan. See how Klockit works with your organisation during the 14-day trial.
            </span>
          </div>
        </div>
      </section>

      {/* 2. CURRENCY SELECTOR & INTERACTIVE WORKFORCE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 lg:p-8 space-y-8">
          {/* Currency Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Show prices in:</span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedCurrency(code)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedCurrency === code
                        ? 'bg-[#0A266B] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {CURRENCIES[code].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 md:text-right space-y-0.5">
              <div className="font-semibold text-slate-700">Monthly prices. Prices shown include applicable taxes.</div>
              <div className="text-[11px] text-slate-500">
                Local prices are set by Klockit and reviewed periodically. They do not change with daily exchange-rate movements.
              </div>
            </div>
          </div>

          {/* Interactive Calculator Slider */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Interactive Plan Finder
                </span>
                <h3 className="text-base font-bold text-[#0A266B]">
                  How many workers have joined your organisation?
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#0A266B] tabular-nums">
                  {selectedWorkers}
                </span>
                <span className="text-xs font-medium text-slate-500 ml-1.5">
                  Workers
                </span>
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={220}
              step={1}
              value={selectedWorkers}
              onChange={(e) => setSelectedWorkers(Number(e.target.value))}
              className="w-full accent-[#0A266B] cursor-pointer h-2 bg-slate-200 rounded-lg"
              aria-label="Number of workers slider"
            />

            {/* Live Recommendation Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#009FF5] uppercase">
                    Matching Plan:
                  </span>
                  <span className="font-bold text-base text-[#0A266B]">
                    {matchingPlan.name} ({matchingPlan.workersLabel})
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {matchingPlan.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#0A266B] tabular-nums">
                    {renderPriceString(matchingPlan)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {matchingPlan.prices[selectedCurrency] === 'Talk to us' ? 'Dedicated arrangement' : 'per month'}
                  </div>
                </div>

                {matchingPlan.id === 'custom' ? (
                  <button
                    onClick={onOpenContactModal}
                    className="px-4 py-2 bg-[#0A266B] text-white text-xs font-semibold rounded-lg hover:bg-[#071c4f] transition-colors"
                  >
                    Talk to us
                  </button>
                ) : (
                  <button
                    onClick={onOpenTrialModal}
                    className="px-4 py-2 bg-[#0A266B] text-white text-xs font-semibold rounded-lg hover:bg-[#071c4f] transition-colors"
                  >
                    Start trial
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Complete Price Table */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0A266B]">
              Complete Workforce Price Schedule
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-3 px-4">Plan Name</th>
                    <th className="py-3 px-4">Workers</th>
                    <th className="py-3 px-4 text-right">
                      Price in {CURRENCIES[selectedCurrency].label}
                    </th>
                    <th className="py-3 px-4 text-right">USD Reference</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PLAN_BANDS.map((plan) => {
                    const isSelected = plan.id === matchingPlan.id;
                    const priceInCur = plan.prices[selectedCurrency];
                    return (
                      <tr
                        key={plan.id}
                        className={`transition-colors ${
                          isSelected ? 'bg-sky-50/50 font-medium' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{plan.name}</span>
                            {plan.isPopular && (
                              <span className="text-[10px] font-bold text-[#009FF5] bg-sky-100 px-1.5 py-0.2 rounded">
                                Most Popular
                              </span>
                            )}
                            {isSelected && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                Matches your team
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">
                            {plan.description}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                          {plan.workersLabel}
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#0A266B] tabular-nums whitespace-nowrap text-sm">
                          {renderPriceString(plan)}
                          {typeof priceInCur === 'number' && (
                            <span className="text-[10px] text-slate-400 font-normal"> /mo</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-500 tabular-nums whitespace-nowrap">
                          {plan.prices.USD === 'Talk to us' ? 'Talk to us' : `$${plan.prices.USD}/mo`}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {plan.id === 'custom' ? (
                            <button
                              onClick={onOpenContactModal}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              Talk to us
                            </button>
                          ) : (
                            <button
                              onClick={onOpenTrialModal}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A266B] hover:bg-[#071c4f] rounded-lg transition-colors"
                            >
                              Select plan
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500">
              Prices shown include applicable taxes. Subscriptions are prepaid before each period begins. You’ll receive a payment receipt and the date your next payment is due.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INCLUDED WITH EVERY STANDARD PLAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold text-[#009FF5] uppercase tracking-wider">
            All Standard Plans
          </div>
          <h2 className="text-3xl font-extrabold text-[#0A266B] tracking-tight">
            The same Klockit product in every plan.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every standard plan includes the same core Klockit product. Choose the price band that fits your team size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_INCLUDED_FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check size={13} strokeWidth={3} />
                </div>
                <h4 className="font-bold text-sm text-[#0A266B]">{feat.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                {feat.description}
              </p>
            </div>
          ))}

          {/* Unlimited Sites Card */}
          <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-sky-200 text-[#0A266B] flex items-center justify-center shrink-0">
                <Building2 size={13} strokeWidth={2.5} />
              </div>
              <h4 className="font-bold text-sm text-[#0A266B]">Unlimited Sites</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Add all your branches, project depots, workshops, and temporary project locations without per-site surcharges.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TEAM SIZE AND BILLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan size */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0A266B] flex items-center justify-center">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#0A266B]">
              Plans sized to your team.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose a plan based on the number of workers in your organisation. Your plan price changes with your team size.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-800">Over-band notice:</strong>
              <p>
                If your team grows into a higher plan band, we’ll let you know. The new price starts with your next subscription period.
              </p>
            </div>
          </div>

          {/* Billing and Payment */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0A266B] flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#0A266B]">
              Know when your subscription is due.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscriptions are prepaid before each period begins. Mobile Money, card and bank transfer payments will be available. You’ll receive a receipt and the date your next payment is due.
            </p>
            <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 text-xs text-slate-700 space-y-1">
              <strong className="text-[#0A266B]">Pilot payment note:</strong>
              <p>
                During the pilot, choosing to pay takes your organisation through a guided manual payment process. Klockit provides the payment instructions directly at that point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOM ARRANGEMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A266B] text-white rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold text-[#00C2FF] uppercase tracking-wider">
              200+ Workers or Project Teams
            </div>
            <h3 className="text-2xl font-bold text-white">
              Need a different arrangement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Custom plans are available for organisations with 200 or more workers, and for fixed-duration needs such as construction projects, events and seasonal operations.
            </p>
          </div>

          <button
            onClick={onOpenContactModal}
            className="px-6 py-3.5 bg-[#00C2FF] hover:bg-[#00aff0] text-[#0A266B] font-bold text-xs rounded-xl transition-colors shadow-md whitespace-nowrap shrink-0"
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* 6. PRICING FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#0A266B]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-500">
            Everything you need to know about Klockit plans and billing.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#0A266B]">
              Do different standard plans include different features?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. Every standard plan includes the same core Klockit product. The price is based on the number of workers in your organisation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#0A266B]">
              Do pending invitations count toward my plan?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose the plan band that fits the number of workers in your organisation. You can adjust your plan as your team changes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#0A266B]">
              Does adding another Site change my price?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your plan price is based on the number of workers in your organisation, not the number of Sites.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#0A266B]">
              What payment methods can I use?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscriptions are prepaid before the period begins. Payment options include Mobile Money, cards, and bank transfers. During the pilot, Klockit guides your organisation through a manual payment process after you choose to pay.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-sm text-[#0A266B]">
              Does every Worker need a smartphone?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              There are two attendance methods: QR code and Manual Worker Ref. For QR, workers can scan the Site QR with their phone or use a shared Site device to scan their Worker QR. For Manual Worker Ref, they can enter their Ref on their phone (which needs approval) or on a shared Site device (no approval needed).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
