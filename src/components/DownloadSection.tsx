import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  HardDrive
} from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';
import { QRCodeDisplay } from './QRCodeDisplay';

interface DownloadSectionProps {
  onOpenConfig?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onOpenConfig }) => {
  const {
    config,
    triggerApkDownload,
    downloadState,
    downloadStats,
    uploadedFile,
    isAdminAuthenticated
  } = useAppConfig();
  const [copiedHash, setCopiedHash] = useState(false);

  const copyChecksum = () => {
    navigator.clipboard.writeText(config.release.sha256Checksum);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="download" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Block */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Direct Android Package
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                  Get TuitionOS
                </h2>
                <p className="mt-3 text-base text-slate-300 leading-relaxed text-balance">
                  Download the latest Android version and manage your tuition classes from anywhere.
                </p>
              </div>

              {/* Version & File Size details */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Version:</span>
                  <span className="font-semibold text-white">{config.release.version}</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">File size:</span>
                  <span className="font-semibold text-white">{config.release.fileSize}</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Last updated:</span>
                  <span className="font-semibold text-white">{config.release.releaseDate}</span>
                </div>
              </div>

              {/* Primary APK Download Button */}
              <div className="pt-2">
                <button
                  onClick={triggerApkDownload}
                  disabled={downloadState.isDownloading}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-80"
                >
                  <Download className={`w-5 h-5 ${downloadState.isDownloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloadState.isDownloading
                      ? 'Downloading TuitionOS...'
                      : 'Download TuitionOS APK'}
                  </span>
                </button>

                {/* Direct fallback link and developer release manager */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span>Direct:</span>
                    <a
                      href={config.release.apkUrl}
                      download={config.release.apkFileName}
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium inline-flex items-center gap-1"
                    >
                      {config.release.apkFileName}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {isAdminAuthenticated && onOpenConfig && (
                    <>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={onOpenConfig}
                        className="text-slate-400 hover:text-white transition-colors underline underline-offset-2 cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Upload / Replace APK</span>
                        {uploadedFile?.isCustom && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Real-time Status Card */}
              {downloadState.downloadStarted && (
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                  <div className="flex items-start gap-3">
                    {downloadState.isDownloading ? (
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mt-0.5" />
                    ) : downloadState.errorMessage ? (
                      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-white">
                        {downloadState.isDownloading
                          ? downloadState.downloadedUserName
                            ? `Downloading TuitionOS for ${downloadState.downloadedUserName}...`
                            : 'Downloading TuitionOS...'
                          : downloadState.errorMessage
                          ? 'Notice'
                          : downloadState.downloadedUserName
                          ? `Download Started for ${downloadState.downloadedUserName}`
                          : 'Download Initialized'}
                      </p>
                      <p className="text-slate-300 mt-0.5">
                        {downloadState.isDownloading
                          ? `Downloading ${config.release.apkFileName} (${downloadState.progress}%). Open your notification bar when complete.`
                          : downloadState.errorMessage
                          ? downloadState.errorMessage
                          : `Downloaded at ${downloadState.lastDownloadedAt}. Open the file on your Android device to install.`}
                      </p>
                      {downloadState.isDownloading && (
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-150"
                            style={{ width: `${downloadState.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy-conscious Analytics Counter */}
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Downloads: <strong className="text-white font-semibold">{downloadStats.totalDownloads.toLocaleString()}</strong></span>
                <span className="text-slate-600">·</span>
                <span>{config.creator.creditText}</span>
              </div>
            </div>

            {/* Right: QR Code for Direct Phone Scanning */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <QRCodeDisplay />
              <p className="text-[11px] text-slate-400 text-center mt-3 max-w-xs">
                Scan with any Android camera or QR scanner app to download the APK directly on your phone.
              </p>
            </div>

          </div>

          {/* Bottom Security / Trust verification bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Official signed build: <strong className="text-slate-300 font-mono text-[11px]">{config.release.packageName}</strong></span>
            </div>

            <button
              onClick={copyChecksum}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
              title="Copy SHA-256 Checksum"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedHash ? 'SHA-256 Copied!' : 'Copy SHA-256 Checksum'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
