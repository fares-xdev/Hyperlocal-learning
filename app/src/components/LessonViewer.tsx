import React, { useState, useRef, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { ExerciseCard } from './ExerciseCard';
import { ExplainBackCard } from './ExplainBackCard';
import { ExitTargetCard } from './ExitTargetCard';
import { marked } from 'marked';
import { ChevronRight, ChevronLeft, CheckCircle2, FileText, Layers, ListFilter, ArrowRight, ArrowLeft, Grid, LayoutList, ChevronDown } from 'lucide-react';

export const LessonViewer: React.FC = () => {
  const {
    currentSession,
    currentSectionIndex,
    setSectionIndex,
    nextSection,
    prevSection,
    sessions,
    exitTargetPassed
  } = useLearning();

  // View mode: 'tabs' (Section-by-section) or 'full' (Entire session document)
  const [viewMode, setViewMode] = useState<'tabs' | 'full'>('full');
  // Section tabs display style: false = horizontal scroll bar, true = multi-line grid wrap
  const [isTabsGrid, setIsTabsGrid] = useState<boolean>(false);
  // Expand all topics toggle state
  const [expandAllTopics, setExpandAllTopics] = useState<boolean>(false);
  // Map of individually expanded topics
  const [expandedTopicsMap, setExpandedTopicsMap] = useState<Record<number, boolean>>({});

  const toggleTopic = (idx: number) => {
    setExpandedTopicsMap(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tabsRef = useRef<HTMLDivElement>(null);

  const sections = currentSession.sections;
  const currentSection = sections[currentSectionIndex] || sections[0];

  // Auto-scroll active section tab into view centered when section changes
  useEffect(() => {
    if (tabsRef.current && viewMode === 'tabs' && !isTabsGrid) {
      const activeBtn = tabsRef.current.children[currentSectionIndex] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentSectionIndex, viewMode, isTabsGrid]);

  // Inject sleek copy code buttons into all rendered pre blocks
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.markdown-body pre');
    codeBlocks.forEach((pre) => {
      if (!pre.querySelector('.copy-code-btn')) {
        const btn = document.createElement('button');
        btn.className = 'copy-code-btn text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 absolute top-2.5 left-2.5 opacity-70 hover:opacity-100 transition-opacity z-10';
        btn.innerText = 'نسخ الكود';
        btn.onclick = (e) => {
          e.stopPropagation();
          const codeText = pre.querySelector('code')?.innerText || pre.textContent || '';
          navigator.clipboard.writeText(codeText);
          btn.innerText = 'تم النسخ ✓';
          btn.style.color = '#34d399';
          setTimeout(() => {
            btn.innerText = 'نسخ الكود';
            btn.style.color = '';
          }, 2000);
        };
        (pre as HTMLElement).style.position = 'relative';
        pre.appendChild(btn);
      }
    });
  }, [currentSession, currentSectionIndex, viewMode]);

  const scrollTabs = (dir: 'left' | 'right') => {
    if (tabsRef.current) {
      const amount = dir === 'right' ? 250 : -250;
      tabsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Pre-process markdown text for GitHub-style alerts before parsing
  const preprocessMarkdown = (text: string) => {
    if (!text) return '';
    return text
      .replace(/^>\s*\[!NOTE\]\s*\n?/gmi, '<div class="markdown-alert markdown-alert-note"><strong>💡 ملاحظة (Note):</strong><br/>')
      .replace(/^>\s*\[!TIP\]\s*\n?/gmi, '<div class="markdown-alert markdown-alert-tip"><strong>💡 نصيحة (Tip):</strong><br/>')
      .replace(/^>\s*\[!IMPORTANT\]\s*\n?/gmi, '<div class="markdown-alert markdown-alert-important"><strong>⚠️ هام جداً (Important):</strong><br/>')
      .replace(/^>\s*\[!WARNING\]\s*\n?/gmi, '<div class="markdown-alert markdown-alert-warning"><strong>🚨 تحذير (Warning):</strong><br/>')
      .replace(/^>\s*\[!CAUTION\]\s*\n?/gmi, '<div class="markdown-alert markdown-alert-caution"><strong>⛔ تنبيه حذر (Caution):</strong><br/>');
  };

  // Render raw markdown content cleanly
  const renderMarkdownHTML = (text: string) => {
    try {
      const processed = preprocessMarkdown(text);
      const html = marked.parse(processed) as string;
      return { __html: html };
    } catch {
      return { __html: text };
    }
  };

  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  return (
    <main className="flex-1 bg-slate-950 p-3 sm:p-6 md:p-10 overflow-y-auto h-[calc(100vh-4rem)] font-sans text-right" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Session Header Banner */}
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 shadow-xl">
          <div className="flex items-center justify-between gap-2.5 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                اليوم {currentSession.day === 1 ? 'الأول' : 'الثاني'} • الجلسة {currentSession.id} من {sessions.length}
              </span>
              {exitTargetPassed[currentSession.id] && (
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> تم إتقان هدف الخروج
                </span>
              )}
            </div>

            {/* View Mode Selector Switcher */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-[11px] sm:text-xs">
              <button
                onClick={() => setViewMode('full')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${
                  viewMode === 'full'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>المستند الكامل</span>
              </button>
              <button
                onClick={() => setViewMode('tabs')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${
                  viewMode === 'tabs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>تصفح بالأقسام ({sections.length})</span>
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mb-2 sm:mb-3">
            {currentSession.title}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentSession.objective}
          </p>

          {/* In Scope Topics Accordion Grid */}
          {currentSession.topics.length > 0 && (
            <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span>📋</span>
                  <span>محاور الجلسة وموضوعاتها التفصيلية ({currentSession.topics.length} محاور):</span>
                </span>
                <button
                  onClick={() => setExpandAllTopics(prev => !prev)}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-sans px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20"
                >
                  {expandAllTopics ? 'طي جميع التفاصيل ▲' : 'توسيع وقراءة جميع التفاصيل ▼'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentSession.topics.map((topicStr, i) => {
                  const parts = topicStr.split(/:(.+)/);
                  const titlePart = parts[0]?.trim() || topicStr;
                  const detailPart = parts[1]?.trim() || '';
                  const isExpanded = expandAllTopics || !!expandedTopicsMap[i];

                  return (
                    <div
                      key={i}
                      onClick={() => toggleTopic(i)}
                      className={`p-3 md:p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isExpanded
                          ? 'bg-slate-950/90 border-indigo-500/40 shadow-md'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 flex-1">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <h4 className="text-xs md:text-sm font-bold text-slate-100 tracking-wide leading-snug">
                            {titlePart}
                          </h4>
                        </div>
                        {detailPart && (
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                              isExpanded ? 'rotate-180 text-indigo-400' : ''
                            }`}
                          />
                        )}
                      </div>

                      {detailPart && isExpanded && (
                        <p className="mt-2.5 mr-7 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2.5 font-sans whitespace-pre-wrap">
                          {detailPart}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section Tabs View Header & Navigation */}
        {viewMode === 'tabs' && sections.length > 1 && (
          <div className="mb-6 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
            {/* Tabs Control Bar */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <span className="text-indigo-400 font-mono">قسم {currentSectionIndex + 1} من {sections.length}:</span>
                <select
                  value={currentSectionIndex}
                  onChange={(e) => setSectionIndex(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 font-sans"
                >
                  {sections.map((sec, idx) => (
                    <option key={sec.id} value={idx}>
                      {idx + 1}. {sec.title.replace(/^#+\s*/, '')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid vs Scroll Layout Toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsTabsGrid(prev => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isTabsGrid
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                  title={isTabsGrid ? "عرض في شريط أفقي بالأسهم" : "عرض جميع الأقسام كشبكة"}
                >
                  {isTabsGrid ? <LayoutList className="w-3.5 h-3.5" /> : <Grid className="w-3.5 h-3.5" />}
                  <span>{isTabsGrid ? "عرض شريط أفقياً" : "عرض الأقسام كشبكة"}</span>
                </button>
              </div>
            </div>

            {/* Section Buttons Rendering: Either Grid or Scrollable Bar with Left/Right Arrows */}
            {isTabsGrid ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80">
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    onClick={() => setSectionIndex(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-right transition-all border flex items-center justify-between ${
                      idx === currentSectionIndex
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{sec.title.replace(/^#+\s*/, '')}</span>
                    <span className="font-mono text-[10px] opacity-75 shrink-0 ml-1">.{idx + 1}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative flex items-center gap-2 pt-2 border-t border-slate-800/80">
                {/* Scroll Right Arrow */}
                <button
                  onClick={() => scrollTabs('right')}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 p-1.5 rounded-lg shrink-0 transition-colors"
                  title="القسم السابق أفقياً"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Tabs Scroll Container */}
                <div
                  ref={tabsRef}
                  onWheel={(e) => {
                    if (tabsRef.current && e.deltaY) {
                      tabsRef.current.scrollLeft += e.deltaY;
                    }
                  }}
                  className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent flex-1"
                >
                  {sections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => setSectionIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                        idx === currentSectionIndex
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono ml-1.5 text-[11px] opacity-80">{idx + 1}.</span>
                      <span>{sec.title.replace(/^#+\s*/, '')}</span>
                    </button>
                  ))}
                </div>

                {/* Scroll Left Arrow */}
                <button
                  onClick={() => scrollTabs('left')}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 p-1.5 rounded-lg shrink-0 transition-colors"
                  title="القسم التالي أفقياً"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Full View Table of Contents Dropdown Bar */}
        {viewMode === 'full' && sections.length > 0 && (
          <div className="mb-6 p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <ListFilter className="w-4 h-4" />
              <span>فهرس المحتويات السريعة للجلسة ({sections.length} قسماً):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
              {sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[11px] bg-slate-950 hover:bg-indigo-950/40 text-slate-300 hover:text-indigo-300 border border-slate-800 px-2.5 py-1 rounded transition-colors"
                >
                  <span className="font-mono ml-1 text-slate-500">{idx + 1}.</span>
                  <span>{sec.title.replace(/^#+\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Render Area */}
        {viewMode === 'full' ? (
          <article className="markdown-body bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6 md:p-10 shadow-md text-right space-y-10" dir="rtl">
            <div dangerouslySetInnerHTML={renderMarkdownHTML(currentSession.rawContent)} />
          </article>
        ) : (
          <article className="markdown-body bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md text-right" dir="rtl">
            {currentSection && (
              <div dangerouslySetInnerHTML={renderMarkdownHTML(currentSection.content)} />
            )}
          </article>
        )}

        {/* Render Interactive Assessment Cards */}
        <div className="mt-10 space-y-6">
          {/* Practical & AI Audit Exercises */}
          {currentSession.exercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}

          {/* Mandatory Explain Back Card */}
          {currentSession.explainBackPrompt && (
            <ExplainBackCard promptText={currentSession.explainBackPrompt} />
          )}

          {/* Session Exit Target Card */}
          <ExitTargetCard />
        </div>

        {/* Bottom Navigation Control Bar */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={prevSection}
            disabled={isFirstSection && currentSession.number === 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            <span>{viewMode === 'full' ? 'الجلسة السابقة' : 'القسم السابق'}</span>
          </button>

          {viewMode === 'tabs' && (
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              القسم {currentSectionIndex + 1} من {sections.length}
            </span>
          )}

          <button
            onClick={nextSection}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/20"
          >
            <span>{isLastSection || viewMode === 'full' ? 'الجلسة التالية' : 'متابعة'}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
};

