import React, { useState } from 'react';
import { Download, Menu, X, Settings2, ShieldCheck, LogOut, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useAppConfig } from '../context/ConfigContext';

interface HeaderProps {
  onOpenConfig?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfig }) => {
  const {
    config,
    triggerApkDownload,
    downloadState,
    isAdminAuthenticated,
    adminLogout,
    openAdminManager
  } = useAppConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand wordmark & logo with clear right spacing & subtle divider */}
        <div className="flex items-center flex-shrink-0 pr-6 lg:pr-8 md:border-r md:border-slate-200/80">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="flex items-center gap-2.5 group"
          >
            <Logo size="sm" />
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              TuitionOS
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation links with generous separation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 pl-2 lg:pl-4 flex-1">
          <button
            onClick={() => scrollTo('home')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('screenshots')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Screenshots
          </button>
          <button
            onClick={() => scrollTo('download')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Download
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollTo('support')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Queries & Feedback
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Developer Gate Session (Only visible after Krishna Chandra logs in) */}
          {isAdminAuthenticated && (
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 text-white rounded-lg text-xs shadow-xs">
              <button
                onClick={openAdminManager}
                className="px-2.5 py-1 font-semibold flex items-center gap-1.5 hover:text-blue-300 transition-colors cursor-pointer"
                title="Open Developer Gate & Information Storage"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Developer Gate</span>
              </button>
              <button
                onClick={adminLogout}
                className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                title="Lock Developer Gate (Sign out)"
                aria-label="Lock Developer Gate"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={triggerApkDownload}
            disabled={downloadState.isDownloading}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap cursor-pointer disabled:opacity-75"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {downloadState.isDownloading ? 'Downloading...' : 'DOWNLOAD APK'}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollTo('home')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('screenshots')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Screenshots
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              About TuitionOS
            </button>
            <button
              onClick={() => scrollTo('download')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Download APK
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('support')}
              className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Queries & Feedback
            </button>
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminManager();
                }}
                className="text-left px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-md flex items-center justify-between"
              >
                <span>Developer Gate & Information Storage</span>
                <ShieldCheck className="w-4 h-4 text-blue-500" />
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerApkDownload();
              }}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download TuitionOS APK ({config.release.version})
            </button>
            
            <p className="text-center text-xs text-slate-500">
              {config.creator.creditText} · Official Release
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
