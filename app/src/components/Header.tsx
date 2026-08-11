import React from 'react';
import { useLearning } from '../context/LearningContext';
import { BookOpen, Bot, HelpCircle, Layers, Lock, Unlock, Trash2, Menu, X } from 'lucide-react';

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
    isSidebarOpen,
    setSidebarOpen,
    setGlossaryOpen,
    setSystemMapOpen
  } = useLearning();

  const handleResetAll = () => {
    resetAllProgress();
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans" dir="rtl">
      {/* Branding & Mobile Sidebar Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          title={isSidebarOpen ? "إغلاق القائمة" : "قائمة الجلسات"}
        >
          {isSidebarOpen ? <X className="w-4 h-4 text-indigo-400" /> : <Menu className="w-4 h-4 text-indigo-400" />}
        </button>

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold shrink-0">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="max-w-[140px] xs:max-w-[200px] sm:max-w-none truncate">
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-slate-100 text-xs sm:text-sm tracking-wide truncate">كورس هندسة HDS</h1>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold shrink-0">
              اليوم {currentSession.day === 1 ? 'الأول' : 'الثاني'}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 font-sans truncate">
            الجلسة {currentSession.id}: {currentSession.title.replace(/^Session\s+\d+\s*[—\-]\s*/i, '')}
          </p>
        </div>
      </div>

      {/* Progress Bar & Badges (Desktop) */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400">
            الإنجاز: <span className="font-mono text-indigo-400 font-bold">{completedSessions.length} من {sessions.length} جلسة متقنة</span>
          </div>
          <div className="w-28 xl:w-36 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
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
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={handleResetAll}
          title="تنظيف كافة الإنجازات وإعادة البداية"
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-700/60 rounded-lg transition-all shadow-sm"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="hidden sm:inline">تصفير</span>
        </button>

        <button
          onClick={() => setGlossaryOpen(true)}
          title="قاموس المصطلحات"
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="hidden md:inline">القاموس</span>
        </button>

        <button
          onClick={() => setSystemMapOpen(true)}
          title="خريطة القطاعات المعمارية"
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
        >
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="hidden md:inline">القطاعات</span>
        </button>

        <button
          onClick={() => setTutorOpen(!isTutorOpen)}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            isTutorOpen
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
              : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border-indigo-500/40'
          }`}
        >
          <Bot className="w-4 h-4 shrink-0" />
          <span className="hidden xs:inline">المعلم الذكي</span>
        </button>
      </div>
    </header>
  );
};
