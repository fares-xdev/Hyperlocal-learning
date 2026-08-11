import React from 'react';
import { LearningProvider } from './context/LearningContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { AITutorPanel } from './components/AITutorPanel';
import { GlossaryModal } from './components/GlossaryModal';
import { SystemMapModal } from './components/SystemMapModal';
import { ErrorBoundary } from './components/ErrorBoundary';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <LessonViewer />
        <AITutorPanel />
      </div>
      <GlossaryModal />
      <SystemMapModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <LearningProvider>
        <MainLayout />
      </LearningProvider>
    </ErrorBoundary>
  );
}
