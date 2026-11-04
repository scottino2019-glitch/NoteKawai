import React from 'react';
import { PlannerData, ViewMode, HabitItem } from '../../types';
import { SpiralWire } from '../SpiralWire';

interface HabitSectionProps {
  data: PlannerData;
  onChange: (updates: Partial<PlannerData>) => void;
  viewMode: ViewMode;
  onPopSound?: () => void;
  onCheckSound?: () => void;
}

export const HabitSection: React.FC<HabitSectionProps> = ({
  data,
  onChange,
  viewMode,
  onPopSound,
  onCheckSound,
}) => {
  const showLeft = viewMode === 'both' || viewMode === 'left';
  const showRight = viewMode === 'both' || viewMode === 'right';

  // Habit table handlers
  const handleToggleHabitDot = (habitId: string, dayIdx: number) => {
    const updated = (data.habits || []).map((h) => {
      if (h.id === habitId) {
        const checks = [...(h.checks || Array(14).fill(false))];
        checks[dayIdx] = !checks[dayIdx];
        if (checks[dayIdx] && onCheckSound) onCheckSound();
        return { ...h, checks };
      }
      return h;
    });
    onChange({ habits: updated });
  };

  const handleHabitNameChange = (habitId: string, name: string) => {
    const updated = (data.habits || []).map((h) => (h.id === habitId ? { ...h, name } : h));
    onChange({ habits: updated });
  };

  const handleAddHabit = () => {
    const list = data.habits ? [...data.habits] : [];
    list.push({
      id: 'h_' + Date.now(),
      name: 'Nuova Abitudine ✨',
      checks: Array(14).fill(false),
    });
    onChange({ habits: list });
    if (onPopSound) onPopSound();
  };

  const handleDeleteHabit = (habitId: string) => {
    const list = (data.habits || []).filter((h) => h.id !== habitId);
    onChange({ habits: list });
    if (onPopSound) onPopSound();
  };

  // Goal steps handlers
  const handleToggleGoalStep = (stepId: string) => {
    const updated = (data.goalSteps || []).map((s) => {
      if (s.id === stepId) {
        const next = !s.done;
        if (next && onCheckSound) onCheckSound();
        return { ...s, done: next };
      }
      return s;
    });
    onChange({ goalSteps: updated });
  };

  const handleGoalStepText = (stepId: string, text: string) => {
    const updated = (data.goalSteps || []).map((s) => (s.id === stepId ? { ...s, text } : s));
    onChange({ goalSteps: updated });
  };

  const handleAddGoalStep = () => {
    const list = data.goalSteps ? [...data.goalSteps] : [];
    list.push({
      id: 's_' + Date.now(),
      text: 'Nuovo passaggio chiave ✨',
      done: false,
    });
    onChange({ goalSteps: list });
    if (onPopSound) onPopSound();
  };

  const handleDeleteGoalStep = (stepId: string) => {
    const list = (data.goalSteps || []).filter((s) => s.id !== stepId);
    onChange({ goalSteps: list });
    if (onPopSound) onPopSound();
  };

  return (
    <div className="flex w-full min-h-[660px]">
      {/* Left Page: Monthly Habit Tracker Grid */}
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
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-amber-50 border-2 border-dashed border-amber-300 mb-3 flex-wrap">
            <div className="font-['Mali',cursive] text-sm font-bold text-amber-800 flex items-center gap-1">
              <span>🎯</span> Habit Tracker del Mese
            </div>
            <div className="perpetual-date-strip inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-amber-200 text-xs font-bold text-amber-900 shadow-xs">
              <input
                type="text"
                className="w-20 outline-none text-amber-800 font-bold bg-transparent"
                value={data.habitMonth}
                onChange={(e) => onChange({ habitMonth: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-xs font-bold text-amber-800">
              Spunta ogni giorno le buone abitudini!
            </span>
            <button
              type="button"
              onClick={handleAddHabit}
              className="planner-action-btn text-xs font-bold px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 transition shadow-xs cursor-pointer"
            >
              + Nuova Abitudine
            </button>
          </div>

          {/* Habit Tracker Table */}
          <div className="overflow-x-auto rounded-xl border border-amber-200 bg-white shadow-xs">
            <table className="habit-table w-full text-xs">
              <thead>
                <tr className="bg-amber-50 border-b border-amber-200 text-amber-900">
                  <th className="text-left py-2 px-2.5 font-bold min-w-[120px]">Abitudine</th>
                  {[...Array(14)].map((_, i) => (
                    <th key={i} className="py-2 px-1 text-center font-bold w-6">
                      {i + 1}
                    </th>
                  ))}
                  <th className="w-6 py-2 px-1"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {(data.habits || []).map((habit: HabitItem) => (
                  <tr key={habit.id} className="hover:bg-amber-50/40 transition">
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        className="w-full text-xs font-semibold text-amber-950 bg-transparent border-none outline-none"
                        value={habit.name}
                        onChange={(e) => handleHabitNameChange(habit.id, e.target.value)}
                        placeholder="Nome abitudine..."
                      />
                    </td>
                    {[...Array(14)].map((_, d) => {
                      const isChecked = habit.checks && habit.checks[d];
                      return (
                        <td key={d} className="py-1 px-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleHabitDot(habit.id, d)}
                            className={`w-3.5 h-3.5 rounded-full border border-orange-400 inline-block transition-all cursor-pointer ${
                              isChecked ? 'bg-orange-600 border-orange-600 scale-110' : 'hover:bg-orange-100'
                            }`}
                          />
                        </td>
                      );
                    })}
                    <td className="py-1 px-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-rose-400 hover:text-rose-600 text-sm font-bold cursor-pointer"
                        title="Elimina abitudine"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Spiral wire when both pages are visible */}
      {viewMode === 'both' && <SpiralWire />}

      {/* Right Page: Flexible Monthly Goal, Books, Wishlist */}
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
          <div className="planner-banner flex items-center justify-between gap-2 p-2 rounded-lg bg-pink-50 border-2 border-dashed border-pink-300 mb-3">
            <div className="font-['Mali',cursive] text-sm font-bold text-pink-700 flex items-center gap-1">
              <span>✨</span> Focus &amp; Desideri del Mese
            </div>
            <span className="text-[11px] font-bold text-amber-700">Traguardi</span>
          </div>

          {/* 1. Flexible Monthly Goal */}
          <div className="monthly-goal-box bg-white rounded-xl border-2 border-dashed border-amber-400 p-3 mb-3 shadow-xs">
            <input
              type="text"
              className="monthly-goal-title-input font-['Mali',cursive] text-xs font-bold text-amber-800 border-none outline-none bg-transparent w-full mb-1"
              value={data.goalTitle}
              onChange={(e) => onChange({ goalTitle: e.target.value })}
            />
            <textarea
              className="card-textarea w-full text-xs font-bold text-amber-900 border-b border-amber-200 pb-2 mb-2 outline-none bg-transparent resize-none min-h-[38px]"
              value={data.goalDesc}
              placeholder="Descrivi il tuo obiettivo del mese..."
              onChange={(e) => onChange({ goalDesc: e.target.value })}
            />

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-amber-800">
                ✨ Tappe &amp; Avanzamento:
              </span>
              <button
                type="button"
                onClick={handleAddGoalStep}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 transition cursor-pointer"
              >
                + Aggiungi Step
              </button>
            </div>

            <div className="flex flex-col gap-1 max-h-[120px] overflow-y-auto">
              {(data.goalSteps || []).map((step) => (
                <div key={step.id} className="goal-step-row flex items-center gap-2">
                  <div
                    onClick={() => handleToggleGoalStep(step.id)}
                    className={`chk-box ${step.done ? 'checked' : ''}`}
                  />
                  <input
                    type="text"
                    className={`goal-step-input ${step.done ? 'checked' : ''} text-xs text-amber-950 flex-1 outline-none`}
                    value={step.text}
                    onChange={(e) => handleGoalStepText(step.id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteGoalStep(step.id)}
                    className="goal-step-del-btn text-rose-400 hover:text-rose-600 font-bold px-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Books Tracker Box */}
          <div className="books-tracker-box bg-white rounded-xl border border-yellow-300 p-3 mb-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <span>📚</span> Libri Letti &amp; Da Leggere
              </span>
              <span className="text-[10px] text-amber-600 font-semibold">Reading List</span>
            </div>
            <textarea
              className="card-textarea w-full font-['Patrick_Hand',cursive] text-sm text-amber-950 leading-relaxed outline-none bg-transparent resize-none min-h-[85px]"
              value={data.booksText}
              placeholder="Inserisci qui i tuoi libri..."
              onChange={(e) => onChange({ booksText: e.target.value })}
            />
          </div>

          {/* 3. Wishlist Box */}
          <div className="wishlist-tracker-box bg-white rounded-xl border border-pink-200 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-pink-700 flex items-center gap-1">
                <span>🛍️</span> Wishlist Kawaii &amp; Desideri
              </span>
              <span className="text-[10px] text-pink-600 font-semibold">I Miei Desideri</span>
            </div>
            <textarea
              className="card-textarea w-full font-['Patrick_Hand',cursive] text-sm text-pink-950 leading-relaxed outline-none bg-transparent resize-none min-h-[85px]"
              value={data.wishlistText}
              placeholder="Inserisci qui i tuoi desideri..."
              onChange={(e) => onChange({ wishlistText: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
