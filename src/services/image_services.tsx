import imageCompression from "browser-image-compression";
import { supabase } from "../lib/supabase";

export async function uploadProductImage(
  file: File
) {
  const compressedFile =
    await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    });

  const safeFileName =
  `${Date.now()}-${compressedFile.name}`
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

    
  const { error } = await supabase.storage
    .from("product-images")
    .upload(safeFileName, compressedFile);

  if (error) throw error;

  const { data } = supabase.storage
  .from("product-images")
  .getPublicUrl(safeFileName);

  return data.publicUrl;
}