import { supabase } from "../lib/supabase";

export async function getFinishes() {
  const { data, error } = await supabase
    .from("finishes")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}