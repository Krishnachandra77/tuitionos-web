export interface ReleaseConfig {
  appName: string;
  appTitle: string;
  subtitle: string;
  slogan: string;
  creator: {
    name: string;
    creditText: string;
  };
  release: {
    version: string;
    versionCode: number;
    fileSize: string;
    releaseDate: string;
    apkFileName: string;
    apkUrl: string; // The primary APK file reference
    packageName: string;
    minAndroidVersion: string;
    recommendedAndroidVersion: string;
    sha256Checksum: string;
    whatsNew: string[];
  };
  requirements: {
    os: string;
    storage: string;
    ram: string;
    internet: string;
  };
}

export const APP_CONFIG: ReleaseConfig = {
  appName: "TuitionOS",
  appTitle: "TuitionOS — Smart Tuition Management System",
  subtitle: "Smart Tuition Management System",
  slogan: "Smart Tuition Management for Modern Coaching Classes",
  creator: {
    name: "Krishna Chandra",
    creditText: "Made by Krishna Chandra"
  },
 release: {
    version: "1.0.4",
    versionCode: 104,
    fileSize: "23.3 MB",
    releaseDate: "September 27, 2026",
    apkFileName: "TuitionOS.apk",
    apkUrl: "https://github.com/Krishnachandra77/tuitionos-web/releases/download/1.0.5/TuitionOS.apk",
    packageName: "com.krishnachandra.tuitionos",
    minAndroidVersion: "Android 8.0 (Oreo) and above",
    recommendedAndroidVersion: "Android 11.0 or newer",
    sha256Checksum: "9f82b7c4d1e2a5f80b9c34e7a812d45b76c8e901a23b4c5d6e7f8091a2b3c4d5",
    whatsNew: [
      "Improved attendance tracking with one-tap batch marking and instant absentee SMS alerts",
      "New fee management system with GST invoice generation and UPI payment tracking",
      "Better course and batch scheduling with clash detection",
      "Interactive homework submission module with image attachment support",
      "Direct complaints and resolution ticketing workflow",
      "Enhanced offline caching for attendance during low connectivity",
      "Performance improvements and reduced APK package footprint"
    ]
  },
  requirements: {
    os: "Android 8.0 (API level 26) or higher",
    storage: "60 MB available space for app and local cache",
    ram: "2 GB RAM minimum (3 GB+ recommended)",
    internet: "Internet connection required for real-time cloud sync and alerts"
  }
};

export const CORE_MODULES = [
  { id: "students", title: "Students", desc: "Complete student profiles, enrollment records, contact directory, and guardian details." },
  { id: "courses", title: "Courses", desc: "Structured syllabus, subject allocation, chapter progress, and study materials." },
  { id: "batches", title: "Batches", desc: "Morning, evening, and weekend batch partitions with capacity management." },
  { id: "attendance", title: "Attendance", desc: "Daily biometric or manual attendance with automated absentee notifications." },
  { id: "homework", title: "Homework", desc: "Targeted assignments, due dates, file submissions, and grading feedback." },
  { id: "tests", title: "Tests & Marks", desc: "Unit tests, mock exams, percentiles, ranking reports, and parent report cards." },
  { id: "fees", title: "Fees", desc: "Fee schedules, monthly installment tracking, discounts, and overdue flags." },
  { id: "payments", title: "Payments", desc: "UPI, cash, net-banking reconciliation, auto-generated PDF receipts." },
  { id: "leave", title: "Leave Requests", desc: "Student leave applications with parent authorization approvals." },
  { id: "permissions", title: "Permission Requests", desc: "Late arrivals, early exits, and special session authorizations." },
  { id: "complaints", title: "Complaints", desc: "Confidential feedback desk with ticket status and tutor resolution notes." },
  { id: "messages", title: "Messages", desc: "Direct institute-to-parent announcements, broadcast chats, and circulars." },
  { id: "notifications", title: "Notifications", desc: "Instant push reminders for fees, classes, test dates, and urgent updates." },
  { id: "reports", title: "Reports", desc: "Exportable revenue, attendance percentage, and academic performance graphs." }
];

export const KEY_FEATURES = [
  {
    icon: "BookOpen",
    title: "Courses",
    shortDesc: "Manage courses and course content.",
    details: "Organize comprehensive syllabi, subjects, class materials, and topic-wise lecture logs across all grades."
  },
  {
    icon: "School",
    title: "Batches",
    shortDesc: "Manage different tuition batches separately.",
    details: "Partition students into dedicated batches with customizable timings, classroom allocation, and teacher assignments."
  },
  {
    icon: "CheckCircle2",
    title: "Attendance",
    shortDesc: "Track daily attendance.",
    details: "Mark attendance in seconds with one-tap batch status, student history logs, and automated SMS alerts to parents."
  },
  {
    icon: "FileEdit",
    title: "Tests & Marks",
    shortDesc: "Manage tests and student performance.",
    details: "Schedule class tests, record subject scores, compute percentiles, and generate instant progress report cards."
  },
  {
    icon: "Receipt",
    title: "Fees & Payments",
    shortDesc: "Track fees, payments, invoices and receipts.",
    details: "Automate recurring fee installments, track partial payments, reconcile UPI transactions, and issue digital receipts."
  },
  {
    icon: "BellRing",
    title: "Notifications",
    shortDesc: "Send attendance and fee reminders.",
    details: "Broadcast automated fee dues, emergency holiday notices, and exam schedules directly to student & parent devices."
  },
  {
    icon: "BookMarked",
    title: "Homework",
    shortDesc: "Give homework directly to assigned students.",
    details: "Assign daily tasks with PDF references, set submission deadlines, and review student progress online."
  },
  {
    icon: "ClipboardCheck",
    title: "Leave & Permissions",
    shortDesc: "Handle requests digitally.",
    details: "Review and approve medical leave, emergency absence, and early departure permits with zero paper clutter."
  },
  {
    icon: "LifeBuoy",
    title: "Complaints",
    shortDesc: "Provide a student help/complaint system.",
    details: "Dedicated student grievance ticketing to resolve academic or facility issues transparently and promptly."
  }
];

export const FAQ_ITEMS = [
  {
    question: "What is TuitionOS?",
    answer: "TuitionOS is an Android-native application engineered specifically for coaching institutes, tuition centers, private tutors, and academies. It consolidates student administration, batch scheduling, attendance logging, fee collections, homework assignments, and parent communications into one intuitive mobile app."
  },
  {
    question: "Who can use TuitionOS?",
    answer: "TuitionOS is built for coaching center administrators, head teachers, subject tutors, front-desk staff, students, and parents. Administrators get full institute management tools, while students and parents have dedicated portals for attendance, marks, homework, and fee receipts."
  },
  {
    question: "Is TuitionOS free?",
    answer: "The TuitionOS APK can be downloaded and installed directly from this official website. Core management features are immediately available for coaching classes and tutors with straightforward access."
  },
  {
    question: "How do I install the APK?",
    answer: "Tap 'Download TuitionOS APK' on this website. Once downloaded, open the TuitionOS.apk file on your Android device. If prompted, tap 'Settings' and enable 'Allow installation from this source'. Then tap 'Install' and launch the app once finished."
  },
  {
    question: "How do I update TuitionOS?",
    answer: "When a new update is released, you can download the latest TuitionOS.apk directly from this official website. Installing the new APK over your existing installation updates the app while safely preserving all your local institute data."
  },
  {
    question: "Do I need an Internet connection?",
    answer: "Yes, an internet connection is required for cloud database synchronization, instant parent push notifications, fee reconciliation, and homework uploads. However, attendance marking supports local offline caching that syncs automatically when reconnecting."
  },
  {
    question: "Can I use TuitionOS on Android?",
    answer: "Yes! TuitionOS is specifically developed for Android smartphones and tablets running Android 8.0 (Oreo) and higher. It is optimized for both compact phone displays and large tablet screens."
  }
];
