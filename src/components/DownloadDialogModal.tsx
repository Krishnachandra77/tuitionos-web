import React, { useState } from 'react';
import { Download, X, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';
import { Logo } from './Logo';

export const DownloadDialogModal: React.FC = () => {
  const { isDownloadModalOpen, setIsDownloadModalOpen, executeApkDownload, config } = useAppConfig();
  
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isDownloadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setError('Please enter your name.');
      return;
    }

    setError(null);
    executeApkDownload({ name: cleanName, phone: 'Direct Download' });
    setName('');
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
            </div>
          </div>
        </div>

        {/* Informative notice */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-600 leading-relaxed mb-5">
          Enter your name to start downloading the official TuitionOS APK.
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Download className="w-4 h-4" />
            <span>START DOWNLOAD</span>
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified APK</span>
          </div>
          <span className="text-slate-300">·</span>
          <span>No Ads or Spyware</span>
          <span className="text-slate-300">·</span>
          <span>100% Free</span>
        </div>

      </div>
    </div>
  );
};
