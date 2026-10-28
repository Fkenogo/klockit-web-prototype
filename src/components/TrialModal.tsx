import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  FileCheck2,
  Sparkles,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { KlockitIcon } from './Brand';
import { PLAN_BANDS, CURRENCIES, CurrencyCode } from '../data/klockitData';

export interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CountryOption {
  code: string;
  name: string;
  currency: CurrencyCode;
  ianaTimezone: string;
  displayTimezone: string;
}

const COUNTRIES: CountryOption[] = [
  {
    code: 'KE',
    name: 'Kenya',
    currency: 'KES',
    ianaTimezone: 'Africa/Nairobi',
    displayTimezone: 'Africa/Nairobi (EAT / UTC+3)',
  },
  {
    code: 'UG',
    name: 'Uganda',
    currency: 'UGX',
    ianaTimezone: 'Africa/Kampala',
    displayTimezone: 'Africa/Kampala (EAT / UTC+3)',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    currency: 'RWF',
    ianaTimezone: 'Africa/Kigali',
    displayTimezone: 'Africa/Kigali (CAT / UTC+2)',
  },
  {
    code: 'BI',
    name: 'Burundi',
    currency: 'BIF',
    ianaTimezone: 'Africa/Bujumbura',
    displayTimezone: 'Africa/Bujumbura (CAT / UTC+2)',
  },
  {
    code: 'INT',
    name: 'International / Other',
    currency: 'USD',
    ianaTimezone: 'UTC',
    displayTimezone: 'UTC (Coordinated Universal Time)',
  },
];

// Supported languages restricted strictly to English and French (Français)
const LANGUAGES = ['English', 'French (Français)'];

// Approved Version-1 Authority Declaration text from canonical Klockit contract
export const APPROVED_AUTHORITY_DECLARATION_VERSION = 'v1';
export const APPROVED_AUTHORITY_DECLARATION_TEXT =
  'I confirm that I am authorised to set up and administer Klockit for this organisation.';

// Simulated registrant session identity for prototype preview
const SIMULATED_REGISTRANT = {
  name: 'Simulated Registrant',
  email: 'simulated.registrant@example.com',
  sessionType: 'Prototype Simulation Session',
};

// Generates a preview reference conforming to canonical Klockit contract:
// K- followed by 12 uppercase hexadecimal characters (e.g., K-3F8E1D9A2C0B)
function generateSimulatedKlockitReference(): string {
  const hexChars = '0123456789ABCDEF';
  let hex = '';
  for (let i = 0; i < 12; i++) {
    hex += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return `K-${hex}`;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [form, setForm] = useState({
    // Step 1: Organisation Details
    businessName: '',
    country: 'Kenya',
    city: 'Nairobi',
    timezone: 'Africa/Nairobi', // Valid IANA identifier
    declaredWorkforceSize: '0', // Supports 0 explicitly (non-negative integer)
    preferredLanguage: 'English',

    // Step 2: Primary Business Contact
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',

    // Step 3: Subscription Information (Optional intended plan during establishment)
    selectedPlanId: 'decide_later',

    // Step 4: Administrator Identity & Authority
    isRegistrantDesignatedAdmin: true,
    authorityAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedRef, setGeneratedRef] = useState<string>('');

  if (!isOpen) return null;

  const currentCountry = COUNTRIES.find((c) => c.name === form.country) || COUNTRIES[0];
  const currencyConfig = CURRENCIES[currentCountry.currency];

  const handleCountryChange = (countryName: string) => {
    const selected = COUNTRIES.find((c) => c.name === countryName);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        country: countryName,
        timezone: selected.ianaTimezone,
      }));
    }
  };

  const handleBusinessNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      businessName: name,
      // Invalidate declaration acceptance if business name changes
      authorityAccepted: false,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!form.businessName.trim()) {
        errs.businessName = 'Organisation / Business name is required.';
      }
      if (!form.city.trim()) {
        errs.city = 'City or operating locality is required.';
      }
      const trimmedSize = form.declaredWorkforceSize.trim();
      const parsedSize = Number(trimmedSize);
      if (trimmedSize === '' || !Number.isInteger(parsedSize) || parsedSize < 0) {
        errs.declaredWorkforceSize =
          'Workforce size must be a non-negative whole number (enter 0 if establishing prior to hiring).';
      }
      if (!LANGUAGES.includes(form.preferredLanguage)) {
        errs.preferredLanguage = 'Please select a supported language (English or French).';
      }
    } else if (currentStep === 2) {
      if (!form.contactName.trim()) {
        errs.contactName = 'Primary contact name is required.';
      }
      if (!form.contactRole.trim()) {
        errs.contactRole = 'Role or relationship to the business is required.';
      }
      const emailTrimmed = form.contactEmail.trim();
      if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
        errs.contactEmail = 'A valid business contact email address is required.';
      }
      if (!form.contactPhone.trim()) {
        errs.contactPhone = 'Telephone number is required.';
      }
    } else if (currentStep === 3) {
      // Step 3: Subscription information is optional during establishment
      // No mandatory errors; defaults to 'decide_later'
    } else if (currentStep === 4) {
      if (!form.isRegistrantDesignatedAdmin) {
        errs.isRegistrantDesignatedAdmin =
          'The authenticated registrant must be designated as the initial Administrator.';
      }
      if (!form.authorityAccepted) {
        errs.authorityAccepted =
          'Explicit affirmative acceptance of the approved authority declaration (v1) is required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    if (step === 4) {
      // Generate simulated reference conforming to canonical Klockit reference format (K-XXXXXXXXXXXX)
      const ref = generateSimulatedKlockitReference();
      setGeneratedRef(ref);
      setStep(5);
    } else {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4 | 5);
  };

  const handleReset = () => {
    setStep(1);
    setErrors({});
    setGeneratedRef('');
    setForm((prev) => ({
      ...prev,
      businessName: '',
      declaredWorkforceSize: '0',
      contactName: '',
      contactRole: '',
      contactEmail: '',
      contactPhone: '',
      selectedPlanId: 'decide_later',
      authorityAccepted: false,
      isRegistrantDesignatedAdmin: true,
    }));
    onClose();
  };

  return (
    <div
      id="onboarding-trial-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header bar */}
        <div className="px-5 sm:px-6 py-4 bg-[#0A266B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-lg shrink-0">
              <KlockitIcon size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="onboarding-modal-title" className="text-base font-bold text-white tracking-tight">
                  Establish Organisation
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-sky-200 border border-white/20">
                  Onboarding Prototype
                </span>
              </div>
              <p className="text-xs text-sky-200 mt-0.5">
                Approved business registration specification & automatic 14-day evaluation trial.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-slate-50 px-5 sm:px-6 py-2.5 border-b border-slate-200 shrink-0">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Organisation' },
              { num: 2, label: 'Primary Contact' },
              { num: 3, label: 'Subscription' },
              { num: 4, label: 'Administrator & Authority' },
              { num: 5, label: 'Confirmation' },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-[#009FF5] text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs hidden md:inline font-medium ${
                      isActive ? 'text-[#0A266B] font-bold' : isPast ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-900 space-y-4">
          {/* STEP 1: Organisation Details */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2.5">
                <h4 className="text-sm font-bold text-[#0A266B] flex items-center gap-2">
                  <Building2 size={16} className="text-[#009FF5]" />
                  <span>Business Information</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Register your business identity, operating jurisdiction, and authoritative time zone for physical attendance records.
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Great Lakes Distribution Ltd"
                    value={form.businessName}
                    onChange={(e) => handleBusinessNameChange(e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                      errors.businessName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {errors.businessName && <p className="text-[11px] text-rose-600 mt-1">{errors.businessName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Country / Market <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={form.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name} ({c.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      City / Locality <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nairobi, Kigali, Kampala"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                        errors.city ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Organisation Time Zone <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        readOnly
                        value={currentCountry.displayTimezone}
                        className="w-full pl-8 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Persisted as IANA identifier: <code className="font-mono text-slate-600">{form.timezone}</code>
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Declared Workforce Size <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={form.declaredWorkforceSize}
                      onChange={(e) => setForm({ ...form, declaredWorkforceSize: e.target.value })}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                        errors.declaredWorkforceSize ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Supports <strong>zero</strong> for entities establishing before staffing.
                    </p>
                    {errors.declaredWorkforceSize && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.declaredWorkforceSize}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Preferred Language <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.preferredLanguage}
                    onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Restricted to platform-supported languages (English and French).
                  </p>
                  {errors.preferredLanguage && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.preferredLanguage}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Primary Business Contact */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2.5">
                <h4 className="text-sm font-bold text-[#0A266B] flex items-center gap-2">
                  <User size={16} className="text-[#009FF5]" />
                  <span>Primary Business Contact</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Point of contact for business correspondence, billing communications, and operational notices.
                </p>
              </div>

              {/* Explicit Authority Separation Banner */}
              <div className="p-3 bg-sky-50/80 border border-sky-100 rounded-xl flex items-start gap-2.5 text-xs text-sky-950">
                <HelpCircle size={16} className="text-[#009FF5] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold text-[#0A266B]">Contact details do not determine Administrator authority.</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    This contact provides business reachability only. Platform governance authority is explicitly designated in Step 4.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fiona MacLeod"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                      errors.contactName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {errors.contactName && <p className="text-[11px] text-rose-600 mt-1">{errors.contactName}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Role / Relationship to Business <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing Director, Operations Lead, Founder"
                    value={form.contactRole}
                    onChange={(e) => setForm({ ...form, contactRole: e.target.value })}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                      errors.contactRole ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {errors.contactRole && <p className="text-[11px] text-rose-600 mt-1">{errors.contactRole}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                      errors.contactEmail ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {errors.contactEmail && <p className="text-[11px] text-rose-600 mt-1">{errors.contactEmail}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Telephone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 700 000 000"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white ${
                      errors.contactPhone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                    }`}
                  />
                  {errors.contactPhone && <p className="text-[11px] text-rose-600 mt-1">{errors.contactPhone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Subscription Information */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0A266B] flex items-center gap-2">
                    <CreditCard size={16} className="text-[#009FF5]" />
                    <span>Subscription Information</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Commercial workforce plans in {currencyConfig.label}. Intended tier selection is optional during establishment.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  No Payment Required
                </span>
              </div>

              {/* Automatic Evaluation Trial Notice — Cleaned of unauthorized worker allowance claims */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#0A266B]">
                  <Sparkles size={15} className="text-[#009FF5]" />
                  <span>Approved 14-Day Evaluation Trial Included</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Every newly established organisation begins with an automatic 14-day evaluation trial with full presence features. Payment details and subscription confirmation are never a condition of business establishment.
                </p>
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  Commercial plan review in website prototype — no payment gateway or real transactions involved.
                </p>
              </div>

              {/* Commercial Plans Grid (First 4 representative bands) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PLAN_BANDS.slice(0, 4).map((plan) => {
                  const isSelected = form.selectedPlanId === plan.id;
                  const priceVal = plan.prices[currentCountry.currency];
                  const formattedPrice = currencyConfig.format(priceVal);

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setForm({ ...form, selectedPlanId: plan.id })}
                      className={`cursor-pointer rounded-xl border p-3 text-xs transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#009FF5] bg-sky-50/40 ring-2 ring-[#009FF5]/20 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{plan.name}</span>
                          <input
                            type="radio"
                            name="planBand"
                            checked={isSelected}
                            onChange={() => setForm({ ...form, selectedPlanId: plan.id })}
                            className="w-3.5 h-3.5 text-[#009FF5]"
                          />
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-[#0A266B]">{formattedPrice}</span>
                          <span className="text-[11px] text-slate-500">/ month</span>
                        </div>
                        <div className="inline-block px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-[10px] text-slate-700">
                          {plan.workersLabel}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{plan.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Default "Decide Later" Option */}
              <div
                onClick={() => setForm({ ...form, selectedPlanId: 'decide_later' })}
                className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between ${
                  form.selectedPlanId === 'decide_later'
                    ? 'border-[#009FF5] bg-sky-50/50 ring-2 ring-[#009FF5]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0A266B] flex items-center gap-2">
                    <span>Decide later during evaluation trial (Default)</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Explore attendance operations with 14 days full access. Select an ongoing tier whenever your organisation is ready.
                  </p>
                </div>
                <input
                  type="radio"
                  name="planBand"
                  checked={form.selectedPlanId === 'decide_later'}
                  onChange={() => setForm({ ...form, selectedPlanId: 'decide_later' })}
                  className="w-4 h-4 text-[#009FF5]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Administrator Identity & Legal Authority */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-2.5">
                <h4 className="text-sm font-bold text-[#0A266B] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#009FF5]" />
                  <span>Administrator Identity & Authority</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designate the initial Administrator and affirm the approved version-1 authority declaration.
                </p>
              </div>

              {/* Clearly Marked Simulated Registrant Session Context */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0A266B] text-white font-bold flex items-center justify-center text-xs">
                      SR
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">
                        {SIMULATED_REGISTRANT.name}{' '}
                        <span className="font-normal text-slate-500">(Prototype Preview)</span>
                      </p>
                      <p className="text-[11px] text-slate-600 font-mono">
                        {SIMULATED_REGISTRANT.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Simulation Identity
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  In production, the authenticated session (e.g. Firebase Auth) supplies the verified identity. Contact details do not determine Administrator authority.
                </p>

                <div className="pt-2.5 border-t border-slate-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isRegistrantDesignatedAdmin}
                      onChange={(e) => setForm({ ...form, isRegistrantDesignatedAdmin: e.target.checked })}
                      className="w-4 h-4 text-[#009FF5] rounded focus:ring-[#009FF5] mt-0.5"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900">
                        Explicitly designate authenticated registrant as Initial Administrator
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Confers governance authority over workforce registration, site QR management, and attendance verification.
                      </p>
                    </div>
                  </label>
                  {errors.isRegistrantDesignatedAdmin && (
                    <p className="text-[11px] text-rose-600 mt-1 pl-6">{errors.isRegistrantDesignatedAdmin}</p>
                  )}
                </div>
              </div>

              {/* Exact Approved Version-1 Authority Declaration Box */}
              <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#0A266B] font-bold text-xs">
                    <FileCheck2 size={16} className="text-[#009FF5]" />
                    <span>Approved Authority Declaration</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#0A266B] border border-sky-200">
                    Version: {APPROVED_AUTHORITY_DECLARATION_VERSION}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-sky-200 text-xs text-slate-800 font-medium leading-relaxed">
                  <p className="text-slate-900 italic font-serif text-sm">
                    "{APPROVED_AUTHORITY_DECLARATION_TEXT}"
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans mt-2 pt-2 border-t border-slate-100">
                    Organisation: <strong>{form.businessName || 'Declared Business'}</strong>
                  </p>
                </div>

                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={form.authorityAccepted}
                      onChange={(e) => setForm({ ...form, authorityAccepted: e.target.checked })}
                      className="w-4 h-4 text-[#009FF5] rounded focus:ring-[#009FF5] mt-0.5"
                    />
                    <span className="text-xs font-bold text-[#0A266B]">
                      I confirm and accept this authority declaration on behalf of{' '}
                      <span className="underline">{form.businessName || 'this organisation'}</span> <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  {errors.authorityAccepted && (
                    <p className="text-[11px] text-rose-600 mt-1 pl-6">{errors.authorityAccepted}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Completion & Handover */}
          {step === 5 && (
            <div className="space-y-5 text-center py-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h4 className="text-lg font-black text-[#0A266B]">Organisation Established</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Simulated establishment record created and approved 14-day evaluation trial automatically activated.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-medium">Organisation Reference:</span>
                    <span className="text-[10px] text-slate-400">Simulated preview identifier</span>
                  </div>
                  <span className="font-mono font-black text-[#0A266B] bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-xs">
                    {generatedRef}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Business Name:</span>
                  <span className="font-bold text-slate-900">{form.businessName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jurisdiction & Timezone:</span>
                  <span className="font-medium text-slate-700">
                    {form.city}, {form.country} (<code className="font-mono text-xs">{form.timezone}</code>)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Declared Workforce:</span>
                  <span className="font-medium text-slate-700">{form.declaredWorkforceSize} Workers</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Designated Initial Admin:</span>
                  <span className="font-bold text-slate-900">{SIMULATED_REGISTRANT.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Declaration Version:</span>
                  <span className="font-medium text-slate-700">v1 (Accepted)</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Trial Status:</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Evaluation Trial (14 Days)
                  </span>
                </div>
              </div>

              {/* Explicit Platform Contract Distinction Disclaimer */}
              <div className="max-w-md mx-auto p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-left text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Prototype Demonstration Notice:</span>
                <p className="mt-0.5 text-amber-800">
                  This preview simulates the onboarding journey. In production, authoritative Organisation references (format <code className="font-mono font-semibold">K-XXXXXXXXXXXX</code>) are issued strictly by the Klockit platform kernel upon verified transactional establishment.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  id="btn-enter-business"
                  onClick={handleReset}
                  className="w-full max-w-md mx-auto py-3 bg-[#0A266B] hover:bg-[#071c4f] text-white font-bold text-sm rounded-xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Enter Business</span>
                  <ArrowRight size={16} />
                </button>
                <p className="text-[11px] text-slate-400 text-center max-w-sm mx-auto">
                  Completes prototype simulation. In production, this finalises establishment and directs the authenticated initial Administrator to their workspace.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Navigation (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                step === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-200/70 border border-slate-300'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div className="text-[11px] text-slate-400">Step {step} of 4</div>

            <button
              id={`onboarding-step-${step}-next`}
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0A266B] hover:bg-[#071c4f] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
            >
              <span>{step === 4 ? 'Confirm & Establish' : 'Continue'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
