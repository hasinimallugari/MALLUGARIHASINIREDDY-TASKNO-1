import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Link as LinkIcon, 
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const SubmissionModal = ({ assignment, isOpen, onClose }) => {
  const { submitAssignment, currentUser } = useApp();
  
  const [step, setStep] = useState(1); // 1 = Input & Review, 2 = Double Verification Final Confirmation
  const [driveUrl, setDriveUrl] = useState(`https://drive.google.com/file/d/${currentUser.id}_${assignment?.id || 'doc'}`);
  const [notes, setNotes] = useState('');
  const [isVerifiedCheck, setIsVerifiedCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !assignment) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!driveUrl.trim()) return;
    if (!isVerifiedCheck) return;
    setStep(2);
  };

  const handleFinalConfirm = () => {
    setIsSubmitting(true);

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }

    setTimeout(() => {
      submitAssignment({
        assignmentId: assignment.id,
        studentId: currentUser.id,
        driveSubmissionUrl: driveUrl,
        notes: notes
      });
      setIsSubmitting(false);
      setStep(1);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative transition-all">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              step === 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-800'
            }`}>
              Step {step} of 2 • {step === 1 ? 'Submission Link' : 'Double Verification'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Input & Checkbox */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="p-6 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                {assignment.course}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {assignment.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {assignment.description}
              </p>
            </div>

            {/* Teacher's Reference Drive Link */}
            {assignment.driveUrl && (
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-indigo-950 font-medium">
                  <LinkIcon className="w-4 h-4 text-indigo-600" />
                  <span>Teacher Assignment Drive Folder</span>
                </div>
                <a
                  href={assignment.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  Open Drive
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Student Drive Submission Link Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Google Drive Submission Link <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  required
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your_file_id"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Make sure the Google Drive link permission is set to "Anyone with the link can view".
              </p>
            </div>

            {/* Submission Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Optional Notes for Professor
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any comments or specifics about your submission..."
                rows={2}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Double Verification Checkbox Requirement */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVerifiedCheck}
                  onChange={(e) => setIsVerifiedCheck(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600 leading-tight">
                  <strong className="font-semibold text-slate-900 block">Verification Declaration:</strong>
                  I confirm that I have uploaded my completed assignment to the provided Google Drive link and verified file access permissions.
                </span>
              </label>
            </div>

            {/* Submit Button to Step 2 */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isVerifiedCheck || !driveUrl.trim()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all shadow-md ${
                  isVerifiedCheck && driveUrl.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed opacity-70'
                }`}
              >
                <span>Proceed to Final Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Double Verification Final Screen */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 ring-8 ring-amber-50">
                <AlertTriangle className="w-7 h-7 animate-bounce" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Final Double-Verification
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Please double check your submission before marking it as finalized.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Assignment:</span>
                <span className="font-bold text-slate-800">{assignment.title}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">Student:</span>
                <span className="font-bold text-slate-800">{currentUser.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 font-medium">Drive Submission URL:</span>
                <span className="font-mono text-[11px] bg-white p-2 rounded-xl border border-slate-200 text-indigo-700 truncate">
                  {driveUrl}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Double-verification confirmation log will record your submission timestamp.</span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back & Edit</span>
              </button>

              <button
                type="button"
                onClick={handleFinalConfirm}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Yes, I have submitted!</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
