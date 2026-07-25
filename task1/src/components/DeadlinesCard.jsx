import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Clock, ExternalLink, Calendar, BookOpen, ChevronDown, X } from 'lucide-react';

export const DeadlinesCard = ({ onOpenCreateModal }) => {
  const { assignments, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);

  const DISPLAY_LIMIT = 3;
  const hasMore = assignments.length > DISPLAY_LIMIT;
  const displayedAssignments = assignments.slice(0, DISPLAY_LIMIT);

  return (
    <>
    <div className="kavira-card p-6 rounded-3xl h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Deadlines</h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">Upcoming tasks & Drive submissions</p>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={onOpenCreateModal}
            className="w-9 h-9 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            title="Create New Assignment"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Task List - limited to 3 items */}
      <div className="flex-1 space-y-3">
        {displayedAssignments.map((asg, idx) => {
          const colors = [
            { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', icon: Clock },
            { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', icon: BookOpen },
            { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: Calendar },
            { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', icon: Clock }
          ];

          const theme = colors[idx % colors.length];
          const Icon = theme.icon;

          return (
            <div
              key={asg.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-md transition-all flex items-start gap-3 group"
            >
              <div className={`p-2.5 rounded-2xl ${theme.bg} ${theme.text} ${theme.border} border`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {asg.title}
                  </h3>
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  {asg.course}
                </p>

                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {asg.dueDate}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {asg.dueTime}
                  </span>

                  {asg.driveUrl && (
                    <a
                      href={asg.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5"
                    >
                      Drive
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>{assignments.length} assignment{assignments.length !== 1 ? 's' : ''} active</span>

        <div className="flex items-center gap-2">
          {hasMore && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
            >
              View More <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onOpenCreateModal}
            className="text-indigo-600 font-bold hover:underline"
          >
            + Add New
          </button>
        </div>
      </div>
    </div>

      {/* View More Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-xl font-bold text-slate-900">All Deadlines</h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {assignments.length} assignment{assignments.length !== 1 ? 's' : ''} total
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-y-auto flex-1 px-7 py-4 space-y-3">
              {assignments.map((asg, idx) => {
                const colors = [
                  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', icon: Clock },
                  { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', icon: BookOpen },
                  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: Calendar },
                  { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', icon: Clock }
                ];

                const theme = colors[idx % colors.length];
                const Icon = theme.icon;

                return (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-md transition-all flex items-start gap-3 group"
                  >
                    <div className={`p-2.5 rounded-2xl ${theme.bg} ${theme.text} ${theme.border} border`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {asg.title}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                        {asg.course}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {asg.dueDate}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {asg.dueTime}
                        </span>
                        {asg.driveUrl && (
                          <a
                            href={asg.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-auto text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5"
                          >
                            Drive
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
              <span>Total assignments: {assignments.length}</span>
              <button
                onClick={onOpenCreateModal}
                className="text-indigo-600 font-bold hover:underline"
              >
                + Add New
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
