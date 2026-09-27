import React, { useState, useRef } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Settings,
  Check,
  UploadCloud,
  FileCheck,
  Download,
  Trash2,
  BookOpen,
  Copy,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  AlertCircle,
  Users,
  FileDown,
  MessageSquare,
  Star,
  Lightbulb,
  HelpCircle,
  Bug,
  Sparkles,
  Database,
  Search,
  PhoneCall,
  MessageCircle,
  Upload,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAppConfig, QueryFeedbackItem, DownloadLead } from '../context/ConfigContext';

interface ConfigEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({ isOpen, onClose }) => {
  const {
    config,
    updateConfig,
    resetConfig,
    uploadedFile,
    handleFileUpload,
    clearCustomUpload,
    triggerApkDownload,
    changeAdminPassword,
    adminLogout,
    downloadLeads,
    deleteDownloadLead,
    clearAllLeads,
    queriesAndFeedback,
    deleteQueryFeedback,
    updateQueryStatus,
    clearAllQueriesAndFeedback,
    backupAllStorageJson,
    restoreStorageFromJson
  } = useAppConfig();

  // Make 'storage' the first and default active tab so all information is immediately visible!
  const [activeTab, setActiveTab] = useState<'storage' | 'upload' | 'config' | 'guide' | 'security'>('storage');
  const [storageCategory, setStorageCategory] = useState<'all' | 'leads' | 'queries' | 'feedback' | 'features'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupImportRef = useRef<HTMLInputElement>(null);

  // Security change password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securityStatus, setSecurityStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const [formData, setFormData] = useState({
    version: config.release.version,
    fileSize: config.release.fileSize,
    releaseDate: config.release.releaseDate,
    apkUrl: config.release.apkUrl,
    apkFileName: config.release.apkFileName,
    minAndroidVersion: config.release.minAndroidVersion,
    creatorName: config.creator.name,
    creditText: config.creator.creditText,
    whatsNewText: config.release.whatsNew.join('\n')
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await handleFileUpload(file);
      setFormData(prev => ({
        ...prev,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        apkFileName: file.name.endsWith('.apk') ? file.name : `${file.name}.apk`,
        releaseDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }));
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = backupAllStorageJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TuitionOS_Database_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = restoreStorageFromJson(content);
      setRestoreStatus(res);
      setTimeout(() => setRestoreStatus(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const exportAllLeadsCsv = () => {
    if (downloadLeads.length === 0) return;
    const headers = ['Name', 'Phone Number', 'Version', 'Date & Time'];
    const rows = downloadLeads.map(l => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.version}"`,
      `"${l.timestamp}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TuitionOS_Download_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAllQueriesCsv = () => {
    if (queriesAndFeedback.length === 0) return;
    const headers = ['Type', 'Name', 'Contact', 'Institute', 'Subject', 'Rating', 'Message', 'Date', 'Status'];
    const rows = queriesAndFeedback.map(q => [
      `"${q.type}"`,
      `"${q.name.replace(/"/g, '""')}"`,
      `"${q.contact.replace(/"/g, '""')}"`,
      `"${(q.instituteName || '').replace(/"/g, '""')}"`,
      `"${q.subject.replace(/"/g, '""')}"`,
      `"${q.rating || ''}"`,
      `"${q.message.replace(/"/g, '""')}"`,
      `"${q.timestamp}"`,
      `"${q.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TuitionOS_Queries_Feedback_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateConfig({
      creator: {
        ...config.creator,
        name: formData.creatorName,
        creditText: formData.creditText
      },
      release: {
        ...config.release,
        version: formData.version,
        fileSize: formData.fileSize,
        releaseDate: formData.releaseDate,
        apkUrl: formData.apkUrl,
        apkFileName: formData.apkFileName,
        minAndroidVersion: formData.minAndroidVersion,
        whatsNew: formData.whatsNewText.split('\n').filter(line => line.trim().length > 0)
      }
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  // Filtered Leads
  const filteredLeads = downloadLeads.filter(lead => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return lead.name.toLowerCase().includes(q) || lead.phone.toLowerCase().includes(q);
  });

  // Filtered Queries & Feedback
  const filteredQueries = queriesAndFeedback.filter(item => {
    if (storageCategory === 'queries' && item.type !== 'query') return false;
    if (storageCategory === 'feedback' && item.type !== 'feedback') return false;
    if (storageCategory === 'features' && item.type !== 'feature' && item.type !== 'bug') return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.contact.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q) ||
      (item.subject && item.subject.toLowerCase().includes(q)) ||
      (item.instituteName && item.instituteName.toLowerCase().includes(q))
    );
  });

  const totalQueriesCount = queriesAndFeedback.filter(q => q.type === 'query').length;
  const totalFeedbackCount = queriesAndFeedback.filter(q => q.type === 'feedback').length;
  const totalSuggestionsCount = queriesAndFeedback.filter(q => q.type === 'feature' || q.type === 'bug').length;
  const totalStoredRecords = downloadLeads.length + queriesAndFeedback.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white leading-tight">
                  TuitionOS Developer Gate
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                  Information Storage Hub
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Authorized for Krishna Chandra · Persistent Browser Database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Tabs */}
        <div className="flex border-b border-slate-200 px-4 sm:px-6 bg-slate-50 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('storage')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'storage'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-blue-600" />
            <span>Information Storage</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-extrabold">
              {totalStoredRecords}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Release / Upload APK</span>
            {uploadedFile?.isCustom && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>App Config & Version</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Deployment Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Admin PIN / Password</span>
          </button>
        </div>

        {/* Tab 1: Comprehensive Information Storage Hub */}
        {activeTab === 'storage' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
            
            {/* Top Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                onClick={() => setStorageCategory('leads')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  storageCategory === 'leads'
                    ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-blue-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Leads</span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  {downloadLeads.length}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  User Download Numbers
                </p>
              </div>

              <div
                onClick={() => setStorageCategory('queries')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  storageCategory === 'queries'
                    ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-indigo-600 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Queries</span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  {totalQueriesCount}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  User Questions & Inquiries
                </p>
              </div>

              <div
                onClick={() => setStorageCategory('feedback')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  storageCategory === 'feedback'
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reviews</span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  {totalFeedbackCount}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  App Ratings & Feedback
                </p>
              </div>

              <div
                onClick={() => setStorageCategory('features')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  storageCategory === 'features'
                    ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-purple-600 mb-1">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ideas & Bugs</span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  {totalSuggestionsCount}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Feature Requests & Glitches
                </p>
              </div>
            </div>

            {/* Storage Control & Backup Tool Bar */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stored names, numbers, or queries..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Export CSV */}
                <button
                  onClick={() => {
                    exportAllLeadsCsv();
                    exportAllQueriesCsv();
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export all stored data as CSV"
                >
                  <FileDown className="w-3.5 h-3.5 text-blue-600" />
                  <span>Export CSV</span>
                </button>

                {/* Backup JSON */}
                <button
                  onClick={handleDownloadBackup}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Download full JSON database backup"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>

                {/* Restore JSON input */}
                <input
                  type="file"
                  ref={backupImportRef}
                  onChange={handleImportBackup}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={() => backupImportRef.current?.click()}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Upload JSON database backup"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Restore</span>
                </button>

                {/* Clear All */}
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all stored download leads and queries?')) {
                      clearAllLeads();
                      clearAllQueriesAndFeedback();
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Clear all stored information"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {restoreStatus && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  restoreStatus.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {restoreStatus.success ? (
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                )}
                <span>{restoreStatus.message}</span>
              </div>
            )}

            {/* Storage Category Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setStorageCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  storageCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Records ({totalStoredRecords})
              </button>

              <button
                onClick={() => setStorageCategory('leads')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  storageCategory === 'leads'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Download Leads ({downloadLeads.length})</span>
              </button>

              <button
                onClick={() => setStorageCategory('queries')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  storageCategory === 'queries'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Queries & Questions ({totalQueriesCount})</span>
              </button>

              <button
                onClick={() => setStorageCategory('feedback')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  storageCategory === 'feedback'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Reviews & Ratings ({totalFeedbackCount})</span>
              </button>

              <button
                onClick={() => setStorageCategory('features')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  storageCategory === 'features'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Ideas & Bugs ({totalSuggestionsCount})</span>
              </button>
            </div>

            {/* Section 1: User Download Leads Table */}
            {(storageCategory === 'all' || storageCategory === 'leads') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>User Download Registrations ({filteredLeads.length})</span>
                  </span>
                  {downloadLeads.length > 0 && (
                    <button
                      onClick={exportAllLeadsCsv}
                      className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold cursor-pointer underline"
                    >
                      Download Leads CSV
                    </button>
                  )}
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="p-5 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                    No download lead registrations found.
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white shadow-xs">
                    <div className="bg-slate-50 px-4 py-2.5 text-[11px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                      <span className="col-span-3">User Name</span>
                      <span className="col-span-4">Mobile / Contact</span>
                      <span className="col-span-3">Date & Version</span>
                      <span className="col-span-2 text-right">Direct Actions</span>
                    </div>

                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/80 transition-colors">
                        <div className="col-span-3 font-bold text-slate-900 truncate">
                          {lead.name}
                        </div>

                        {/* Contact details with WhatsApp & Call shortcuts */}
                        <div className="col-span-4 flex items-center gap-2">
                          <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                            {lead.phone}
                          </span>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, regarding TuitionOS...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                            title="Message on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                            className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                            title="Call Number"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="col-span-3 text-[11px] text-slate-500 leading-tight">
                          <span>{lead.timestamp}</span>
                          <span className="block text-slate-400 text-[10px]">APK v{lead.version}</span>
                        </div>

                        <div className="col-span-2 text-right flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => copyToClipboard(lead.phone, lead.id)}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
                            title="Copy number"
                          >
                            {copiedText === lead.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteDownloadLead(lead.id)}
                            className="text-slate-300 hover:text-rose-600 p-1 rounded cursor-pointer"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Queries, Feedback, Features & Bug Reports */}
            {(storageCategory === 'all' || storageCategory !== 'leads') && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span>User Queries & Feedback Submissions ({filteredQueries.length})</span>
                  </span>
                  {queriesAndFeedback.length > 0 && (
                    <button
                      onClick={exportAllQueriesCsv}
                      className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold cursor-pointer underline"
                    >
                      Download Queries CSV
                    </button>
                  )}
                </div>

                {filteredQueries.length === 0 ? (
                  <div className="p-5 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                    No queries or feedback items matching this filter.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredQueries.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                item.type === 'query'
                                  ? 'bg-blue-100 text-blue-700'
                                  : item.type === 'feedback'
                                  ? 'bg-amber-100 text-amber-700'
                                  : item.type === 'feature'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {item.type}
                            </span>

                            {item.rating && (
                              <div className="flex items-center gap-0.5 text-amber-500">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-500" />
                                ))}
                                <span className="text-[10px] font-bold ml-1 text-amber-700">{item.rating}/5</span>
                              </div>
                            )}

                            <span className="font-bold text-slate-900 text-xs">
                              {item.subject}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <select
                              value={item.status}
                              onChange={(e) => updateQueryStatus(item.id, e.target.value as any)}
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border outline-none cursor-pointer ${
                                item.status === 'resolved'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                  : item.status === 'reviewed'
                                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                                  : 'bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="resolved">Resolved</option>
                            </select>

                            <button
                              onClick={() => deleteQueryFeedback(item.id)}
                              className="p-1 text-slate-300 hover:text-rose-600 rounded cursor-pointer"
                              title="Delete submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-slate-700 leading-relaxed text-xs">
                          {item.message}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-slate-800">By: {item.name}</span>
                            <span className="flex items-center gap-1 font-mono text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              {item.contact}
                            </span>
                            <a
                              href={`https://wa.me/${item.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${item.name}, regarding your TuitionOS query: "${item.subject}"...`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Direct WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                            {item.instituteName && (
                              <span className="text-slate-500">Institute: <em>{item.instituteName}</em></span>
                            )}
                          </div>
                          <span>Stored: {item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Release / Upload APK */}
        {activeTab === 'upload' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
            <div className="p-4 bg-blue-50/70 border border-blue-200/60 rounded-2xl">
              <h4 className="font-bold text-blue-900 text-sm mb-1">
                Release a Newer Version of TuitionOS
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                To release an update, upload your new <code className="bg-white px-1.5 py-0.5 rounded font-mono font-semibold text-blue-700">.apk</code> file below, set your new version number and release notes, and click <strong>"Publish New Version"</strong>.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".apk,application/vnd.android.package-archive"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 rounded-2xl p-7 text-center cursor-pointer transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                {uploadedFile?.isCustom ? `Uploaded: ${uploadedFile.name}` : 'Click to select new APK file or drop here'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {uploadedFile?.isCustom
                  ? `File size: ${uploadedFile.size} · Click again if you want to replace with another build`
                  : 'Select your newly compiled TuitionOS.apk from Android Studio'}
              </p>
            </div>

            {/* Quick Version Form */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Update Details for New Release
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    New Version Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    placeholder="e.g. 1.0.5 or 1.1.0"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Detected File Size
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    placeholder="e.g. 30.2 MB"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  What's New in this Version (one point per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.whatsNewText}
                  onChange={(e) => setFormData({ ...formData, whatsNewText: e.target.value })}
                  placeholder="e.g.&#10;Added dark mode&#10;Fixed attendance sync&#10;Faster report generation"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none font-sans text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerApkDownload}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Test Download Dialog</span>
                  </button>

                  {uploadedFile?.isCustom && (
                    <button
                      type="button"
                      onClick={clearCustomUpload}
                      className="px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium cursor-pointer"
                      title="Revert back to original APK"
                    >
                      Reset to Default Build
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Published!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Publish New Version</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs text-emerald-900 font-medium">
                  Currently Serving: <strong>v{config.release.version}</strong> ({config.release.fileSize}) · {config.release.releaseDate}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                Live on Website
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Release Info & Settings */}
        {activeTab === 'config' && (
          <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Release Version Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  placeholder="e.g. 1.0.4"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Display File Size *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  placeholder="e.g. 28.4 MB"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Release Date *
                </label>
                <input
                  type="text"
                  required
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Supported Android Version
                </label>
                <input
                  type="text"
                  required
                  value={formData.minAndroidVersion}
                  onChange={(e) => setFormData({ ...formData, minAndroidVersion: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Cloud / Direct APK URL (Single Configuration Source) *
              </label>
              <input
                type="text"
                required
                value={formData.apkUrl}
                onChange={(e) => setFormData({ ...formData, apkUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                placeholder="/TuitionOS.apk or https://github.com/.../TuitionOS.apk"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Developer Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Branding Text
                </label>
                <input
                  type="text"
                  required
                  value={formData.creditText}
                  onChange={(e) => setFormData({ ...formData, creditText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                What's New in this Release (one item per line)
              </label>
              <textarea
                rows={4}
                value={formData.whatsNewText}
                onChange={(e) => setFormData({ ...formData, whatsNewText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none font-sans"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all values to defaults?')) {
                    resetConfig();
                    onClose();
                  }
                }}
                className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Release Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Deployment Guide */}
        {activeTab === 'guide' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                Method 1: Replace the project file directly in the codebase
              </h4>
              <p className="text-slate-600">
                You can copy your compiled APK directly into the public directory of this project so it is served by the web server:
              </p>
              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] relative">
                <code>/public/TuitionOS.apk</code>
                <button
                  onClick={() => copyToClipboard('/public/TuitionOS.apk', 'path1')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  title="Copy path"
                >
                  {copiedText === 'path1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
                Method 2: Host on GitHub Releases
              </h4>
              <p className="text-slate-600">
                Upload your <code className="font-mono">TuitionOS.apk</code> to a GitHub Release and set the direct download link in the Version & Release Info tab.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Security & PIN Management */}
        {activeTab === 'security' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
            <div className="p-4 bg-slate-900 text-white rounded-2xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">
                  Developer Access Security Gate
                </h4>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                The Admin Tab and Information Storage are protected against regular visitors. Only you ({config.creator.name}) can access this panel by entering your admin PIN / password.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const res = changeAdminPassword(oldPassword, newPassword);
                setSecurityStatus(res);
                if (res.success) {
                  setOldPassword('');
                  setNewPassword('');
                }
              }}
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5"
            >
              <span className="font-bold text-slate-800 text-sm block">
                Change Admin Security PIN / Password
              </span>

              {securityStatus && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    securityStatus.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {securityStatus.success ? (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                  <span>{securityStatus.message}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Current Admin Password or PIN *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current PIN (Default: 9431)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  New Admin Password or PIN *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create a strong secret password or 4-8 digit PIN"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-blue-400" />
                <span>Update Admin Password</span>
              </button>
            </form>

            <div className="p-4 bg-blue-50/60 border border-blue-200/70 rounded-2xl space-y-2 text-xs text-slate-700">
              <span className="font-bold text-blue-950 block">
                How to Open the Admin Tab Anytime
              </span>
              <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                <li>
                  Click the <strong>"Admin Tab"</strong> button in the top navigation bar.
                </li>
                <li>
                  Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">A</kbd> on any page.
                </li>
                <li>
                  Open URL with <code className="font-mono text-blue-700 bg-white px-1 rounded">?admin=true</code>.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={() => {
              adminLogout();
              onClose();
            }}
            className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Admin Tab & Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
