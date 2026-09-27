import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  Star,
  Lightbulb,
  Bug,
  Send,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';

export const QueriesFeedbackModal: React.FC = () => {
  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    activeFeedbackType,
    submitQueryOrFeedback
  } = useAppConfig();

  const [type, setType] = useState<'query' | 'feedback' | 'feature' | 'bug'>(activeFeedbackType);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync type if activeFeedbackType changes when opened
  React.useEffect(() => {
    setType(activeFeedbackType);
  }, [activeFeedbackType]);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) {
      setError('Please provide your name, contact info, and message.');
      return;
    }

    const ticketId = submitQueryOrFeedback({
      type,
      name: name.trim(),
      contact: contact.trim(),
      instituteName: instituteName.trim() || undefined,
      subject: subject.trim() || (type === 'query' ? 'General Query' : type === 'feature' ? 'Feature Suggestion' : type === 'bug' ? 'Issue Report' : 'TuitionOS Review'),
      message: message.trim(),
      rating: type === 'feedback' ? rating : undefined
    });

    setSubmittedTicket(ticketId);
    setError(null);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setName('');
    setContact('');
    setInstituteName('');
    setSubject('');
    setMessage('');
    setRating(5);
    setIsFeedbackModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Queries & Feedback
              </h3>
              <p className="text-xs text-slate-500">
                Help us improve TuitionOS for coaching classes
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFeedbackModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedTicket ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your submission has been registered with reference ID:
              </p>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg font-mono text-xs font-bold text-slate-800 border border-slate-200">
                #{submittedTicket.toUpperCase()}
              </div>
              <p className="text-xs text-slate-500">
                The TuitionOS development team reviews every query and suggestion to make future updates even better.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Type Category Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  What would you like to share? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('query')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 text-[11px] font-semibold ${
                      type === 'query'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-700 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>Ask a Query</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('feedback')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 text-[11px] font-semibold ${
                      type === 'feedback'
                        ? 'border-amber-500 bg-amber-50/70 text-amber-800 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>App Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('feature')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 text-[11px] font-semibold ${
                      type === 'feature'
                        ? 'border-purple-600 bg-purple-50/70 text-purple-700 ring-1 ring-purple-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                    <span>Feature Idea</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('bug')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 text-[11px] font-semibold ${
                      type === 'bug'
                        ? 'border-rose-600 bg-rose-50/70 text-rose-700 ring-1 ring-rose-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <Bug className="w-4 h-4 text-rose-600" />
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>

              {/* Star Rating for App Review */}
              {type === 'feedback' && (
                <div className="p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Your Rating
                    </span>
                    <span className="text-[11px] text-slate-500">
                      How would you rate TuitionOS?
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-700 ml-1.5">
                      {rating}/5
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mobile Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Coaching / Tuition Institute Name (Optional)
                </label>
                <input
                  type="text"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  placeholder="e.g. Apex Mathematics Academy"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    type === 'query'
                      ? 'e.g. How does batch clash detection work?'
                      : type === 'feature'
                      ? 'e.g. Suggestion: Automated report card printing'
                      : type === 'bug'
                      ? 'e.g. Attendance export file error on Android 10'
                      : 'e.g. Excellent experience managing students'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError(null);
                  }}
                  placeholder={
                    type === 'query'
                      ? 'Write your question or setup inquiry here...'
                      : type === 'feature'
                      ? 'Describe your requested feature or coaching workflow requirement...'
                      : type === 'bug'
                      ? 'Describe what happened, error message, or device model...'
                      : 'Share your thoughts, what you liked most, or suggestions...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-800"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {type === 'query'
                      ? 'Submit Query'
                      : type === 'feature'
                      ? 'Send Feature Suggestion'
                      : type === 'bug'
                      ? 'Submit Bug Report'
                      : 'Submit App Review'}
                  </span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
