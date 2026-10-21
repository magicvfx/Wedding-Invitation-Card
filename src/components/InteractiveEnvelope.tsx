import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WaxSealButton } from './WeddingOrnaments';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface InteractiveEnvelopeProps {
  brideName: string;
  groomName: string;
  brideInitials: string;
  groomInitials: string;
  weddingDate: string;
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  brideName,
  groomName,
  brideInitials,
  groomInitials,
  weddingDate,
  guestName,
  onOpen,
  isOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const formattedDate = new Date(weddingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleBreakSeal = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    // Celebratory romantic confetti burst (gold, champagne, petal blush)
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F5E2B3', '#F9D5D5', '#EADBC8', '#B784A7'],
      scalar: 1.1,
    });

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-6 px-4">
      {/* Outer Envelope Wrapper */}
      <div className="relative bg-[#F4EFE6] rounded-2xl p-6 sm:p-10 envelope-shadow border border-[#E5DAC8] overflow-hidden transition-all duration-700">
        {/* Subtle linen texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8C7853_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Vintage Postmark & Airmail Stamp */}
        <div className="flex items-start justify-between mb-8 sm:mb-12 relative z-10">
          {/* Postmark stamp */}
          <div className="border border-[#B39B7D] rounded-full w-20 h-20 p-1 flex flex-col items-center justify-center text-center rotate-[-8deg] opacity-75 select-none">
            <span className="text-[9px] font-cinzel uppercase tracking-widest text-[#786142]">Love Mail</span>
            <span className="text-[8px] font-sans text-[#786142]">{formattedDate.split(',')[0]}</span>
            <span className="text-[8px] font-serif uppercase tracking-wider text-[#786142]">Napa Valley</span>
          </div>

          {/* Golden postage stamp */}
          <div className="relative w-16 h-20 bg-[#FAF7F0] border-2 border-dashed border-[#C5A059] shadow-xs p-1.5 flex flex-col items-center justify-between text-center select-none rotate-[3deg]">
            <span className="text-[8px] font-cinzel text-[#8A6D3B] tracking-wider uppercase">First Class</span>
            <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]/30" />
            <span className="text-[8px] font-serif italic text-[#8A6D3B]">Forever Love</span>
          </div>
        </div>

        {/* Recipient Address Calligraphy Card */}
        <div className="relative z-10 text-center my-6 py-6 px-4 border-y border-[#DFCDB3]/80 bg-[#FAF7F2]/60 backdrop-blur-xs">
          <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#8C755E] mb-2">
            Cordially Invited
          </p>
          <h2 className="font-script text-3xl sm:text-4xl text-[#3A2D23] px-2 py-1 leading-snug">
            {guestName || 'Our Cherished Family & Friends'}
          </h2>
          <p className="text-xs font-serif italic text-[#7D6B58] mt-1">
            To share in the joyful union of
          </p>
          <p className="font-serif text-lg sm:text-xl font-normal text-[#292524] tracking-wide mt-2">
            {brideName} &amp; {groomName}
          </p>
        </div>

        {/* Wax Seal & Open Trigger */}
        <div className="relative z-20 flex flex-col items-center justify-center mt-8 pt-2 pb-2">
          <div className="relative">
            <WaxSealButton
              initials={`${brideInitials}&${groomInitials}`}
              onClick={handleBreakSeal}
              isBroken={isOpen}
            />
            {/* Shimmer pulse ring around seal */}
            {!isOpen && (
              <span className="absolute -inset-2 rounded-full border border-[#D4AF37]/50 animate-ping pointer-events-none opacity-40"></span>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBreakSeal}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-cinzel tracking-widest uppercase text-[#5A4532] hover:text-[#2A1D13] bg-[#EFE7D8]/80 hover:bg-[#EFE7D8] border border-[#D5C4AB] rounded-full transition-all cursor-pointer shadow-xs hover:shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isOpen ? 'Invitation Unsealed' : 'Click to Break Seal & Open'}</span>
            </button>
            <p className="text-[11px] text-[#8C7A68] mt-2 font-sans">
              Tap the wax seal to unveil the wedding suite
            </p>
          </div>
        </div>

        {/* Envelope bottom triangular fold lines */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-20 border-t border-[#A89274]"></div>
      </div>
    </div>
  );
};
