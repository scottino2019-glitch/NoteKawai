import React from 'react';
import { NoteItem, ShapeType, PatternType, CornerType } from '../types';

interface NoteToolbarProps {
  activeNote: NoteItem | null;
  onUpdateNote: (updates: Partial<NoteItem>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onPopSound?: () => void;
}

const PASTEL_COLORS = [
  { hex: '#fef08a', name: 'Giallo Burro' },
  { hex: '#ffffff', name: 'Bianco Carta' },
  { hex: '#fbcfe8', name: 'Rosa Bubblegum' },
  { hex: '#ffe4e6', name: 'Rosa Cipria' },
  { hex: '#a7f3d0', name: 'Menta' },
  { hex: '#bbf7d0', name: 'Salvia' },
  { hex: '#ddd6fe', name: 'Lavanda' },
  { hex: '#bae6fd', name: 'Azzurro Cielo' },
  { hex: '#fed7aa', name: 'Pesca' },
];

export const NoteToolbar: React.FC<NoteToolbarProps> = ({
  activeNote,
  onUpdateNote,
  onDuplicate,
  onDelete,
  onPopSound,
}) => {
  if (!activeNote) {
    return (
      <div className="bg-white border-b-2 border-pink-200 px-4 py-2 min-h-[48px] flex items-center shadow-xs">
        <div className="text-gray-400 text-xs font-semibold flex items-center gap-2">
          <span>👆</span>
          <span>Tocca qualsiasi nota per personalizzare forma, font, colori pastello, angolo e trama!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b-2 border-pink-200 px-3 py-2 min-h-[48px] flex items-center gap-3 overflow-x-auto shadow-xs z-30 scrollbar-thin">
      {/* Forma */}
      <div className="flex items-center gap-1.5 shrink-0">
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
          className="text-xs font-semibold py-1 px-2 rounded-lg border border-pink-200 bg-white text-pink-900 cursor-pointer outline-none"
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

      {/* Font */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] uppercase font-bold text-gray-400">Font:</span>
        <select
          value={activeNote.fontFamily}
          onChange={(e) => onUpdateNote({ fontFamily: e.target.value })}
          className="text-xs font-semibold py-1 px-2 rounded-lg border border-pink-200 bg-white text-pink-900 cursor-pointer outline-none max-w-[130px]"
        >
          <option value="'Patrick Hand', cursive">Patrick Hand</option>
          <option value="'Caveat', cursive">Caveat (Corsivo)</option>
          <option value="'Mali', cursive">Mali (Kawaii)</option>
          <option value="'Indie Flower', cursive">Indie Flower</option>
          <option value="'Kalam', cursive">Kalam (Penna)</option>
          <option value="'Comfortaa', cursive">Comfortaa</option>
          <option value="'Comic Neue', cursive">Comic Neue</option>
          <option value="'Gaegu', cursive">Gaegu</option>
          <option value="'Architects Daughter', cursive">Architects</option>
          <option value="'Cherry Bomb One', cursive">Cherry Bomb</option>
          <option value="'Itim', cursive">Itim</option>
          <option value="'Pacifico', cursive">Pacifico</option>
          <option value="'Quicksand', sans-serif">Quicksand</option>
          <option value="'Shadows Into Light', cursive">Shadows</option>
        </select>
      </div>

      {/* Misura */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] uppercase font-bold text-gray-400">Size:</span>
        <select
          value={activeNote.fontSize}
          onChange={(e) => onUpdateNote({ fontSize: e.target.value })}
          className="text-xs font-semibold py-1 px-2 rounded-lg border border-pink-200 bg-white text-pink-900 cursor-pointer outline-none"
        >
          <option value="13px">13px</option>
          <option value="15px">15px</option>
          <option value="17px">17px</option>
          <option value="20px">20px</option>
        </select>
      </div>

      {/* Allinea */}
      <div className="flex items-center gap-1 shrink-0">
        {(['left', 'center', 'right'] as const).map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => onUpdateNote({ textAlign: align })}
            className={`px-2 py-1 text-xs rounded border transition-all ${
              activeNote.textAlign === align
                ? 'bg-pink-600 text-white border-pink-700 shadow-xs'
                : 'bg-white text-pink-800 border-pink-200 hover:bg-pink-50'
            }`}
          >
            {align === 'left' ? '⬅' : align === 'center' ? '⬛' : '➡'}
          </button>
        ))}
      </div>

      {/* Colori Pastello */}
      <div className="flex items-center gap-1.5 shrink-0">
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
                className={`w-5 h-5 rounded-full border border-gray-300 transition-transform ${
                  isActive ? 'ring-2 ring-pink-600 scale-110 shadow-sm' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: col.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Trama */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[10px] uppercase font-bold text-gray-400">Trama:</span>
        {(['none', 'ruled', 'grid', 'dots'] as PatternType[]).map((pat) => (
          <button
            key={pat}
            type="button"
            onClick={() => onUpdateNote({ pattern: pat })}
            className={`px-2 py-1 text-[11px] font-bold rounded border transition-all ${
              activeNote.pattern === pat
                ? 'bg-pink-600 text-white border-pink-700'
                : 'bg-white text-pink-800 border-pink-200 hover:bg-pink-50'
            }`}
          >
            {pat === 'none' ? 'Liscia' : pat === 'ruled' ? 'Righe' : pat === 'grid' ? 'Quadretti' : 'Puntini'}
          </button>
        ))}
      </div>

      {/* Angolo Piega */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[10px] uppercase font-bold text-gray-400">Piega:</span>
        {(['none', 'tl', 'tr'] as CornerType[]).map((crn) => (
          <button
            key={crn}
            type="button"
            onClick={() => onUpdateNote({ corner: crn })}
            className={`px-2 py-1 text-[11px] font-bold rounded border transition-all ${
              activeNote.corner === crn
                ? 'bg-pink-600 text-white border-pink-700'
                : 'bg-white text-pink-800 border-pink-200 hover:bg-pink-50'
            }`}
          >
            {crn === 'none' ? 'No' : crn === 'tl' ? 'Alto Sx' : 'Alto Dx'}
          </button>
        ))}
      </div>

      {/* Duplicate / Delete */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <button
          type="button"
          onClick={onDuplicate}
          className="px-2.5 py-1 text-xs font-bold rounded-md bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 transition cursor-pointer"
        >
          📋 Duplica
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
        >
          🗑️ Elimina
        </button>
      </div>
    </div>
  );
};
