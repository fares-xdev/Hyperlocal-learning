import React from 'react';
import { useLearning } from '../context/LearningContext';
import { BookOpen, Bot, HelpCircle, Layers, Lock, Unlock, Trash2 } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentSession,
    completedSessions,
    sessions,
    overallProgressPercent,
    lockNavigation,
    toggleLockNavigation,
    resetAllProgress,
    setTutorOpen,
    isTutorOpen,
    setGlossaryOpen,
    setSystemMapOpen
  } = useLearning();

  const handleResetAll = () => {
    resetAllProgress();
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 font-sans" dir="rtl">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-slate-100 text-sm tracking-wide">هندسة البرمجيات لمنظومة HDS</h1>
            <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">
              اليوم {currentSession.day === 1 ? 'الأول' : 'الثاني'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            الجلسة {currentSession.id}: {currentSession.title.replace(/^Session\s+\d+\s*[—\-]\s*/i, '')}
          </p>
        </div>
      </div>

      {/* Progress Bar & Badges */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400">
            الإنجاز: <span className="font-mono text-indigo-400 font-bold">{completedSessions.length} من {sessions.length} جلسة متقنة</span>
          </div>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div
              className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono text-slate-400">{overallProgressPercent}%</span>
        </div>

        <button
          onClick={toggleLockNavigation}
          title={lockNavigation ? "وضع القفل مفعّل (يلزم اجتياز هدف الخروج للانتقال)" : "وضع التنقل الحر مفعّل"}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-colors ${
            lockNavigation
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          {lockNavigation ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          <span>{lockNavigation ? 'وضع القفل' : 'تنقل حر'}</span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleResetAll}
          title="تنظيف كافة الإنجازات ومحادثات الشات وإعادة البداية"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-700/60 rounded-lg transition-all shadow-sm"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          <span className="inline">تصفير وإعادة الضبط</span>
        </button>

        <button
          onClick={() => setGlossaryOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">قاموس المصطلحات</span>
        </button>

        <button
          onClick={() => setSystemMapOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">قطاعات HDS</span>
        </button>

        <button
          onClick={() => setTutorOpen(!isTutorOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            isTutorOpen
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
              : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border-indigo-500/40'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>المعلم الذكي</span>
        </button>
      </div>
    </header>
  );
};
