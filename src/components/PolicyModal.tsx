import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const { config } = useAppConfig();

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-blue-600" />
            ) : (
              <FileText className="w-5 h-5 text-blue-600" />
            )}
            <h3 className="text-lg font-bold text-slate-900">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-800">
                <strong>Notice:</strong> This is a standard template for TuitionOS deployments. Institute administrators can adapt this document according to regional educational and data protection norms.
              </div>

              <h4 className="font-bold text-slate-900 text-sm">1. Information Collection</h4>
              <p>
                TuitionOS is designed to manage tuition batch operations. When deployed by an educational institute, it processes student names, contact numbers, attendance records, course syllabus milestones, and fee transaction logs entered by authorized institute administrators and teachers.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. Use of Information</h4>
              <p>
                Data entered into TuitionOS is strictly used for institute administrative tasks, such as generating fee receipts, tracking attendance percentages, publishing test marks, and dispatching absence or schedule reminders.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">3. Storage & Device Permissions</h4>
              <p>
                The Android application requires local storage permissions strictly to save downloaded fee receipt PDFs, syllabus worksheets, and offline attendance caches. It does not access private device photos or unrelated directories.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">4. Contacting Support</h4>
              <p>
                For privacy inquiries or technical data management questions regarding TuitionOS, submit a request through the official TuitionOS Support Desk on this website.
              </p>
            </>
          ) : (
            <>
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-800">
                <strong>Notice:</strong> Standard software terms of use for TuitionOS application distribution.
              </div>

              <h4 className="font-bold text-slate-900 text-sm">1. Acceptance of Terms</h4>
              <p>
                By downloading, installing, or accessing the TuitionOS Android APK, you acknowledge that you are using software designed for tuition and coaching class management.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. License & Official Distribution</h4>
              <p>
                TuitionOS is distributed as an official Android APK via this website. Users agree to obtain builds solely through this verified channel to preserve cryptographic package integrity and prevent malicious tampering.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">3. Institute Responsibility</h4>
              <p>
                Each tuition institute administrator retains responsibility for verifying student roll numbers, fee amounts, and marks records entered into the application.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">4. Developer & Attribution</h4>
              <p>
                TuitionOS was engineered and authored by {config.creator.name}. All intellectual property rights in the software architecture are reserved.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
