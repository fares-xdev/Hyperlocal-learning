import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import type { Exercise } from '../types';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const {
    userAnswers,
    saveUserAnswer,
    evaluateExercise,
    exerciseStatus,
    exerciseFeedback,
    sendTutorMessage,
    setTutorOpen
  } = useLearning();

  const answerKey = exercise.id;
  const currentAnswer = userAnswers[answerKey] || '';
  const status = exerciseStatus[answerKey] || 'none';
  const feedback = exerciseFeedback[answerKey] || '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!currentAnswer.trim()) return;
    setIsSubmitting(true);
    await evaluateExercise(exercise.id, currentAnswer, exercise.type === 'explain_back');
    setIsSubmitting(false);
  };

  const handleAskHint = () => {
    setTutorOpen(true);
    sendTutorMessage(`ممكن تلميح لتمرين: "${exercise.title}"؟`, "hint");
  };

  return (
    <div className="my-6 p-5 rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg text-right font-sans" dir="rtl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">
            {exercise.type === 'ai_audit' ? '⚔️ تمرين نقد ومراجعة الـ AI' : '✏️ تمرين عملي'}
          </span>
          <h4 className="text-sm font-semibold text-slate-200">{exercise.title}</h4>
        </div>

        {status === 'passed' && (
          <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل بنجاح
          </span>
        )}
      </div>

      <div className="text-xs text-slate-300 mb-4 whitespace-pre-wrap leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80">
        {exercise.prompt}
      </div>

      {/* Answer Input */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
          إجابتك (فكر كمهندس أنظمة وبدون كتابة كود):
        </label>
        <textarea
          value={currentAnswer}
          onChange={(e) => saveUserAnswer(answerKey, e.target.value)}
          placeholder="اكتب تحليلك والقواعد وحالات الفشل المفاهيمية المتوقعة..."
          rows={4}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors font-sans resize-y text-right"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={handleAskHint}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>اطلب تلميحاً من المعلم الذكي</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={!currentAnswer.trim() || isSubmitting}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all ${
            !currentAnswer.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
          }`}
        >
          {isSubmitting ? (
            <span>جاري التقييم...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>إرسال التقييم للمعلم الذكي</span>
            </>
          )}
        </button>
      </div>

      {/* Feedback Banner */}
      {status !== 'none' && feedback && (
        <div className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed ${
          status === 'passed'
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-start gap-2">
            {status === 'passed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="whitespace-pre-wrap">{feedback}</div>
          </div>
        </div>
      )}
    </div>
  );
};
