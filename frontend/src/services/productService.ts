import { Product } from '../types/product';
import api from './api';
import { productSchema } from '../validation/productSchema';

export async function createProduct(productData: Product) {
  try {
    // Validate the data
    const validatedData = productSchema.parse(productData);
    
    // Transform the data to match Rails API expectations
    const payload = {
      product: {
        title: validatedData.title,
        description: validatedData.description,
        vendor_id: validatedData.vendor_id,
        product_type_id: validatedData.product_type_id,
        shop_location_id: validatedData.shop_location_id,
        category_id: validatedData.category_id,
        subcategory_id: validatedData.subcategory_id,
        listing_type_id: validatedData.listing_type_id,
        option_types_attributes: Object.fromEntries(
          validatedData.options.map((opt, index) => [
            index,
            {
              name: opt.name,
              values: opt.values,
              position: opt.position
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
        vendor_id: validatedData.vendor_id,
        product_type_id: validatedData.product_type_id,
        shop_location_id: validatedData.shop_location_id,
        category_id: validatedData.category_id,
        subcategory_id: validatedData.subcategory_id,
        listing_type_id: validatedData.listing_type_id,
        option_types_attributes: Object.fromEntries(
          validatedData.options.map((opt, index) => [
            index,
            {
              id: opt.id,
              name: opt.name,
              values: opt.values,
              position: opt.position,
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