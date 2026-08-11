export type DayGroup = 1 | 2;

export interface Exercise {
  id: string;
  title: string;
  type: 'practical' | 'ai_audit' | 'explain_back';
  prompt: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface SessionData {
  id: string; // "01", "02", ...
  number: number;
  title: string;
  day: DayGroup;
  rawContent: string;
  objective: string;
  topics: string[];
  mentalModel?: string;
  sections: Section[];
  exercises: Exercise[];
  explainBackPrompt?: string;
  exitTargetText: string;
}

export type ExerciseStatus = 'none' | 'evaluating' | 'passed' | 'needs_clarification';

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor' | 'system';
  text: string;
  timestamp: string;
  contextSnapshot?: {
    sessionId: string;
    sectionTitle?: string;
    exerciseTitle?: string;
  };
}

export interface LearningState {
  currentSessionId: string;
  currentSectionIndex: number;
  completedSessions: string[];
  unlockedSessions: string[];
  userAnswers: Record<string, string>;
  exerciseStatus: Record<string, ExerciseStatus>;
  exerciseFeedback: Record<string, string>;
  exitTargetPassed: Record<string, boolean>;
  lockNavigation: boolean;
  tutorMessages: Record<string, TutorMessage[]>; // per sessionId
}
