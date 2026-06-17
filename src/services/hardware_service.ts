import { supabase } from "../lib/supabase";
import type { Hardware } from "../types/hardware";

export async function createHardware(hardware: Hardware) {
  const { data, error } = await supabase
    .from("hardware_master")
    .insert([hardware])
    .select();

  if (error) throw error;

  return data;
}

export async function getHardwares() {
  const { data, error } = await supabase
    .from("hardware_master")
    .select("*")
    .order("hardware_id", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getHardwareCount() {
  const { count, error } = await supabase
    .from("hardware_master")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count ?? 0;
}

export async function getHardwareById(id: number) {
  const { data, error } = await supabase
    .from("hardware_master")
    .select("*")
    .eq("hardware_id", id)
    .single();

  if (error) throw error;

  return data;
}