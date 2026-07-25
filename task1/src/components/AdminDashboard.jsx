import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeadlinesCard } from './DeadlinesCard';
import { GradeSubmissionModal } from './GradeSubmissionModal';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Trash2, 
  Sparkles,
  Star,
  Eye,
  X,
  TrendingUp,
  Archive
} from 'lucide-react';

export const AdminDashboard = ({ onOpenCreateModal }) => {
  const { 
    currentUser,
    assignments, 
    users, 
    submissions, 
    getAssignmentProgress, 
    deleteAssignment,
    getStudentStatus,
    getStudentOverallProgress,
    searchQuery 
  } = useApp();

  const students = users.filter(u => u.role === 'student');
  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);

  // Grading Modal State
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [gradingStudent, setGradingStudent] = useState(null);
  const [gradingAssignment, setGradingAssignment] = useState(null);

  // At-Risk Students Modal State
  const [showAtRiskModal, setShowAtRiskModal] = useState(false);

  // Past Due section collapsed by default
  const [pastDueExpanded, setPastDueExpanded] = useState(false);

  // Helper: check if assignment is past due
  const isPastDue = (assignment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(assignment.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  // Filter assignments into Active and Past Due (Inactive)
  const activeAssignments = assignments.filter(a => !isPastDue(a));
  const pastDueAssignments = assignments.filter(a => isPastDue(a));

  // Calculate Overall Metrics - based on ACTIVE assignments only
  const totalActiveAssignments = activeAssignments.length;
  const totalPossibleSubmissions = activeAssignments.reduce((acc, a) => acc + a.assignedStudentIds.length, 0);
  const totalActualSubmissions = submissions.filter(s => s.status === 'submitted').length;
  const overallSubmissionRate = totalPossibleSubmissions > 0 
    ? Math.round((totalActualSubmissions / totalPossibleSubmissions) * 100) 
    : 0;

  const atRiskCount = students.filter(s => s.status === 'At Risk').length;

  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Admin Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            JOINEAZY Faculty Portal • Real-time Class Monitoring
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name || 'Professor'}
          </h1>
          <p className="text-xs md:text-sm text-indigo-100/90 mt-1 max-w-xl">
            Manage Joineazy student assignments, track submission status bars, attach Google Drive resource links, and deliver direct student feedback.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onOpenCreateModal(); }}
            className="flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Create Assignment</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      {/* Two-Column Layout: Left (Metrics) + Right (Deadlines) */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left Column: Metric Cards stacked vertically with equal gaps */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="kavira-card p-5 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Active Assignments
              </span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {totalActiveAssignments}
              </span>
            </div>
          </div>

          <div className="kavira-card p-5 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Class Submission Rate
              </span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {overallSubmissionRate}%
              </span>
            </div>
          </div>

          <div className="kavira-card p-5 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Students
              </span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {students.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAtRiskModal(true)}
            className="kavira-card p-5 rounded-3xl flex items-center gap-4 text-left cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all active:scale-[0.98]"
          >
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Students At Risk
              </span>
              <span className="text-2xl font-extrabold text-rose-600 leading-tight">
                {atRiskCount}
              </span>
            </div>
            <TrendingUp className="w-4 h-4 text-rose-400 shrink-0 opacity-60" />
          </button>
        </div>

        {/* Right Column: Deadlines Card */}
        <div className="lg:w-2/3">
          <DeadlinesCard onOpenCreateModal={onOpenCreateModal} />
        </div>
      </div>

      {/* === ACTIVE ASSIGNMENTS SECTION === */}
      <div className="kavira-card p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Active Assignments
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                {activeAssignments.length} active
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Click an assignment to view per-student submission status (submitted / not submitted) and Drive links
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onOpenCreateModal(); }}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-2xl transition-all self-start"
          >
            <Plus className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
        </div>

        {/* Active Assignments Table */}
        <div className="space-y-3">
          {activeAssignments.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No active assignments. Create one to get started!
            </div>
          ) : (
            activeAssignments.map((assignment) => {
              const progress = getAssignmentProgress(assignment.id);
              const isExpanded = expandedAssignmentId === assignment.id;
              const assignedStudents = students.filter(s => assignment.assignedStudentIds.includes(s.id));

              return (
                <div
                  key={assignment.id}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-white"
                >
                  {/* Assignment Summary Bar */}
                  <div 
                    onClick={() => setExpandedAssignmentId(isExpanded ? null : assignment.id)}
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {assignment.course}
                        </span>
                        <span className="text-xs text-slate-400">
                          Due: {assignment.dueDate} at {assignment.dueTime}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mt-1 truncate flex items-center gap-2">
                        {assignment.title}
                        {assignment.driveUrl && (
                          <a
                            href={assignment.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-lg"
                          >
                            <span>Drive Material</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </h3>
                    </div>

                    {/* Submission Progress Gauge */}
                    <div className="w-full md:w-64 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Status Bar</span>
                          <span className="text-indigo-600">
                            {progress.submittedCount}/{progress.totalCount} ({progress.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress.percentage === 100
                                ? 'bg-emerald-500'
                                : progress.percentage > 50
                                ? 'bg-indigo-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedAssignmentId(isExpanded ? null : assignment.id);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-all"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Student Submission Detail Drawer - ROW-WISE LAYOUT */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Student Submissions Breakdown ({assignedStudents.length} assigned)
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAssignment(assignment.id);
                          }}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Assignment
                        </button>
                      </div>

                      {/* Row-wise (single column) layout - each student gets a full width row */}
                      <div className="space-y-3">
                        {assignedStudents.map((student) => {
                          const studentSub = submissions.find(
                            s => s.assignmentId === assignment.id && s.studentId === student.id && s.status === 'submitted'
                          );

                          return (
                            <div
                              key={student.id}
                              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                studentSub
                                  ? 'bg-white border-emerald-200/80 shadow-xs'
                                  : 'bg-white border-slate-200/60'
                              }`}
                            >
                              {/* Left: Student Info */}
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-10 h-10 rounded-full object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                  <span className="text-sm font-bold text-slate-800 block leading-tight truncate">
                                    {student.name}
                                  </span>
                                  <span className="text-xs text-slate-400 truncate block">
                                    {student.email}
                                  </span>
                                </div>
                              </div>

                              {/* Center: Status Badge + Submission Info */}
                              <div className="flex items-center gap-4 shrink-0">
                                <span className={`text-[11px] px-3 py-1 rounded-full font-bold uppercase ${
                                  studentSub
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-rose-100 text-rose-700'
                                }`}>
                                  {studentSub ? 'Submitted' : 'Not Submitted'}
                                </span>

                                {studentSub && (
                                  <span className="text-xs text-slate-500 hidden sm:inline">
                                    {new Date(studentSub.submittedAt).toLocaleDateString()} at{' '}
                                    {new Date(studentSub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}

                                {/* Display assigned grade if exists */}
                                {studentSub?.grade && (
                                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1">
                                    <Star className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-xs font-extrabold text-amber-900">
                                      {studentSub.grade}
                                    </span>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setGradingSubmission(studentSub);
                                    setGradingStudent(student);
                                    setGradingAssignment(assignment);
                                  }}
                                  className="flex items-center gap-1.5 text-center text-indigo-600 hover:text-white font-bold bg-indigo-50/80 hover:bg-indigo-600 px-3 py-1.5 rounded-xl transition-all border border-indigo-100 hover:border-indigo-600 text-xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{studentSub?.grade ? 'Update Grade' : 'Grade'}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* === PAST DUE (INACTIVE) ASSIGNMENTS SECTION === */}
      {pastDueAssignments.length > 0 && (
        <div className="kavira-card p-6 rounded-3xl border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-bold text-slate-600 tracking-tight">
                  Past Due (Inactive) Assignments
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">
                  {pastDueAssignments.length} inactive
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                Previously completed or expired assignments — expand to view submissions and grades
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPastDueExpanded(!pastDueExpanded)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              {pastDueExpanded ? (
                <>Hide <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Show All <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {pastDueExpanded && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {pastDueAssignments.map((assignment) => {
                const progress = getAssignmentProgress(assignment.id);
                const isExpanded = expandedAssignmentId === assignment.id;
                const assignedStudents = students.filter(s => assignment.assignedStudentIds.includes(s.id));

                return (
                  <div
                    key={assignment.id}
                    className="border border-slate-200/50 rounded-2xl overflow-hidden transition-all bg-slate-50/60 opacity-85"
                  >
                    {/* Assignment Summary Bar */}
                    <div 
                      onClick={() => setExpandedAssignmentId(isExpanded ? null : assignment.id)}
                      className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-500">
                            {assignment.course}
                          </span>
                          <span className="text-xs text-slate-400">
                            Due: {assignment.dueDate} at {assignment.dueTime}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-300/70 text-slate-600">
                            Inactive · Past Due
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-500 mt-1 truncate flex items-center gap-2">
                          {assignment.title}
                          {assignment.driveUrl && (
                            <a
                              href={assignment.driveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-lg"
                            >
                              <span>Drive Material</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </h3>
                      </div>

                      {/* Submission Progress Gauge */}
                      <div className="w-full md:w-64 flex items-center gap-3 opacity-70">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                            <span>Status Bar</span>
                            <span className="text-slate-500">
                              {progress.submittedCount}/{progress.totalCount} ({progress.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-slate-400 transition-all duration-500"
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedAssignmentId(isExpanded ? null : assignment.id);
                          }}
                          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/50 transition-all"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Student Submission Detail Drawer - ROW-WISE LAYOUT */}
                    {isExpanded && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Student Submissions Breakdown ({assignedStudents.length} assigned)
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAssignment(assignment.id);
                            }}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Assignment
                          </button>
                        </div>

                        {/* Row-wise (single column) layout - each student gets a full width row */}
                        <div className="space-y-3">
                          {assignedStudents.map((student) => {
                            const studentSub = submissions.find(
                              s => s.assignmentId === assignment.id && s.studentId === student.id && s.status === 'submitted'
                            );

                            return (
                              <div
                                key={student.id}
                                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                  studentSub
                                    ? 'bg-white border-emerald-200/80 shadow-xs'
                                    : 'bg-white border-slate-200/60'
                                }`}
                              >
                                {/* Left: Student Info */}
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <img
                                    src={student.avatar}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <span className="text-sm font-bold text-slate-800 block leading-tight truncate">
                                      {student.name}
                                    </span>
                                    <span className="text-xs text-slate-400 truncate block">
                                      {student.email}
                                    </span>
                                  </div>
                                </div>

                                {/* Center: Status Badge + Submission Info */}
                                <div className="flex items-center gap-4 shrink-0">
                                  <span className={`text-[11px] px-3 py-1 rounded-full font-bold uppercase ${
                                    studentSub
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-rose-100 text-rose-700'
                                  }`}>
                                    {studentSub ? 'Submitted' : 'Not Submitted'}
                                  </span>

                                  {studentSub && (
                                    <span className="text-xs text-slate-500 hidden sm:inline">
                                      {new Date(studentSub.submittedAt).toLocaleDateString()} at{' '}
                                      {new Date(studentSub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  )}

                                  {/* Display assigned grade if exists */}
                                  {studentSub?.grade && (
                                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1">
                                      <Star className="w-3.5 h-3.5 text-amber-500" />
                                      <span className="text-xs font-extrabold text-amber-900">
                                        {studentSub.grade}
                                      </span>
                                    </div>
                                  )}

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setGradingSubmission(studentSub);
                                      setGradingStudent(student);
                                      setGradingAssignment(assignment);
                                    }}
                                    className="flex items-center gap-1.5 text-center text-indigo-600 hover:text-white font-bold bg-indigo-50/80 hover:bg-indigo-600 px-3 py-1.5 rounded-xl transition-all border border-indigo-100 hover:border-indigo-600 text-xs"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{studentSub?.grade ? 'Update Grade' : 'Grade'}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {!pastDueExpanded && (
            <div className="text-center py-4 text-xs text-slate-400">
              Click "Show All" to view {pastDueAssignments.length} past due assignment(s)
            </div>
          )}
        </div>
      )}

    </div>

      {/* At-Risk Students Modal */}
      {showAtRiskModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAtRiskModal(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <h2 className="text-xl font-bold text-slate-900">Students At Risk</h2>
                </div>
                <p className="text-xs text-rose-500 mt-0.5">
                  {students.filter(s => getStudentStatus(s.id) === 'At Risk').length} student(s) with submission progress below 50%
                </p>
              </div>
              <button
                onClick={() => setShowAtRiskModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-y-auto flex-1 px-7 py-4">
              {students.filter(s => getStudentStatus(s.id) === 'At Risk').length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No students at risk</h3>
                  <p className="text-xs text-slate-400 mt-1">All students are maintaining good progress.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 pl-1">#</th>
                      <th className="pb-3">STUDENT</th>
                      <th className="pb-3 w-1/3">PROGRESS</th>
                      <th className="pb-3 text-center">GRADE</th>
                      <th className="pb-3 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {students.filter(s => getStudentStatus(s.id) === 'At Risk').map((student, index) => {
                      const liveProgress = getStudentOverallProgress(student.id);
                      return (
                        <tr key={student.id} className="group hover:bg-rose-50/50 transition-colors">
                          <td className="py-4 pl-1 font-bold text-slate-400">{index + 1}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-200"
                              />
                              <div>
                                <span className="font-bold text-slate-900 block leading-tight">{student.name}</span>
                                <span className="text-[11px] text-slate-400">{student.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-rose-500 transition-all duration-500"
                                  style={{ width: `${liveProgress}%` }}
                                />
                              </div>
                              <span className="font-bold text-rose-600 w-9">{liveProgress}%</span>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                              {student.grade}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100/80 text-rose-700">
                              At Risk
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2 text-xs text-slate-500">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              Students with overall submission progress below 50% are flagged as "At Risk".
            </div>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      <GradeSubmissionModal
        submission={gradingSubmission}
        student={gradingStudent}
        assignment={gradingAssignment}
        isOpen={!!gradingSubmission}
        onClose={() => {
          setGradingSubmission(null);
          setGradingStudent(null);
          setGradingAssignment(null);
        }}
      />
    </>
  );
};

