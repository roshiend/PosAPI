export interface ProductOption {
  id: string;
  name: string;
  values: string[];
  position: number;
}

export interface Product {
  title: string;
  description: string;
  options: ProductOption[];
}

export interface ProductVariant {
  id: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  price: string;
  quantity: string;
  sku: string;
}