import React, { useState } from 'react';
import {
  Smartphone,
  CheckCircle2,
  Calendar,
  CreditCard,
  BookOpen,
  User,
  Users,
  Check,
  X,
  FileText,
  Clock,
  QrCode,
  Download,
  AlertCircle
} from 'lucide-react';

type ScreenId =
  | 'login'
  | 'admin_dashboard'
  | 'user_dashboard'
  | 'courses'
  | 'attendance'
  | 'fees'
  | 'payment'
  | 'homework';

interface ScreenTab {
  id: ScreenId;
  label: string;
  tagline: string;
}

const TABS: ScreenTab[] = [
  { id: 'login', label: 'Login', tagline: 'Role-based access for Admin, Teachers, and Students' },
  { id: 'admin_dashboard', label: 'Admin Dashboard', tagline: 'Unified institute overview and high-level operations' },
  { id: 'user_dashboard', label: 'User Dashboard', tagline: 'Student attendance, timetable, and announcements' },
  { id: 'courses', label: 'Courses', tagline: 'Syllabus tracking, batch schedules, and class notes' },
  { id: 'attendance', label: 'Attendance', tagline: 'One-tap daily attendance marking and parent alerts' },
  { id: 'fees', label: 'Fees', tagline: 'Fee registers, monthly balances, and pending dues' },
  { id: 'payment', label: 'Payment', tagline: 'UPI reconciliation, instant receipts, and payment status' },
  { id: 'homework', label: 'Homework', tagline: 'Daily assignments, submissions, and teacher feedback' },
];

export const Screenshots: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScreenId>('admin_dashboard');

  return (
    <section id="screenshots" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            App Preview & Screenshots
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Explore the TuitionOS Android experience engineered for speed, clean navigation, and high productivity.
          </p>
        </div>

        {/* Tab Switcher - Responsive horizontal scroll on mobile */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-1.5 no-scrollbar mb-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Tagline */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Previewing: <span className="font-semibold text-slate-800">{TABS.find(t => t.id === activeTab)?.label}</span> — {TABS.find(t => t.id === activeTab)?.tagline}
          </p>
        </div>

        {/* Responsive Mockup Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          
          {/* Android Device Frame */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18.5] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 shadow-slate-950/25 flex-shrink-0">
            
            {/* Phone Speaker & Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 ring-1 ring-slate-700/50 mr-2" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Phone Screen Container */}
            <div className="relative w-full h-full bg-white rounded-[34px] overflow-hidden flex flex-col font-sans select-none border border-slate-200">
              
              {/* Android Status Bar */}
              <div className="h-7 bg-slate-900 text-white px-5 flex items-center justify-between text-[11px] font-semibold tracking-wider z-10">
                <span>09:41</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Dynamic Screen Content */}
              <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-800 flex flex-col">
                {activeTab === 'login' && <ScreenLogin />}
                {activeTab === 'admin_dashboard' && <ScreenAdminDashboard />}
                {activeTab === 'user_dashboard' && <ScreenUserDashboard />}
                {activeTab === 'courses' && <ScreenCourses />}
                {activeTab === 'attendance' && <ScreenAttendance />}
                {activeTab === 'fees' && <ScreenFees />}
                {activeTab === 'payment' && <ScreenPayment />}
                {activeTab === 'homework' && <ScreenHomework />}
              </div>

              {/* Android Bottom Navigation Bar */}
              <div className="h-12 bg-white border-t border-slate-200 px-6 flex items-center justify-around text-slate-400">
                <button
                  onClick={() => setActiveTab('admin_dashboard')}
                  className={`flex flex-col items-center ${activeTab === 'admin_dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-[9px] font-semibold mt-0.5">Admin</span>
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`flex flex-col items-center ${activeTab === 'attendance' ? 'text-blue-600' : 'text-slate-400'}`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[9px] font-semibold mt-0.5">Roll</span>
                </button>
                <button
                  onClick={() => setActiveTab('fees')}
                  className={`flex flex-col items-center ${activeTab === 'fees' ? 'text-blue-600' : 'text-slate-400'}`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[9px] font-semibold mt-0.5">Fees</span>
                </button>
                <button
                  onClick={() => setActiveTab('user_dashboard')}
                  className={`flex flex-col items-center ${activeTab === 'user_dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-[9px] font-semibold mt-0.5">Profile</span>
                </button>
              </div>

            </div>
          </div>

          {/* Screen Highlights & Deep Dive Context */}
          <div className="max-w-md space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Screen Focus
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {TABS.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                {getScreenSummary(activeTab)}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                {getScreenKeyPoints(activeTab).map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-600">
              <p className="font-semibold text-blue-900 mb-1">
                Optimized for Any Android Device
              </p>
              Tested on low-end budget smartphones to flagship tablets. Fast load times with zero bloatware.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/* --- 8 HIGH FIDELITY MOBILE SCREENS --- */

function ScreenLogin() {
  return (
    <div className="p-5 flex flex-col justify-between h-full bg-white">
      <div>
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-md">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Sign in to TuitionOS</h3>
        <p className="text-xs text-slate-500 mt-0.5">Modern coaching administration</p>

        {/* Role toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg mt-4 text-[11px] font-medium text-slate-600">
          <span className="flex-1 py-1 text-center bg-white text-blue-600 font-semibold rounded shadow-xs">Admin</span>
          <span className="flex-1 py-1 text-center">Teacher</span>
          <span className="flex-1 py-1 text-center">Student</span>
        </div>

        <div className="mt-4 space-y-2.5">
          <div>
            <label className="text-[10px] font-semibold text-slate-600">Institute Mobile / Email</label>
            <input
              type="text"
              readOnly
              value="admin@apexcoaching.edu"
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-600">Password</label>
            <input
              type="password"
              readOnly
              value="••••••••••••"
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 mt-1"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 w-3 h-3" readOnly />
            Remember me
          </span>
          <span className="text-blue-600 font-medium">Forgot?</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-xs shadow-sm">
          Sign In
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          TuitionOS v1.0.4 · Encrypted Session
        </p>
      </div>
    </div>
  );
}

function ScreenAdminDashboard() {
  return (
    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Apex Academy</span>
          <h3 className="text-sm font-bold text-slate-900">Admin Control Center</h3>
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
          KC
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] text-slate-500">Active Students</span>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">342</p>
          <span className="text-[9px] text-emerald-600 font-semibold">+18 this month</span>
        </div>
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] text-slate-500">Today's Fee</span>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">₹48,500</p>
          <span className="text-[9px] text-blue-600 font-semibold">14 receipts</span>
        </div>
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] text-slate-500">Attendance</span>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">94.8%</p>
          <span className="text-[9px] text-slate-500">8 batches marked</span>
        </div>
        <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] text-slate-500">Pending Tests</span>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">3</p>
          <span className="text-[9px] text-amber-600 font-semibold">Marks review</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
        <span className="text-[10px] font-semibold text-slate-700">Quick Actions</span>
        <div className="grid grid-cols-3 gap-1.5 mt-1.5 text-center text-[10px]">
          <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">Mark Roll</div>
          <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-medium">Add Student</div>
          <div className="p-1.5 bg-purple-50 text-purple-700 rounded-lg font-medium">Collect Fee</div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-1.5">
        <span className="text-[10px] font-semibold text-slate-700">Recent Activity</span>
        <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1">
          <span>Fee paid: Rohit Verma</span>
          <span className="font-semibold text-emerald-600">₹3,500</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span>Class 10 Physics Roll Marked</span>
          <span className="text-slate-400">10:15 AM</span>
        </div>
      </div>
    </div>
  );
}

function ScreenUserDashboard() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-slate-400">Student Portal</span>
          <h3 className="text-sm font-bold text-slate-900">Aarav Sharma</h3>
          <p className="text-[10px] text-slate-500">Grade 10 · Batch Alpha</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
          AS
        </div>
      </div>

      {/* Student stats */}
      <div className="p-3 bg-gradient-to-tr from-blue-700 to-indigo-600 text-white rounded-xl shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-blue-100">Overall Attendance</p>
            <p className="text-xl font-bold mt-0.5">96.4%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-blue-100">Fee Status</p>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-400/20 text-emerald-200 rounded font-semibold">
              Cleared
            </span>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
        <span className="text-[10px] font-semibold text-slate-700 flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-600" />
          Today's Classes
        </span>
        <div className="mt-2 space-y-1.5 text-[10px]">
          <div className="p-1.5 bg-slate-50 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">Advanced Mathematics</p>
              <p className="text-slate-400 text-[9px]">4:30 PM - 6:00 PM · Room 2</p>
            </div>
            <span className="text-blue-600 font-medium">In 15m</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">Physics Laboratory</p>
              <p className="text-slate-400 text-[9px]">6:15 PM - 7:30 PM · Lab 1</p>
            </div>
            <span className="text-slate-400">Scheduled</span>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-[10px] text-amber-900">
        <span className="font-semibold flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-700" />
          Weekly Mock Test Notice
        </span>
        <p className="mt-0.5 text-amber-800 text-[9px]">
          Mathematics Unit Test 3 on Sunday at 9:00 AM. Syllabus: Trigonometry & Circles.
        </p>
      </div>
    </div>
  );
}

function ScreenCourses() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-900">Courses & Syllabus</h3>
        <span className="text-[10px] text-blue-600 font-semibold">+ New Course</span>
      </div>

      <div className="space-y-2">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-800">Physics Class 12</p>
              <p className="text-[10px] text-slate-400">Electromagnetism & Optics</p>
            </div>
            <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              74% Done
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
            <div className="bg-blue-600 h-1 rounded-full" style={{ width: '74%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1">
            <span>18/24 Chapters completed</span>
            <span>42 Students</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-800">Chemistry Class 11</p>
              <p className="text-[10px] text-slate-400">Organic Chemistry Foundations</p>
            </div>
            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              88% Done
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
            <div className="bg-emerald-600 h-1 rounded-full" style={{ width: '88%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1">
            <span>22/25 Chapters completed</span>
            <span>36 Students</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-800">Class 10 Mathematics</p>
              <p className="text-[10px] text-slate-400">CBSE & State Board Prep</p>
            </div>
            <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              60% Done
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
            <div className="bg-purple-600 h-1 rounded-full" style={{ width: '60%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1">
            <span>12/20 Chapters completed</span>
            <span>58 Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenAttendance() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold">Class 10 Morning</span>
          <h3 className="text-sm font-bold text-slate-900">Daily Attendance</h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded">
          Today
        </span>
      </div>

      {/* Summary tally */}
      <div className="flex gap-2 text-center text-xs">
        <div className="flex-1 bg-emerald-50 text-emerald-700 p-2 rounded-lg border border-emerald-100 font-semibold">
          32 Present
        </div>
        <div className="flex-1 bg-rose-50 text-rose-700 p-2 rounded-lg border border-rose-100 font-semibold">
          3 Absent
        </div>
      </div>

      {/* Student List with Quick Toggles */}
      <div className="bg-white rounded-xl border border-slate-200/80 divide-y divide-slate-100 text-xs">
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-[11px]">Aarav Sharma</p>
              <p className="text-[9px] text-slate-400">Roll #101</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold">
            PRESENT
          </span>
        </div>

        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-[11px]">Bhavna Sen</p>
              <p className="text-[9px] text-slate-400">Roll #102</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold">
            PRESENT
          </span>
        </div>

        <div className="p-2 flex items-center justify-between bg-rose-50/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-[11px]">Devansh Paul</p>
              <p className="text-[9px] text-rose-500 font-medium">Absentee</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[9px] font-bold">
            ABSENT
          </span>
        </div>
      </div>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-[11px] shadow-sm flex items-center justify-center gap-1.5">
        <span>Notify Parents of 3 Absentees</span>
      </button>
    </div>
  );
}

function ScreenFees() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-900">Fee Management</h3>
        <span className="text-[10px] text-blue-600 font-semibold">Filter Batch</span>
      </div>

      {/* Ledger Card */}
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xs">
        <p className="text-[10px] text-slate-400">September 2026 Collection</p>
        <p className="text-xl font-bold mt-0.5">₹2,84,000</p>
        <div className="flex justify-between text-[10px] text-slate-300 mt-2 pt-2 border-t border-slate-800">
          <span>Pending Dues: ₹32,000</span>
          <span>91% Collected</span>
        </div>
      </div>

      {/* Fee records */}
      <div className="bg-white rounded-xl border border-slate-200/80 divide-y divide-slate-100 text-xs">
        <div className="p-2.5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-800 text-[11px]">Karan Malhotra</p>
            <p className="text-[9px] text-slate-400">Class 12 · Inv #8491</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-900 text-[11px]">₹4,500</p>
            <span className="text-[9px] text-emerald-600 font-semibold">Paid in Full</span>
          </div>
        </div>

        <div className="p-2.5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-800 text-[11px]">Sneha Roy</p>
            <p className="text-[9px] text-slate-400">Class 10 · Inv #8492</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-amber-600 text-[11px]">₹2,000 Due</p>
            <span className="text-[9px] text-amber-600 font-semibold">Due in 3 days</span>
          </div>
        </div>

        <div className="p-2.5 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-800 text-[11px]">Pooja Hegde</p>
            <p className="text-[9px] text-slate-400">Class 11 · Inv #8493</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-900 text-[11px]">₹3,800</p>
            <span className="text-[9px] text-emerald-600 font-semibold">Paid (UPI)</span>
          </div>
        </div>
      </div>

      <button className="w-full py-1.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-[10px]">
        Generate Monthly Ledger PDF
      </button>
    </div>
  );
}

function ScreenPayment() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-900">Payment Collection</h3>
        <span className="text-[10px] text-slate-400">UPI & Cash</span>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
        <p className="text-[11px] font-semibold text-slate-800">Scan UPI QR to Pay</p>
        <p className="text-[9px] text-slate-400 mb-2">TuitionOS Auto-Reconciliation</p>
        <div className="w-24 h-24 mx-auto bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-center">
          <QrCode className="w-16 h-16 text-slate-800" />
        </div>
        <p className="text-[10px] font-mono text-slate-600 mt-2">apexcoaching@upi</p>
      </div>

      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Student:</span>
          <span className="font-semibold text-slate-800">Rohan Kapoor (Grade 10)</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Amount:</span>
          <span className="font-bold text-blue-600">₹3,500.00</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Mode:</span>
          <span className="font-medium text-slate-800">PhonePe / UPI</span>
        </div>
      </div>

      <button className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold text-[11px] shadow-sm flex items-center justify-center gap-1.5">
        <Download className="w-3.5 h-3.5" />
        <span>Issue Digital Receipt PDF</span>
      </button>
    </div>
  );
}

function ScreenHomework() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-900">Homework & Tasks</h3>
        <span className="text-[10px] text-blue-600 font-semibold">+ Assign</span>
      </div>

      <div className="space-y-2">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-start">
            <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded">
              PHYSICS
            </span>
            <span className="text-[9px] text-rose-600 font-semibold">Due Tomorrow</span>
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1.5">Ray Optics Problem Set 4</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Solve Q1 to Q14 from NCERT textbook Chapter 9.</p>
          <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Assigned to: Class 12 Batch A</span>
            <span className="text-emerald-600 font-semibold">28/34 Submitted</span>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-start">
            <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded">
              MATHEMATICS
            </span>
            <span className="text-[9px] text-slate-400 font-medium">Due in 3 days</span>
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1.5">Calculus: Limits & Continuity</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Complete worksheet PDF attached in study tab.</p>
          <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Assigned to: Class 11 Morning</span>
            <span className="text-blue-600 font-semibold">12/40 Submitted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getScreenSummary(screen: ScreenId): string {
  switch (screen) {
    case 'login':
      return 'Multi-role authentication enabling institute owners, teachers, and enrolled students to switch between perspectives seamlessly.';
    case 'admin_dashboard':
      return 'The high-level operational center presenting student counts, daily fee collection totals, active batches, and instant shortcuts.';
    case 'user_dashboard':
      return 'Personalized student screen tracking attendance percentage, today\'s lecture timetable, exam countdowns, and institute bulletins.';
    case 'courses':
      return 'Curriculum organization suite showing subject progress, completed topics, batch schedules, and downloadable study guides.';
    case 'attendance':
      return 'Rapid digital roll-call with single-tap toggle, absentee SMS broadcasting, and historical attendance percentage metrics.';
    case 'fees':
      return 'Complete fee management with installment breakdowns, overdue alerts, payment ledger reconciliation, and automated receipts.';
    case 'payment':
      return 'Cashless fee processing with dynamic UPI QR codes, transaction confirmation, and instant PDF receipt distribution.';
    case 'homework':
      return 'Targeted assignment distribution with due dates, PDF attachments, student submission tracking, and grading remarks.';
  }
}

function getScreenKeyPoints(screen: ScreenId): string[] {
  switch (screen) {
    case 'login':
      return [
        'Admin, Teacher, and Student quick role toggle',
        'Biometric fingerprint / face unlock support',
        'Encrypted credentials with session tokens'
      ];
    case 'admin_dashboard':
      return [
        'Live student enrollment and collection metrics',
        'One-tap shortcuts for attendance and fee entry',
        'Instant alert feed of recent transactions'
      ];
    case 'user_dashboard':
      return [
        'Real-time attendance score & fee clearance status',
        'Dynamic daily lecture schedule with room assignments',
        'Direct institute announcement broadcast banner'
      ];
    case 'courses':
      return [
        'Chapter-by-chapter completion progress bars',
        'Integrated student headcount per subject',
        'Cloud storage for class notes and worksheets'
      ];
    case 'attendance':
      return [
        'One-tap present/absent batch toggle',
        'Instant WhatsApp/SMS absentee notifications',
        'Offline roll-call caching for low connectivity'
      ];
    case 'fees':
      return [
        'Clear pending vs collected fee reconciliation',
        'Automated upcoming due date reminders',
        'Exportable monthly accounting ledger'
      ];
    case 'payment':
      return [
        'UPI QR code scanner compatible with all Indian banks',
        'Unique digital receipt generation with institute seal',
        'Zero manual paperwork or invoice misplacement'
      ];
    case 'homework':
      return [
        'Direct task assignment with submission deadlines',
        'Real-time submission counters for instructors',
        'Student camera photo upload for written homework'
      ];
  }
}
