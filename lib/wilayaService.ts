import { Wilaya, Battle, NotableFigure, ArchivePhoto, HistoricalDocument, Martyr, TimelineEvent } from '../types';
import { WILAYAS_DATA, ALL_58_WILAYAS_METADATA, generateWilayaData } from '/src/data/wilayas';
import { supabase, hasSupabaseCreds, localDb } from './supabase';

/**
 * Normalizes any wilaya identifier (e.g. "DZ-04", "DZ04", "04", "4", "oum-el-bouaghi", "أم البواقي")
 * into standard ID format "DZ-XX". Returns null if not a valid Wilaya.
 */
export const normalizeWilayaId = (input: string | undefined): string | null => {
  if (!input) return null;
  const trimmed = input.trim().toLowerCase();

  // 1. Direct match in pre-defined static data
  const directMatch = WILAYAS_DATA.find(w => 
    w.id.toLowerCase() === trimmed || 
    w.code === trimmed ||
    w.latinName.toLowerCase().replace(/[\s-]/g, '') === trimmed.replace(/[\s-]/g, '') ||
    w.name.replace(/[\s-]/g, '') === trimmed.replace(/[\s-]/g, '')
  );
  if (directMatch) return directMatch.id;

  // 2. Check in ALL_58_WILAYAS_METADATA
  for (const [key, meta] of Object.entries(ALL_58_WILAYAS_METADATA)) {
    if (
      key.toLowerCase() === trimmed ||
      meta.code === trimmed ||
      meta.latin.toLowerCase().replace(/[\s-]/g, '') === trimmed.replace(/[\s-]/g, '') ||
      meta.name.replace(/[\s-]/g, '') === trimmed.replace(/[\s-]/g, '')
    ) {
      return key;
    }
  }

  // 3. Extract numeric digits
  const digits = input.replace(/[^0-9]/g, '');
  if (digits) {
    const num = parseInt(digits, 10);
    if (num >= 1 && num <= 58) {
      const padded = num < 10 ? `0${num}` : `${num}`;
      const candidateId = `DZ-${padded}`;
      if (ALL_58_WILAYAS_METADATA[candidateId]) {
        return candidateId;
      }
    }
  }

  // 4. Fuzzy text search inside 58 metadata
  for (const [key, meta] of Object.entries(ALL_58_WILAYAS_METADATA)) {
    if (
      trimmed.includes(meta.latin.toLowerCase()) ||
      trimmed.includes(meta.name) ||
      meta.name.includes(trimmed)
    ) {
      return key;
    }
  }

  return null;
};

/**
 * Fetches Wilaya data dynamically combining Supabase, localStorage Admin edits, and base data.
 * Executes all necessary Supabase requests in parallel without redundant queries.
 */
export const fetchWilayaDetails = async (
  rawId: string
): Promise<Wilaya | null> => {
  const normalizedId = normalizeWilayaId(rawId);

  if (!normalizedId) {
    return null;
  }

  const code = normalizedId.replace('DZ-', '');


  // جلب الولاية مباشرة من Supabase
  const { data: dbW, error } = await supabase
    .from('wilayas')
    .select('*')
    .eq('code', code)
    .maybeSingle();

  if (error) {
    console.error('Supabase wilaya error:', error);
    throw error;
  }

  if (!dbW) {
    return null;
  }

  // تحويل بيانات Supabase إلى Wilaya
  const wilayaObj: Wilaya = {
    id: `DZ-${dbW.code}`,
    code: dbW.code,
    name: dbW.name,
    latinName: dbW.latin_name || '',
    subtitle: dbW.subtitle || '',
    quote: dbW.quote || '',
    description: dbW.description || '',
    historicalOverview: dbW.historical_overview || '',
    liberationHistory: dbW.liberation_history || '',
    heroImage: dbW.hero_image || dbW.image_url || '',
    historicalZone: dbW.historical_zone || '',
    martyrsCount: dbW.martyrs_count || 0,
    battlesCount: dbW.battles_count || 0,
    figuresCount: 0,

    martyrs: [],
    battles: [],
    figures: [],
    timeline: [],
    archives: [],
    historicalDocuments: []
  };

  return wilayaObj;
};

/**
 * Returns a list of neighboring / related wilayas for discovery navigation.
 */
export const getRelatedWilayas = (currentId: string): Array<{ id: string; name: string; latinName: string; code: string; martyrsCount: number; heroImage: string }> => {
  const normalized = normalizeWilayaId(currentId) || 'DZ-04';
  const others = Object.keys(ALL_58_WILAYAS_METADATA)
    .filter(id => id !== normalized)
    .slice(0, 4);

  return others.map(id => {
    const meta = ALL_58_WILAYAS_METADATA[id];
    return {
      id,
      code: meta.code,
      name: meta.name,
      latinName: meta.latin,
      martyrsCount: meta.martyrs,
      heroImage: "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?q=80&w=600&h=400&fit=crop"
    };
  });
};
