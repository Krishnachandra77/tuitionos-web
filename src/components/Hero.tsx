import React from 'react';
import { Download, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useAppConfig } from '../context/ConfigContext';
import { APP_ASSETS } from '../config/assets';

export const Hero: React.FC = () => {
  const { config, triggerApkDownload, downloadState } = useAppConfig();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* App Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-2.5 rounded-2xl bg-white shadow-xl shadow-blue-500/10 ring-1 ring-slate-100">
            <Logo size="xl" />
          </div>
        </div>

        {/* Website Name & Prominent Brand Lockup */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
          Tuition<span className="text-blue-600">OS</span>
        </h1>

        <p className="mt-2 text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight">
          {config.subtitle}
        </p>

        <p className="mt-1 text-sm sm:text-base font-medium text-blue-600">
          "{config.slogan}"
        </p>

        {/* Primary Description */}
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
          Manage students, courses, attendance, fees, payments, homework, messages and more from one application.
        </p>

        {/* Creator / Developer Branding (Primary Placement: below main TuitionOS description) */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>{config.creator.creditText}</span>
          <span className="text-slate-400">·</span>
          <span>Official Android Release</span>
        </div>

        {/* Action Buttons: Download APK is the main focus */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={triggerApkDownload}
            disabled={downloadState.isDownloading}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download className="w-5 h-5 animate-bounce" />
            <span>{downloadState.isDownloading ? 'Downloading TuitionOS...' : 'DOWNLOAD APK'}</span>
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-xl border border-slate-300 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:border-slate-400"
          >
            <span>LEARN MORE</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Unboxed Metadata Discipline */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
          <span>Latest Version: {config.release.version}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>File Size: {config.release.fileSize}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>Updated: {config.release.releaseDate}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>{config.release.minAndroidVersion}</span>
        </div>

        {/* Real-time Download Feedback Banner */}
        {downloadState.downloadStarted && (
          <div className="mt-6 max-w-md mx-auto p-4 rounded-xl bg-blue-50/80 border border-blue-200/70 text-left transition-all">
            <div className="flex items-start gap-3">
              {downloadState.isDownloading ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mt-0.5" />
              ) : downloadState.errorMessage ? (
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-800">
                  {downloadState.isDownloading
                    ? downloadState.downloadedUserName
                      ? `Downloading TuitionOS for ${downloadState.downloadedUserName}...`
                      : 'Downloading TuitionOS...'
                    : downloadState.errorMessage
                    ? 'Download Notification'
                    : downloadState.downloadedUserName
                    ? `Download Started for ${downloadState.downloadedUserName}`
                    : 'Download Started'}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {downloadState.isDownloading
                    ? `Fetching ${config.release.apkFileName} (${downloadState.progress}%). Check your notification bar or downloads folder.`
                    : downloadState.errorMessage
                    ? downloadState.errorMessage
                    : `Your browser is downloading ${config.release.apkFileName}. If prompted, tap "Download anyway" to proceed.`}
                </p>
                {downloadState.isDownloading && (
                  <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${downloadState.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hero Visual Mockup Asset */}
        <div className="mt-12 sm:mt-16 relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl shadow-slate-900/10 bg-slate-900">
            <img
              src={APP_ASSETS.heroMockup}
              alt="TuitionOS Android Application Interface"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
            />
            {/* Overlay scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 text-left">
                <div>
                  <p className="text-white font-semibold text-lg tracking-tight">
                    TuitionOS Mobile Dashboard
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Full institute controls optimized for Android phones and tablets
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Release APK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
