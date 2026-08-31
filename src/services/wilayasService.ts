import { supabase } from '/lib/supabase';

export const fetchAllWilayas = async () => {
  const { data, error } = await supabase
    .from('wilayas')
    .select(`
      id,
      code,
      name,
      latin_name,
      martyrs_count,
      battles_count,
      hero_image
    `)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error loading wilayas:', error);
    throw error;
  }

  return data || [];
};