import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 max-w-md">
        <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
        <p className="text-xs font-medium leading-normal pr-2">
          {message}
        </p>
      </div>
    </div>
  );
};
