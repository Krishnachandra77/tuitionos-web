import React, { useState, useEffect } from 'react';
import { ConfigProvider, useAppConfig } from './context/ConfigContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Screenshots } from './components/Screenshots';
import { AboutApp } from './components/AboutApp';
import { VersionChangelog } from './components/VersionChangelog';
import { DownloadSection } from './components/DownloadSection';
import { InstallationGuide } from './components/InstallationGuide';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { ConfigEditorModal } from './components/ConfigEditorModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { DownloadDialogModal } from './components/DownloadDialogModal';
import { QueriesFeedbackModal } from './components/QueriesFeedbackModal';
import { FloatingFeedbackButton } from './components/FloatingFeedbackButton';

function MainAppContent() {
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  const {
    isAdminAuthenticated,
    isAuthModalOpen,
    setIsAuthModalOpen,
    openAdminManager
  } = useAppConfig();

  // Listen for the custom open event triggered by keyboard shortcut or URL param
  useEffect(() => {
    const handleOpen = () => {
      if (isAdminAuthenticated) {
        setIsConfigOpen(true);
      } else {
        setIsAuthModalOpen(true);
      }
    };

    window.addEventListener('open_tuitionos_release_manager', handleOpen);
    return () => window.removeEventListener('open_tuitionos_release_manager', handleOpen);
  }, [isAdminAuthenticated, setIsAuthModalOpen]);

  const handleOpenConfigGate = () => {
    if (isAdminAuthenticated) {
      setIsConfigOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Navigation Top Bar (Admin controls only visible when authenticated) */}
      <Header onOpenConfig={handleOpenConfigGate} />

      {/* Main Website Structure according to specification */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Key Features */}
        <Features />

        {/* 3. App Screenshots / Preview */}
        <Screenshots />

        {/* 4. About TuitionOS & 14 Modules */}
        <AboutApp />

        {/* 5. Latest Version & Changelog */}
        <VersionChangelog />

        {/* 6. Download APK & QR Code */}
        <DownloadSection onOpenConfig={handleOpenConfigGate} />

        {/* 7. Installation Guide, Requirements & Safe Download */}
        <InstallationGuide />

        {/* 8. FAQ Section */}
        <FaqSection />

        {/* 9. Contact / Support Section */}
        <ContactSection />
      </main>

      {/* 10. Footer with Secret Developer Gateway */}
      <Footer onOpenPolicy={(type) => setActivePolicy(type)} />

      {/* Legal Policies Modal */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Download User Registration Dialog Modal */}
      <DownloadDialogModal />

      {/* Dedicated Queries & Feedback Submission Modal */}
      <QueriesFeedbackModal />

      {/* Floating Bottom Action for Quick Queries & Feedback */}
      <FloatingFeedbackButton />

      {/* Developer PIN / Passkey Security Gate */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          setIsConfigOpen(true);
        }}
      />

      {/* Protected Admin Release & Configuration Modal */}
      {isAdminAuthenticated && (
        <ConfigEditorModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <MainAppContent />
    </ConfigProvider>
  );
}
