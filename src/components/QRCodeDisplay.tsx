import React, { useState } from 'react';
import { Smartphone, Check, Copy } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

interface QRCodeDisplayProps {
  className?: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ className = '', size = 180 }) => {
  const { config } = useAppConfig();
  const [copied, setCopied] = useState(false);

  // Absolute URL for the APK download
  const fullDownloadUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${config.release.apkUrl}` 
    : `https://tuitionos.app${config.release.apkUrl}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(fullDownloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm ${className}`}>
      <div className="relative p-3 bg-slate-50 border border-slate-100 rounded-xl mb-3 flex items-center justify-center">
        {/* Crisp High-Density QR SVG Matrix */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="text-slate-900"
          shapeRendering="crispEdges"
        >
          {/* Background */}
          <rect width="100" height="100" fill="#ffffff" />
          
          {/* Top-Left Finder */}
          <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
          <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
          <rect x="11" y="11" width="13" height="13" fill="#0f172a" />

          {/* Top-Right Finder */}
          <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
          <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
          <rect x="76" y="11" width="13" height="13" fill="#0f172a" />

          {/* Bottom-Left Finder */}
          <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
          <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
          <rect x="11" y="76" width="13" height="13" fill="#0f172a" />

          {/* Timing Patterns */}
          <g fill="#0f172a">
            <rect x="34" y="16" width="4" height="3" />
            <rect x="42" y="16" width="4" height="3" />
            <rect x="50" y="16" width="4" height="3" />
            <rect x="58" y="16" width="4" height="3" />
            <rect x="16" y="34" width="3" height="4" />
            <rect x="16" y="42" width="3" height="4" />
            <rect x="16" y="50" width="3" height="4" />
            <rect x="16" y="58" width="3" height="4" />

            {/* QR Data Matrix Patterns */}
            <rect x="35" y="24" width="5" height="5" />
            <rect x="45" y="24" width="6" height="5" />
            <rect x="55" y="24" width="8" height="5" />
            <rect x="35" y="34" width="7" height="6" />
            <rect x="47" y="35" width="6" height="6" />
            <rect x="58" y="33" width="7" height="8" />
            <rect x="25" y="45" width="6" height="5" />
            <rect x="35" y="45" width="6" height="8" />
            <rect x="44" y="46" width="12" height="6" />
            <rect x="62" y="45" width="6" height="6" />
            <rect x="72" y="35" width="8" height="5" />
            <rect x="82" y="35" width="12" height="7" />
            <rect x="72" y="46" width="6" height="14" />
            <rect x="83" y="47" width="11" height="6" />
            <rect x="82" y="58" width="6" height="8" />
            <rect x="25" y="55" width="5" height="10" />
            <rect x="35" y="58" width="10" height="6" />
            <rect x="48" y="57" width="7" height="7" />
            <rect x="59" y="58" width="8" height="6" />

            <rect x="35" y="70" width="6" height="6" />
            <rect x="46" y="70" width="8" height="6" />
            <rect x="58" y="70" width="6" height="6" />
            <rect x="69" y="70" width="8" height="5" />
            <rect x="82" y="70" width="10" height="6" />
            <rect x="35" y="80" width="12" height="6" />
            <rect x="52" y="81" width="7" height="7" />
            <rect x="64" y="80" width="8" height="6" />
            <rect x="76" y="81" width="6" height="8" />
            <rect x="86" y="82" width="7" height="8" />
            <rect x="35" y="90" width="6" height="5" />
            <rect x="45" y="89" width="14" height="6" />
            <rect x="65" y="90" width="12" height="5" />
            <rect x="82" y="91" width="11" height="4" />
          </g>

          {/* Central Logo Notch */}
          <circle cx="50" cy="50" r="10" fill="#2563eb" />
          <path d="M46 47L50 44L54 47L50 50L46 47Z" fill="#ffffff" />
          <path d="M47 50.5V53C47 54.5 50 55.5 50 55.5C50 55.5 53 54.5 53 53V50.5" stroke="#ffffff" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800 flex items-center justify-center gap-1.5">
          <Smartphone className="w-4 h-4 text-blue-600" />
          Scan to Download APK
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          Points directly to TuitionOS.apk
        </p>
      </div>

      <button
        onClick={copyUrl}
        className="mt-3 w-full py-1.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        title="Copy direct APK URL"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy APK Link</span>
          </>
        )}
      </button>
    </div>
  );
};
