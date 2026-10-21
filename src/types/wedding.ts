export interface CoupleInfo {
  brideName: string;
  groomName: string;
  brideInitials: string;
  groomInitials: string;
  weddingDate: string; // ISO string e.g. 2026-10-18T16:00:00
  ceremonyVenue: string;
  ceremonyAddress: string;
  receptionVenue: string;
  receptionAddress: string;
  cityState: string;
  dressCode: string;
  dressCodeDetails: string;
  parentsBride: string;
  parentsGroom: string;
  loveQuote: string;
  registryMessage: string;
  hashtag: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  attire: string;
  icon: 'ring' | 'cocktail' | 'utensils' | 'music' | 'camera' | 'sparkles' | 'coffee';
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
}

export interface RSVPRecord {
  id: string;
  guestName: string;
  email: string;
  attending: 'accepted' | 'declined';
  partySize: number;
  plusOneName?: string;
  mealChoice: 'beef' | 'fish' | 'vegetarian' | 'vegan';
  dietaryNotes: string;
  songRequest: string;
  message: string;
  submittedAt: string;
}

export interface GuestbookWish {
  id: string;
  authorName: string;
  relation: string;
  message: string;
  timestamp: string;
  hearts: number;
}

export type WeddingTheme = 'champagne' | 'rose' | 'emerald' | 'midnight';
