import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { MessageSquareQuote, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

export const ExplainBackCard: React.FC<{ promptText: string }> = ({ promptText }) => {
  const {
    currentSession,
    userAnswers,
    saveUserAnswer,
    evaluateExercise,
    exerciseStatus,
    exerciseFeedback
  } = useLearning();

  const key = `explain_back_${currentSession.id}`;
  const currentAnswer = userAnswers[key] || '';
  const status = exerciseStatus[key] || 'none';
  const feedback = exerciseFeedback[key] || '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!currentAnswer.trim()) return;
    setIsSubmitting(true);
    await evaluateExercise(key, currentAnswer, true);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8 p-6 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-950 shadow-xl relative overflow-hidden text-right font-sans" dir="rtl">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
          <MessageSquareQuote className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-100 tracking-wide">خطوة الشرح المفاهيمي (Explain Back)</h3>
        <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-bold mr-auto">
          قاعدة إجبارية — LEARNING-METHOD
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        المعلم الذكي يقيم الفهم المفاهيمي بأسلوبك الخالص. حفظ الكلمات المفتاحية غير كافٍ.
      </p>

      <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 text-xs text-indigo-200 font-medium leading-relaxed mb-4">
        {promptText || `اشرح بأسلوبك المفهوم الهندسي الأساسي المستفاد من الجلسة ${currentSession.id}.`}
      </div>

      <textarea
        value={currentAnswer}
        onChange={(e) => saveUserAnswer(key, e.target.value)}
        placeholder="اكتب شرحك المفاهيمي بأسلوبك الفعلي..."
        rows={4}
        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-y font-sans mb-3 text-right"
      />

      <div className="flex justify-start">
        <button
          onClick={handleSubmit}
          disabled={!currentAnswer.trim() || isSubmitting}
          className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all ${
            !currentAnswer.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
          }`}
        >
          {isSubmitting ? (
            <span>جاري تقييم الفهم...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>إرسال الشرح للتقييم</span>
            </>
          )}
        </button>
      </div>

      {status !== 'none' && feedback && (
        <div className={`mt-4 p-4 rounded-lg border text-xs leading-relaxed ${
          status === 'passed'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
        }`}>
          <div className="flex items-start gap-2.5">
            {status === 'passed' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="whitespace-pre-wrap">{feedback}</div>
          </div>
        </div>
      )}
    </div>
  );
};
