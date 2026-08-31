export interface Martyr {
  id?: string;
  name: string;
  role: string;
  image: string;
  birthDate?: string;
  deathDate?: string;
  deathPlace?: string;
  biography?: string;
  quote?: string;
  link?: string;
}

export interface Battle {
  id?: string;
  year: string;
  title: string;
  date?: string;
  location?: string;
  description: string;
  image?: string;
  forces?: string;
  outcome?: string;
}

export interface NotableFigure {
  id?: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  famousQuote?: string;
  birthDate?: string;
  deathDate?: string;
  link?: string;
}

export interface TimelineEvent {
  year: string;
  title?: string;
  event: string;
  description?: string;
  date?: string;
}

export interface ArchivePhoto {
  id?: string;
  url: string;
  caption: string;
  date?: string;
  source?: string;
}

export interface HistoricalDocument {
  id?: string;
  title: string;
  type: string;
  url?: string;
  description?: string;
  date?: string;
  source?: string;
}

export interface AudioArchiveItem {
  id?: string;
  title: string;
  speaker?: string;
  date?: string;
  duration?: string;
  url: string;
  description?: string;
}

export interface Wilaya {
  id: string; // e.g. "DZ-04", "DZ-05", "DZ-16"
  code: string; // e.g. "04", "05", "16"
  name: string; // Arabic name, e.g. "أم البواقي", "باتنة"
  latinName: string; // e.g. "Oum El Bouaghi", "Batna"
  subtitle: string;
  quote?: string;
  heroImage: string;
  description: string;
  historicalOverview: string;
  liberationHistory?: string;
  martyrsCount: number;
  battlesCount?: number;
  figuresCount?: number;
  historicalZone?: string; // e.g. "المنطقة الأولى - الأوراس والنمامشة", "الولاية الأولى التاريخية"
  coordinates?: { lat: number; lng: number; x?: number; y?: number };
  martyrs: Martyr[];
  battles: Battle[];
  figures?: NotableFigure[];
  timeline: TimelineEvent[];
  gallery: string[];
  archives: ArchivePhoto[];
  historicalDocuments: HistoricalDocument[];
  audioArchives?: AudioArchiveItem[];
  audioAsset: string;
}

export type WilayaData = Wilaya;
