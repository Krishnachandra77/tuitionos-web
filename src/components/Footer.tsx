import React, { useState } from 'react';
import { Download, ArrowUp, Heart, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useAppConfig } from '../context/ConfigContext';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const { config, triggerApkDownload, isAdminAuthenticated, openAdminManager } = useAppConfig();
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);

  const handleDeveloperCreditClick = () => {
    if (isAdminAuthenticated) {
      openAdminManager();
      return;
    }
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setClickCount(0);
      openAdminManager();
    } else {
      setTimeout(() => setClickCount(0), 1500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Subtitle Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                {config.appName}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-300">
              {config.subtitle}
            </p>

            {/* Secondary Placement: Made by Krishna Chandra */}
            <p
              onClick={handleDeveloperCreditClick}
              className="text-xs text-slate-400 font-medium tracking-wide cursor-default select-none hover:text-slate-300 transition-colors"
              title={isAdminAuthenticated ? "Open Release Manager" : undefined}
            >
              {config.creator.creditText}
            </p>

            <p className="text-xs text-slate-500 max-w-sm pt-1 leading-relaxed">
              Official Android distribution website for coaching institutes, tuition classes, and educators.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              Application
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={triggerApkDownload}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-blue-400 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK ({config.release.version})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('screenshots')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  App Screenshots
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('install')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How to Install
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('changelog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Changelog & Requirements
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              Support & Legal
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('support')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('support')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Help Desk & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={openAdminManager}
                  className="hover:text-slate-200 transition-colors cursor-pointer text-slate-500 font-medium flex items-center gap-1.5"
                  title="Developer Security Gate (Authorized Access Only)"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Developer Gate</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            <span>Copyright © {currentYear} {config.appName}. All rights reserved.</span>
            <span className="mx-2">·</span>
            <span>{config.creator.creditText}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
