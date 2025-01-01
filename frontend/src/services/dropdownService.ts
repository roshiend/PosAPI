import api from './api';
import { SelectOption } from '../types/product';

export async function fetchVendors(): Promise<SelectOption[]> {
  const response = await api.get('/vendors');
  return response.data;
}

export async function fetchProductTypes(): Promise<SelectOption[]> {
  const response = await api.get('/product_types');
  return response.data;
}

export async function fetchShopLocations(): Promise<SelectOption[]> {
  const response = await api.get('/shop_locations');
  return response.data;
}

export async function fetchCategories(): Promise<SelectOption[]> {
  const response = await api.get('/categories');
  return response.data;
}

export async function fetchSubcategories(categoryId: string): Promise<SelectOption[]> {
  if (!categoryId) return [];
  const response = await api.get(`/categories/${categoryId}/sub_categories`);
  return response.data;
}

export async function fetchListingTypes(): Promise<SelectOption[]> {
  const response = await api.get('/listing_types');
  return response.data;
}