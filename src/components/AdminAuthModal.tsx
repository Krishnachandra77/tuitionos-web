import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { adminLogin } = useAppConfig();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;

    const result = adminLogin(passcode);
    if (result.success) {
      setError(null);
      setPasscode('');
      onSuccess();
    } else {
      setError(result.message || 'Incorrect security key. Access denied.');
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Subtle decorative security header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Developer Gate
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Authorized Access Only: Krishna Chandra
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Warning Message */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
          The Information Storage Hub and Developer Controls are protected. Please enter your administrator key or master PIN to continue.
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Admin Key / PIN</span>
              <span className="text-[11px] text-slate-400 font-normal">
                Default: 9431
              </span>
            </label>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(null);
                }}
                placeholder="Enter admin password or PIN"
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-blue-400" />
              <span>Unlock Developer Gate</span>
            </button>
          </div>
        </form>

        {/* Access Shortcuts for Krishna Chandra */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-600">
            How to reopen this gate anytime:
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
            <li>Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">Shift</kbd> + <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">A</kbd> on keyboard</li>
            <li>Visit URL with <code className="text-blue-600 font-mono">?admin=true</code></li>
            <li>Click <strong>"Made by Krishna Chandra"</strong> in the footer 3 times</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
