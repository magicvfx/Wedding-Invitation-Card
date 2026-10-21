import React from 'react';
import { ScheduleEvent } from '../types/wedding';
import { Clock, MapPin, Coffee, Utensils, Music, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './WeddingOrnaments';

interface ScheduleTimelineProps {
  events: ScheduleEvent[];
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ events }) => {
  const renderIcon = (type: ScheduleEvent['icon']) => {
    switch (type) {
      case 'coffee':
        return <Coffee className="w-4 h-4 text-[#8A6D3B]" />;
      case 'ring':
        return (
          <svg className="w-4 h-4 text-[#8A6D3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="14" r="7" />
            <path d="M12 7V4M10 5L14 3" />
          </svg>
        );
      case 'cocktail':
        return (
          <svg className="w-4 h-4 text-[#8A6D3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 22h8M12 15v7M3 3h18l-7 8v4" />
          </svg>
        );
      case 'utensils':
        return <Utensils className="w-4 h-4 text-[#8A6D3B]" />;
      case 'music':
        return <Music className="w-4 h-4 text-[#8A6D3B]" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#8A6D3B]" />;
      default:
        return <Clock className="w-4 h-4 text-[#8A6D3B]" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
          The Order of Celebration
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292524] mt-1">
          Wedding Day Itinerary
        </h2>
        <OrnamentalDivider className="my-3" />
        <p className="font-serif italic text-sm text-[#736352] max-w-md mx-auto">
          Please join us at each chapter of our day as we make memories together from the afternoon prelude to the sparkler finale.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-[1px] before:bg-[#D5C6AF]">
        {events.map((event, index) => (
          <div key={event.id || index} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 sm:-left-10 top-0.5 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FCFAF7] border border-[#C5A059] shadow-xs group-hover:scale-110 transition-transform">
              {renderIcon(event.icon)}
            </div>

            {/* Event Content Container */}
            <div className="bg-white/80 rounded-xl p-5 border border-[#EAE2D5] shadow-xs transition-shadow hover:shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#F0E9DF] pb-2 mb-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#292524] font-normal">
                  {event.title}
                </h3>
                <span className="font-cinzel text-xs font-semibold tracking-wider text-[#8A6D3B] bg-[#F7F3EC] px-2.5 py-1 rounded">
                  {event.time}
                </span>
              </div>

              <p className="text-sm font-sans text-[#524436] leading-relaxed mb-3">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#7A6B5C]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{event.location}</span>
                </div>
                {event.attire && (
                  <div className="flex items-center gap-1.5 text-[#8F7D6D]">
                    <span className="text-[#C5A059]">•</span>
                    <span>Attire: {event.attire}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
