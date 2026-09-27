import React, { useState } from 'react';
import { Download, X, User, Phone, ShieldCheck, AlertCircle, Smartphone } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';
import { Logo } from './Logo';

export const DownloadDialogModal: React.FC = () => {
  const { isDownloadModalOpen, setIsDownloadModalOpen, executeApkDownload, config } = useAppConfig();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isDownloadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError('Please enter your full name.');
      return;
    }

    // Basic phone validation (at least 7 digits)
    const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 7) {
      setError('Please enter a valid mobile or WhatsApp number.');
      return;
    }

    setError(null);
    executeApkDownload({ name: cleanName, phone: cleanPhone });
    setName('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDownloadModalOpen(false)}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <Logo size="sm" />
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
              Download TuitionOS APK
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <span>Version {config.release.version}</span>
              <span className="text-slate-300">·</span>
              <span>{config.release.fileSize}</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Informative notice */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-600 leading-relaxed mb-5">
          Please enter your name and phone number to start your official APK download.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Phone / Mobile Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 pl-1">
              Required for APK installation update alerts and tuition verification.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download TuitionOS APK</span>
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Safe & direct APK download · {config.creator.creditText}
        </p>

      </div>
    </div>
  );
};
