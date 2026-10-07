import React, { useState } from 'react';
import { X, CheckCircle2, Building2, MapPin, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { KlockitIcon } from './Brand';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    businessName: '',
    country: 'Kenya',
    firstSiteName: 'Main Workshop / Office',
    adminName: '',
    adminEmail: '',
    expectedWorkers: '10–19',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => (s + 1) as 2 | 3);
    } else {
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-5 bg-[#0A266B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <KlockitIcon size={24} />
            </div>
            <div>
              <h3 id="trial-modal-title" className="text-base font-bold text-white">
                Start your 14-day free trial
              </h3>
              <p className="text-xs text-sky-200">
                Starts as soon as you sign up · No credit card required
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

        {step === 4 ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#0A266B]">
                Your 14-day trial has begun
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                <strong className="text-slate-800">{formData.businessName || 'Your Organisation'}</strong> is set up with initial Site <strong className="text-slate-800">{formData.firstSiteName || 'Site 1'}</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Account Administrator:</span>
                <span className="font-semibold text-slate-800">{formData.adminEmail || 'admin@company.com'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Number of workers:</span>
                <span className="font-semibold text-slate-800">{formData.expectedWorkers} workers</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Trial Validity:</span>
                <span className="font-semibold text-emerald-700">14 Full Days (No payment due)</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Your organisation keeps access to its dashboard and attendance history if the trial ends. New attendance recording pauses until you reactivate.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-[#0A266B] hover:bg-[#071c4f] text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
            >
              Continue to Prototype
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 pb-2 border-b border-slate-100">
              <span className={step >= 1 ? 'text-[#0A266B] font-semibold' : ''}>
                1. Organisation
              </span>
              <span>→</span>
              <span className={step >= 2 ? 'text-[#0A266B] font-semibold' : ''}>
                2. First Site
              </span>
              <span>→</span>
              <span className={step >= 3 ? 'text-[#0A266B] font-semibold' : ''}>
                3. Administrator
              </span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Organisation / Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Logistics East Africa"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Country / Market
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    >
                      <option value="Kenya">Kenya (KES)</option>
                      <option value="Uganda">Uganda (UGX)</option>
                      <option value="Rwanda">Rwanda (RWF)</option>
                      <option value="Burundi">Burundi (BIF)</option>
                      <option value="International">International (USD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Expected Workforce Band
                    </label>
                    <select
                      value={formData.expectedWorkers}
                      onChange={(e) => setFormData({ ...formData, expectedWorkers: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    >
                      <option value="1–4">Starter (1–4)</option>
                      <option value="5–9">Small (5–9)</option>
                      <option value="10–19">Growing (10–19)</option>
                      <option value="20–29">Business Standard (20–29)</option>
                      <option value="30–49">Business Plus (30–49)</option>
                      <option value="50–99">Business Pro (50–99)</option>
                      <option value="100–199">Business Max (100–199)</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-slate-500 bg-sky-50/60 p-3 rounded-lg border border-sky-100">
                  Plans are based on the Workers who have joined your organisation in Klockit. Pending invitations do not count.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    First Workplace / Site Name
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Central Depot, Workshop #1, Head Office"
                      value={formData.firstSiteName}
                      onChange={(e) => setFormData({ ...formData, firstSiteName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <div className="font-semibold text-slate-800">Sites in Klockit:</div>
                  <p>
                    A site can be an office, branch, workshop, construction location, or approved field reporting base. Your price is based on the number of workers in your organisation, not the number of Sites.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name (First Administrator)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@business.com"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1 text-xs text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    No credit card required. Your trial activates immediately upon registration.
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A266B] hover:bg-[#071c4f] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                <span>{step === 3 ? 'Activate 14-Day Free Trial' : 'Continue'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
