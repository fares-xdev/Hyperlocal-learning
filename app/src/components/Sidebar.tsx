import React from 'react';
import { useLearning } from '../context/LearningContext';
import { CheckCircle2, Lock, Sparkles, ChevronLeft } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    sessions,
    currentSession,
    selectSession,
    completedSessions,
    unlockedSessions,
    lockNavigation,
    exitTargetPassed
  } = useLearning();

  const day1Sessions = sessions.filter(s => s.day === 1);
  const day2Sessions = sessions.filter(s => s.day === 2);

  const renderSessionItem = (s: any) => {
    const isCurrent = s.id === currentSession.id;
    const isMastered = completedSessions.includes(s.id);
    const isUnlocked = !lockNavigation || unlockedSessions.includes(s.id);

    return (
      <button
        key={s.id}
        onClick={() => isUnlocked && selectSession(s.id)}
        disabled={!isUnlocked}
        className={`w-full text-right p-3 rounded-lg border transition-all flex items-start justify-between group ${
          isCurrent
            ? 'bg-indigo-600/15 border-indigo-500/50 text-slate-100 shadow-sm'
            : isUnlocked
            ? 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
            : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5">
            {isMastered ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : isCurrent ? (
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse shrink-0" />
            ) : !isUnlocked ? (
              <Lock className="w-4 h-4 text-slate-600 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[9px] font-mono text-slate-400">
                {s.id}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-bold tracking-tight flex items-center gap-1.5">
              <span>الجلسة {s.id}</span>
              {exitTargetPassed[s.id] && (
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 rounded">
                  تم الاجتياز
                </span>
              )}
            </div>
            <p className={`text-[11px] line-clamp-1 mt-0.5 ${isCurrent ? 'text-indigo-200 font-medium' : 'text-slate-400'}`}>
              {s.title.replace(/^Session\s+\d+\s*[—\-]\s*/i, '')}
            </p>
          </div>
        </div>

        {isCurrent && <ChevronLeft className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />}
      </button>
    );
  };

  const day1Mastered = day1Sessions.filter(s => completedSessions.includes(s.id)).length;
  const day2Mastered = day2Sessions.filter(s => completedSessions.includes(s.id)).length;

  return (
    <aside className="w-72 border-l border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto p-4 shrink-0 font-sans" dir="rtl">
      {/* Day 1 Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-2 mb-2.5">
          <span className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400">
            اليوم الأول — الأساسيات
          </span>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
            {day1Mastered} من {day1Sessions.length} متقنة
          </span>
        </div>
        <div className="space-y-1.5">
          {day1Sessions.map(renderSessionItem)}
        </div>
      </div>

      {/* Day 2 Section */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2.5">
          <span className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400">
            اليوم الثاني — الأنظمة المعمارية
          </span>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
            {day2Mastered} من {day2Sessions.length} متقنة
          </span>
        </div>
        <div className="space-y-1.5">
          {day2Sessions.map(renderSessionItem)}
        </div>
      </div>
    </aside>
  );
};
