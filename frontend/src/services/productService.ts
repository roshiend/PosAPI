import { Product } from '../types/product';
import api from './api';
import { productSchema } from '../validation/productSchema';

export async function createProduct(productData: Product) {
  try {
    // Validate the data
    const validatedData = productSchema.parse(productData);
    
    // Transform the data to match Rails API expectations with indexed attributes
    const payload = {
      product: {
        title: validatedData.title,
        description: validatedData.description,
        option_types_attributes: Object.fromEntries(
          validatedData.options.map((opt, index) => [
            index,
            {
              name: opt.name,
              values: opt.values
            }
          ])
        ),
        variants_attributes: Object.fromEntries(
          validatedData.variants.map((variant, index) => [
            index,
            {
              option1: variant.option1,
              option2: variant.option2,
              option3: variant.option3,
              price: variant.price,
              quantity: variant.quantity,
              sku: variant.sku
            }
          ])
        )
      }
    };

    const response = await api.post('/products', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(productId: string, productData: Product) {
  try {
    const validatedData = productSchema.parse(productData);
    
    const payload = {
      product: {
        title: validatedData.title,
        description: validatedData.description,
        option_types_attributes: Object.fromEntries(
          validatedData.options.map((opt, index) => [
            index,
            {
              id: opt.id,
              name: opt.name,
              values: opt.values,
              _destroy: opt.values.length === 0
            }
          ])
        ),
        variants_attributes: Object.fromEntries(
          validatedData.variants.map((variant, index) => [
            index,
            {
              id: variant.id,
              option1: variant.option1,
              option2: variant.option2,
              option3: variant.option3,
              price: variant.price,
              quantity: variant.quantity,
              sku: variant.sku
            }
          ])
        )
      }
    };

    const response = await api.put(`/products/${productId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}