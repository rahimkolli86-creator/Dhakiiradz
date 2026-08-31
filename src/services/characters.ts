import { supabase } from "/lib/supabase";

export const getCharacters = async () => {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

export const addCharacter = async (character: any) => {
  const { data, error } = await supabase
    .from("characters")
    .insert([character])
    .select();

  if (error) throw error;

  return data;
};