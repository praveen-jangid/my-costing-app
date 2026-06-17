import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

export async function createProduct(product: Product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) throw error;

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getProductCount() {
  const { count, error } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count ?? 0;
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}