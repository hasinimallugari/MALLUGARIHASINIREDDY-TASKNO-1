import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubmissionModal } from './SubmissionModal';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  FileCheck, 
  UploadCloud,
  AlertCircle
} from 'lucide-react';

export const StudentDashboard = () => {
  const { 
    currentUser, 
    assignments, 
    submissions, 
    getStudentOverallProgress,
    searchQuery 
  } = useApp();

  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'submitted'
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState(null);

  // Student ONLY sees assignments assigned to them!
  const myAssignedTasks = assignments.filter(a => 
    a.assignedStudentIds.includes(currentUser.id)
  );

  const filteredTasks = myAssignedTasks.filter(a => {
    const isSubmitted = submissions.some(
      s => s.assignmentId === a.id && s.studentId === currentUser.id && s.status === 'submitted'
    );

    if (filter === 'pending') return !isSubmitted;
    if (filter === 'submitted') return isSubmitted;
    return true;
  });

  const overallProgress = getStudentOverallProgress(currentUser.id);
  const submittedCount = myAssignedTasks.filter(a => 
    submissions.some(s => s.assignmentId === a.id && s.studentId === currentUser.id && s.status === 'submitted')
  ).length;
  const pendingCount = myAssignedTasks.length - submittedCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            JOINEAZY Student Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
            Welcome back, {currentUser.name}
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              {currentUser.grade || 'A'} Grade
            </span>
          </h1>
          
          {/* Simple replaced subtitle line as requested */}
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-lg">
            Track and submit your assigned tasks.
          </p>
        </div>

        {/* Progress Circular Widget */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 shrink-0 relative z-10">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-white/10"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-indigo-400"
                fill="transparent"
                strokeDasharray={163}
                strokeDashoffset={163 - (163 * overallProgress) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-white">
              {overallProgress}%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Assignment Progress
            </span>
            <span className="text-sm font-bold text-white block mt-0.5">
              {submittedCount} of {myAssignedTasks.length} Completed
            </span>
            <span className="text-[11px] text-indigo-200">
              {pendingCount} task{pendingCount !== 1 ? 's' : ''} remaining
            </span>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
      </div>

      {/* Filter Tabs & Role Protection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs self-start">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setFilter('all'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Tasks ({myAssignedTasks.length})
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setFilter('pending'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setFilter('submitted'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'submitted'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Submitted ({submittedCount})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5 text-indigo-500" />
          <span>Student View: Showing tasks for <strong>{currentUser.name}</strong></span>
        </div>
      </div>

      {/* Assignment Grid / Cards */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="kavira-card p-12 text-center rounded-3xl">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No assignments found</h3>
            <p className="text-xs text-slate-400 mt-1">
              {filter === 'pending' ? "You're all caught up on your submissions!" : 'No matching tasks found.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((assignment) => {
            const submissionRecord = submissions.find(
              s => s.assignmentId === assignment.id && s.studentId === currentUser.id && s.status === 'submitted'
            );

            const isSubmitted = !!submissionRecord;

            return (
              <div
                key={assignment.id}
                className={`kavira-card p-6 rounded-3xl transition-all border ${
                  isSubmitted
                    ? 'border-emerald-200/80 bg-white/95'
                    : 'border-slate-200/80 bg-white'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Course info & Title */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {assignment.course}
                      </span>

                      <span className={`text-[11px] px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1.5 ${
                        isSubmitted
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isSubmitted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Submitted
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            Pending Submission
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {assignment.title}
                    </h3>

                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {assignment.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Due: <strong>{assignment.dueDate} at {assignment.dueTime}</strong>
                      </span>

                      {assignment.driveUrl && (
                        <a
                          href={assignment.driveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 hover:underline"
                        >
                          Teacher Drive Folder
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Submission Action / Status */}
                  <div className="lg:w-72 shrink-0 bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3">
                    {isSubmitted ? (
                      <div className="space-y-2">
                        <div className="text-xs text-slate-500">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Submitted On
                          </span>
                          <span className="font-semibold text-slate-800">
                            {new Date(submissionRecord.submittedAt).toLocaleDateString()} at {new Date(submissionRecord.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <a
                          href={submissionRecord.driveSubmissionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-center block bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs p-2.5 rounded-xl transition-all"
                        >
                          View Your Drive File
                        </a>

                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setSelectedAssignmentForSubmission(assignment); }}
                          className="w-full text-center text-[11px] font-bold text-indigo-600 hover:underline"
                        >
                          Update Submission Link
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-100 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-[11px]">
                            Double-verification required upon submission.
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setSelectedAssignmentForSubmission(assignment); }}
                          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-102 active:scale-95"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Submit Assignment</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Double Verification Submission Modal */}
      <SubmissionModal
        assignment={selectedAssignmentForSubmission}
        isOpen={!!selectedAssignmentForSubmission}
        onClose={() => setSelectedAssignmentForSubmission(null)}
      />

    </div>
  );
};
