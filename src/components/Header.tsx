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
    <header className="bg-white border-b-2 border-stone-200 px-3 py-2 flex items-center justify-between gap-2 flex-wrap z-40 shadow-xs sticky top-0">
      {/* Brand logo & title */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onCloseCover}
          title="Chiudi copertina e torna all'inizio"
          className="w-8 h-8 rounded-lg bg-yellow-300 border-2 border-yellow-600 flex items-center justify-center text-base shadow-[1px_2px_0_#ca8a04] hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          📔
        </button>
        <div>
          <h1 className="font-['Mali',cursive] text-sm sm:text-base font-extrabold text-pink-700 leading-tight">
            Pastel Sticky Notebook
          </h1>
          <p className="text-[10px] text-gray-500 hidden sm:block">
            Planner Perpetuo Kawaii
          </p>
        </div>
      </div>

      {/* View Switcher (Both / Left / Right) */}
      <div className="inline-flex items-center gap-1 bg-pink-50 border border-pink-200 rounded-full p-1 shadow-xs">
        <button
          type="button"
          onClick={() => onChangeViewMode('both')}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'both'
              ? 'bg-pink-600 text-white shadow-xs'
              : 'text-pink-800 hover:bg-pink-100'
          }`}
          title="Mostra 2 pagine affiancate"
        >
          📖 2 Pagine
        </button>
        <button
          type="button"
          onClick={() => onChangeViewMode('left')}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'left'
              ? 'bg-pink-600 text-white shadow-xs'
              : 'text-pink-800 hover:bg-pink-100'
          }`}
          title="Mostra solo la Pagina Sinistra (ideale per cellulare)"
        >
          📄 Pag. Sx
        </button>
        <button
          type="button"
          onClick={() => onChangeViewMode('right')}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'right'
              ? 'bg-pink-600 text-white shadow-xs'
              : 'text-pink-800 hover:bg-pink-100'
          }`}
          title="Mostra solo la Pagina Destra (ideale per cellulare)"
        >
          📄 Pag. Dx
        </button>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* PWA Install Button */}
        {isInstallable && (
          <button
            type="button"
            onClick={onInstall}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition flex items-center gap-1 cursor-pointer animate-pulse"
            title="Installa l'app PWA sul dispositivo"
          >
            <span>📲</span>
            <span className="hidden sm:inline">Installa App</span>
          </button>
        )}

        {isIOS && (
          <button
            type="button"
            onClick={onShowIOSGuide}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 shadow-xs transition flex items-center gap-1 cursor-pointer"
            title="Come installare su iPhone/iPad"
          >
            <span>📲</span>
            <span className="hidden sm:inline">Installa iOS</span>
          </button>
        )}

        {/* Note-specific actions */}
        {currentSection === 'notes' && (
          <>
            <button
              type="button"
              onClick={onAddNote}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-pink-600 text-white hover:bg-pink-700 shadow-[0_2px_0_#9d174d] hover:-translate-y-0.5 active:translate-y-0.5 transition flex items-center gap-1 cursor-pointer"
            >
              <span>➕</span>
              <span className="hidden sm:inline">Nuova Nota...</span>
            </button>

            <button
              type="button"
              onClick={onResetPhoto}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-pink-50 border border-pink-200 text-pink-800 hover:bg-pink-100 shadow-xs transition flex items-center gap-1 cursor-pointer"
              title="Ripristina la bacheca note come nella foto originale"
            >
              <span>📸</span>
              <span className="hidden sm:inline">Come in Foto</span>
            </button>
          </>
        )}

        {/* Audio sound effect toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="p-1.5 rounded-lg bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 shadow-xs transition cursor-pointer text-sm"
          title={soundEnabled ? 'Disattiva suoni carta' : 'Attiva suoni carta'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Close cover */}
        <button
          type="button"
          onClick={onCloseCover}
          className="px-2 py-1 text-xs font-bold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition flex items-center gap-1 cursor-pointer"
          title="Chiudi il diario con la copertina"
        >
          <span>📕</span>
          <span className="hidden md:inline">Chiudi</span>
        </button>

        {/* Clear notes if in notes section */}
        {currentSection === 'notes' && (
          <button
            type="button"
            onClick={onClearNotes}
            className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 shadow-xs transition cursor-pointer text-sm"
            title="Elimina tutte le note"
          >
            🗑️
          </button>
        )}
      </div>
    </header>
  );
};
