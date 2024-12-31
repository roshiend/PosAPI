import { Product } from '../types/product';
import api from './api';
import { productSchema } from '../validation/productSchema';

export async function createProduct(product: Product) {
  try {
    // Validate the product data before sending
    const validatedData = productSchema.parse(product);
    
    const response = await api.post('/products', validatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(productId: string, product: Product) {
  try {
    const validatedData = productSchema.parse(product);
    
    const response = await api.put(`/products/${productId}`, validatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
}