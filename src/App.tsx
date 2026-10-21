/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CoupleInfo, ScheduleEvent, StoryMilestone, RSVPRecord, GuestbookWish } from './types/wedding';
import {
  defaultCoupleInfo,
  defaultSchedule,
  defaultStory,
  defaultRSVPs,
  defaultGuestbook,
} from './data/initialData';
import { InteractiveEnvelope } from './components/InteractiveEnvelope';
import { WeddingCard } from './components/WeddingCard';
import { CountdownTimer } from './components/CountdownTimer';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { LoveStory } from './components/LoveStory';
import { VenueTravelGuide } from './components/VenueTravelGuide';
import { DressCodeAndRegistry } from './components/DressCodeAndRegistry';
import { RSVPSection } from './components/RSVPSection';
import { GuestbookWishes } from './components/GuestbookWishes';
import { AudioPlayerToggle } from './components/AudioPlayerToggle';
import { ShareModal } from './components/ShareModal';
import { OrganizerModal } from './components/OrganizerModal';
import { Settings2, Mail, Heart, Calendar, ArrowUp } from 'lucide-react';
import { weddingAudio } from './utils/audio';

const STORAGE_KEYS = {
  COUPLE: 'wedding_app_couple_v1',
  RSVPS: 'wedding_app_rsvps_v1',
  GUESTBOOK: 'wedding_app_wishes_v1',
  ENVELOPE_OPENED: 'wedding_app_envelope_opened_v1',
};

export default function App() {
  // Load query params for personalized guest greeting
  const [guestName, setGuestName] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      setGuestName(guestParam);
    }
  }, []);

  // State initialization with localStorage fallback
  const [couple, setCouple] = useState<CoupleInfo>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COUPLE);
      return stored ? JSON.parse(stored) : defaultCoupleInfo;
    } catch {
      return defaultCoupleInfo;
    }
  });

  const [rsvps, setRsvps] = useState<RSVPRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RSVPS);
      return stored ? JSON.parse(stored) : defaultRSVPs;
    } catch {
      return defaultRSVPs;
    }
  });

  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GUESTBOOK);
      return stored ? JSON.parse(stored) : defaultGuestbook;
    } catch {
      return defaultGuestbook;
    }
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(() => {
    // If the URL has an anchor or they opened it before, open by default; else start with romantic envelope
    if (window.location.hash) return true;
    try {
      return localStorage.getItem(STORAGE_KEYS.ENVELOPE_OPENED) === 'true';
    } catch {
      return false;
    }
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('card');

  // Save couple details
  const handleUpdateCouple = (updated: CoupleInfo) => {
    setCouple(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.COUPLE, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Add RSVP
  const handleAddRSVP = (newRSVP: RSVPRecord) => {
    const updated = [newRSVP, ...rsvps.filter((r) => r.id !== newRSVP.id)];
    setRsvps(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete RSVP
  const handleDeleteRSVP = (id: string) => {
    const updated = rsvps.filter((r) => r.id !== id);
    setRsvps(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Add Guestbook Wish
  const handleAddWish = (newWish: GuestbookWish) => {
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Like a Wish
  const handleLikeWish = (wishId: string) => {
    const updated = wishes.map((w) => (w.id === wishId ? { ...w, hearts: w.hearts + 1 } : w));
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    try {
      localStorage.setItem(STORAGE_KEYS.ENVELOPE_OPENED, 'true');
    } catch (e) {
      console.error(e);
    }
    // Start romantic piano softly upon unsealing
    weddingAudio.start();
  };

  const handleCloseEnvelope = () => {
    setIsEnvelopeOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.ENVELOPE_OPENED, 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToRSVP = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coupleNamesCombined = `${couple.brideName} & ${couple.groomName}`;

  return (
    <div className="min-h-screen bg-paper-texture flex flex-col justify-between selection:bg-[#EADBC8] selection:text-[#503E2C]">
      {/* Top Bar Contract (3 Zones, strictly one row) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DEC8] no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#card"
            className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#292524] hover:text-[#786142] transition-colors whitespace-nowrap shrink-0"
          >
            {couple.brideInitials} &amp; {couple.groomInitials} · {new Date(couple.weddingDate).getFullYear()}
          </a>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-cinzel tracking-wider uppercase text-[#6B5A4B]">
            <a href="#card" className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">
              The Invitation
            </a>
            <a href="#itinerary" className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">
              Itinerary
            </a>
            <a href="#story" className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">
              Our Story
            </a>
            <a href="#travel" className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">
              Travel &amp; Stay
            </a>
            <a href="#guestbook" className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">
              Guestbook
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsOrganizerModalOpen(true)}
              className="p-2 text-[#7A6B5C] hover:text-[#292524] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
              title="Organizer / Couple Manager"
              aria-label="Open Organizer Dashboard"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToRSVP}
              className="px-4 py-2 text-xs font-cinzel uppercase tracking-[0.14em] text-white bg-[#443628] hover:bg-[#2B2117] rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              RSVP
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Envelope Unsealing Experience */}
        {!isEnvelopeOpen ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center py-8">
            <InteractiveEnvelope
              brideName={couple.brideName}
              groomName={couple.groomName}
              brideInitials={couple.brideInitials}
              groomInitials={couple.groomInitials}
              weddingDate={couple.weddingDate}
              guestName={guestName}
              isOpen={isEnvelopeOpen}
              onOpen={handleOpenEnvelope}
            />
          </div>
        ) : (
          <div className="animate-fade-in transition-opacity duration-500">
            {/* Hero Countdown Banner */}
            <div className="pt-6 sm:pt-10 pb-4 px-4 text-center">
              <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
                Counting Down the Moments Until Forever
              </span>
              <div className="mt-4">
                <CountdownTimer targetDate={couple.weddingDate} />
              </div>
            </div>

            {/* Main Digital Wedding Invitation Card */}
            <section id="card" className="scroll-mt-16">
              <WeddingCard
                couple={couple}
                guestName={guestName}
                onNavigateToRSVP={scrollToRSVP}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onRecloseEnvelope={handleCloseEnvelope}
              />
            </section>

            {/* Wedding Day Schedule / Itinerary */}
            <section id="itinerary" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60">
              <ScheduleTimeline events={defaultSchedule} />
            </section>

            {/* Love Story Chapter Milestones */}
            <section id="story" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60 bg-[#FAF7F2]/40">
              <LoveStory milestones={defaultStory} quote={couple.loveQuote} />
            </section>

            {/* Venue & Accommodations Travel Guide */}
            <section id="travel" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60">
              <VenueTravelGuide couple={couple} />
            </section>

            {/* Dress Code & Gift Registry */}
            <section id="attire" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60 bg-[#FAF7F2]/40">
              <DressCodeAndRegistry couple={couple} />
            </section>

            {/* RSVP Form Section */}
            <section id="rsvp" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60">
              <RSVPSection onAddRSVP={handleAddRSVP} guestPrefill={guestName} />
            </section>

            {/* Live Guestbook & Wishes Board */}
            <section id="guestbook" className="scroll-mt-16 py-6 border-t border-[#EAE2D5]/60 bg-[#FAF7F2]/40">
              <GuestbookWishes wishes={wishes} onAddWish={handleAddWish} onLikeWish={handleLikeWish} />
            </section>
          </div>
        )}
      </main>

      {/* Floating Ambient Romantic Audio Toggle */}
      <AudioPlayerToggle />

      {/* Share Invitation Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        defaultGuestName={guestName}
        coupleNames={coupleNamesCombined}
      />

      {/* Organizer / Dashboard Modal */}
      <OrganizerModal
        isOpen={isOrganizerModalOpen}
        onClose={() => setIsOrganizerModalOpen(false)}
        couple={couple}
        onUpdateCouple={handleUpdateCouple}
        rsvps={rsvps}
        onDeleteRSVP={handleDeleteRSVP}
      />

      {/* Quiet Luxury Footer */}
      <footer className="mt-16 border-t border-[#E8DEC8] bg-[#F7F2E8]/60 py-8 px-4 text-center text-xs text-[#7A6B5C] no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-[#292524]">{couple.brideName} &amp; {couple.groomName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-cinzel text-[10px] tracking-wider uppercase">{couple.cityState}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-sans">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="hover:text-[#292524] underline underline-offset-4 cursor-pointer"
            >
              Share Invitation
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsOrganizerModalOpen(true)}
              className="hover:text-[#292524] underline underline-offset-4 cursor-pointer"
            >
              Couple &amp; RSVP Manager
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#292524] cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
        <p className="text-[10px] text-[#A89887] mt-4 font-serif italic">
          Crafted with love for our celebration of forever.
        </p>
      </footer>
    </div>
  );
}
