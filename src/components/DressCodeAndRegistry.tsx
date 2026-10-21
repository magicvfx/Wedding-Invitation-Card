import React, { useState } from 'react';
import { CoupleInfo } from '../types/wedding';
import { OrnamentalDivider } from './WeddingOrnaments';
import { Gift, Sparkles, Heart, ExternalLink, Check } from 'lucide-react';

interface DressCodeAndRegistryProps {
  couple: CoupleInfo;
}

export const DressCodeAndRegistry: React.FC<DressCodeAndRegistryProps> = ({ couple }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const colorSwatches = [
    { name: 'Champagne Gold', hex: '#D4AF37', border: 'border-[#C5A059]' },
    { name: 'Eucalyptus Sage', hex: '#637D6B', border: 'border-[#506857]' },
    { name: 'Dusty Slate', hex: '#7E919F', border: 'border-[#667A88]' },
    { name: 'Warm Terracotta', hex: '#A86D58', border: 'border-[#915844]' },
    { name: 'Alabaster Ivory', hex: '#F7F4EE', border: 'border-[#D9D3C7]' },
    { name: 'Midnight Charcoal', hex: '#262422', border: 'border-[#1C1A18]' },
  ];

  const handleCopyRegistry = () => {
    navigator.clipboard.writeText(window.location.origin + '#registry');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Dress Code Section */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-[#E5DAC8] card-paper-shadow">
        <div className="text-center mb-6">
          <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
            Celebration Attire
          </span>
          <h3 className="font-serif text-3xl text-[#292524] mt-1">
            {couple.dressCode}
          </h3>
          <OrnamentalDivider className="my-3" />
          <p className="font-serif italic text-sm text-[#736352] max-w-lg mx-auto">
            {couple.dressCodeDetails}
          </p>
        </div>

        {/* Color Palette Inspiration */}
        <div className="mt-8 pt-6 border-t border-[#DFCDB3]/80">
          <p className="text-xs font-cinzel uppercase tracking-widest text-[#8A6D3B] text-center mb-4">
            Harmonious Wedding Color Palette
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {colorSwatches.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-1.5 group">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-xs border ${color.border} group-hover:scale-110 transition-transform`}
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className="text-[11px] font-sans text-[#6B5A49]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registry & Wishing Well Section */}
      <div id="registry" className="bg-white/80 rounded-2xl p-6 sm:p-10 border border-[#E8DEC8] text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center mx-auto mb-4">
          <Gift className="w-6 h-6 text-[#8A6D3B]" />
        </div>

        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
          Gift Registry &amp; Wishing Well
        </span>
        <h3 className="font-serif text-3xl text-[#292524] mt-1">
          Honeymoon &amp; New Home Fund
        </h3>
        <OrnamentalDivider className="my-3" />

        <p className="font-serif italic text-sm sm:text-base text-[#615140] max-w-xl mx-auto leading-relaxed mb-6">
          {couple.registryMessage}
        </p>

        {/* Registry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6 text-left">
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EDE4D5]">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-[#292524]">Amalfi Honeymoon Fund</span>
              <Heart className="w-4 h-4 text-[#C5A059]" />
            </div>
            <p className="text-xs text-[#7A6B5C] mt-1">
              Sunset boat charter, pasta cooking class in Ravello &amp; cliffside dinners.
            </p>
            <a
              href="https://example.com/honeymoon-registry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-cinzel text-[#8A6D3B] hover:text-[#4A3B2C] mt-3"
            >
              <span>Contribute to Fund</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EDE4D5]">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-[#292524]">Crate &amp; Barrel Home</span>
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>
            <p className="text-xs text-[#7A6B5C] mt-1">
              Curated dinnerware, linen sheets, and artisanal kitchen essentials.
            </p>
            <a
              href="https://example.com/home-registry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-cinzel text-[#8A6D3B] hover:text-[#4A3B2C] mt-3"
            >
              <span>Browse Registry</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <button
          onClick={handleCopyRegistry}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-cinzel tracking-wider uppercase text-[#544332] bg-[#F4EFE6] hover:bg-[#EAE3D6] border border-[#D5C29D] rounded-lg transition-colors cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Registry Link Copied</span>
            </>
          ) : (
            <>
              <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Copy Registry Details</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
