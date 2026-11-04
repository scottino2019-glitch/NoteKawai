import React from 'react';

export const SVGS: Record<string, string> = {
  cherries: `
    <svg viewBox="0 0 38 32" width="36" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17C12 10 15 5 21 2C19 6 18 11 18 17" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 17C24 11 22 6 20 2" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="23" cy="3" rx="3.5" ry="1.8" fill="#22c55e" transform="rotate(-20 23 3)"/>
      <circle cx="11" cy="20" r="7.5" fill="#f87171" stroke="#dc2626" stroke-width="1.2"/>
      <ellipse cx="9" cy="18" rx="1.5" ry="2.2" fill="#ffffff" opacity="0.8" transform="rotate(-30 9 18)"/>
      <circle cx="9.5" cy="20.5" r="1" fill="#450a0a"/>
      <circle cx="13" cy="20.5" r="1" fill="#450a0a"/>
      <path d="M9.5 22Q11.2 23.5 13 22" stroke="#450a0a" stroke-width="1" stroke-linecap="round" fill="none"/>
      <circle cx="25" cy="20" r="7.5" fill="#fb7185" stroke="#e11d48" stroke-width="1.2"/>
      <ellipse cx="23" cy="18" rx="1.5" ry="2.2" fill="#ffffff" opacity="0.8" transform="rotate(-30 23 18)"/>
      <circle cx="23.5" cy="20.5" r="1" fill="#450a0a"/>
      <circle cx="27" cy="20.5" r="1" fill="#450a0a"/>
      <path d="M23.5 22Q25.2 23.5 27 22" stroke="#450a0a" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  bee: `
    <svg viewBox="0 0 34 34" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="10" rx="5" ry="8" fill="#bae6fd" opacity="0.75" stroke="#7dd3fc" transform="rotate(-35 12 10)"/>
      <ellipse cx="19" cy="9" rx="4.5" ry="7.5" fill="#e0f2fe" opacity="0.75" stroke="#7dd3fc" transform="rotate(25 19 9)"/>
      <ellipse cx="17" cy="19" rx="10" ry="7.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/>
      <path d="M14 12V26M19 12V26" stroke="#1f2937" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="10" cy="18" r="1.2" fill="#1f2937"/>
      <path d="M8.5 20.5Q10 22 11.5 20.5" stroke="#1f2937" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  cat: `
    <svg viewBox="0 0 34 34" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11L11 4L16 9" fill="#fed7aa" stroke="#ea580c" stroke-width="1.2"/>
      <path d="M18 9L23 4L27 11" fill="#fed7aa" stroke="#ea580c" stroke-width="1.2"/>
      <circle cx="17" cy="17" r="10" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>
      <circle cx="13" cy="16" r="1.2" fill="#1f2937"/>
      <circle cx="21" cy="16" r="1.2" fill="#1f2937"/>
      <polygon points="16,18 18,18 17,19.5" fill="#f43f5e"/>
      <path d="M15 21Q17 22 19 21" stroke="#1f2937" stroke-width="1" stroke-linecap="round" fill="none"/>
      <rect x="22" y="18" width="3.5" height="11" rx="1" fill="#38bdf8" transform="rotate(-30 22 18)"/>
    </svg>
  `,
  pens: `
    <svg viewBox="0 0 54 28" width="50" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="7" width="9" height="18" rx="2.5" fill="#67e8f9" stroke="#0891b2" stroke-width="1"/>
      <circle cx="7.5" cy="12" r="0.9" fill="#164e63"/>
      <circle cx="11.5" cy="12" r="0.9" fill="#164e63"/>
      <path d="M7.5 15Q9.5 17 11.5 15" stroke="#164e63" stroke-width="0.9" stroke-linecap="round" fill="none"/>
      <rect x="20" y="4" width="9" height="21" rx="2.5" fill="#f472b6" stroke="#db2777" stroke-width="1"/>
      <circle cx="22.5" cy="10" r="0.9" fill="#831843"/>
      <circle cx="26.5" cy="10" r="0.9" fill="#831843"/>
      <path d="M22.5 13Q24.5 15 26.5 13" stroke="#831843" stroke-width="0.9" stroke-linecap="round" fill="none"/>
      <rect x="35" y="8" width="9" height="17" rx="2.5" fill="#fde047" stroke="#ca8a04" stroke-width="1"/>
      <circle cx="37.5" cy="13" r="0.9" fill="#713f12"/>
      <circle cx="41.5" cy="13" r="0.9" fill="#713f12"/>
      <path d="M37.5 16Q39.5 18 41.5 16" stroke="#713f12" stroke-width="0.9" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  sparkle: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="17,2 21.5,12 32,13 24,20.5 26.5,31 17,25.5 7.5,31 10,20.5 2,13 12.5,12" fill="#fde047" stroke="#ca8a04" stroke-width="1.3"/>
      <circle cx="13" cy="19" r="1.5" fill="#f43f5e" opacity="0.6"/>
      <circle cx="21" cy="19" r="1.5" fill="#f43f5e" opacity="0.6"/>
      <circle cx="14" cy="17" r="1" fill="#713f12"/>
      <circle cx="20" cy="17" r="1" fill="#713f12"/>
      <path d="M15 19.5Q17 21.5 19 19.5" stroke="#713f12" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  strawberry: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3C15 6 12 7 9 7C12 9 14 10 17 9C20 10 22 9 25 7C22 7 19 6 17 3Z" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
      <path d="M17 30C10 30 7 21 8 13C8 10 11 8 17 8C23 8 26 10 26 13C27 21 24 30 17 30Z" fill="#fb7185" stroke="#e11d48" stroke-width="1.3"/>
      <circle cx="12" cy="14" r="0.7" fill="#fef08a"/>
      <circle cx="22" cy="14" r="0.7" fill="#fef08a"/>
      <circle cx="17" cy="26" r="0.7" fill="#fef08a"/>
      <circle cx="14" cy="19" r="1" fill="#881337"/>
      <circle cx="20" cy="19" r="1" fill="#881337"/>
      <path d="M15.5 22Q17 23.5 18.5 22" stroke="#881337" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  flower: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fbcfe8" stroke="#f472b6" stroke-width="1">
        <circle cx="17" cy="8" r="5.5"/>
        <circle cx="25" cy="14" r="5.5"/>
        <circle cx="22" cy="23" r="5.5"/>
        <circle cx="12" cy="23" r="5.5"/>
        <circle cx="9" cy="14" r="5.5"/>
      </g>
      <circle cx="17" cy="17" r="5" fill="#fde047" stroke="#ca8a04" stroke-width="1"/>
      <circle cx="15.5" cy="16" r="0.8" fill="#713f12"/>
      <circle cx="18.5" cy="16" r="0.8" fill="#713f12"/>
      <path d="M16 18Q17 19 18 18" stroke="#713f12" stroke-width="0.8" stroke-linecap="round" fill="none"/>
    </svg>
  `,
  boba: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 8L12 28C12 30 14 31 17 31C20 31 22 30 22 28L24 8" fill="#fed7aa" stroke="#ea580c" stroke-width="1.3"/>
      <ellipse cx="17" cy="8" rx="7" ry="2.5" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>
      <line x1="17" y1="2" x2="17" y2="10" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="14" cy="25" r="1.5" fill="#7c2d12"/>
      <circle cx="17" cy="27" r="1.5" fill="#7c2d12"/>
      <circle cx="20" cy="25" r="1.5" fill="#7c2d12"/>
    </svg>
  `,
  dog: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9" cy="16" rx="3.5" ry="7" fill="#b45309" transform="rotate(20 9 16)"/>
      <ellipse cx="25" cy="16" rx="3.5" ry="7" fill="#b45309" transform="rotate(-20 25 16)"/>
      <circle cx="17" cy="17" r="10" fill="#fef3c7" stroke="#b45309" stroke-width="1.3"/>
      <circle cx="13" cy="15" r="1.2" fill="#451a03"/>
      <circle cx="21" cy="15" r="1.2" fill="#451a03"/>
      <ellipse cx="17" cy="19" rx="2" ry="1.4" fill="#451a03"/>
    </svg>
  `,
  bunny: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="7" rx="3.5" ry="8" fill="#ffffff" stroke="#f472b6" stroke-width="1.2"/>
      <ellipse cx="22" cy="7" rx="3.5" ry="8" fill="#ffffff" stroke="#f472b6" stroke-width="1.2"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="5" fill="#fce7f3"/>
      <ellipse cx="22" cy="7" rx="1.8" ry="5" fill="#fce7f3"/>
      <circle cx="17" cy="20" r="9.5" fill="#ffffff" stroke="#f472b6" stroke-width="1.2"/>
      <circle cx="13.5" cy="19" r="1.2" fill="#831843"/>
      <circle cx="20.5" cy="19" r="1.2" fill="#831843"/>
      <polygon points="16,21.5 18,21.5 17,22.8" fill="#ec4899"/>
    </svg>
  `,
  ribbon: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="3.5" fill="#f43f5e"/>
      <path d="M14 17C9 12 6 15 8 19C10 23 14 18 14 17Z" fill="#fb7185" stroke="#e11d48" stroke-width="1"/>
      <path d="M20 17C25 12 28 15 26 19C24 23 20 18 20 17Z" fill="#fb7185" stroke="#e11d48" stroke-width="1"/>
      <path d="M15 20L11 30M19 20L23 30" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  cake: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="16" width="20" height="13" rx="2" fill="#fbcfe8" stroke="#db2777" stroke-width="1.2"/>
      <path d="M7 21C10 23 14 19 17 21C20 23 24 19 27 21" stroke="#db2777" stroke-width="1.5" fill="none"/>
      <rect x="16" y="9" width="2" height="7" fill="#38bdf8"/>
      <circle cx="17" cy="8" r="1.5" fill="#f59e0b"/>
    </svg>
  `,
  rainbow: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 25A11 11 0 0 1 28 25" stroke="#f43f5e" stroke-width="2.5" fill="none"/>
      <path d="M9 25A8 8 0 0 1 25 25" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
      <path d="M12 25A5 5 0 0 1 22 25" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
    </svg>
  `,
  zany: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="14.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.3"/>
      <circle cx="11.5" cy="13.5" r="4.5" fill="#ffffff" stroke="#713f12" stroke-width="1"/>
      <circle cx="12" cy="14" r="2.2" fill="#1f2937"/>
      <circle cx="13" cy="13" r="0.9" fill="#ffffff"/>
      <path d="M19 15L23 11L25 14" stroke="#713f12" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 20Q17 29 24 20" stroke="#713f12" stroke-width="1.5" fill="#450a0a"/>
      <path d="M14 23C14 27 18 28 19 25C19 23 15 22 14 23Z" fill="#f43f5e" stroke="#be185d" stroke-width="0.8"/>
    </svg>
  `,
  newspaper: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="22" height="23" rx="2" fill="#fdfbf7" stroke="#64748b" stroke-width="1.2" transform="rotate(-6 16 17)"/>
      <rect x="8" y="10" width="16" height="4" fill="#3b82f6" opacity="0.85" rx="1" transform="rotate(-6 16 12)"/>
      <rect x="9" y="16" width="6" height="6" fill="#fbcfe8" stroke="#db2777" stroke-width="0.6" transform="rotate(-6 12 19)"/>
      <line x1="17" y1="17" x2="23" y2="16.3" stroke="#475569" stroke-width="1" stroke-linecap="round"/>
      <line x1="17" y1="20" x2="23" y2="19.3" stroke="#475569" stroke-width="1" stroke-linecap="round"/>
      <line x1="9" y1="24" x2="23" y2="22.5" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
    </svg>
  `,
  web: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="13.5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
      <ellipse cx="17" cy="17" rx="6.5" ry="13.5" stroke="#38bdf8" stroke-width="1.2" fill="none"/>
      <line x1="3.5" y1="17" x2="30.5" y2="17" stroke="#0284c7" stroke-width="1.2"/>
      <path d="M5.5 11C9 13 25 13 28.5 11" stroke="#38bdf8" stroke-width="1" fill="none"/>
      <path d="M5.5 23C9 21 25 21 28.5 23" stroke="#38bdf8" stroke-width="1" fill="none"/>
      <circle cx="26" cy="8" r="1.5" fill="#fde047"/>
    </svg>
  `,
  alien: `
    <svg viewBox="0 0 34 34" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="8" width="20" height="15" rx="3" fill="#c084fc" stroke="#7e22ce" stroke-width="1.2"/>
      <rect x="10" y="4" width="2.5" height="4" fill="#a855f7" rx="1"/>
      <rect x="21.5" y="4" width="2.5" height="4" fill="#a855f7" rx="1"/>
      <rect x="10" y="12" width="4" height="4" fill="#ffffff" rx="1"/>
      <rect x="20" y="12" width="4" height="4" fill="#ffffff" rx="1"/>
      <rect x="11.5" y="13.5" width="2" height="2" fill="#4c1d95"/>
      <rect x="20.5" y="13.5" width="2" height="2" fill="#4c1d95"/>
      <rect x="14" y="18" width="6" height="2" fill="#4c1d95" rx="0.5"/>
      <rect x="8" y="23" width="3" height="4" fill="#a855f7" rx="1"/>
      <rect x="15.5" y="23" width="3" height="4" fill="#a855f7" rx="1"/>
      <rect x="23" y="23" width="3" height="4" fill="#a855f7" rx="1"/>
    </svg>
  `,
};

export const STICKER_EMOJIS: Record<string, string> = {
  cherries: '🍒',
  bee: '🐝',
  cat: '🐱',
  pens: '✏️',
  sparkle: '⭐',
  strawberry: '🍓',
  flower: '🌼',
  boba: '🧋',
  dog: '🐶',
  bunny: '🐰',
  ribbon: '🎀',
  cake: '🍰',
  rainbow: '🌈',
  zany: '🤪',
  newspaper: '📰',
  web: '🌐',
  alien: '👾',
  pizza: '🍕',
  coffe: '☕'
};

export const HeartShapeSVG: React.FC<{ color?: string }> = ({ color = '#fbcfe8' }) => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0" 
    viewBox="0 0 135 125" 
    preserveAspectRatio="none" 
    fill={color}
  >
    <path d="M67.5 116C67.5 116 10 78 10 38C10 19 24 8 41 8C52 8 62 14 67.5 23C73 14 83 8 94 8C111 8 125 19 125 38C125 78 67.5 116 67.5 116Z" />
  </svg>
);

export const DaisyShapeSVG: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0" 
    viewBox="0 0 130 130" 
    preserveAspectRatio="none"
  >
    <g fill={color}>
      <circle cx="65" cy="20" r="17"/>
      <circle cx="93" cy="29" r="17"/>
      <circle cx="110" cy="56" r="17"/>
      <circle cx="105" cy="87" r="17"/>
      <circle cx="83" cy="108" r="17"/>
      <circle cx="49" cy="108" r="17"/>
      <circle cx="25" cy="87" r="17"/>
      <circle cx="20" cy="56" r="17"/>
      <circle cx="37" cy="29" r="17"/>
    </g>
    <circle cx="65" cy="65" r="28" fill="#eab308"/>
  </svg>
);
