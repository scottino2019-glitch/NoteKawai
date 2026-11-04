import React from 'react';
import { PlannerData, ViewMode } from '../../types';
import { SpiralWire } from '../SpiralWire';

interface DailySectionProps {
  data: PlannerData;
  onChange: (updates: Partial<PlannerData>) => void;
  viewMode: ViewMode;
  onPopSound?: () => void;
}

const MOODS = [
  { key: 'felice', icon: '😄', label: 'Felice' },
  { key: 'sereno', icon: '😌', label: 'Sereno' },
  { key: 'stanco', icon: '😴', label: 'Stanco' },
  { key: 'stressato', icon: '😤', label: 'Stressato' },
  { key: 'amato', icon: '🥰', label: 'Coccolato' },
];

const WEATHERS = [
  { key: 'sole', icon: '☀️', label: 'Sole' },
  { key: 'nuvole', icon: '⛅', label: 'Nuvole' },
  { key: 'pioggia', icon: '🌧️', label: 'Pioggia' },
  { key: 'freddo', icon: '❄️', label: 'Freddo' },
  { key: 'arcobaleno', icon: '🌈', label: 'Arcobaleno' },
];

const HOURS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

export const DailySection: React.FC<DailySectionProps> = ({
  data,
  onChange,
  viewMode,
  onPopSound,
}) => {
  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  const setToday = () => {
    const now = new Date();
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    onChange({
      dailyDayName: days[now.getDay()],
      dailyDayNum: String(now.getDate()),
      dailyMonth: months[now.getMonth()],
    });
    if (onPopSound) onPopSound();
  };

  const handleTimelineChange = (hour: string, text: string) => {
    onChange({
      timeline: {
        ...data.timeline,
        [hour]: text,
      },
    });
  };

  return (
    <div className="flex w-full min-h-[660px]">
      {/* Left Page: Date, Mood, Weather, Priorities, Gratitude */}
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
          {/* Header */}
          <div className="daily-header bg-pink-50/80 rounded-xl p-2.5 mb-3 flex items-center justify-between flex-wrap gap-2 border border-pink-200">
            <div className="perpetual-date-strip inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-pink-200 text-xs font-bold text-pink-900 shadow-xs">
              <input
                type="text"
                className="w-16 outline-none text-pink-800 font-bold bg-transparent"
                value={data.dailyDayName}
                onChange={(e) => onChange({ dailyDayName: e.target.value })}
              />
              <input
                type="text"
                className="w-8 outline-none text-center text-pink-800 font-bold bg-transparent"
                value={data.dailyDayNum}
                onChange={(e) => onChange({ dailyDayNum: e.target.value })}
              />
              <input
                type="text"
                className="w-20 outline-none text-pink-800 font-bold bg-transparent"
                value={data.dailyMonth}
                onChange={(e) => onChange({ dailyMonth: e.target.value })}
              />
            </div>

            <button
              type="button"
              onClick={setToday}
              className="planner-action-btn text-xs font-bold px-3 py-1 rounded-full bg-white border border-pink-300 text-pink-700 hover:bg-pink-100 transition shadow-xs cursor-pointer"
            >
              📅 Oggi
            </button>
          </div>

          {/* Mood & Weather strip */}
          <div className="flex items-center justify-between mb-3 bg-white p-2 rounded-xl border border-pink-200 shadow-xs flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-pink-600">Mood:</span>
              <div className="flex items-center gap-1">
                {MOODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    title={m.label}
                    onClick={() => {
                      onChange({ activeMood: m.key });
                      if (onPopSound) onPopSound();
                    }}
                    className={`p-1 rounded-md text-base transition-transform cursor-pointer ${
                      data.activeMood === m.key
                        ? 'bg-pink-100 shadow-xs scale-120'
                        : 'hover:scale-115 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {m.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-sky-600">Meteo:</span>
              <div className="flex items-center gap-1">
                {WEATHERS.map((w) => (
                  <button
                    key={w.key}
                    type="button"
                    title={w.label}
                    onClick={() => {
                      onChange({ activeWeather: w.key });
                      if (onPopSound) onPopSound();
                    }}
                    className={`p-1 rounded-md text-base transition-transform cursor-pointer ${
                      data.activeWeather === w.key
                        ? 'bg-sky-100 shadow-xs scale-120'
                        : 'hover:scale-115 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {w.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 Priorities */}
          <div className="bg-white rounded-xl border-2 border-dashed border-pink-300 p-3 mb-3 shadow-xs">
            <div className="text-xs font-bold text-pink-700 mb-2 flex items-center gap-1">
              <span>🌟</span> Top 3 Priorità di Oggi
            </div>
            <input
              type="text"
              className="w-full text-xs font-medium text-gray-800 border-b border-pink-100 py-1 outline-none font-['Patrick_Hand',cursive] text-sm"
              value={data.priority1}
              onChange={(e) => onChange({ priority1: e.target.value })}
            />
            <input
              type="text"
              className="w-full text-xs font-medium text-gray-800 border-b border-pink-100 py-1 outline-none font-['Patrick_Hand',cursive] text-sm"
              value={data.priority2}
              onChange={(e) => onChange({ priority2: e.target.value })}
            />
            <input
              type="text"
              className="w-full text-xs font-medium text-gray-800 py-1 outline-none font-['Patrick_Hand',cursive] text-sm"
              value={data.priority3}
              onChange={(e) => onChange({ priority3: e.target.value })}
            />
          </div>

          {/* Gratitude Box with Editable Title */}
          <div className="daily-gratitude-box bg-white rounded-xl border-2 border-dashed border-amber-400 p-3 shadow-xs">
            <input
              type="text"
              className="gratitude-title-input font-['Mali',cursive] text-xs font-bold text-amber-800 border-none outline-none bg-transparent w-full border-b border-amber-200 pb-1 mb-2"
              value={data.gratitudeTitle}
              onChange={(e) => onChange({ gratitudeTitle: e.target.value })}
            />
            <textarea
              className="card-textarea gratitude-textarea font-['Caveat',cursive] text-lg text-amber-900 leading-relaxed min-h-[110px] w-full outline-none bg-transparent resize-none"
              value={data.gratitudeText}
              placeholder="Scrivi qui i momenti felici o per cosa sei grata..."
              onChange={(e) => onChange({ gratitudeText: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && <SpiralWire />}

      {/* Right Page: Hourly Timeline Schedule */}
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
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-pink-50 border-2 border-dashed border-pink-300 mb-3">
            <div className="font-['Mali',cursive] text-sm font-bold text-pink-700 flex items-center gap-1">
              <span>⏰</span> Programma Orario &amp; Impegni
            </div>
            <span className="text-[11px] font-bold text-pink-500">Giornata Completa</span>
          </div>

          <div className="hourly-timeline bg-white rounded-xl border border-gray-200 p-3 shadow-xs flex flex-col gap-1 max-h-[560px] overflow-y-auto">
            {HOURS.map((hour) => (
              <div key={hour} className="time-row flex items-center gap-3 py-1 border-b border-dashed border-gray-100">
                <span className="time-label w-11 text-right text-xs font-bold text-gray-400 shrink-0 select-none">
                  {hour}
                </span>
                <input
                  type="text"
                  className="time-input flex-1 border-none outline-none font-['Patrick_Hand',cursive] text-sm text-gray-800 bg-transparent"
                  value={data.timeline[hour] || ''}
                  placeholder="Attività o appuntamento..."
                  onChange={(e) => handleTimelineChange(hour, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
