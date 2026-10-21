import React, { useState } from 'react';
import { CoupleInfo, RSVPRecord } from '../types/wedding';
import { X, Download, Users, CheckCircle, Utensils, Music, Edit3, Trash2, Heart } from 'lucide-react';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  couple: CoupleInfo;
  onUpdateCouple: (updated: CoupleInfo) => void;
  rsvps: RSVPRecord[];
  onDeleteRSVP: (id: string) => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  couple,
  onUpdateCouple,
  rsvps,
  onDeleteRSVP,
}) => {
  const [activeTab, setActiveTab] = useState<'rsvps' | 'details'>('rsvps');
  const [formData, setFormData] = useState<CoupleInfo>({ ...couple });
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  // Statistics
  const acceptedRSVPs = rsvps.filter((r) => r.attending === 'accepted');
  const declinedRSVPs = rsvps.filter((r) => r.attending === 'declined');
  const totalAttendingGuests = acceptedRSVPs.reduce((sum, r) => sum + (r.partySize || 1), 0);

  const mealCounts = {
    beef: acceptedRSVPs.filter((r) => r.mealChoice === 'beef').length,
    fish: acceptedRSVPs.filter((r) => r.mealChoice === 'fish').length,
    vegetarian: acceptedRSVPs.filter((r) => r.mealChoice === 'vegetarian').length,
    vegan: acceptedRSVPs.filter((r) => r.mealChoice === 'vegan').length,
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCouple({
      ...formData,
      brideInitials: formData.brideName.charAt(0).toUpperCase() || 'E',
      groomInitials: formData.groomName.charAt(0).toUpperCase() || 'J',
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Attending', 'Party Size', 'Plus One', 'Meal Choice', 'Dietary Restrictions', 'Song Request', 'Message', 'Email', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.attending,
      r.partySize,
      `"${(r.plusOneName || '').replace(/"/g, '""')}"`,
      r.mealChoice,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      `"${(r.songRequest || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.email,
      r.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVP_Guest_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-2xl border border-[#E5DAC8] card-paper-shadow flex flex-col overflow-hidden text-[#292524]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8DEC8] bg-[#F7F2E8]/60 shrink-0">
          <div>
            <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#8C765E]">
              Wedding Suite Manager
            </span>
            <h3 className="font-serif text-2xl text-[#292524]">
              Organizer &amp; RSVP Dashboard
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A6B5C] hover:text-[#292524] hover:bg-[#EFE7D8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#E8DEC8] bg-[#FAF8F5] shrink-0">
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`pb-3 text-xs font-cinzel uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rsvps'
                ? 'border-[#443628] text-[#443628] font-semibold'
                : 'border-transparent text-[#8A7968] hover:text-[#443628]'
            }`}
          >
            Guest Responses ({rsvps.length})
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs font-cinzel uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#443628] text-[#443628] font-semibold'
                : 'border-transparent text-[#8A7968] hover:text-[#443628]'
            }`}
          >
            Edit Wedding Details
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {activeTab === 'rsvps' ? (
            <div className="space-y-6">
              {/* Summary KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 bg-white rounded-xl border border-[#EAE2D5] shadow-xs">
                  <span className="text-[11px] font-cinzel text-[#8A7968] uppercase tracking-wider block">
                    Attending Guests
                  </span>
                  <span className="font-serif text-3xl font-medium text-[#292524] tabular-nums">
                    {totalAttendingGuests}
                  </span>
                  <span className="text-[11px] text-[#7A6B5C] block mt-0.5">
                    from {acceptedRSVPs.length} parties
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE2D5] shadow-xs">
                  <span className="text-[11px] font-cinzel text-[#8A7968] uppercase tracking-wider block">
                    Regrets / Declined
                  </span>
                  <span className="font-serif text-3xl font-medium text-[#8A7968] tabular-nums">
                    {declinedRSVPs.length}
                  </span>
                  <span className="text-[11px] text-[#7A6B5C] block mt-0.5">responses</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE2D5] shadow-xs">
                  <span className="text-[11px] font-cinzel text-[#8A7968] uppercase tracking-wider block">
                    Filet / Halibut
                  </span>
                  <span className="font-serif text-2xl font-medium text-[#292524] tabular-nums">
                    {mealCounts.beef} / {mealCounts.fish}
                  </span>
                  <span className="text-[11px] text-[#7A6B5C] block mt-0.5">entrées</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE2D5] shadow-xs">
                  <span className="text-[11px] font-cinzel text-[#8A7968] uppercase tracking-wider block">
                    Veg / Vegan
                  </span>
                  <span className="font-serif text-2xl font-medium text-[#292524] tabular-nums">
                    {mealCounts.vegetarian} / {mealCounts.vegan}
                  </span>
                  <span className="text-[11px] text-[#7A6B5C] block mt-0.5">entrées</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl text-[#292524]">Guest Responses Roster</h4>
                <button
                  onClick={exportCSV}
                  className="px-3.5 py-1.5 bg-[#443628] hover:bg-[#2B2117] text-white text-xs font-cinzel uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#E2D5BA]" />
                  <span>Export to CSV</span>
                </button>
              </div>

              {/* RSVP Table */}
              <div className="border border-[#EAE2D5] rounded-xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#FAF7F2] border-b border-[#EAE2D5] text-[#6B5A4B] font-cinzel uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Guest</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Party</th>
                        <th className="p-3">Meal</th>
                        <th className="p-3">Dietary / Notes</th>
                        <th className="p-3">Song Request</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EBE1] text-[#3E342B]">
                      {rsvps.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-[#8A7968] font-serif italic">
                            No RSVPs recorded yet.
                          </td>
                        </tr>
                      ) : (
                        rsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-[#FCFAF7] transition-colors">
                            <td className="p-3">
                              <p className="font-medium text-[#292524]">{rsvp.guestName}</p>
                              {rsvp.plusOneName && (
                                <p className="text-[11px] text-[#8F7D6D]">+ {rsvp.plusOneName}</p>
                              )}
                              <p className="text-[10px] text-[#A89887]">{rsvp.email}</p>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                                  rsvp.attending === 'accepted'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-stone-100 text-stone-600 border border-stone-200'
                                }`}
                              >
                                {rsvp.attending === 'accepted' ? 'Accepted' : 'Declined'}
                              </span>
                            </td>
                            <td className="p-3 font-mono tabular-nums">{rsvp.partySize}</td>
                            <td className="p-3 capitalize">{rsvp.mealChoice}</td>
                            <td className="p-3 max-w-[160px] truncate" title={rsvp.dietaryNotes || rsvp.message}>
                              {rsvp.dietaryNotes || rsvp.message || '—'}
                            </td>
                            <td className="p-3 max-w-[140px] truncate" title={rsvp.songRequest}>
                              {rsvp.songRequest || '—'}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => onDeleteRSVP(rsvp.id)}
                                className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                                title="Delete entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Details Editor Form */
            <form onSubmit={handleSaveDetails} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Bride's Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Groom's Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Wedding Date &amp; Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.weddingDate.slice(0, 16)}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    City, State / Region
                  </label>
                  <input
                    type="text"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Ceremony Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.ceremonyVenue}
                    onChange={(e) => setFormData({ ...formData, ceremonyVenue: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Ceremony Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.ceremonyAddress}
                    onChange={(e) => setFormData({ ...formData, ceremonyAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Parents of the Bride
                  </label>
                  <input
                    type="text"
                    value={formData.parentsBride}
                    onChange={(e) => setFormData({ ...formData, parentsBride: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                    Parents of the Groom
                  </label>
                  <input
                    type="text"
                    value={formData.parentsGroom}
                    onChange={(e) => setFormData({ ...formData, parentsGroom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                  Dress Code Title
                </label>
                <input
                  type="text"
                  value={formData.dressCode}
                  onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#443628] mb-1">
                  Celebration Hashtag
                </label>
                <input
                  type="text"
                  value={formData.hashtag}
                  onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5C29D] bg-white text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {savedAlert && (
                  <span className="text-xs text-emerald-700 font-medium">
                    ✓ Wedding details updated successfully!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 bg-[#443628] hover:bg-[#2B2117] text-white text-xs font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Save All Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
