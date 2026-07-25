import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Mail,
  Clock,
  Calendar,
  Link as LinkIcon,
  FileText,
  BookOpen,
  CheckCircle2,
  Star,
  MessageSquare
} from 'lucide-react';

const GRADE_OPTIONS = [
  { label: 'A+', value: 'A+' },
  { label: 'A', value: 'A' },
  { label: 'B+', value: 'B+' },
  { label: 'B', value: 'B' },
  { label: 'B-', value: 'B-' },
  { label: 'C+', value: 'C+' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'F', value: 'F' }
];

const SCORE_OPTIONS = [
  { label: '100 (Excellent)', value: '100' },
  { label: '95', value: '95' },
  { label: '90', value: '90' },
  { label: '85', value: '85' },
  { label: '80 (Good)', value: '80' },
  { label: '75', value: '75' },
  { label: '70', value: '70' },
  { label: '65 (Pass)', value: '65' },
  { label: '60', value: '60' },
  { label: '50 (Fail)', value: '50' },
  { label: '40', value: '40' },
  { label: '30', value: '30' },
  { label: '0 (No Submission)', value: '0' }
];

export const GradeSubmissionModal = ({ submission, student, assignment, isOpen, onClose }) => {
  const { gradeSubmission, showToast } = useApp();

  const [selectedGrade, setSelectedGrade] = useState(submission?.grade || '');
  const [gradingMode, setGradingMode] = useState('grade'); // 'grade' or 'score'
  const [isGraded, setIsGraded] = useState(!!submission?.grade);

  if (!isOpen || !submission || !student) return null;

  // Format the submitted date/time nicely
  const submittedDate = new Date(submission.submittedAt);
  const formattedDate = submittedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = submittedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleGradeSubmit = () => {
    if (!selectedGrade) return;
    gradeSubmission(submission.id, selectedGrade);
    setIsGraded(true);
    showToast(`Graded ${student.name}'s submission: ${selectedGrade}`, 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative transition-all">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block leading-tight">
                Grade Submission
              </span>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {assignment?.title || 'Assignment'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* --- Line-by-Line Submission Details --- */}

          {/* Line 1: Course Name */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Course</span>
            </div>
            <span className="text-xs font-bold text-slate-800">
              {assignment?.course || '—'}
            </span>
          </div>

          {/* Line 2: Student Name */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Student Name</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-6 h-6 rounded-full object-cover ring-2 ring-slate-100"
              />
              <span className="text-xs font-bold text-slate-800">{student.name}</span>
            </div>
          </div>

          {/* Line 3: Student Email */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Email</span>
            </div>
            <span className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded-lg">
              {student.email}
            </span>
          </div>

          {/* Line 4: Submitted Date */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Submitted Date</span>
            </div>
            <span className="text-xs font-bold text-slate-800">
              {formattedDate}
            </span>
          </div>

          {/* Line 5: Submitted Time */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Submitted Time</span>
            </div>
            <span className="text-xs font-bold text-slate-800 font-mono">
              {formattedTime}
            </span>
          </div>

          {/* Line 6: Drive Submission Link */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Drive Submission</span>
            </div>
            <a
              href={submission.driveSubmissionUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-all flex items-center gap-1"
            >
              <LinkIcon className="w-3 h-3" />
              Open File
            </a>
          </div>

          {/* Line 7: Notes */}
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-medium">Notes</span>
            </div>
            <span className="text-xs text-slate-700 text-right max-w-[280px] leading-relaxed">
              {submission.notes || '—'}
            </span>
          </div>

          {/* --- Grading Section --- */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <h3 className="text-sm font-bold text-slate-900">Assign Grade</h3>
              {isGraded && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Graded
                </span>
              )}
            </div>

            {/* Grading Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-xl mb-3 self-start w-fit">
              <button
                type="button"
                onClick={() => setGradingMode('grade')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  gradingMode === 'grade'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Letter Grade
              </button>
              <button
                type="button"
                onClick={() => setGradingMode('score')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  gradingMode === 'score'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Score (0-100)
              </button>
            </div>

            {/* Grade/Score Selector */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(gradingMode === 'grade' ? GRADE_OPTIONS : SCORE_OPTIONS).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedGrade(opt.value)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedGrade === opt.value
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Current/Previous Grade Display */}
            {submission.grade && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs flex items-center justify-between">
                <span className="text-indigo-700 font-medium">Previously assigned grade:</span>
                <span className="font-extrabold text-indigo-900 bg-white px-3 py-1 rounded-xl border border-indigo-200">
                  {submission.grade}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleGradeSubmit}
                disabled={!selectedGrade}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all shadow-md ${
                  selectedGrade
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed opacity-70'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isGraded ? 'Update Grade' : 'Submit Grade'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

