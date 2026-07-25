import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  LogOut,
  RotateCcw
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    logout,
    activeTab,
    setActiveTab,
    resetToDefaultData 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Joineazy Brand & Navigation */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/20 text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">
                JOINEAZY<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                {currentUser.role === 'admin' ? 'Professor Portal' : 'Student Portal'}
              </span>
            </div>
          </div>

          {/* Navigation Links (Dashboard & Directory only) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab('students'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'students'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Student Directory
            </button>
          </nav>
        </div>

        {/* Right Actions: Single User Profile Badge + Reset + Logout */}
        <div className="flex items-center gap-3">
          
          {/* Reset Demo State Button */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); resetToDefaultData(); }}
            title="Reset Portal state"
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Single User Profile Badge */}
          <div className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 bg-slate-100 rounded-full border border-slate-200/60">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800 leading-tight block">
                  {currentUser.name}
                </span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  currentUser.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {currentUser.role === 'admin' ? 'PROFESSOR' : 'STUDENT'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                {currentUser.email}
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); logout(); }}
            title="Sign Out"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-2xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline">Logout</span>
          </button>

        </div>
      </div>
    </header>
  );
};
