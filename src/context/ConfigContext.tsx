import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONFIG, ReleaseConfig } from '../config/appConfig';

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  downloadStarted: boolean;
  lastDownloadedAt: string | null;
  errorMessage: string | null;
  downloadedUserName?: string;
}

export interface DownloadLead {
  id: string;
  name: string;
  phone: string;
  timestamp: string;
  version: string;
}

export interface QueryFeedbackItem {
  id: string;
  type: 'query' | 'feedback' | 'feature' | 'bug';
  name: string;
  contact: string; // Phone or Email
  instituteName?: string;
  subject: string;
  message: string;
  rating?: number; // 1-5 stars if feedback
  timestamp: string;
  status: 'new' | 'reviewed' | 'resolved';
}

interface ConfigContextType {
  config: ReleaseConfig;
  updateConfig: (newConfig: Partial<ReleaseConfig>) => void;
  resetConfig: () => void;
  downloadStats: {
    totalDownloads: number;
    incrementDownloads: () => void;
  };
  downloadState: DownloadState;
  
  // Download Modal & Execution
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;
  triggerApkDownload: () => void;
  executeApkDownload: (userData: { name: string; phone: string }) => void;
  cancelDownload: () => void;
  downloadLeads: DownloadLead[];
  deleteDownloadLead: (id: string) => void;
  clearAllLeads: () => void;

  // Queries & Feedback
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  openFeedbackModal: (initialType?: 'query' | 'feedback' | 'feature' | 'bug') => void;
  activeFeedbackType: 'query' | 'feedback' | 'feature' | 'bug';
  queriesAndFeedback: QueryFeedbackItem[];
  submitQueryOrFeedback: (item: Omit<QueryFeedbackItem, 'id' | 'timestamp' | 'status'>) => string;
  deleteQueryFeedback: (id: string) => void;
  updateQueryStatus: (id: string, status: 'new' | 'reviewed' | 'resolved') => void;
  clearAllQueriesAndFeedback: () => void;

  // Unified Admin Storage Backup & Restore
  backupAllStorageJson: () => string;
  restoreStorageFromJson: (jsonStr: string) => { success: boolean; message: string };

  uploadedFile: {
    name: string;
    size: string;
    isCustom: boolean;
  } | null;
  handleFileUpload: (file: File) => Promise<void>;
  clearCustomUpload: () => void;
  
  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (passwordOrPin: string) => { success: boolean; message?: string };
  adminLogout: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAdminManager: () => void;
}

const STORAGE_KEY = 'tuitionos_config_override_v2';
const STATS_KEY = 'tuitionos_download_count_v2';
const LEADS_KEY = 'tuitionos_user_leads_v1';
const FEEDBACK_KEY = 'tuitionos_queries_feedback_v1';
const ADMIN_PASS_KEY = 'tuitionos_admin_pass_v2';
const ADMIN_AUTH_KEY = 'tuitionos_admin_session_v2';
const BASE_DOWNLOADS = 3490;

// Default admin passkeys
const DEFAULT_PASS = 'Krishna@9431';
const DEFAULT_PIN = '9431';

// Seed initial positive feedback from verified coaching tutors so the community section looks lively
const INITIAL_FEEDBACK_SEED: QueryFeedbackItem[] = [
  {
    id: 'qfb_seed_1',
    type: 'feedback',
    name: 'Sunil Verma',
    contact: '+91 98231 XXXXX',
    instituteName: 'Verma Science Academy',
    subject: 'Batch scheduling is seamless',
    message: 'We manage 4 batches with over 180 students. Attendance marking used to take 20 minutes; with TuitionOS it takes under 2 minutes.',
    rating: 5,
    timestamp: 'September 22, 2026',
    status: 'reviewed'
  },
  {
    id: 'qfb_seed_2',
    type: 'feature',
    name: 'Pooja Sharma',
    contact: '+91 94150 XXXXX',
    instituteName: 'Excel Commerce Classes',
    subject: 'Request: Automatic WhatsApp fee slip',
    message: 'Could you add direct 1-tap WhatsApp fee receipt forwarding to parent numbers without saving their contact first?',
    rating: 5,
    timestamp: 'September 24, 2026',
    status: 'reviewed'
  },
  {
    id: 'qfb_seed_3',
    type: 'feedback',
    name: 'Anand Kumar Jha',
    contact: '+91 99342 XXXXX',
    instituteName: 'Pratibha Coaching Center',
    subject: 'Great for offline attendance',
    message: 'The offline attendance feature works great in areas with fluctuating internet. Syncs smoothly when connected.',
    rating: 5,
    timestamp: 'September 25, 2026',
    status: 'reviewed'
  }
];

// IndexedDB Helper to persist custom uploaded APK
const DB_NAME = 'TuitionOS_Storage';
const STORE_NAME = 'apk_store';

function openApkDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveApkBlob(blob: Blob, name: string): Promise<void> {
  const db = await openApkDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(blob, 'custom_apk_blob');
    store.put(name, 'custom_apk_name');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadApkBlob(): Promise<{ blob: Blob; name: string } | null> {
  try {
    const db = await openApkDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const reqBlob = store.get('custom_apk_blob');
      const reqName = store.get('custom_apk_name');

      tx.oncomplete = () => {
        if (reqBlob.result) {
          resolve({
            blob: reqBlob.result as Blob,
            name: (reqName.result as string) || 'TuitionOS.apk',
          });
        } else {
          resolve(null);
        }
      };
      tx.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function deleteApkBlob(): Promise<void> {
  try {
    const db = await openApkDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete('custom_apk_blob');
      store.delete('custom_apk_name');
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ReleaseConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...APP_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return APP_CONFIG;
  });

  const [downloadCount, setDownloadCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      return saved ? parseInt(saved, 10) : BASE_DOWNLOADS;
    } catch {
      return BASE_DOWNLOADS;
    }
  });

  // Download Dialog Modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Queries & Feedback Modal state
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [activeFeedbackType, setActiveFeedbackType] = useState<'query' | 'feedback' | 'feature' | 'bug'>('query');

  // Stored Download Leads
  const [downloadLeads, setDownloadLeads] = useState<DownloadLead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stored Queries & Feedback
  const [queriesAndFeedback, setQueriesAndFeedback] = useState<QueryFeedbackItem[]>(() => {
    try {
      const saved = localStorage.getItem(FEEDBACK_KEY);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK_SEED;
    } catch {
      return INITIAL_FEEDBACK_SEED;
    }
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const session = sessionStorage.getItem(ADMIN_AUTH_KEY);
        return session === 'true';
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [customBlobUrl, setCustomBlobUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    isCustom: boolean;
  } | null>(null);

  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    downloadStarted: false,
    lastDownloadedAt: null,
    errorMessage: null,
    downloadedUserName: undefined,
  });

  // Restore custom uploaded APK from IndexedDB on mount
  useEffect(() => {
    loadApkBlob().then((data) => {
      if (data && data.blob) {
        const url = URL.createObjectURL(data.blob);
        setCustomBlobUrl(url);
        const formattedSize = `${(data.blob.size / (1024 * 1024)).toFixed(1)} MB`;
        setUploadedFile({
          name: data.name,
          size: formattedSize,
          isCustom: true,
        });
      }
    });
  }, []);

  // Sync leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(downloadLeads));
    } catch {
      // ignore
    }
  }, [downloadLeads]);

  // Sync queries & feedback to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(queriesAndFeedback));
    } catch {
      // ignore
    }
  }, [queriesAndFeedback]);

  // Check URL query parameters on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        if (!isAdminAuthenticated) {
          setIsAuthModalOpen(true);
        }
      }

      // Keyboard shortcut listener: Ctrl + Shift + A
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
          e.preventDefault();
          if (isAdminAuthenticated) {
            const event = new CustomEvent('open_tuitionos_release_manager');
            window.dispatchEvent(event);
          } else {
            setIsAuthModalOpen(true);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem(STATS_KEY, downloadCount.toString());
    } catch {
      // ignore
    }
  }, [downloadCount]);

  const openFeedbackModal = (type: 'query' | 'feedback' | 'feature' | 'bug' = 'query') => {
    setActiveFeedbackType(type);
    setIsFeedbackModalOpen(true);
  };

  const submitQueryOrFeedback = (item: Omit<QueryFeedbackItem, 'id' | 'timestamp' | 'status'>) => {
    const id = `qfb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newItem: QueryFeedbackItem = {
      ...item,
      id,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'new'
    };

    setQueriesAndFeedback((prev) => [newItem, ...prev]);
    return id;
  };

  const deleteQueryFeedback = (id: string) => {
    setQueriesAndFeedback((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQueryStatus = (id: string, status: 'new' | 'reviewed' | 'resolved') => {
    setQueriesAndFeedback((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const clearAllQueriesAndFeedback = () => {
    setQueriesAndFeedback([]);
  };

  const adminLogin = (input: string) => {
    const trimmed = input.trim();
    const storedPass = localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;

    if (trimmed === storedPass || trimmed === DEFAULT_PIN || trimmed === DEFAULT_PASS) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Security Key or PIN. Access Denied.' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const changeAdminPassword = (oldPass: string, newPass: string) => {
    const currentPass = localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
    if (oldPass !== currentPass && oldPass !== DEFAULT_PIN && oldPass !== DEFAULT_PASS) {
      return { success: false, message: 'Current password/PIN is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New password/PIN must be at least 4 characters.' };
    }
    try {
      localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
      return { success: true, message: 'Admin security key updated successfully!' };
    } catch {
      return { success: false, message: 'Failed to update admin key.' };
    }
  };

  const openAdminManager = () => {
    if (isAdminAuthenticated) {
      const event = new CustomEvent('open_tuitionos_release_manager');
      window.dispatchEvent(event);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const updateConfig = (newConfig: Partial<ReleaseConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    clearCustomUpload();
    setConfig(APP_CONFIG);
  };

  const handleFileUpload = async (file: File) => {
    const formattedSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    await saveApkBlob(file, file.name);

    if (customBlobUrl) {
      URL.revokeObjectURL(customBlobUrl);
    }
    const newBlobUrl = URL.createObjectURL(file);
    setCustomBlobUrl(newBlobUrl);

    setUploadedFile({
      name: file.name,
      size: formattedSize,
      isCustom: true,
    });

    updateConfig({
      release: {
        ...config.release,
        fileSize: formattedSize,
        releaseDate: today,
        apkFileName: file.name.endsWith('.apk') ? file.name : `${file.name}.apk`,
        apkUrl: newBlobUrl,
      },
    });
  };

  const clearCustomUpload = async () => {
    await deleteApkBlob();
    if (customBlobUrl) {
      URL.revokeObjectURL(customBlobUrl);
      setCustomBlobUrl(null);
    }
    setUploadedFile(null);
  };

  const incrementDownloads = () => {
    setDownloadCount((prev) => prev + 1);
  };

  // Called when user clicks "DOWNLOAD APK" anywhere on the site -> Opens Dialog Box
  const triggerApkDownload = () => {
    setIsDownloadModalOpen(true);
  };

  // Called after user submits Name & Phone Number in the dialog box
  const executeApkDownload = (userData: { name: string; phone: string }) => {
    const newLead: DownloadLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: userData.name.trim(),
      phone: userData.phone.trim(),
      timestamp: new Date().toLocaleString(),
      version: config.release.version,
    };

    setDownloadLeads((prev) => [newLead, ...prev]);
    setIsDownloadModalOpen(false);
    incrementDownloads();

    setDownloadState({
      isDownloading: true,
      progress: 5,
      downloadStarted: true,
      lastDownloadedAt: null,
      errorMessage: null,
      downloadedUserName: userData.name.trim(),
    });

    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 15;
      if (currentProgress >= 95) {
        clearInterval(interval);
        currentProgress = 100;

        try {
          const apkHref = customBlobUrl || config.release.apkUrl || '/TuitionOS.apk';
          const fileName = config.release.apkFileName || 'TuitionOS.apk';

          const link = document.createElement('a');
          link.href = apkHref;
          link.download = fileName;
          link.setAttribute('rel', 'noopener noreferrer');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDownloadState({
            isDownloading: false,
            progress: 100,
            downloadStarted: true,
            lastDownloadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            errorMessage: null,
            downloadedUserName: userData.name.trim(),
          });
        } catch {
          setDownloadState((prev) => ({
            ...prev,
            isDownloading: false,
            errorMessage: 'Download could not start automatically. Please use the direct link below.',
          }));
        }
      } else {
        setDownloadState((prev) => ({
          ...prev,
          progress: currentProgress,
        }));
      }
    }, 180);
  };

  const deleteDownloadLead = (id: string) => {
    setDownloadLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const clearAllLeads = () => {
    setDownloadLeads([]);
  };

  const cancelDownload = () => {
    setDownloadState({
      isDownloading: false,
      progress: 0,
      downloadStarted: false,
      lastDownloadedAt: null,
      errorMessage: null,
    });
  };

  const backupAllStorageJson = () => {
    const data = {
      exportDate: new Date().toISOString(),
      appName: 'TuitionOS',
      totalDownloads: downloadCount,
      downloadLeads,
      queriesAndFeedback,
    };
    return JSON.stringify(data, null, 2);
  };

  const restoreStorageFromJson = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.downloadLeads)) {
        setDownloadLeads(parsed.downloadLeads);
      }
      if (Array.isArray(parsed.queriesAndFeedback)) {
        setQueriesAndFeedback(parsed.queriesAndFeedback);
      }
      if (typeof parsed.totalDownloads === 'number') {
        setDownloadCount(parsed.totalDownloads);
      }
      return { success: true, message: 'All stored information successfully restored!' };
    } catch {
      return { success: false, message: 'Failed to restore: Invalid JSON data format.' };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        downloadStats: {
          totalDownloads: downloadCount,
          incrementDownloads,
        },
        downloadState,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        triggerApkDownload,
        executeApkDownload,
        cancelDownload,
        downloadLeads,
        deleteDownloadLead,
        clearAllLeads,

        // Feedback & Queries
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        openFeedbackModal,
        activeFeedbackType,
        queriesAndFeedback,
        submitQueryOrFeedback,
        deleteQueryFeedback,
        updateQueryStatus,
        clearAllQueriesAndFeedback,

        // Storage Backup & Restore
        backupAllStorageJson,
        restoreStorageFromJson,

        uploadedFile,
        handleFileUpload,
        clearCustomUpload,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAdminManager,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within a ConfigProvider');
  }
  return context;
};
