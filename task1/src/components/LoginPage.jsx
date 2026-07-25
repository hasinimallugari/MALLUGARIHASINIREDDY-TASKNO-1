import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, UserCheck, Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();

  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('alex.j@joineazy.edu');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setErrorMessage('');
    if (selectedRole === 'admin') {
      setEmail('faculty@joineazy.edu');
      setPassword('password123');
    } else {
      setEmail('alex.j@joineazy.edu');
      setPassword('password123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const success = login(email, password, role);

    if (!success) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/20 text-white mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              JOINEAZY<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Select your login portal to proceed
            </p>
          </div>
        </div>

        {/* Separate Starting Portals: Student vs Professor */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              role === 'student'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-extrabold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
            }`}
          >
            <GraduationCap className={`w-5 h-5 mx-auto mb-1 ${role === 'student' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="text-xs block">Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              role === 'admin'
                ? 'bg-purple-50 border-purple-500 text-purple-900 font-extrabold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
            }`}
          >
            <Shield className={`w-5 h-5 mx-auto mb-1 ${role === 'admin' ? 'text-purple-600' : 'text-slate-400'}`} />
            <span className="text-xs block">Professor Portal</span>
          </button>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {role === 'student' ? 'Student Email' : 'Professor Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? 'student@joineazy.edu' : 'professor@joineazy.edu'}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mt-2 ${
              role === 'admin'
                ? 'bg-purple-700 hover:bg-purple-800 shadow-purple-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
            }`}
          >
            <span>Sign In to {role === 'student' ? 'Student Workspace' : 'Professor Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
