import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Target, Lock, CheckCircle2, Award, ArrowLeft } from 'lucide-react';

export const ExitTargetCard: React.FC = () => {
  const {
    currentSession,
    exitTargetPassed,
    evaluateExitTarget,
    markSessionMastered,
    nextSection,
    sessions
  } = useLearning();

  const isPassed = !!exitTargetPassed[currentSession.id];
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    await evaluateExitTarget(currentSession.id);
    setIsEvaluating(false);
  };

  const isLastSession = currentSession.number === sessions.length;

  return (
    <div className={`my-10 p-6 rounded-xl border transition-all text-right font-sans ${
      isPassed
        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
        : 'bg-slate-900/80 border-slate-800 text-slate-300'
    }`} dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-amber-400 border border-slate-700'
          }`}>
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">هدف الخروج من الجلسة (Exit Target)</h3>
            <p className="text-[11px] text-slate-400">يجب استيفاؤه قبل الانتقال للجلسة التالية</p>
          </div>
        </div>

        <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
          isPassed
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
        }`}>
          {isPassed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> تم الاجتياز والإتقان
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-400" /> لم يجتاز بعد
            </>
          )}
        </span>
      </div>

      <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 text-xs leading-relaxed text-slate-200 mb-5">
        {currentSession.exitTargetText}
      </div>

      <div className="flex items-center justify-between">
        {!isPassed ? (
          <div className="flex items-center gap-3 w-full justify-between">
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-indigo-600/20"
            >
              {isEvaluating ? (
                <span>جاري التحقق من المعايير...</span>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>التحقق واجتياز هدف الخروج</span>
                </>
              )}
            </button>

            <button
              onClick={() => markSessionMastered(currentSession.id)}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              تجاوز يدوي (تحديد كمكتمل)
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> تم استيفاء هدف الخروج للجلسة {currentSession.id}
            </span>

            {!isLastSession && (
              <button
                onClick={nextSection}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-600/20"
              >
                <span>الانتقال للجلسة {currentSession.number + 1}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
