import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  LifeBuoy,
  Clock,
  ShieldCheck,
  MessageSquare,
  Star,
  Lightbulb,
  HelpCircle,
  Bug,
  Sparkles
} from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

export const ContactSection: React.FC = () => {
  const { config, openFeedbackModal, submitQueryOrFeedback, queriesAndFeedback } = useAppConfig();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [activeTab, setActiveTab] = useState<'query' | 'feedback'>('query');
  const [rating, setRating] = useState(5);
  
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    instituteName: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneOrEmail || !formData.message) return;

    const newTicketId = submitQueryOrFeedback({
      type: activeTab === 'query' ? 'query' : 'feedback',
      name: formData.name.trim(),
      contact: formData.phoneOrEmail.trim(),
      instituteName: formData.instituteName.trim() || undefined,
      subject: formData.subject.trim() || (activeTab === 'query' ? 'TuitionOS Help & Query' : 'TuitionOS User Review'),
      message: formData.message.trim(),
      rating: activeTab === 'feedback' ? rating : undefined
    });

    setTicketId(newTicketId);
    setFormSubmitted(true);
  };

  // Filter public feedback reviews to showcase
  const reviewsToShow = queriesAndFeedback
    .filter(q => q.type === 'feedback' && (q.rating || 5) >= 4)
    .slice(0, 3);

  return (
    <section id="support" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Queries & Feedback Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Have a Query or Want to Share Feedback?
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Submit your questions, ask about coaching class setup, or share feedback to help us refine TuitionOS.
          </p>

          {/* Quick Action Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => openFeedbackModal('query')}
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask a Question</span>
            </button>

            <button
              onClick={() => openFeedbackModal('feedback')}
              className="px-3.5 py-1.5 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Give Feedback & Review</span>
            </button>

            <button
              onClick={() => openFeedbackModal('feature')}
              className="px-3.5 py-1.5 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
              <span>Suggest a Feature</span>
            </button>

            <button
              onClick={() => openFeedbackModal('bug')}
              className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Bug className="w-3.5 h-3.5 text-rose-600" />
              <span>Report an Issue</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Desk Overview & Community Reviews */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Developer Credit Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
                Official Support & Queries
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                TuitionOS Administrator Desk
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {config.creator.creditText}
              </p>
            </div>

            {/* Assistance Information */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Timely Responses</h4>
                  <p className="mt-0.5 text-slate-500">
                    We review all coaching inquiries and questions within 24 hours on business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Personal Privacy</h4>
                  <p className="mt-0.5 text-slate-500">
                    Your contact numbers and queries are kept confidential and used solely to address your inquiry.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Tutor Feedback Preview */}
            {reviewsToShow.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Recent Tutor Reviews</span>
                  </span>
                  <button
                    onClick={() => openFeedbackModal('feedback')}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline underline-offset-2"
                  >
                    Add Yours
                  </button>
                </div>

                <div className="space-y-2.5">
                  {reviewsToShow.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: item.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      {item.instituteName && (
                        <p className="text-[10px] text-slate-400">{item.instituteName}</p>
                      )}
                      <p className="text-slate-600 text-[11px] italic">
                        "{item.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right: Interactive Query / Feedback Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Form Toggle: Ask a Query vs Send Feedback */}
            <div className="flex border-b border-slate-100 pb-4 mb-5 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeTab === 'query' ? 'Submit Your Query' : 'Share Your App Feedback'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeTab === 'query'
                    ? 'Ask questions about installation, batch allocation, or fee setups'
                    : 'Tell us how TuitionOS has helped your tuition or suggest new tools'}
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('query')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'query'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Query
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('feedback')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'feedback'
                      ? 'bg-white text-amber-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Feedback
                </button>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">
                  {activeTab === 'query' ? 'Query Received Successfully!' : 'Feedback Recorded!'}
                </h4>
                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  Reference ID: <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">#{ticketId.toUpperCase()}</span>
                </p>
                <p className="text-xs text-emerald-700 mt-2 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your {activeTab === 'query' ? 'query' : 'feedback'} has been securely saved for the development team.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      phoneOrEmail: '',
                      instituteName: '',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Rating selection if in feedback mode */}
                {activeTab === 'feedback' && (
                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">
                      How would you rate TuitionOS?
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      placeholder="e.g. +91 98765 43210 or email"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Coaching / Tuition Institute Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      placeholder="e.g. Apex Academy"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Topic / Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={
                        activeTab === 'query'
                          ? 'e.g. Question about Batch Attendance'
                          : 'e.g. Experience using fee receipt tool'
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {activeTab === 'query' ? 'Your Query / Question *' : 'Your Feedback / Review *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      activeTab === 'query'
                        ? 'Describe your question regarding installation, attendance sync, fee receipts, or coaching setup...'
                        : 'Share your review, suggestions for improvements, or features you would like to see added...'
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {activeTab === 'query' ? 'Submit Query' : 'Send Feedback & Review'}
                  </span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
