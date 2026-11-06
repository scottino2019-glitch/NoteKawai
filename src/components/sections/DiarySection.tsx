import React from 'react';
import { PlannerData, ViewMode } from '../../types';
import { SpiralWire } from '../SpiralWire';

interface DiarySectionProps {
  data: PlannerData;
  onChange: (updates: Partial<PlannerData>) => void;
  viewMode: ViewMode;
  onPopSound?: () => void;
  onNavigatePage?: (page: 'left' | 'right') => void;
}

export const DiarySection: React.FC<DiarySectionProps> = ({
  data,
  onChange,
  viewMode,
  onPopSound,
  onNavigatePage,
}) => {
  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  const handleAddPrompt = () => {
    const list = data.diaryPrompts ? [...data.diaryPrompts] : [];
    list.push('Di cosa sei fiero/a oggi? ✨');
    onChange({ diaryPrompts: list });
    if (onPopSound) onPopSound();
  };

  const handleDeletePrompt = (index: number) => {
    const list = data.diaryPrompts.filter((_, i) => i !== index);
    onChange({ diaryPrompts: list });
    if (onPopSound) onPopSound();
  };

  const handlePromptChange = (index: number, text: string) => {
    const list = data.diaryPrompts.map((p, i) => (i === index ? text : p));
    onChange({ diaryPrompts: list });
  };

  return (
    <div className={`flex ${viewMode === 'both' ? 'flex-col md:flex-row' : 'flex-col'} w-full min-h-0`}>
      {/* Left Page (Diary Part 1 + Prompts) */}
      {showLeft && (
        <div
          className={`notebook-page page-left flex-1 relative p-3 sm:p-5 pb-8 min-h-[520px] sm:min-h-[640px] flex flex-col ${
            viewMode === 'left' ? 'rounded-xl shadow-md' : 'rounded-t-xl md:rounded-tr-none md:rounded-l-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-cream)',
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Header */}
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-emerald-50 border-2 border-dashed border-emerald-300 mb-3 flex-wrap">
            <div className="font-['Mali',cursive] text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1">
              <span>📖</span> Caro Diario...
            </div>
            <div className="perpetual-date-strip inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-900 shadow-xs">
              <input
                type="text"
                className="w-36 outline-none text-emerald-800 font-bold bg-transparent"
                value={data.diaryDate}
                onChange={(e) => onChange({ diaryDate: e.target.value })}
              />
            </div>
          </div>

          {/* Reflection Prompts Card */}
          <div className="diary-prompts-card bg-emerald-50/70 border border-dashed border-emerald-300 rounded-xl p-3 mb-3 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-emerald-900 flex items-center gap-1">
                <span>💡</span> Spunti di Riflessione / Prompt:
              </span>
              <button
                type="button"
                onClick={handleAddPrompt}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
              >
                + Aggiungi Prompt
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {(data.diaryPrompts || []).map((prompt, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white border border-emerald-200 rounded-lg px-3 py-1.5 shadow-xs">
                  <span className="text-base">🌸</span>
                  <input
                    type="text"
                    className="flex-1 text-sm font-medium text-emerald-950 border-none outline-none bg-transparent"
                    value={prompt}
                    onChange={(e) => handlePromptChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeletePrompt(idx)}
                    className="text-sm font-bold text-rose-500 hover:text-rose-700 px-1 cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Diary writing page */}
          <textarea
            className="diary-paper-lines flex-1 w-full min-h-[340px] border-none outline-none resize-none font-['Caveat',cursive] text-xl leading-8 text-gray-800 p-2 bg-transparent"
            value={data.diaryLeftText}
            placeholder="Scrivi qui i tuoi pensieri, sensazioni e ricordi..."
            onChange={(e) => onChange({ diaryLeftText: e.target.value })}
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #bae6fd 28px)',
            }}
          />
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && (
        <div className="hidden md:flex">
          <SpiralWire />
        </div>
      )}

      {/* Right Page (Diary Part 2) */}
      {showRight && (
        <div
          className={`notebook-page page-right flex-1 relative p-3 sm:p-5 pb-8 min-h-[520px] sm:min-h-[640px] flex flex-col ${
            viewMode === 'right' ? 'rounded-xl shadow-md' : 'rounded-b-xl md:rounded-bl-none md:rounded-r-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-cream)',
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          <div className="planner-banner flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50 border-2 border-dashed border-emerald-300 mb-3">
            <div className="font-['Mali',cursive] text-sm sm:text-base font-bold text-emerald-800 flex items-center gap-1">
              <span>🌸</span> Appunti dal Cuore
            </div>
            <span className="text-xs sm:text-sm font-bold text-emerald-600">Pagina 2</span>
          </div>

          <textarea
            className="diary-paper-lines flex-1 w-full min-h-[460px] border-none outline-none resize-none font-['Caveat',cursive] text-xl leading-8 text-gray-800 p-2 bg-transparent"
            value={data.diaryRightText}
            placeholder="Continua a scrivere qui..."
            onChange={(e) => onChange({ diaryRightText: e.target.value })}
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #bae6fd 28px)',
            }}
          />
        </div>
      )}
    </div>
  );
};
