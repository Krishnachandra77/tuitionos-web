import React from 'react';
import { MessageSquarePlus, Sparkles } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

export const FloatingFeedbackButton: React.FC = () => {
  const { openFeedbackModal } = useAppConfig();

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={() => openFeedbackModal('query')}
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-full shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 transition-all duration-200 cursor-pointer border border-slate-700/60 hover:border-blue-500 hover:scale-105 active:scale-95"
        title="Send a Query or Give Feedback"
        aria-label="Queries and Feedback"
      >
        <div className="relative">
          <MessageSquarePlus className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-tight">
          Queries & Feedback
        </span>
      </button>
    </div>
  );
};
