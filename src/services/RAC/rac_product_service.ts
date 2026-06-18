import { supabase } from "../../lib/supabase";
import type { RacProduct } from "../../types/rac_product";

export async function createRacProduct(product: RacProduct) {
  const { data, error } = await supabase
    .from("rac_products")
    .insert([product])
    .select();

  if (error) throw error;

  return data;
}

export async function getRacProducts() {
  const { data, error } = await supabase
    .from("rac_products")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getRacProductCount() {
  const { count, error } = await supabase
    .from("rac_products")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count ?? 0;
}

export async function getRacProductById(id: number) {
  const { data, error } = await supabase
    .from("rac_products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}