import React from 'react';
import { WeeklyData, ViewMode } from '../../types';
import { SpiralWire } from '../SpiralWire';

interface WeeklySectionProps {
  data: WeeklyData;
  onChange: (updates: Partial<WeeklyData>) => void;
  viewMode: ViewMode;
  onPopSound?: () => void;
  onCheckSound?: () => void;
}

export const WeeklySection: React.FC<WeeklySectionProps> = ({
  data,
  onChange,
  viewMode,
  onPopSound,
  onCheckSound,
}) => {
  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  const handleDayChange = (index: number, field: 'date' | 'notes', val: string) => {
    const updated = data.days.map((d, i) => (i === index ? { ...d, [field]: val } : d));
    onChange({ days: updated });
  };

  const handleGoalToggle = (id: string) => {
    const updated = data.goals.map((g) => {
      if (g.id === id) {
        const next = !g.done;
        if (next && onCheckSound) onCheckSound();
        return { ...g, done: next };
      }
      return g;
    });
    onChange({ goals: updated });
  };

  const handleGoalText = (id: string, text: string) => {
    const updated = data.goals.map((g) => (g.id === id ? { ...g, text } : g));
    onChange({ goals: updated });
  };

  const setThisWeek = () => {
    const now = new Date();
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const currentMonth = months[now.getMonth()];
    const currentDay = now.getDate();
    const range = `${currentDay} - ${currentDay + 6}`;

    // Update the days dates starting from today
    const updatedDays = data.days.map((d, i) => ({
      ...d,
      date: String(currentDay + i),
    }));

    onChange({
      month: currentMonth,
      range: range,
      days: updatedDays,
    });
    if (onPopSound) onPopSound();
  };

  return (
    <div className="flex w-full min-h-[660px]">
      {/* Left Page (Mon - Thu) */}
      {showLeft && (
        <div
          className={`notebook-page page-left flex-1 relative p-4 min-h-[660px] ${
            viewMode === 'left' ? 'rounded-xl shadow-md' : 'rounded-l-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-cream)',
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Header banner */}
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-pink-50 border-2 border-dashed border-pink-300 mb-4 flex-wrap">
            <div className="font-['Mali',cursive] text-sm font-bold text-pink-700 flex items-center gap-1">
              <span>📅</span> Planner Settimanale
            </div>
            <div className="perpetual-date-strip inline-flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-pink-200 text-xs text-pink-900 font-bold shadow-xs">
              <span>Mese:</span>
              <input
                type="text"
                className="w-20 outline-none text-pink-800 font-bold bg-transparent"
                value={data.month}
                onChange={(e) => onChange({ month: e.target.value })}
              />
              <span>Sett:</span>
              <input
                type="text"
                className="w-14 outline-none text-pink-800 font-bold bg-transparent"
                value={data.range}
                onChange={(e) => onChange({ range: e.target.value })}
              />
            </div>
          </div>

          {/* Days Grid Left (Mon - Thu) */}
          <div className="weekly-days-grid flex flex-col gap-2.5">
            {data.days.slice(0, 4).map((day, idx) => (
              <div
                key={day.name}
                className="day-card bg-white border border-pink-200 border-l-4 border-l-pink-600 rounded-lg p-2.5 shadow-xs"
              >
                <div className="day-card-header flex items-center justify-between mb-1.5">
                  <span className="day-label font-bold text-xs text-pink-700 flex items-center gap-1.5">
                    <span>🗓️</span> {day.name}
                  </span>
                  <input
                    type="text"
                    value={day.date}
                    onChange={(e) => handleDayChange(idx, 'date', e.target.value)}
                    className="day-date-bubble w-6 h-6 rounded-full bg-pink-50 border border-pink-300 text-center text-xs font-extrabold text-pink-600 outline-none"
                  />
                </div>
                <textarea
                  className="day-textarea w-full min-h-[44px] border-none outline-none resize-none font-['Patrick_Hand',cursive] text-sm text-gray-700 leading-tight bg-transparent"
                  value={day.notes}
                  placeholder="Attività e promemoria..."
                  onChange={(e) => handleDayChange(idx, 'notes', e.target.value)}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 18px, #fbcfe8 19px)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && <SpiralWire />}

      {/* Right Page (Fri - Sun + Key Goals) */}
      {showRight && (
        <div
          className={`notebook-page page-right flex-1 relative p-4 min-h-[660px] ${
            viewMode === 'right' ? 'rounded-xl shadow-md' : 'rounded-r-xl'
          }`}
          style={{
            backgroundColor: 'var(--page-cream)',
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Header banner */}
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-pink-50 border-2 border-dashed border-pink-300 mb-4 flex-wrap">
            <div className="font-['Mali',cursive] text-sm font-bold text-pink-700 flex items-center gap-1">
              <span>✨</span> Focus &amp; Weekend
            </div>
            <button
              type="button"
              onClick={setThisWeek}
              className="planner-action-btn text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-300 text-pink-800 hover:bg-pink-200 transition cursor-pointer shadow-xs"
            >
              📅 Questa Settimana
            </button>
          </div>

          {/* Days Grid Right (Fri - Sun) */}
          <div className="weekly-days-grid flex flex-col gap-2.5">
            {data.days.slice(4).map((day, idx) => (
              <div
                key={day.name}
                className="day-card bg-white border border-pink-200 border-l-4 border-l-purple-500 rounded-lg p-2.5 shadow-xs"
              >
                <div className="day-card-header flex items-center justify-between mb-1.5">
                  <span className="day-label font-bold text-xs text-purple-700 flex items-center gap-1.5">
                    <span>🗓️</span> {day.name}
                  </span>
                  <input
                    type="text"
                    value={day.date}
                    onChange={(e) => handleDayChange(idx + 4, 'date', e.target.value)}
                    className="day-date-bubble w-6 h-6 rounded-full bg-purple-50 border border-purple-300 text-center text-xs font-extrabold text-purple-700 outline-none"
                  />
                </div>
                <textarea
                  className="day-textarea w-full min-h-[44px] border-none outline-none resize-none font-['Patrick_Hand',cursive] text-sm text-gray-700 leading-tight bg-transparent"
                  value={day.notes}
                  placeholder="Attività e promemoria..."
                  onChange={(e) => handleDayChange(idx + 4, 'notes', e.target.value)}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 18px, #e9d5ff 19px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Goals of the Week */}
          <div className="weekly-sidebar-box bg-white border-2 border-dashed border-purple-300 rounded-xl p-3 mt-3 shadow-xs">
            <div className="weekly-box-title text-xs font-bold text-purple-800 mb-2 flex items-center gap-1">
              <span>🎯</span> Obiettivi Chiave della Settimana
            </div>
            <div className="flex flex-col gap-1.5">
              {data.goals.map((goal) => (
                <div key={goal.id} className="checklist-row">
                  <div
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`chk-box ${goal.done ? 'checked' : ''}`}
                  />
                  <input
                    type="text"
                    className={`chk-input ${goal.done ? 'checked' : ''}`}
                    value={goal.text}
                    onChange={(e) => handleGoalText(goal.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
