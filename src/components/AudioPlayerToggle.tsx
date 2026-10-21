import React, { useState, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayerToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMusic = () => {
    const active = weddingAudio.toggle();
    setIsPlaying(active);
    setHasInteracted(true);
  };

  useEffect(() => {
    // Keep in sync
    setIsPlaying(weddingAudio.getIsPlaying());
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 no-print">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border shadow-md transition-all duration-300 cursor-pointer backdrop-blur-md ${
          isPlaying
            ? 'bg-[#2B2117]/90 text-[#F5E2B3] border-[#C5A059]/60 hover:bg-[#2B2117]'
            : 'bg-white/90 text-[#544332] border-[#D5C29D] hover:bg-white hover:text-[#2B2117]'
        }`}
        aria-label={isPlaying ? 'Mute ambient wedding music' : 'Play ambient wedding music'}
        title={isPlaying ? 'Mute romantic piano' : 'Play romantic piano music'}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-1 bg-[#F5E2B3] rounded-full animate-pulse h-3"></span>
              <span className="w-1 bg-[#F5E2B3] rounded-full animate-pulse h-2 delay-75"></span>
              <span className="w-1 bg-[#F5E2B3] rounded-full animate-pulse h-3.5 delay-150"></span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#8A7968]" />
          )}
        </div>

        <span className="text-[11px] font-cinzel tracking-wider uppercase whitespace-nowrap pr-1">
          {isPlaying ? 'Wedding Melody' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
