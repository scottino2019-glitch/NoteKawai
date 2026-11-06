import React from 'react';
import { ViewMode, SectionType } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  currentSection: SectionType;
  onAddNote: () => void;
  onResetPhoto: () => void;
  onClearNotes: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onCloseCover: () => void;
  isInstallable: boolean;
  isIOS: boolean;
  onInstall: () => void;
  onShowIOSGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onChangeViewMode,
  currentSection,
  onAddNote,
  onResetPhoto,
  onClearNotes,
  soundEnabled,
  onToggleSound,
  onCloseCover,
  isInstallable,
  isIOS,
  onInstall,
  onShowIOSGuide,
}) => {
  return (
    <header className="bg-white border-b-2 border-[#eddcd0] px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2.5 flex-wrap z-40 shadow-[0_2px_6px_rgba(0,0,0,0.04)] select-none">
      {/* 1. Logo & App Title */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onCloseCover}
          title="Chiudi quaderno e torna alla copertina"
          className="w-8 h-8 rounded-lg bg-[#fde047] border-2 border-[#ca8a04] flex items-center justify-center text-base shadow-[1px_2px_0_#ca8a04] hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          📔
        </button>
        <span className="font-['Mali',cursive] text-base sm:text-lg font-bold text-[#be185d] tracking-tight">
          Pastel Sticky Notebook
        </span>
      </div>

      {/* 2. Main Page View Switcher (Comfortable, large, beautiful and clear!) */}
      <div className="page-switch-tabs inline-flex items-center gap-1 bg-white border-[1.5px] border-[#fbcfe8] rounded-full p-1 shadow-[0_1px_4px_rgba(244,114,182,0.15)]">
        {/* Desktop Both Pages */}
        <button
          type="button"
          onClick={() => onChangeViewMode('both')}
          className={`tab-btn hidden lg:inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            viewMode === 'both'
              ? 'bg-[#db2777] text-white shadow-[0_2px_6px_rgba(219,39,119,0.28)]'
              : 'text-[#be185d] hover:bg-[#fdf2f8]'
          }`}
          title="Mostra entrambe le pagine affiancate"
        >
          <span>📖</span>
          <span>2 Pagine</span>
        </button>

        {/* Page 1 (Sx) */}
        <button
          type="button"
          onClick={() => onChangeViewMode('left')}
          className={`tab-btn inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            viewMode === 'left'
              ? 'bg-[#db2777] text-white shadow-[0_2px_6px_rgba(219,39,119,0.28)]'
              : 'text-[#be185d] hover:bg-[#fdf2f8]'
          }`}
          title="Mostra Pagina 1 (Sinistra)"
        >
          <span>📄</span>
          <span>Pagina 1 (Sx)</span>
        </button>

        {/* Page 2 (Dx) */}
        <button
          type="button"
          onClick={() => onChangeViewMode('right')}
          className={`tab-btn inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            viewMode === 'right'
              ? 'bg-[#db2777] text-white shadow-[0_2px_6px_rgba(219,39,119,0.28)]'
              : 'text-[#be185d] hover:bg-[#fdf2f8]'
          }`}
          title="Mostra Pagina 2 (Destra)"
        >
          <span>📄</span>
          <span>Pagina 2 (Dx)</span>
        </button>
      </div>

      {/* 3. Header Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap shrink-0">
        {/* Note Section Specific Actions */}
        {currentSection === 'notes' && (
          <>
            <button
              type="button"
              onClick={onAddNote}
              className="px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-[#db2777] text-white hover:bg-[#e11d48] shadow-[0_2px_0_#9d174d] hover:-translate-y-0.5 active:translate-y-0.5 transition flex items-center gap-1.5 cursor-pointer"
              title="Aggiungi una nuova nota adesiva"
            >
              <span>➕</span>
              <span>Nuova Nota...</span>
            </button>

            <button
              type="button"
              onClick={onResetPhoto}
              className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-[#fdf2f8] text-[#9d174d] border-[1.5px] border-[#fbcfe8] hover:bg-[#fce7f3] shadow-[0_2px_4px_rgba(244,114,182,0.12)] hover:-translate-y-0.5 active:translate-y-0.5 transition flex items-center gap-1 cursor-pointer"
              title="Ripristina la bacheca note come nella foto originale"
            >
              <span>📸</span>
              <span className="hidden sm:inline">Come in Foto</span>
            </button>

            <button
              type="button"
              onClick={onClearNotes}
              className="p-1.5 sm:px-2.5 text-xs sm:text-sm font-bold rounded-lg bg-white text-[#db2777] border-[1.5px] border-[#fbcfe8] hover:bg-[#fdf2f8] shadow-[0_2px_4px_rgba(244,114,182,0.12)] transition flex items-center justify-center cursor-pointer"
              title="Elimina tutte le note"
            >
              <span>🗑️</span>
            </button>
          </>
        )}

        {/* Sound toggle button */}
        <button
          type="button"
          onClick={onToggleSound}
          className="p-1.5 sm:px-2.5 text-xs sm:text-sm font-bold rounded-lg bg-white text-[#db2777] border-[1.5px] border-[#fbcfe8] hover:bg-[#fdf2f8] shadow-[0_2px_4px_rgba(244,114,182,0.12)] transition flex items-center justify-center cursor-pointer"
          title={soundEnabled ? 'Disattiva effetti sonori' : 'Attiva effetti sonori'}
        >
          <span>{soundEnabled ? '🔊' : '🔇'}</span>
        </button>

        {/* PWA Install Button */}
        {isInstallable && (
          <button
            type="button"
            onClick={onInstall}
            className="px-2.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_2px_0_#065f46] hover:-translate-y-0.5 active:translate-y-0.5 transition flex items-center gap-1 cursor-pointer"
            title="Installa come App PWA sul telefono"
          >
            <span>📲</span>
            <span className="hidden md:inline">Installa PWA</span>
          </button>
        )}

        {/* iOS Install Guide */}
        {isIOS && (
          <button
            type="button"
            onClick={onShowIOSGuide}
            className="px-2 py-1.5 text-xs font-bold rounded-lg bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50 transition flex items-center gap-1 cursor-pointer"
            title="Istruzioni installazione su iPhone"
          >
            <span>📲</span>
            <span className="hidden md:inline">iOS</span>
          </button>
        )}

        {/* Close Cover Button */}
        <button
          type="button"
          onClick={onCloseCover}
          className="px-2.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 transition flex items-center gap-1 cursor-pointer shadow-xs"
          title="Chiudi quaderno e torna alla copertina"
        >
          <span>📕</span>
          <span className="hidden md:inline">Chiudi</span>
        </button>
      </div>
    </header>
  );
};
