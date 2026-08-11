import React, { useState, useRef, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { Bot, X, Send, Sparkles, HelpCircle, Swords, Award, Terminal } from 'lucide-react';
import { marked } from 'marked';

export const AITutorPanel: React.FC = () => {
  const {
    currentSession,
    currentSectionIndex,
    isTutorOpen,
    setTutorOpen,
    tutorMessages,
    sendTutorMessage
  } = useLearning();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorMessages]);

  if (!isTutorOpen) return null;

  const handleSend = async (quickAction?: string) => {
    const textToSend = input.trim() || (quickAction ? `[${quickAction.toUpperCase()}]` : '');
    if (!textToSend && !quickAction) return;

    setInput('');
    await sendTutorMessage(textToSend, quickAction);
  };

  const renderMessageContent = (text: string) => {
    try {
      const html = marked.parse(text) as string;
      return { __html: html };
    } catch {
      return { __html: text };
    }
  };

  return (
    <aside className="w-96 border-r border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-4rem)] fixed left-0 top-16 z-40 shadow-2xl animate-in slide-in-from-left duration-200 font-sans text-right" dir="rtl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 tracking-wide">المعلم الذكي لـ HDS</h3>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              ● نشط • يطبق منهجية LEARNING-METHOD
            </span>
          </div>
        </div>

        <button
          onClick={() => setTutorOpen(false)}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Context Snapshot Banner */}
      <div className="bg-indigo-950/30 border-b border-indigo-500/20 p-2.5 px-4 flex items-center gap-2 text-[11px] font-mono text-indigo-300">
        <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span className="truncate">
          السياق: الجلسة {currentSession.id} • {currentSession.sections[currentSectionIndex]?.title || 'العام'}
        </span>
      </div>

      {/* Preset Quick Actions */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/40 grid grid-cols-2 gap-1.5">
        <button
          onClick={() => handleSend('explain')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded text-[11px] text-slate-300 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>الشرح المفاهيمي</span>
        </button>

        <button
          onClick={() => handleSend('hint')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded text-[11px] text-slate-300 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>طلب تلميح</span>
        </button>

        <button
          onClick={() => handleSend('challenge')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded text-[11px] text-slate-300 transition-colors"
        >
          <Swords className="w-3.5 h-3.5 text-rose-400" />
          <span>تحدي مهندسي</span>
        </button>

        <button
          onClick={() => handleSend('exit')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded text-[11px] text-slate-300 transition-colors"
        >
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>هدف الخروج</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {tutorMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
          >
            <div className={`max-w-[88%] rounded-xl p-3.5 text-xs ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-bl-none shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-br-none markdown-body text-right'
            }`}>
              {msg.sender === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div dangerouslySetInnerHTML={renderMessageContent(msg.text)} />
              )}
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل المعلم الذكي عن هذا المفهوم..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans text-right"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
};
