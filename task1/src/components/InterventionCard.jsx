import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Zap, Send, PlusCircle, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export const InterventionCard = ({ selectedStudent }) => {
  const { users, showToast } = useApp();
  const [feedbackText, setFeedbackText] = useState('');
  const [tag, setTag] = useState('Encouraging');
  const [remedialAssigned, setRemedialAssigned] = useState(false);
  const textareaRef = useRef(null);

  const targetStudent = selectedStudent || users.find(u => u.status === 'At Risk') || users[2];

  // When selected student changes, clear previous feedback but keep textarea focusable
  useEffect(() => {
    setFeedbackText('');
    setRemedialAssigned(false);
  }, [targetStudent?.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    showToast(`Feedback sent to ${targetStudent.name} (${tag})`, 'success');
    setFeedbackText('');
  };

  const handleAssignRemedial = () => {
    setRemedialAssigned(true);
    showToast(`Remedial assignment created and assigned to ${targetStudent.name}.`, 'success');
    setTimeout(() => setRemedialAssigned(false), 5000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Intervention & Feedback</h2>
        {selectedStudent && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 ml-1">
            {selectedStudent.name}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Send Feedback Card */}
        <div className="kavira-card p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Send Feedback</h3>
              <p className="text-xs text-slate-400">Direct message to {targetStudent.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              ref={textareaRef}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={`Write your feedback for ${targetStudent.name} here...`}
              rows={4}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200/80 focus:bg-white focus:border-indigo-400 focus:outline-none text-xs text-slate-800 placeholder:text-slate-400 transition-all resize-none"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTag('Encouraging')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    tag === 'Encouraging'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Encouraging
                </button>
                <button
                  type="button"
                  onClick={() => setTag('Constructive')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    tag === 'Constructive'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Constructive
                </button>
              </div>

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!feedbackText.trim()}
                className={`flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md transition-all active:scale-95 ${
                  feedbackText.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Take Action Card */}
        <div className="kavira-card p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Take Action</h3>
              <p className="text-xs text-slate-400">Intervention strategies for at-risk students</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Assign Remedial Task */}
            <button
              type="button"
              onClick={handleAssignRemedial}
              className="w-full p-4 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/80 transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white text-indigo-600 shadow-xs border border-indigo-100">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Assign Remedial Task
                  </h4>
                  <p className="text-[11px] text-slate-400">Custom practice for weak areas</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </button>

            {/* Schedule 1-on-1 */}
            <button
              type="button"
              onClick={() => showToast(`Scheduled 1-on-1 session with ${targetStudent.name}`, 'info')}
              className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all flex items-center gap-3 text-left"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Schedule 1-on-1</h4>
                <p className="text-[11px] text-slate-400">Book a private tutoring session</p>
              </div>
            </button>
          </div>

          {/* AI Suggestion Box */}
          <div className="mt-4 p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-200 mb-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              AI SUGGESTION
            </div>
            <p className="text-xs font-medium leading-relaxed">
              <strong className="font-bold">{targetStudent.name}</strong> is struggling with "Quadratic Equations". Assigning the "Algebra Basics" review module might help.
            </p>
          </div>

          {remedialAssigned && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Remedial assignment created and assigned to {targetStudent.name}.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
