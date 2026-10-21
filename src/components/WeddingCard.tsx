import React from 'react';
import { CoupleInfo } from '../types/wedding';
import { MonogramCrest, CornerFlourish, OrnamentalDivider } from './WeddingOrnaments';
import { Calendar, Download, Share2, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface WeddingCardProps {
  couple: CoupleInfo;
  guestName: string;
  onNavigateToRSVP: () => void;
  onOpenShareModal: () => void;
  onRecloseEnvelope?: () => void;
}

export const WeddingCard: React.FC<WeddingCardProps> = ({
  couple,
  guestName,
  onNavigateToRSVP,
  onOpenShareModal,
  onRecloseEnvelope,
}) => {
  const weddingDateObj = new Date(couple.weddingDate);

  const dayOfWeek = weddingDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = weddingDateObj.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = weddingDateObj.getDate();
  const yearNumber = weddingDateObj.getFullYear();
  const timeString = weddingDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const handlePrint = () => {
    window.print();
  };

  const [calendarMenuOpen, setCalendarMenuOpen] = React.useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 sm:my-8 px-3">
      {/* Printable / Viewable Card Container */}
      <div
        id="wedding-invitation-card"
        className="relative bg-[#FCFAF7] rounded-xl sm:rounded-2xl p-6 sm:p-12 md:p-16 card-paper-shadow border border-[#E8DEC8] text-center overflow-hidden transition-all duration-300"
      >
        {/* Subtle Luxury Outer Framing Inset Border */}
        <div className="absolute inset-3 sm:inset-4 border border-[#D5C29D]/60 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-4 sm:inset-5 border border-[#E2D5BA]/40 rounded-md pointer-events-none"></div>

        {/* Four Botanical Corner Flourishes */}
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        {/* Monogram Crest */}
        <div className="mb-4 sm:mb-6">
          <MonogramCrest initials={`${couple.brideInitials} & ${couple.groomInitials}`} size="md" />
        </div>

        {/* Personalized Guest Welcome Header (if available) */}
        {guestName && (
          <div className="mb-4">
            <span className="text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#8C765E]">
              Dearest {guestName}
            </span>
          </div>
        )}

        {/* Formal Invitation Invocation */}
        <p className="text-xs sm:text-sm font-cinzel uppercase tracking-[0.25em] text-[#7A6854] mb-2 leading-relaxed">
          Together with their families
        </p>
        <p className="font-serif italic text-sm sm:text-base text-[#615140] mb-6">
          {couple.parentsBride} <br className="hidden sm:inline" />
          <span className="font-sans text-xs text-[#9B8974] not-italic">and</span> {couple.parentsGroom}
        </p>

        <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-[#786142] mb-4">
          Request the honour of your presence at the marriage of
        </p>

        {/* Couple Names in Exquisite Display Typography */}
        <div className="my-6 sm:my-8 space-y-1">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#292524] font-normal tracking-tight">
            {couple.brideName}
          </h1>
          <div className="font-script text-3xl sm:text-4xl text-[#C5A059] py-1 select-none">
            and
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#292524] font-normal tracking-tight">
            {couple.groomName}
          </h1>
        </div>

        {/* Ornamental Divider */}
        <OrnamentalDivider className="my-6" />

        {/* Date and Time Details */}
        <div className="my-6 space-y-1.5">
          <p className="font-serif italic text-lg sm:text-xl text-[#3E342B]">
            {dayOfWeek}, the {dayNumber}th of {monthName}
          </p>
          <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] text-[#786142]">
            Two Thousand Twenty-Six
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#5C4A3A] tracking-wider pt-1">
            at {timeString} in the afternoon
          </p>
        </div>

        {/* Location & Venue */}
        <div className="my-6 space-y-1 max-w-md mx-auto">
          <p className="font-serif text-xl sm:text-2xl font-normal text-[#292524]">
            {couple.ceremonyVenue}
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#705E4D]">
            {couple.ceremonyAddress}
          </p>
          <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-widest text-[#9C866B] pt-1">
            {couple.cityState}
          </p>
        </div>

        {/* Reception & Attire Note */}
        <div className="pt-4 border-t border-[#E8DEC8]/80 max-w-sm mx-auto">
          <p className="font-serif italic text-sm sm:text-base text-[#4E3F31]">
            Reception, dinner, and dancing to immediately follow
          </p>
          <p className="text-[11px] font-sans uppercase tracking-widest text-[#8A7763] mt-1.5">
            Attire: {couple.dressCode}
          </p>
        </div>

        {/* Couple Hashtag */}
        {couple.hashtag && (
          <p className="text-[11px] font-sans tracking-widest text-[#A89680] mt-6">
            {couple.hashtag}
          </p>
        )}
      </div>

      {/* Action Toolbar Below Card */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 no-print">
        {/* RSVP Primary Button */}
        <button
          onClick={onNavigateToRSVP}
          className="px-6 py-2.5 text-xs font-cinzel uppercase tracking-[0.15em] text-white bg-[#443628] hover:bg-[#2F241A] rounded-lg transition-colors shadow-sm hover:shadow cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <CheckCircle2 className="w-4 h-4 text-[#E2D5BA]" />
          <span>RSVP for Celebration</span>
        </button>

        {/* Calendar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
            className="px-4 py-2.5 text-xs font-cinzel uppercase tracking-[0.12em] text-[#4E3F31] bg-white hover:bg-[#FAF8F5] border border-[#D5C29D] rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Add to Calendar</span>
          </button>

          {calendarMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-[#E0D5C1] py-1 z-30">
              <a
                href={createGoogleCalendarUrl(couple)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCalendarMenuOpen(false)}
                className="block px-4 py-2 text-xs text-[#3E342B] hover:bg-[#F7F3EB] transition-colors"
              >
                Google Calendar
              </a>
              <button
                onClick={() => {
                  downloadIcsFile(couple);
                  setCalendarMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-xs text-[#3E342B] hover:bg-[#F7F3EB] transition-colors cursor-pointer"
              >
                Apple Calendar / Outlook (.ics)
              </button>
            </div>
          )}
        </div>

        {/* Share Link Button */}
        <button
          onClick={onOpenShareModal}
          className="px-4 py-2.5 text-xs font-cinzel uppercase tracking-[0.12em] text-[#4E3F31] bg-white hover:bg-[#FAF8F5] border border-[#D5C29D] rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <Share2 className="w-4 h-4 text-[#C5A059]" />
          <span>Share Invitation</span>
        </button>

        {/* Print / Save Card Button */}
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 text-xs font-cinzel uppercase tracking-[0.12em] text-[#4E3F31] bg-white hover:bg-[#FAF8F5] border border-[#D5C29D] rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-[#C5A059]" />
          <span>Print / Save PDF</span>
        </button>

        {/* Reclose Envelope Option */}
        {onRecloseEnvelope && (
          <button
            onClick={onRecloseEnvelope}
            className="text-xs text-[#8A7968] hover:text-[#4A3B2C] underline decoration-[#C5A059]/60 underline-offset-4 transition-colors cursor-pointer ml-1 whitespace-nowrap"
          >
            Fold into Envelope
          </button>
        )}
      </div>
    </div>
  );
};
