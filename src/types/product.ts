export interface Product {
  id?: number;

  product_code: string;
  product_name: string;
  description: string;

  assembly_type: string;
  fob_enabled: boolean;

  length: number;
  width: number;
  height: number;

  unit: string;

  finish: string;

  image_url?: string;
}