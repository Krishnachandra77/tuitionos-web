import React from 'react';
import {
  BookOpen,
  School,
  CheckCircle2,
  FileEdit,
  Receipt,
  BellRing,
  BookMarked,
  ClipboardCheck,
  LifeBuoy
} from 'lucide-react';
import { KEY_FEATURES } from '../config/appConfig';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  School,
  CheckCircle2,
  FileEdit,
  Receipt,
  BellRing,
  BookMarked,
  ClipboardCheck,
  LifeBuoy
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Features
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Engineered with purpose-built workflows to replace paper registers, chaotic WhatsApp groups, and spreadsheets.
          </p>
        </div>

        {/* Compact 3x3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEY_FEATURES.map((feat) => {
            const IconComponent = iconMap[feat.icon] || BookOpen;
            return (
              <div
                key={feat.title}
                className="group p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {feat.title}
                    </h3>
                  </div>

                  {/* Primary short description requested */}
                  <p className="text-sm font-medium text-slate-800">
                    {feat.shortDesc}
                  </p>

                  {/* Secondary practical context */}
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {feat.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
