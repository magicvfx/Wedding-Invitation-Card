import React from 'react';
import { StoryMilestone } from '../types/wedding';
import { OrnamentalDivider } from './WeddingOrnaments';
import { Heart, MapPin } from 'lucide-react';

interface LoveStoryProps {
  milestones: StoryMilestone[];
  quote: string;
}

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones, quote }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
          Our Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292524] mt-1">
          How Our Story Unfolded
        </h2>
        <OrnamentalDivider className="my-3" />
      </div>

      {/* Featured Curatorial Pull Quote */}
      {quote && (
        <div className="relative my-8 py-6 px-6 sm:px-12 text-center border-y border-[#DFCDB3]/60 bg-[#FAF7F2]/40 rounded-xl">
          <Heart className="w-5 h-5 mx-auto text-[#C5A059] opacity-75 mb-3" />
          <blockquote className="font-serif italic text-lg sm:text-xl text-[#3E342B] max-w-2xl mx-auto leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <span className="block font-cinzel text-[11px] tracking-widest uppercase text-[#8F7D6D] mt-3">
            Evelyn &amp; Julian
          </span>
        </div>
      )}

      {/* Milestones Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
        {milestones.map((item, index) => (
          <div
            key={item.id || index}
            className="flex flex-col bg-white/70 rounded-xl p-6 border border-[#E8DEC8] shadow-xs hover:border-[#D5C29D] transition-colors relative"
          >
            {/* Year Stamp */}
            <div className="flex items-center justify-between mb-3 border-b border-[#F0EAE1] pb-2">
              <span className="font-cinzel text-xs font-bold text-[#8A6D3B] tracking-widest">
                CHAPTER 0{index + 1}
              </span>
              <span className="font-serif text-lg font-medium text-[#4E3F31] tabular-nums">
                {item.year}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#292524] mb-1">
              {item.title}
            </h3>

            <p className="font-serif italic text-xs text-[#7A6B5C] mb-3">
              {item.subtitle}
            </p>

            <p className="text-xs sm:text-sm font-sans text-[#524436] leading-relaxed flex-grow">
              {item.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#8A7968] mt-4 pt-3 border-t border-[#F5EFE6]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
