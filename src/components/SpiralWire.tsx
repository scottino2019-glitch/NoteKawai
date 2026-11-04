import React from 'react';

export const SpiralWire: React.FC = () => {
  return (
    <div className="w-9 flex flex-col justify-evenly items-center z-40 pointer-events-none self-stretch py-3">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="relative w-11 h-4 flex items-center justify-between">
          {/* Hole punch left */}
          <div className="w-2 h-2 rounded-full bg-[#281721] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]" />
          {/* Gold metallic ring loop */}
          <div className="absolute left-[3px] right-[3px] top-[1px] h-3.5 border-[3.5px] border-[#f8c325] border-b-[#d99a0a] rounded-xl shadow-[0_3px_5px_rgba(0,0,0,0.3)] bg-gradient-to-t from-transparent via-white/20 to-transparent" />
          {/* Hole punch right */}
          <div className="w-2 h-2 rounded-full bg-[#281721] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]" />
        </div>
      ))}
    </div>
  );
};
