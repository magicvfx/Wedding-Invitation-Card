import React, { useState } from 'react';
import { GuestbookWish } from '../types/wedding';
import { OrnamentalDivider } from './WeddingOrnaments';
import { Heart, MessageSquare, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GuestbookWishesProps {
  wishes: GuestbookWish[];
  onAddWish: (wish: GuestbookWish) => void;
  onLikeWish: (wishId: string) => void;
}

export const GuestbookWishes: React.FC<GuestbookWishesProps> = ({
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish: GuestbookWish = {
      id: 'wish-' + Date.now(),
      authorName: authorName.trim(),
      relation: relation.trim(),
      message: message.trim(),
      timestamp: 'Just now',
      hearts: 1,
    };

    onAddWish(newWish);
    setAuthorName('');
    setMessage('');
    setIsSubmitting(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E8DEC8', '#C23B38'],
    });
  };

  return (
    <div id="guestbook" className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
          Words of Love &amp; Blessing
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292524] mt-1">
          The Wedding Guestbook
        </h2>
        <OrnamentalDivider className="my-3" />
        <p className="font-serif italic text-sm text-[#736352] max-w-md mx-auto">
          Leave your warmest wishes, marriage wisdom, or cherished memories for Evelyn and Julian to read forever.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Write a Wish Form (5 columns) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-6 border border-[#E5DAC8] card-paper-shadow">
          <div className="flex items-center gap-2 mb-4 text-[#8A6D3B]">
            <MessageSquare className="w-4 h-4" />
            <h3 className="font-serif text-xl text-[#292524]">Sign the Guestbook</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Aunt Grace or Jordan Lee"
                className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                Your Connection / Relationship
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="Family">Family Member</option>
                <option value="Bridal Party">Bridal Party</option>
                <option value="Close Friend">Close Friend</option>
                <option value="Colleague">Colleague &amp; Mentor</option>
                <option value="Neighbor">Neighbor &amp; Community</option>
                <option value="Guest">Guest</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                Your Heartfelt Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="May your journey together be blessed with endless laughter, adventures, and steadfast grace..."
                className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#443628] hover:bg-[#2B2117] text-white text-xs font-cinzel uppercase tracking-wider rounded-lg shadow-xs hover:shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#E2D5BA]" />
              <span>Post Heartfelt Wish</span>
            </button>
          </form>
        </div>

        {/* Wishes Feed (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8A7968] px-1">
            <span className="font-cinzel uppercase tracking-wider">
              {wishes.length} Recorded Blessings
            </span>
            <span className="font-serif italic">With eternal gratitude</span>
          </div>

          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white/80 rounded-xl p-5 border border-[#EAE2D5] shadow-xs hover:border-[#D5C29D] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-serif text-lg text-[#292524] font-medium leading-tight">
                      {wish.authorName}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#8F7D6D] mt-0.5">
                      <span>{wish.relation}</span>
                      <span aria-hidden="true">·</span>
                      <span>{wish.timestamp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onLikeWish(wish.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DEC8] text-xs text-[#7A6B5C] hover:text-[#C23B38] transition-colors cursor-pointer"
                    title="Send love to this message"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#C23B38]/20 text-[#C23B38]" />
                    <span className="tabular-nums font-mono text-[11px]">{wish.hearts}</span>
                  </button>
                </div>

                <p className="font-serif italic text-sm text-[#4E3F31] leading-relaxed pt-1">
                  &ldquo;{wish.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
