import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { HDS_GLOSSARY } from '../utils/glossary';
import { Search, X, BookOpen } from 'lucide-react';

export const GlossaryModal: React.FC = () => {
  const { isGlossaryOpen, setGlossaryOpen } = useLearning();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  if (!isGlossaryOpen) return null;

  const categories = ['الكل', 'Architecture', 'Data & DB', 'Dispatch & Maps', 'Realtime', 'Business & Finance'];

  const filtered = HDS_GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                          item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'الكل' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans text-right" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">قاموس المصطلحات التقنية لمنظومة HDS</h2>
              <p className="text-[11px] text-slate-400">مرجع سريع للمفاهيم بدون مغادرة الدرس الحالي</p>
            </div>
          </div>

          <button
            onClick={() => setGlossaryOpen(false)}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مصطلح (Dispatch, PostGIS, Idempotency, FSM...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pr-9 pl-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans text-right"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-indigo-300 font-mono">{item.term}</h4>
                  <div className="flex items-center gap-2">
                    {item.sessionRef && (
                      <span className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        الجلسة {item.sessionRef}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-slate-500">
              لم يتم العثور على مصطلح ينطبق على "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
