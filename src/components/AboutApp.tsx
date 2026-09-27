import React from 'react';
import { CORE_MODULES } from '../config/appConfig';
import { useAppConfig } from '../context/ConfigContext';
import { Users, GraduationCap, Building2, ShieldCheck, Check } from 'lucide-react';

export const AboutApp: React.FC = () => {
  const { config } = useAppConfig();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            About TuitionOS
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed text-balance">
            TuitionOS is an Android management system designed specifically for coaching institutes, tuition classes, and private academies to streamline operations, save hours of manual record-keeping, and foster transparent communication between tutors, students, and parents.
          </p>
          <div className="mt-3 text-xs sm:text-sm font-medium text-slate-500">
            Created and architected by <span className="font-semibold text-slate-800">{config.creator.name}</span>
          </div>
        </div>

        {/* 14 Modules Grid requested */}
        <div className="mb-14">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Complete Tuition Management Modules
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {CORE_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-150"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    {mod.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose-built for 3 key user roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200/70">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">For Coaching Owners</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gain full real-time visibility over fee collection pipelines, teacher schedules, student headcounts, and multi-batch revenue reporting in one place.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">For Teachers & Tutors</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Take roll calls in seconds, upload daily homework assignments, schedule tests, enter exam scores, and notify parents of absentees with a single tap.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">For Students & Parents</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Check daily attendance history, view test percentiles, download payment receipts, request leaves, and submit homework directly from their smartphones.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
