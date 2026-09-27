import React from 'react';
import {
  Download,
  FolderOpen,
  Settings,
  Smartphone,
  LogIn,
  CheckCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

export const InstallationGuide: React.FC = () => {
  const { config } = useAppConfig();

  const steps = [
    {
      num: 1,
      title: "Download the APK",
      desc: "Tap the 'Download TuitionOS APK' button on this website to save TuitionOS.apk to your device.",
      icon: Download
    },
    {
      num: 2,
      title: "Open the downloaded APK",
      desc: "Pull down your Android notification drawer or open your 'Downloads' folder and tap TuitionOS.apk.",
      icon: FolderOpen
    },
    {
      num: 3,
      title: "Allow installation from this source",
      desc: "If Android displays 'Install unknown apps' security notice, tap 'Settings' and switch on 'Allow from this source'.",
      icon: Settings
    },
    {
      num: 4,
      title: "Install TuitionOS",
      desc: "Tap the 'Install' button in the Android system installer dialog and wait a few moments.",
      icon: Smartphone
    },
    {
      num: 5,
      title: "Open the app and sign in",
      desc: "Tap 'Open', select your role (Admin, Teacher, or Student), and sign in to manage your classes.",
      icon: LogIn
    }
  ];

  return (
    <section id="install" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Install
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Follow these five simple steps to install TuitionOS on your Android phone or tablet.
          </p>
        </div>

        {/* 5 Sequential Installation Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-extrabold text-sm flex items-center justify-center border border-blue-100">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Requirements & Safe Download Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* System Requirements */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Requirements
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ensure your device meets the following specifications before installing:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span><strong>Supported Android version:</strong> {config.requirements.os}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span><strong>Internet connection:</strong> {config.requirements.internet}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span><strong>Sufficient storage:</strong> {config.requirements.storage}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span><strong>RAM:</strong> {config.requirements.ram}</span>
              </li>
            </ul>
          </div>

          {/* Safe Download Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Safe Download
              </h3>
            </div>
            
            <p className="text-xs text-slate-700 font-medium mb-3">
              Download TuitionOS only from the official TuitionOS website.
            </p>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              To protect your institute and student records, never download TuitionOS APKs from unauthorized third-party mirrors, mod forums, or unverified chat links.
            </p>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400 block">Distribution:</span>
                <span className="font-semibold text-slate-800">Official APK</span>
              </div>
              <div>
                <span className="text-slate-400 block">Package Integrity:</span>
                <span className="font-semibold text-slate-800">Official Release</span>
              </div>
              <div>
                <span className="text-slate-400 block">Version:</span>
                <span className="font-semibold text-slate-800">{config.release.version} (Build {config.release.versionCode})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Developer:</span>
                <span className="font-semibold text-slate-800">{config.creator.name}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
