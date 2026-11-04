import React from 'react';
import { ShapeType } from '../types';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShape: (shape: ShapeType) => void;
}

const SHAPE_OPTIONS: { shape: ShapeType; icon: string; name: string }[] = [
  { shape: 'square', icon: '🟨', name: 'Classico' },
  { shape: 'heart', icon: '💖', name: 'Cuoricino' },
  { shape: 'daisy', icon: '🌼', name: 'Margherita' },
  { shape: 'lined', icon: '📝', name: 'A Righe' },
  { shape: 'checklist', icon: '✅', name: 'Checklist' },
  { shape: 'pennant', icon: '🎏', name: 'Bandierina' },
  { shape: 'bubble', icon: '💬', name: 'Fumetto' },
];

export const NewNoteModal: React.FC<NewNoteModalProps> = ({ isOpen, onClose, onSelectShape }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border-2 border-pink-100 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-['Mali',cursive] text-lg font-bold text-pink-700">
            Scegli la forma del nuovo Post-it ✨
          </h3>
          <button 
            type="button" 
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {SHAPE_OPTIONS.map((opt) => (
            <button
              key={opt.shape}
              type="button"
              onClick={() => {
                onSelectShape(opt.shape);
                onClose();
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-pink-50/70 border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-100 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
            >
              <span className="text-3xl">{opt.icon}</span>
              <span className="text-xs font-bold text-pink-900">{opt.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};
