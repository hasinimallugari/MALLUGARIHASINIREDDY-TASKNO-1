import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { Toast } from './components/Toast';
import { GraduationCap, Trophy } from 'lucide-react';

const DashboardContent = () => {
  const { currentUser, isAuthenticated, activeTab, users, getStudentOverallProgress } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  const GRADE_ORDER = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
  const gradeRank = (grade) => {
    const index = GRADE_ORDER.indexOf(grade);
    return index === -1 ? GRADE_ORDER.length : index;
  };

  const studentList = users
    .filter(u => u.role === 'student')
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f3f4f8]">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {activeTab === 'dashboard' && (
            currentUser.role === 'admin' ? (
              <AdminDashboard onOpenCreateModal={() => setIsCreateModalOpen(true)} />
            ) : (
              <StudentDashboard />
            )
          )}

          {activeTab === 'students' && (
            <div className="kavira-card p-6 md:p-8 rounded-3xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Joineazy Roster
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    Student Performance Directory
                  </h2>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {studentList.length} Registered Students
                </span>
              </div>

              <div className="space-y-3">
                {studentList.map((student, index) => {
                  const progress = getStudentOverallProgress(student.id);
                  return (
                    <div
                      key={student.id}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                            index === 0
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : index === 1
                              ? 'bg-slate-200 text-slate-800'
                              : index === 2
                              ? 'bg-amber-800/10 text-amber-900'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          #{index + 1}
                        </div>
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 truncate">
                            {student.name}
                          </h3>
                          <p className="text-xs text-slate-400 truncate">{student.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:w-80 justify-between sm:justify-end">
                        <div className="flex-1 max-w-[160px]">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                            <span>Completion</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                progress < 50
                                  ? 'bg-rose-500'
                                  : progress < 85
                                  ? 'bg-amber-500'
                                  : 'bg-indigo-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="text-center shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
                            Grade
                          </span>
                          <span className="text-sm font-black text-slate-800 bg-white border border-slate-200 px-3 py-0.5 rounded-xl shadow-xs">
                            {student.grade}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                            student.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : student.status === 'At Risk'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {student.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <Toast />

      <footer className="border-t border-slate-200/80 bg-white/80 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-700">JOINEAZY Learning Portal • Task 1</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Student & Professor Portals</span>
            <span>•</span>
            <span className="text-indigo-600 font-semibold">Google Drive Submissions</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
