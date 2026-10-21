import React from 'react';

// Elegant Botanical Filigree Divider
export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]"></div>
    <svg className="w-5 h-5 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" opacity="0.85" />
    </svg>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]"></div>
  </div>
);

// Botanical Corner Flourish for luxury stationery framing
export const CornerFlourish: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position,
}) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-left':
        return 'top-3 left-3';
      case 'top-right':
        return 'top-3 right-3 rotate-90';
      case 'bottom-right':
        return 'bottom-3 right-3 rotate-180';
      case 'bottom-left':
        return 'bottom-3 left-3 -rotate-90';
    }
  };

  return (
    <div className={`absolute pointer-events-none select-none text-[#C5A059]/40 ${getTransforms()}`}>
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 44 C 4 20, 20 4, 44 4" strokeLinecap="round" />
        <path d="M4 36 C 4 16, 16 4, 36 4" strokeLinecap="round" strokeDasharray="1 3" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <path d="M14 8 C 18 10, 20 14, 18 18" strokeLinecap="round" />
        <path d="M8 14 C 10 18, 14 20, 18 18" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Monogram Crest with Botanical Laurel Wreath
export const MonogramCrest: React.FC<{
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: string;
}> = ({ initials, size = 'md' }) => {
  const dimensions = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${dimensions} mx-auto select-none`}>
      {/* Laurel wreath background */}
      <svg
        className="absolute inset-0 w-full h-full text-[#C5A059] opacity-80"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Left branch */}
        <path
          d="M 50,92 C 26,88 14,68 18,44 C 20,32 30,16 48,10"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path d="M 22,65 C 16,63 15,55 21,57" fill="currentColor" />
        <path d="M 17,48 C 11,46 12,38 18,41" fill="currentColor" />
        <path d="M 23,32 C 18,29 20,22 26,26" fill="currentColor" />
        <path d="M 34,19 C 30,15 34,9 39,14" fill="currentColor" />

        {/* Right branch */}
        <path
          d="M 50,92 C 74,88 86,68 82,44 C 80,32 70,16 52,10"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <path d="M 78,65 C 84,63 85,55 79,57" fill="currentColor" />
        <path d="M 83,48 C 89,46 88,38 82,41" fill="currentColor" />
        <path d="M 77,32 C 82,29 80,22 74,26" fill="currentColor" />
        <path d="M 66,19 C 70,15 66,9 61,14" fill="currentColor" />

        {/* Bottom ribbon bow */}
        <circle cx="50" cy="91" r="2.5" fill="currentColor" />
      </svg>
      {/* Center Initials */}
      <span className="font-serif font-light tracking-widest text-[#8A6D3B] z-10 pt-0.5">
        {initials}
      </span>
    </div>
  );
};

// Wax Seal Component (Interactive / Visual)
export const WaxSealButton: React.FC<{
  initials: string;
  onClick: () => void;
  isBroken?: boolean;
}> = ({ initials, onClick, isBroken = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isBroken}
      className={`group relative flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/50 ${
        isBroken ? 'opacity-0 scale-90 pointer-events-none' : 'hover:scale-105 active:scale-95'
      }`}
      aria-label="Break wax seal to open invitation card"
      title="Click to break wax seal"
    >
      {/* Irregular organic wax edge border */}
      <div className="absolute inset-0 rounded-full wax-seal border-2 border-[#6B140E]/80 transition-transform group-hover:rotate-12 duration-700"></div>

      {/* Wax drip details */}
      <div className="absolute -top-1 left-3 w-4 h-3 rounded-full bg-[#8A1C14] opacity-80 blur-[0.5px]"></div>
      <div className="absolute -bottom-1 right-3 w-5 h-3 rounded-full bg-[#590F0A] opacity-90 blur-[0.5px]"></div>
      <div className="absolute -left-1.5 top-6 w-3 h-4 rounded-full bg-[#701610] opacity-80 blur-[0.5px]"></div>

      {/* Inner embossed ring */}
      <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#A0221B] to-[#450906] shadow-inner">
        <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#FCE6A8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {initials}
        </span>
      </div>
    </button>
  );
};
