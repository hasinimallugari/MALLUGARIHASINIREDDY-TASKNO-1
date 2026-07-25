import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, ArrowRight, TrendingUp, X, MessageSquare } from 'lucide-react';

const AllStudentsModal = ({ onClose, students, getStudentOverallProgress, onOpenFeedback }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">All Students</h2>
            <p className="text-xs text-slate-400 mt-0.5">{students.length} students enrolled</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto flex-1 px-7 py-4">
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
              {students.map((student, index) => {
                const liveProgress = getStudentOverallProgress(student.id);
                return (
                  <tr key={student.id} className="group hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 pl-1 font-bold text-slate-400">{index + 1}</td>

                    {/* Student Info */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block leading-tight">{student.name}</span>
                          <span className="text-[11px] text-slate-400">{student.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              liveProgress < 50
                                ? 'bg-rose-500'
                                : liveProgress < 85
                                ? 'bg-amber-500'
                                : 'bg-indigo-600'
                            }`}
                            style={{ width: `${liveProgress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 w-9">{liveProgress}%</span>
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="py-4 text-center">
                      <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                        {student.grade}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        student.status === 'Active'
                          ? 'bg-emerald-100/80 text-emerald-700'
                          : student.status === 'At Risk'
                          ? 'bg-rose-100/80 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2 text-xs text-slate-500">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          Click the message icon next to any student to open Intervention & Feedback for them.
        </div>
      </div>
    </div>
  );
};

const GRADE_ORDER = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

const gradeRank = (grade) => {
  const index = GRADE_ORDER.indexOf(grade);
  return index === -1 ? GRADE_ORDER.length : index;
};

export const StudentProgressCard = () => {
  const { users, getStudentOverallProgress } = useApp();
  const [showAll, setShowAll] = useState(false);
  const students = users
    .filter(u => u.role === 'student')
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade));
  const atRiskCount = students.filter(s => s.status === 'At Risk').length;

  return (
    <>
      <div className="kavira-card p-6 rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Progress</h2>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Monitoring individual performance</p>
          </div>

          <div className="flex items-center gap-3">
            {atRiskCount > 0 && (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{atRiskCount} AT RISK</span>
              </div>
            )}

            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/80 px-3.5 py-1.5 rounded-full transition-all"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Student Progress Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">STUDENT</th>
                <th className="pb-3 w-2/5">PROGRESS</th>
                <th className="pb-3 text-center">GRADE</th>
                <th className="pb-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {students.map((student) => {
                const liveProgress = getStudentOverallProgress(student.id);

                return (
                  <tr key={student.id} className="group hover:bg-slate-50/70 transition-colors">
                    {/* Student Info */}
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block leading-tight">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              liveProgress < 50
                                ? 'bg-rose-500'
                                : liveProgress < 85
                                ? 'bg-amber-500'
                                : 'bg-indigo-600'
                            }`}
                            style={{ width: `${liveProgress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-xs w-9">
                          {liveProgress}%
                        </span>
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="py-3.5 text-center">
                      <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                        {student.grade}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        student.status === 'Active'
                          ? 'bg-emerald-100/80 text-emerald-700'
                          : student.status === 'At Risk'
                          ? 'bg-rose-100/80 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAll && (
        <AllStudentsModal
          onClose={() => setShowAll(false)}
          students={students}
          getStudentOverallProgress={getStudentOverallProgress}
        />
      )}
    </>
  );
};
