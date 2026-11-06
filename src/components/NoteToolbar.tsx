import React from 'react';
import { NoteItem, ShapeType, PatternType, CornerType } from '../types';

interface NoteToolbarProps {
  activeNote: NoteItem | null;
  onUpdateNote: (updates: Partial<NoteItem>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose?: () => void;
  onPopSound?: () => void;
}

const PASTEL_COLORS = [
  { hex: '#fef08a', name: 'Giallo' },
  { hex: '#ffffff', name: 'Bianco' },
  { hex: '#fbcfe8', name: 'Rosa' },
  { hex: '#ffe4e6', name: 'Cipria' },
  { hex: '#a7f3d0', name: 'Menta' },
  { hex: '#bbf7d0', name: 'Salvia' },
  { hex: '#ddd6fe', name: 'Lavanda' },
  { hex: '#bae6fd', name: 'Azzurro' },
  { hex: '#fed7aa', name: 'Pesca' },
];

export const NoteToolbar: React.FC<NoteToolbarProps> = ({
  activeNote,
  onUpdateNote,
  onDuplicate,
  onDelete,
  onClose,
  onPopSound,
}) => {
  return (
    <div className="bg-white/95 border-b border-pink-200 h-10 px-3 flex items-center shadow-2xs z-30 select-none overflow-x-auto scrollbar-none whitespace-nowrap">
      {!activeNote ? (
        <div className="text-xs sm:text-sm font-semibold text-pink-700/80 flex items-center gap-1.5 shrink-0">
          <span>👆</span>
          <span>Tocca qualsiasi nota per personalizzare forma, colore, carattere e trama!</span>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Forma */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Forma:</span>
            <select
              value={activeNote.shape}
              onChange={(e) => {
                const nextShape = e.target.value as ShapeType;
                let mascot = activeNote.mascot;
                if (nextShape === 'heart' && !mascot) mascot = 'cherries';
                let checklist = activeNote.checklist;
                if (nextShape === 'checklist' && (!checklist || checklist.length === 0)) {
                  checklist = [{ id: 'c1', text: 'Nuovo appunto', done: false }];
                }
                onUpdateNote({ shape: nextShape, mascot, checklist });
                if (onPopSound) onPopSound();
              }}
              className="text-xs font-semibold py-0.5 px-1.5 rounded-md border border-pink-200 bg-pink-50/40 text-pink-900 cursor-pointer outline-none"
            >
              <option value="square">🟨 Quadrata</option>
              <option value="heart">💖 Cuoricino</option>
              <option value="daisy">🌼 Margherita</option>
              <option value="lined">📝 A Righe</option>
              <option value="checklist">✅ Checklist</option>
              <option value="pennant">🎏 Bandierina</option>
              <option value="bubble">💬 Fumetto</option>
            </select>
          </div>

          {/* Colori Pastello (9 dots) */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Colore:</span>
            <div className="flex items-center gap-1">
              {PASTEL_COLORS.map((col) => {
                const isActive = activeNote.color.toLowerCase() === col.hex.toLowerCase();
                return (
                  <button
                    key={col.hex}
                    type="button"
                    title={col.name}
                    onClick={() => {
                      onUpdateNote({ color: col.hex });
                      if (onPopSound) onPopSound();
                    }}
                    className={`w-5 h-5 rounded-full border-2 border-white shadow-[0_0_0_1px_#d1d5db] transition-transform cursor-pointer ${
                      isActive ? 'scale-120 !shadow-[0_0_0_2px_#be185d]' : 'hover:scale-115'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Font */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Font:</span>
            <select
              value={activeNote.fontFamily}
              onChange={(e) => onUpdateNote({ fontFamily: e.target.value })}
              className="text-xs font-semibold py-0.5 px-1.5 rounded-md border border-pink-200 bg-pink-50/40 text-pink-900 cursor-pointer outline-none max-w-[110px] truncate"
            >
              <option value="'Patrick Hand', cursive">Patrick Hand</option>
              <option value="'Caveat', cursive">Caveat</option>
              <option value="'Mali', cursive">Mali</option>
              <option value="'Indie Flower', cursive">Indie Flower</option>
              <option value="'Kalam', cursive">Kalam</option>
              <option value="'Comfortaa', cursive">Comfortaa</option>
              <option value="'Comic Neue', cursive">Comic Neue</option>
              <option value="'Gaegu', cursive">Gaegu</option>
              <option value="'Architects Daughter', cursive">Architects</option>
              <option value="'Cherry Bomb One', cursive">Cherry Bomb</option>
              <option value="'Itim', cursive">Itim</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Quicksand', sans-serif">Quicksand</option>
            </select>
          </div>

          {/* Misura */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Misura:</span>
            <select
              value={activeNote.fontSize || '16px'}
              onChange={(e) => onUpdateNote({ fontSize: e.target.value })}
              className="text-xs font-semibold py-0.5 px-1 rounded-md border border-pink-200 bg-pink-50/40 text-pink-900 cursor-pointer outline-none"
            >
              <option value="13px">13px</option>
              <option value="16px">16px</option>
              <option value="19px">19px</option>
              <option value="23px">23px</option>
            </select>
          </div>

          {/* Allinea */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Allinea:</span>
            <div className="inline-flex rounded-md border border-pink-200 p-0.5 bg-pink-50/40">
              <button
                type="button"
                onClick={() => onUpdateNote({ textAlign: 'left' })}
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  activeNote.textAlign === 'left' ? 'bg-pink-600 text-white' : 'text-pink-900'
                }`}
              >
                ⬅
              </button>
              <button
                type="button"
                onClick={() => onUpdateNote({ textAlign: 'center' })}
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  activeNote.textAlign === 'center' ? 'bg-pink-600 text-white' : 'text-pink-900'
                }`}
              >
                ⬛
              </button>
              <button
                type="button"
                onClick={() => onUpdateNote({ textAlign: 'right' })}
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  activeNote.textAlign === 'right' ? 'bg-pink-600 text-white' : 'text-pink-900'
                }`}
              >
                ➡
              </button>
            </div>
          </div>

          {/* Trama */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Trama:</span>
            <select
              value={activeNote.pattern}
              onChange={(e) => onUpdateNote({ pattern: e.target.value as PatternType })}
              className="text-xs font-semibold py-0.5 px-1.5 rounded-md border border-pink-200 bg-pink-50/40 text-pink-900 cursor-pointer outline-none"
            >
              <option value="none">Liscia</option>
              <option value="ruled">Righe</option>
              <option value="grid">Quadretti</option>
              <option value="dots">Puntini</option>
            </select>
          </div>

          {/* Piega */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">Piega:</span>
            <select
              value={activeNote.corner}
              onChange={(e) => onUpdateNote({ corner: e.target.value as CornerType })}
              className="text-xs font-semibold py-0.5 px-1.5 rounded-md border border-pink-200 bg-pink-50/40 text-pink-900 cursor-pointer outline-none"
            >
              <option value="none">Nessuna</option>
              <option value="tl">Alto Sx</option>
              <option value="tr">Alto Dx</option>
            </select>
          </div>

          <div className="w-[1px] h-4 bg-pink-200 mx-0.5" />

          {/* Duplica */}
          <button
            type="button"
            onClick={onDuplicate}
            className="px-2 py-0.5 text-xs font-bold rounded-md bg-pink-50 border border-pink-200 text-pink-800 hover:bg-pink-100 transition cursor-pointer shrink-0"
            title="Duplica nota"
          >
            📋 Duplica
          </button>

          {/* Elimina */}
          <button
            type="button"
            onClick={onDelete}
            className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition cursor-pointer shrink-0"
            title="Elimina nota"
          >
            🗑️ Elimina
          </button>

          {/* Chiudi deselezione */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-5 h-5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold transition flex items-center justify-center text-xs cursor-pointer shrink-0"
              title="Deseleziona nota"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
};
