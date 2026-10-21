import React from 'react';
import { CoupleInfo } from '../types/wedding';
import { accommodationOptions } from '../data/initialData';
import { OrnamentalDivider } from './WeddingOrnaments';
import { MapPin, Navigation, Hotel, Plane, Car, ExternalLink, Sparkles } from 'lucide-react';

interface VenueTravelGuideProps {
  couple: CoupleInfo;
}

export const VenueTravelGuide: React.FC<VenueTravelGuideProps> = ({ couple }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${couple.ceremonyVenue}, ${couple.ceremonyAddress}`
  )}`;

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
          Destination &amp; Accommodations
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292524] mt-1">
          Venue &amp; Travel Guide
        </h2>
        <OrnamentalDivider className="my-3" />
        <p className="font-serif italic text-sm text-[#736352] max-w-lg mx-auto">
          We have assembled everything you need for a relaxing, unforgettable weekend celebrating with us in wine country.
        </p>
      </div>

      {/* Main Venue Spotlight Card */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#E5DAC8] mb-10 card-paper-shadow">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="space-y-2">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#8A6D3B]">
              The Celebration Estate
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#292524]">
              {couple.ceremonyVenue}
            </h3>
            <p className="text-sm font-sans text-[#524436]">
              {couple.ceremonyAddress}
            </p>
            <p className="text-xs text-[#7A6B5C]">
              {couple.cityState} · Complimentary valet parking provided on premises.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#443628] hover:bg-[#2F241A] text-white rounded-lg text-xs font-cinzel uppercase tracking-wider transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E2D5BA]" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Venue Information Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#DFCDB3]/80 text-xs text-[#5C4A3A]">
          <div className="space-y-1">
            <p className="font-cinzel uppercase tracking-wider text-[#8A6D3B] font-semibold">Arrival &amp; Seating</p>
            <p>Gates open 45 minutes before the ceremony. Please be seated by 4:00 PM.</p>
          </div>
          <div className="space-y-1">
            <p className="font-cinzel uppercase tracking-wider text-[#8A6D3B] font-semibold">Valet &amp; Parking</p>
            <p>Complimentary guest valet provided at the Main Carriage Arch entrance.</p>
          </div>
          <div className="space-y-1">
            <p className="font-cinzel uppercase tracking-wider text-[#8A6D3B] font-semibold">Weather &amp; Ground</p>
            <p>Lawn ceremony followed by indoor terrace. Block heels or wedges recommended.</p>
          </div>
        </div>
      </div>

      {/* Hotel Room Blocks */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Hotel className="w-4 h-4 text-[#C5A059]" />
          <h3 className="font-serif text-2xl text-[#292524]">
            Recommended Accommodations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accommodationOptions.map((hotel, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-xl p-5 border border-[#EAE2D5] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#8A6D3B] bg-[#F7F3EC] px-2 py-0.5 rounded">
                  {hotel.tier}
                </span>
                <h4 className="font-serif text-xl text-[#292524]">
                  {hotel.name}
                </h4>
                <p className="text-xs text-[#7A6B5C]">{hotel.distance}</p>
                <p className="text-xs font-medium text-[#443628]">{hotel.rate}</p>
                <div className="p-2 bg-[#FAF7F2] rounded border border-[#EDE4D5] text-[11px] text-[#5C4A3A]">
                  <span className="font-semibold text-[#8A6D3B]">Code: </span>
                  <span className="font-mono tracking-wider font-bold">{hotel.code}</span>
                </div>
                <p className="text-xs text-[#6B5A4B] leading-relaxed pt-1">
                  {hotel.notes}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#F5EFE6]">
                <button
                  onClick={() => window.open(googleMapsUrl, '_blank')}
                  className="w-full text-center text-xs font-cinzel text-[#8A6D3B] hover:text-[#4A3B2C] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Details &amp; Area</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel & Airport Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/60 rounded-xl p-6 border border-[#E8DEC8]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8A6D3B]">
            <Plane className="w-4 h-4" />
            <h4 className="font-serif text-lg text-[#292524]">Nearest Airports</h4>
          </div>
          <ul className="text-xs text-[#5C4A3A] space-y-1.5 leading-relaxed">
            <li><strong>San Francisco International (SFO):</strong> ~75 miles (approx. 1h 30m drive)</li>
            <li><strong>Oakland International (OAK):</strong> ~65 miles (approx. 1h 20m drive)</li>
            <li><strong>Sacramento International (SMF):</strong> ~68 miles (approx. 1h 20m drive)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8A6D3B]">
            <Car className="w-4 h-4" />
            <h4 className="font-serif text-lg text-[#292524]">Guest Shuttle Service</h4>
          </div>
          <p className="text-xs text-[#5C4A3A] leading-relaxed">
            Private wedding shuttles will run between Meadowood Napa Valley, Harvest Inn, and the Villa Bellissima estate starting at 3:15 PM and continuously from 9:30 PM until midnight.
          </p>
        </div>
      </div>
    </div>
  );
};
