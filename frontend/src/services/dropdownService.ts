import api from './api';
import { SelectOption } from '../types/product';
import { handleError } from '../utils/errorHandling';

const EMPTY_RESPONSE: SelectOption[] = [];

export async function fetchVendors(): Promise<SelectOption[]> {
  try {
    const response = await api.get('/vendors');
    return response.data;
  } catch (error) {
    handleError(error, 'vendors');
    return EMPTY_RESPONSE;
  }
}

export async function fetchProductTypes(): Promise<SelectOption[]> {
  try {
    const response = await api.get('/product_types');
    return response.data;
  } catch (error) {
    handleError(error, 'product types');
    return EMPTY_RESPONSE;
  }
}

export async function fetchShopLocations(): Promise<SelectOption[]> {
  try {
    const response = await api.get('/shop_locations');
    return response.data;
  } catch (error) {
    handleError(error, 'shop locations');
    return EMPTY_RESPONSE;
  }
}

export async function fetchCategories(): Promise<SelectOption[]> {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    handleError(error, 'categories');
    return EMPTY_RESPONSE;
  }
}

export async function fetchSubcategories(categoryId: string): Promise<SelectOption[]> {
  if (!categoryId) return EMPTY_RESPONSE;
  
  try {
    const response = await api.get(`/categories/${categoryId}/sub_categories`);
    return response.data;
  } catch (error) {
    handleError(error, 'subcategories');
    return EMPTY_RESPONSE;
  }
}

export async function fetchListingTypes(): Promise<SelectOption[]> {
  try {
    const response = await api.get('/listing_types');
    return response.data;
  } catch (error) {
    handleError(error, 'listing types');
    return EMPTY_RESPONSE;
  }
}