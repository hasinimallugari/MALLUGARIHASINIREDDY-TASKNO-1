import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Link as LinkIcon, Calendar, Clock, BookOpen, Users, Check } from 'lucide-react';

export const CreateAssignmentModal = ({ isOpen, onClose }) => {
  const { createAssignment, users } = useApp();
  const students = users.filter(u => u.role === 'student');

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('COMPUTER SCIENCE 101');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-08-05');
  const [dueTime, setDueTime] = useState('11:59 PM');
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/drive/folders/new_assignment_materials');
  const [selectedStudentIds, setSelectedStudentIds] = useState(students.map(s => s.id));

  if (!isOpen) return null;

  const toggleStudent = (id) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(prev => prev.filter(sId => sId !== id));
    } else {
      setSelectedStudentIds(prev => [...prev, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(students.map(s => s.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || selectedStudentIds.length === 0) return;

    createAssignment({
      title,
      course,
      description,
      dueDate,
      dueTime,
      driveUrl,
      assignedStudentIds: selectedStudentIds
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Admin Action
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Create New Assignment
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Assignment Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Assignment Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midterm Project: React & Tailwind Integration"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Course / Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. COMPUTER SCIENCE 101"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>

          {/* Due Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Due Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  placeholder="11:59 PM"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Google Drive Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Google Drive Resource / Submission Folder Link
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Instructions / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail assignment expectations, guidelines, and submission requirements..."
              rows={3}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Assign Students Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Assign to Students ({selectedStudentIds.length}/{students.length})
              </label>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                {selectedStudentIds.length === students.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
              {students.map(s => {
                const isSelected = selectedStudentIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleStudent(s.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-100/70 border border-indigo-200 text-indigo-900 font-semibold'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-white transition-all ${
                      isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <img src={s.avatar} alt={s.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="truncate">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || selectedStudentIds.length === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all shadow-md ${
                title.trim() && selectedStudentIds.length > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 active:scale-95'
                  : 'bg-slate-300 cursor-not-allowed opacity-70'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Assignment</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
