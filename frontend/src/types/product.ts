export interface SelectOption {
  id: string;
  name: string;
  value :string;
  category_id?: string;
}

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
  vendor_id: string;
  product_type_id: string;
  shop_location_id: string;
  category_id: string;
  subcategory_id: string;
  listing_type_id: string;
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