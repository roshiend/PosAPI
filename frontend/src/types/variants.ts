export interface Option {
  id: string;
  name: string;
  values: string[];
}

export interface Variant {
  id: string;
  options: string[];
  price: string;
  quantity: string;
  sku: string;
}