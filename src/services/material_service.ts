import { supabase } from "../lib/supabase";

export async function getMaterials() {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}