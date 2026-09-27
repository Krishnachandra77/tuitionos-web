import React from 'react';
import { Calendar, Tag, Check, ArrowDownToLine, FileCode } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

export const VersionChangelog: React.FC = () => {
  const { config, triggerApkDownload, downloadState } = useAppConfig();

  return (
    <section id="changelog" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Tag className="w-4 h-4" />
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Latest Version
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Official release build for Android smartphones and tablets
              </p>
            </div>

            {/* Version Badge & Download */}
            <div className="flex items-center gap-3">
              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-slate-900">
                  Version {config.release.version}
                </p>
                <p className="text-xs text-slate-500 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {config.release.releaseDate}
                </p>
              </div>

              <button
                onClick={triggerApkDownload}
                disabled={downloadState.isDownloading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-75"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>{downloadState.isDownloading ? 'Downloading...' : 'Get This Build'}</span>
              </button>
            </div>
          </div>

          {/* Release Meta info */}
          <div className="py-4 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">File Size</span>
              <span className="font-semibold text-slate-800">{config.release.fileSize}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Package Name</span>
              <span className="font-semibold text-slate-800 font-mono text-[11px] truncate block" title={config.release.packageName}>
                {config.release.packageName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Target OS</span>
              <span className="font-semibold text-slate-800">{config.release.minAndroidVersion}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Developer</span>
              <span className="font-semibold text-slate-800">{config.creator.name}</span>
            </div>
          </div>

          {/* What's New Section */}
          <div className="pt-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>What's New in Version {config.release.version}:</span>
            </h4>
            
            <ul className="space-y-2.5">
              {config.release.whatsNew.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Hash */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-mono truncate">
              <FileCode className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400">SHA-256:</span>
              <span className="truncate">{config.release.sha256Checksum}</span>
            </div>
            <span className="text-slate-400 flex-shrink-0">
              Official Signed Release
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
