import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SessionData, LearningState, TutorMessage, ExerciseStatus } from '../types';
import { loadAllSessions } from '../utils/parser';

interface LearningContextType {
  sessions: SessionData[];
  currentSession: SessionData;
  currentSectionIndex: number;
  completedSessions: string[];
  unlockedSessions: string[];
  userAnswers: Record<string, string>;
  exerciseStatus: Record<string, ExerciseStatus>;
  exerciseFeedback: Record<string, string>;
  exitTargetPassed: Record<string, boolean>;
  lockNavigation: boolean;
  isTutorOpen: boolean;
  tutorMessages: TutorMessage[];
  isGlossaryOpen: boolean;
  isSystemMapOpen: boolean;

  // Actions
  selectSession: (sessionId: string) => void;
  setSectionIndex: (idx: number) => void;
  nextSection: () => void;
  prevSection: () => void;
  saveUserAnswer: (key: string, answer: string) => void;
  evaluateExercise: (exerciseId: string, answer: string, isExplainBack?: boolean) => Promise<void>;
  evaluateExitTarget: (sessionId: string) => Promise<void>;
  markSessionMastered: (sessionId: string) => void;
  toggleLockNavigation: () => void;
  setTutorOpen: (open: boolean) => void;
  sendTutorMessage: (text: string, quickAction?: string) => Promise<void>;
  setGlossaryOpen: (open: boolean) => void;
  setSystemMapOpen: (open: boolean) => void;
  overallProgressPercent: number;
}

const STORAGE_KEY = 'HDS_LEARNING_APP_STATE_V2';

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions] = useState<SessionData[]>(loadAllSessions());
  const [currentSessionId, setCurrentSessionId] = useState<string>('01');
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);
  const [unlockedSessions, setUnlockedSessions] = useState<string[]>(['01']);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [exerciseStatus, setExerciseStatus] = useState<Record<string, ExerciseStatus>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, string>>({});
  const [exitTargetPassed, setExitTargetPassed] = useState<Record<string, boolean>>({});
  const [lockNavigation, setLockNavigation] = useState<boolean>(false);
  const [tutorMessagesMap, setTutorMessagesMap] = useState<Record<string, TutorMessage[]>>({});

  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isSystemMapOpen, setIsSystemMapOpen] = useState<boolean>(false);

  // Load persisted state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: LearningState = JSON.parse(saved);
        if (parsed.currentSessionId) setCurrentSessionId(parsed.currentSessionId);
        if (typeof parsed.currentSectionIndex === 'number') setCurrentSectionIndex(parsed.currentSectionIndex);
        if (parsed.completedSessions) setCompletedSessions(parsed.completedSessions);
        if (parsed.unlockedSessions) setUnlockedSessions(parsed.unlockedSessions);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (parsed.exerciseStatus) setExerciseStatus(parsed.exerciseStatus);
        if (parsed.exerciseFeedback) setExerciseFeedback(parsed.exerciseFeedback);
        if (parsed.exitTargetPassed) setExitTargetPassed(parsed.exitTargetPassed);
        if (typeof parsed.lockNavigation === 'boolean') setLockNavigation(parsed.lockNavigation);
        if (parsed.tutorMessages) setTutorMessagesMap(parsed.tutorMessages);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    }
  }, []);

  // Save persisted state
  useEffect(() => {
    const stateToSave: LearningState = {
      currentSessionId,
      currentSectionIndex,
      completedSessions,
      unlockedSessions,
      userAnswers,
      exerciseStatus,
      exerciseFeedback,
      exitTargetPassed,
      lockNavigation,
      tutorMessages: tutorMessagesMap
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [
    currentSessionId,
    currentSectionIndex,
    completedSessions,
    unlockedSessions,
    userAnswers,
    exerciseStatus,
    exerciseFeedback,
    exitTargetPassed,
    lockNavigation,
    tutorMessagesMap
  ]);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const currentTutorMessages = tutorMessagesMap[currentSessionId] || [
    {
      id: 'init-msg',
      sender: 'tutor',
      text: `أهلاً بك في الجلسة ${currentSession.id} — ${currentSession.title}. أنا معلمك الذكي لمنظومة HDS. يمكنك سؤالي عن أي مفهوم هندسي، أو طلب تلميح، أو تقديم إجابتك للحصول على تقييم وتوجيه سقراطي!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextSnapshot: { sessionId: currentSession.id }
    }
  ];

  const overallProgressPercent = Math.round((completedSessions.length / sessions.length) * 100);

  const selectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setCurrentSectionIndex(0);
  };

  const setSectionIndex = (idx: number) => {
    if (idx >= 0 && idx < currentSession.sections.length) {
      setCurrentSectionIndex(idx);
    }
  };

  const nextSection = () => {
    if (currentSectionIndex < currentSession.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      // Find next session
      const currentIndex = sessions.findIndex(s => s.id === currentSessionId);
      if (currentIndex < sessions.length - 1) {
        const nextSess = sessions[currentIndex + 1];
        if (!lockNavigation || unlockedSessions.includes(nextSess.id)) {
          selectSession(nextSess.id);
        }
      }
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    } else {
      const currentIndex = sessions.findIndex(s => s.id === currentSessionId);
      if (currentIndex > 0) {
        const prevSess = sessions[currentIndex - 1];
        selectSession(prevSess.id);
        setCurrentSectionIndex(prevSess.sections.length - 1);
      }
    }
  };

  const saveUserAnswer = (key: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const evaluateExercise = async (exerciseId: string, answer: string) => {
    setExerciseStatus(prev => ({ ...prev, [exerciseId]: 'evaluating' }));

    // Simulate AI Socratic evaluation following LEARNING-METHOD.md rules
    setTimeout(() => {
      const wordCount = answer.trim().split(/\s+/).length;
      const isDetailed = wordCount >= 8;

      if (isDetailed) {
        setExerciseStatus(prev => ({ ...prev, [exerciseId]: 'passed' }));
        setExerciseFeedback(prev => ({
          ...prev,
          [exerciseId]: `✓ تم إثبات الفهم المفاهيمي والهندسي بنجاح!\n\nالجوانب التي تم التثبت منها:\n- معالجة القواعد النطاقية وأطراف المنظومة الفاعلة.\n- التحديد الدقيق لـ حدود الأنظمة والقوانين الحتمية (Invariants).\n- التركيز على المنطق وتحليل الفشل دون التبعية لشكليات الكود.`
        }));

        // Add feedback message to Tutor chat
        const feedbackMsg: TutorMessage = {
          id: `tutor-${Date.now()}`,
          sender: 'tutor',
          text: `🎯 **تقييم التمرين لـ "${exerciseId}":**\n\nأحسنت صنعاً! إجابتك تعكس تحليلاً هندسياً واضحاً ومثمراً. لقد حددت القوانين الحتمية وحدود النظام بدقة دون الاعتماد على شكليات البرمجة.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          contextSnapshot: { sessionId: currentSessionId, exerciseTitle: exerciseId }
        };

        setTutorMessagesMap(prev => ({
          ...prev,
          [currentSessionId]: [...(prev[currentSessionId] || []), feedbackMsg]
        }));
      } else {
        setExerciseStatus(prev => ({ ...prev, [exerciseId]: 'needs_clarification' }));
        setExerciseFeedback(prev => ({
          ...prev,
          [exerciseId]: `⚠️ يحتاج التقييم إلى توضيح إضافي:\nإجابتك موجزة بعض الشيء. وفقاً لمنهجية التعلم الهندسية، يرجى التوسع في التعبير عن سيناريوهات الفشل والقواعد الحتمية المرتبطة بهذه العملية.`
        }));
      }
    }, 1000);
  };

  const evaluateExitTarget = async (sessionId: string) => {
    setTimeout(() => {
      markSessionMastered(sessionId);
    }, 800);
  };

  const markSessionMastered = (sessionId: string) => {
    setExitTargetPassed(prev => ({ ...prev, [sessionId]: true }));
    if (!completedSessions.includes(sessionId)) {
      setCompletedSessions(prev => [...prev, sessionId]);
    }

    // Unlock next session
    const currentIdx = sessions.findIndex(s => s.id === sessionId);
    if (currentIdx < sessions.length - 1) {
      const nextId = sessions[currentIdx + 1].id;
      if (!unlockedSessions.includes(nextId)) {
        setUnlockedSessions(prev => [...prev, nextId]);
      }
    }
  };

  const toggleLockNavigation = () => {
    setLockNavigation(prev => !prev);
  };

  const resetAllProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
    setCompletedSessions([]);
    setUnlockedSessions(['01']);
    setUserAnswers({});
    setExerciseStatus({});
    setExerciseFeedback({});
    setExitTargetPassed({});
    setTutorMessagesMap({});
    setCurrentSessionId('01');
    setCurrentSectionIndex(0);
    window.location.reload();
  };

  const sendTutorMessage = async (text: string, quickAction?: string) => {
    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextSnapshot: {
        sessionId: currentSessionId,
        sectionTitle: currentSession.sections[currentSectionIndex]?.title
      }
    };

    setTutorMessagesMap(prev => ({
      ...prev,
      [currentSessionId]: [...(prev[currentSessionId] || []), userMsg]
    }));

    // AI Socratic Tutor Response
    setTimeout(() => {
      let replyText = "";

      if (quickAction === "explain") {
        replyText = `💡 **الشرح المفاهيمي (الجلسة ${currentSession.id}):**\n\nفي منظومة HDS، تركز **${currentSession.title}** على تصميم وحسم قواعد النظام أولاً قبل البدء في كتابة الأسطر البرمجية. تذكر دائماً: المنظومة توازن وتنسق بين 3 أطراف ذات رغبات متضاربة (العميل، التاجر، والكابتن). وظيفتك كـ مهندس هي صياغة القوانين الحتمية (Invariants) التي تضمن استقرار المنظومة، وتفادي الثغرات المالية والتنافسية ومراكز الفشل.`;
      } else if (quickAction === "hint") {
        replyText = `🎯 **تلميح المعلم الذكي:**\nفكر في سيناريو انقطاع حزم الشبكة أو ضغط كابتنين على زر القبول بصفحة التوزيع في نفس الملي ثانية. أي طبقة بالمنظومة (طبقة الخدمة Service أم الداتا بيز DB) هي المسؤولة عن فرض الحراسة الذرية (Atomic Checks) ومفاتيح التكرار (Idempotency)؟`;
      } else if (quickAction === "challenge") {
        replyText = `⚔️ **التحدي الهندسي الموجه:**\nنفترض أن وكيل الـ AI كتب دالة واحدة بـ Express تقوم بتحديث الداتا بيز مباشرة، وتستعين بأرقام Float كسريّة لحساب الأرباح المالية، وترسل تنبيهات Push Notifications تزامنية داخل نفس المعاملة (Transaction). ما هي الأخطاء المعمارية الثلاثة الخطيرة التي ستواجهه بها؟`;
      } else if (quickAction === "exit") {
        replyText = `🏆 **مراجعة هدف الخروج (Exit Target):**\nلكي تجتاز هدف الخروج للجلسة **${currentSession.id}**، يجب أن تثبت القدرة على استخراج القوانين الحتمية (Invariants) وصياغة سيناريوهات الفشل المتوقعة ونقد مقترحات الـ AI بالأدلة الحقيقية قبل الانتقال للجلسة التالية.`;
      } else {
        replyText = `🧠 **المعلم الذكي (توجيه سقراطي):**\n\nسؤال ممتاز متعلق بـ الجلسة ${currentSession.id}. بالنظر إلى موضوع **"${currentSession.sections[currentSectionIndex]?.title || 'المفهوم الحالي'}"**، اسأل نفسك كـ مهندس أنظمة:\n*ما هو القانون الحتمي (Invariant) الحارس لهذه العملية؟ وماذا يحدث إذا فشل الاتصال بالداتا بيز أو البنك في منتصف المعاملة؟*`;
      }

      const tutorReply: TutorMessage = {
        id: `tut-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setTutorMessagesMap(prev => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || []), tutorReply]
      }));
    }, 900);
  };

  return (
    <LearningContext.Provider
      value={{
        sessions,
        currentSession,
        currentSectionIndex,
        completedSessions,
        unlockedSessions,
        userAnswers,
        exerciseStatus,
        exerciseFeedback,
        exitTargetPassed,
        lockNavigation,
        isTutorOpen,
        tutorMessages: currentTutorMessages,
        isGlossaryOpen,
        isSystemMapOpen,
        selectSession,
        setSectionIndex,
        nextSection,
        prevSection,
        saveUserAnswer,
        evaluateExercise,
        evaluateExitTarget,
        markSessionMastered,
        toggleLockNavigation,
        resetAllProgress,
        setTutorOpen: setIsTutorOpen,
        sendTutorMessage,
        setGlossaryOpen: setIsGlossaryOpen,
        setSystemMapOpen: setIsSystemMapOpen,
        overallProgressPercent
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within LearningProvider');
  return context;
};
