import React from 'react';

interface StickersDrawerProps {
  onSelectSticker: (stickerKey: string) => void;
}

const STICKERS_LIST = [
  { key: 'cherries', icon: '🍒', label: 'Ciliegine' },
  { key: 'bee', icon: '🐝', label: 'Apetta' },
  { key: 'cat', icon: '🐱', label: 'Gattino' },
  { key: 'pens', icon: '✏️', label: 'Matite' },
  { key: 'sparkle', icon: '⭐', label: 'Stellina' },
  { key: 'strawberry', icon: '🍓', label: 'Fragolina' },
  { key: 'flower', icon: '🌼', label: 'Margherita' },
  { key: 'boba', icon: '🧋', label: 'Boba Tea' },
  { key: 'dog', icon: '🐶', label: 'Cagnolino' },
  { key: 'bunny', icon: '🐰', label: 'Coniglietto' },
  { key: 'ribbon', icon: '🎀', label: 'Fiocco' },
  { key: 'cake', icon: '🍰', label: 'Dolcetto' },
  { key: 'rainbow', icon: '🌈', label: 'Arcobaleno' },
  { key: 'zany', icon: '🤪', label: 'Zany Face' },
  { key: 'newspaper', icon: '📰', label: 'Giornale' },
  { key: 'web', icon: '🌐', label: 'Web' },
  { key: 'alien', icon: '👾', label: 'Alien' },
  { key: 'pizza', icon: '🍕', label: 'Pizza' },
  { key: 'coffe', icon: '☕', label: 'Caffè' },
  { key: 'none', icon: '🚫', label: 'Rimuovi sticker' },
];

export const StickersDrawer: React.FC<StickersDrawerProps> = ({ onSelectSticker }) => {
  return (
    <div className="fixed bottom-3 right-3 max-w-[94vw] bg-white/95 backdrop-blur-md border-2 border-pink-200 rounded-2xl px-3 py-1.5 shadow-xl flex items-center gap-1.5 z-40 overflow-x-auto scrollbar-none">
      <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider shrink-0 select-none mr-1">
        Stickers Pack:
      </span>
      {STICKERS_LIST.map((item) => (
        <button
          key={item.key}
          type="button"
          title={item.label}
          onClick={() => onSelectSticker(item.key)}
          className={`p-1 text-xl hover:scale-130 active:scale-95 transition-transform shrink-0 cursor-pointer ${
            item.key === 'none' ? 'opacity-60 text-sm' : ''
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};
