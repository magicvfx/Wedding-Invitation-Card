import React, { useState } from 'react';
import { RSVPRecord } from '../types/wedding';
import { OrnamentalDivider } from './WeddingOrnaments';
import confetti from 'canvas-confetti';
import { Check, Heart, Music, Utensils, Users, Send } from 'lucide-react';

interface RSVPSectionProps {
  onAddRSVP: (record: RSVPRecord) => void;
  existingRSVP?: RSVPRecord | null;
  guestPrefill?: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  onAddRSVP,
  existingRSVP,
  guestPrefill = '',
}) => {
  const [attending, setAttending] = useState<'accepted' | 'declined'>('accepted');
  const [guestName, setGuestName] = useState(existingRSVP?.guestName || guestPrefill || '');
  const [email, setEmail] = useState(existingRSVP?.email || '');
  const [partySize, setPartySize] = useState<number>(existingRSVP?.partySize || 1);
  const [plusOneName, setPlusOneName] = useState(existingRSVP?.plusOneName || '');
  const [mealChoice, setMealChoice] = useState<RSVPRecord['mealChoice']>(existingRSVP?.mealChoice || 'beef');
  const [dietaryNotes, setDietaryNotes] = useState(existingRSVP?.dietaryNotes || '');
  const [songRequest, setSongRequest] = useState(existingRSVP?.songRequest || '');
  const [message, setMessage] = useState(existingRSVP?.message || '');
  const [submitted, setSubmitted] = useState(!!existingRSVP);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newRecord: RSVPRecord = {
      id: existingRSVP?.id || 'rsvp-' + Date.now(),
      guestName: guestName.trim(),
      email: email.trim(),
      attending,
      partySize: attending === 'accepted' ? Number(partySize) : 0,
      plusOneName: attending === 'accepted' && partySize > 1 ? plusOneName.trim() : undefined,
      mealChoice,
      dietaryNotes: dietaryNotes.trim(),
      songRequest: songRequest.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    onAddRSVP(newRecord);
    setSubmitted(true);

    if (attending === 'accepted') {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E8DEC8', '#8A6D3B', '#F9D5D5', '#292524'],
      });
    }
  };

  const handleEditAgain = () => {
    setSubmitted(false);
  };

  return (
    <div id="rsvp" className="w-full max-w-2xl mx-auto py-12 px-4">
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-[#E5DAC8] card-paper-shadow relative overflow-hidden">
        {/* Subtle corner ornament */}
        <div className="text-center mb-8">
          <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
            Kindly Respond by September 15, 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292524] mt-1">
            Répondez S&apos;il Vous Plaît
          </h2>
          <OrnamentalDivider className="my-3" />
          <p className="font-serif italic text-sm text-[#736352]">
            We eagerly anticipate celebrating our union in your delightful company.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 px-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF7EE] border border-[#C5A059] flex items-center justify-center mx-auto text-[#8A6D3B]">
              <Heart className="w-7 h-7 fill-[#C5A059]/30 text-[#8A6D3B]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#292524]">
              {attending === 'accepted' ? 'We Can’t Wait to See You!' : 'You Will Be Missed!'}
            </h3>

            <p className="font-sans text-sm text-[#5C4A3A] max-w-md mx-auto leading-relaxed">
              {attending === 'accepted'
                ? `Thank you, ${guestName}. Your RSVP for a party of ${partySize} has been joyfully recorded.`
                : `Thank you for letting us know, ${guestName}. We are sending you our warmest love and will celebrate with you in spirit.`}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleEditAgain}
                className="text-xs font-cinzel uppercase tracking-wider text-[#8A6D3B] hover:text-[#443628] underline underline-offset-4 cursor-pointer"
              >
                Need to change or update your RSVP?
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance Choice Buttons */}
            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#6B5A4B] text-center mb-3">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('accepted')}
                  className={`py-3 px-4 rounded-xl border text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    attending === 'accepted'
                      ? 'bg-[#443628] text-white border-[#443628] shadow-xs'
                      : 'bg-white/70 text-[#544332] border-[#D5C29D] hover:bg-white'
                  }`}
                >
                  <Check className={`w-4 h-4 ${attending === 'accepted' ? 'text-[#E2D5BA]' : 'opacity-0'}`} />
                  <span>Joyfully Accepts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('declined')}
                  className={`py-3 px-4 rounded-xl border text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    attending === 'declined'
                      ? 'bg-[#443628] text-white border-[#443628] shadow-xs'
                      : 'bg-white/70 text-[#544332] border-[#D5C29D] hover:bg-white'
                  }`}
                >
                  <span>Regretfully Declines</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            {attending === 'accepted' && (
              <>
                {/* Party Size & Plus One */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                      Total Number Attending (Party Size)
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  {partySize > 1 && (
                    <div>
                      <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                        Companion / Plus-One Name(s)
                      </label>
                      <input
                        type="text"
                        value={plusOneName}
                        onChange={(e) => setPlusOneName(e.target.value)}
                        placeholder="e.g. Marcus Thorne"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>
                  )}
                </div>

                {/* Gourmet Entrée Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#6B5A4B] mb-2">
                    Gourmet Dinner Entrée Selection *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        id: 'beef',
                        title: 'Prime Filet Mignon',
                        desc: 'Truffle demi-glace, roasted shallot pommes purée',
                      },
                      {
                        id: 'fish',
                        title: 'Wild Alaskan Halibut',
                        desc: 'Lemon herb beurre blanc, tender baby leeks',
                      },
                      {
                        id: 'vegetarian',
                        title: 'Wild Chanterelle Risotto',
                        desc: 'Arborio rice, shaved aged parmesan, micro greens (GF)',
                      },
                      {
                        id: 'vegan',
                        title: 'Heirloom Roasted Squash',
                        desc: 'Spiced quinoa, pomegranate molasses, toasted pepitas (V)',
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setMealChoice(option.id as RSVPRecord['mealChoice'])}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          mealChoice === option.id
                            ? 'bg-white border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-xs'
                            : 'bg-white/60 border-[#E2D5BA] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base text-[#292524] font-medium">
                            {option.title}
                          </span>
                          {mealChoice === option.id && (
                            <Check className="w-4 h-4 text-[#C5A059]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#7A6B5C] mt-1 leading-snug">
                          {option.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Dietary Restrictions &amp; Allergies
                  </label>
                  <input
                    type="text"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="e.g. Gluten-free, nut allergy, etc."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                {/* Song Request */}
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Dance Floor Song Request</span>
                  </label>
                  <input
                    type="text"
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                    placeholder="e.g. September by Earth, Wind & Fire"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </>
            )}

            {/* Message to the Couple */}
            <div>
              <label className="block text-xs font-sans font-medium text-[#443628] mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Note for Evelyn &amp; Julian (Optional)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your congratulations, favorite memory, or wedding advice..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#443628] hover:bg-[#2B2117] text-white text-xs font-cinzel uppercase tracking-[0.18em] rounded-xl shadow-xs hover:shadow transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#E2D5BA]" />
                <span>Submit RSVP Response</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
