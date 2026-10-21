import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
  coupleNames: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  defaultGuestName = '',
  coupleNames,
}) => {
  const [recipient, setRecipient] = useState(defaultGuestName);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareUrl = recipient.trim()
    ? `${currentUrl}?guest=${encodeURIComponent(recipient.trim())}`
    : currentUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `You are cordially invited to celebrate the marriage of ${coupleNames}! View the digital invitation card and RSVP here: ${shareUrl}`;

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(`Wedding Invitation: ${coupleNames}`)}&body=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E5DAC8] card-paper-shadow text-[#292524]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7A6B5C] hover:text-[#292524] hover:bg-[#EFE7D8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
            Personalized Invitation Suite
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#292524] mt-1">
            Share Digital Invitation
          </h3>
          <p className="text-xs text-[#736352] mt-1">
            Personalize the recipient name to generate a tailored envelope and invitation card link.
          </p>
        </div>

        {/* Recipient Input */}
        <div className="mb-4">
          <label className="block text-xs font-sans font-medium text-[#443628] mb-1.5">
            Recipient / Guest Name(s) for Envelope
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. Sarah & David Miller, The Adams Family"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C29D] bg-white text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
          />
          <p className="text-[11px] text-[#8F7D6D] mt-1">
            This name will be embossed in calligraphy on their envelope wax seal &amp; card.
          </p>
        </div>

        {/* Link Box */}
        <div className="mb-6">
          <label className="block text-xs font-sans font-medium text-[#443628] mb-1.5">
            Personalized URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#D5C29D] rounded-lg text-[#554637] select-all"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#443628] hover:bg-[#2B2117] text-white text-xs font-cinzel uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E2D5BA]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick Send Options */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-3 bg-[#EAF7EE] hover:bg-[#D5EFE0] border border-[#B9E5C8] text-[#1E6838] text-xs font-sans font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send via WhatsApp</span>
          </button>

          <button
            onClick={handleEmail}
            className="py-2.5 px-3 bg-[#F4EFE6] hover:bg-[#EAE3D6] border border-[#D5C29D] text-[#524436] text-xs font-sans font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Send via Email</span>
          </button>
        </div>

        {/* QR Code toggle */}
        <div className="text-center pt-2 border-t border-[#E8DEC8]">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 text-xs text-[#8A6D3B] hover:text-[#443628] underline underline-offset-4 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{showQr ? 'Hide QR Code' : 'Display QR Code for Print / Display'}</span>
          </button>

          {showQr && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-[#D5C29D] inline-block shadow-xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`}
                alt="Wedding Invitation QR Code"
                className="w-40 h-40 mx-auto"
                referrerPolicy="no-referrer"
              />
              <p className="text-[10px] text-[#7A6B5C] mt-2 font-mono">
                Scan to open invitation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
