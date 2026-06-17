export interface Product {
  id?: number;

  product_code: string;
  product_name: string;

  assembly_type: string;

  length: number;
  width: number;
  height: number;

  unit: string;

  image_url?: string;
}