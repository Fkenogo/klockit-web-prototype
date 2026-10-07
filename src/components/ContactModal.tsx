import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { KlockitIcon } from './Brand';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanName?: string;
}

export function ContactModal({ isOpen, onClose, defaultPlanName }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    workerCount: '200+',
    useCase: 'Multiple work locations',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0A266B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <KlockitIcon size={24} />
            </div>
            <div>
              <h3 id="contact-modal-title" className="text-base font-bold text-white">
                Talk to the Klockit team
              </h3>
              <p className="text-xs text-sky-200">
                Custom setups, 200+ workers, or fixed-duration projects
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#0A266B]">
                We’ve received your enquiry
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <strong className="text-slate-800">{formData.name}</strong>. A member of the Klockit team will contact you to discuss an appropriate setup and commercial arrangement.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Organisation:</span>
                <span className="font-semibold text-slate-800">{formData.organisation}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Team size:</span>
                <span className="font-semibold text-slate-800">{formData.workerCount} workers</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Expected follow-up:</span>
                <span className="font-semibold text-slate-800">Normally within 24 hours</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 px-4 bg-[#0A266B] hover:bg-[#071c4f] text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-600">
              Need something different? Tell us about your organisation and what you need. Custom arrangements include dedicated human assistance to agree an appropriate setup.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Ochieng"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organisation Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Engineering Ltd"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / Mobile Money
                </label>
                <input
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of workers
                </label>
                <select
                  value={formData.workerCount}
                  onChange={(e) => setFormData({ ...formData, workerCount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                >
                  <option value="200–499">200–499 Workers</option>
                  <option value="500–999">500–999 Workers</option>
                  <option value="1,000+">1,000+ Workers</option>
                  <option value="Fixed Project (<200)">Fixed-Duration / Project-Based</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Type
                </label>
                <select
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white"
                >
                  <option value="Multiple work locations">Multi-Site Operations</option>
                  <option value="Construction project (fixed duration)">Construction Project</option>
                  <option value="Seasonal operations">Seasonal Operations</option>
                  <option value="Event or temporary deployment">Event / Temporary Deployment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tell us about your workplace and requirements
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your team size, work locations, or attendance setup..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009FF5] focus:bg-white resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A266B] hover:bg-[#071c4f] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                <span>Submit Custom Enquiry</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
