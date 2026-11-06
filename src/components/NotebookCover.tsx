import React from 'react';

interface NotebookCoverProps {
  onOpen: () => void;
  isOpening?: boolean;
}

export const NotebookCover: React.FC<NotebookCoverProps> = ({ onOpen, isOpening }) => {
  return (
    <div className="relative w-full max-w-[460px] mx-auto px-3 sm:px-4 py-6 sm:py-10 flex flex-col items-center select-none">
      {/* 3D Perspective container */}
      <div 
        style={{ perspective: '1200px' }}
        className="w-full flex justify-center"
      >
        <div 
          onClick={onOpen}
          className={`relative w-full cursor-pointer rounded-2xl shadow-2xl transition-all duration-700 ease-in-out transform hover:-translate-y-1 active:scale-98 ${
            isOpening 
              ? '-rotate-y-90 opacity-0 scale-95 origin-left' 
              : 'rotate-y-0 opacity-100 scale-100'
          }`}
          style={{
            backgroundColor: '#5d93dc',
            backgroundImage: `
              radial-gradient(#ffffff 2px, transparent 2px),
              radial-gradient(#fde047 3px, transparent 3px),
              radial-gradient(#f472b6 2px, transparent 2px)
            `,
            backgroundSize: '44px 44px, 58px 58px, 50px 50px',
            backgroundPosition: '0 0, 22px 22px, 12px 30px',
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.6), inset 0 -6px 12px rgba(0,0,0,0.35), 0 20px 35px -5px rgba(60, 20, 40, 0.3)'
          }}
          title="Tocca per aprire il quaderno"
        >
          {/* Faux leather stitch line */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-dashed border-white/40 pointer-events-none" />

          {/* Spine bar with metallic rings */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-11 rounded-l-2xl bg-gradient-to-r from-blue-700/80 via-blue-600/70 to-transparent flex flex-col justify-evenly items-center py-6 sm:py-8 shadow-inner z-10 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative w-5 sm:w-7 h-2.5 sm:h-3 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-amber-500/80" />
            ))}
          </div>

          {/* Side tabs peeking out on the right */}
          <div className="absolute -right-2.5 sm:-right-3 top-10 flex flex-col gap-1.5 sm:gap-2 z-20 pointer-events-none">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[9px] sm:text-[10px] font-extrabold rounded-r-md shadow-md">NOTE</span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[9px] sm:text-[10px] font-extrabold rounded-r-md shadow-md">SETT</span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-sky-400 to-blue-600 text-white text-[9px] sm:text-[10px] font-extrabold rounded-r-md shadow-md">DAY</span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-emerald-400 to-teal-600 text-white text-[9px] sm:text-[10px] font-extrabold rounded-r-md shadow-md">DIARY</span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] sm:text-[10px] font-extrabold rounded-r-md shadow-md">HABIT</span>
          </div>

          {/* Elastic closure band with gold star clasp */}
          <div className="absolute right-5 sm:right-7 top-0 bottom-0 w-3.5 sm:w-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 shadow-md z-15 flex items-center justify-center pointer-events-none">
            <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border-2 border-white shadow flex items-center justify-center text-[10px]">
              ⭐
            </div>
          </div>

          {/* Clean Central Cover Plaque */}
          <div className="pl-10 sm:pl-14 pr-8 sm:pr-12 py-14 sm:py-16 flex flex-col items-center text-center">
            <div className="w-full max-w-[280px] sm:max-w-xs bg-white/95 rounded-2xl p-5 sm:p-6 shadow-lg border-2 border-pink-200 flex flex-col items-center relative overflow-hidden backdrop-blur-sm">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-100 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-100 rounded-full blur-xl pointer-events-none" />

              <div className="text-3xl sm:text-4xl mb-2 drop-shadow-sm">📔</div>
              
              <h1 className="font-['Mali',cursive] text-2xl sm:text-3xl font-extrabold text-pink-600 tracking-tight leading-snug">
                Pastel Sticky Notebook
              </h1>
              
              <p className="font-['Caveat',cursive] text-lg sm:text-xl text-slate-600 mt-1">
                Planner &amp; Diario Kawaii
              </p>

              {/* Cute stickers on plaque */}
              <div className="flex items-center justify-center gap-3 mt-3 text-lg sm:text-xl">
                <span>🍒</span>
                <span>🎀</span>
                <span>🍓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
