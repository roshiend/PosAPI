import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Product } from '../types/product';
import { createProduct, updateProduct } from '../services/productService';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';

interface UseProductSubmissionProps {
  productId?: string;
}

export function useProductSubmission({ productId }: UseProductSubmissionProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (product: Product) => {
    setIsSubmitting(true);

    try {
      if (productId) {
        const updatedProduct = await updateProduct(productId, product);
        toast.success('Product updated successfully');
        return { success: true, data: updatedProduct };
      } else {
        const newProduct = await createProduct(product);
        toast.success('Product created successfully');
        // Redirect to success page
        navigate(`/products/success/${newProduct.id}`, { 
          state: { productTitle: product.title }
        });
        return { success: true, data: newProduct };
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map(err => err.message).join(', ');
        toast.error(`Validation error: ${errorMessage}`);
      } else if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'An error occurred while saving the product';
        toast.error(message);
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
}