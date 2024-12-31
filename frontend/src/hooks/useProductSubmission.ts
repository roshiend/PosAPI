import { useState } from 'react';
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

  const handleSubmit = async (product: Product) => {
    setIsSubmitting(true);

    try {
      if (productId) {
        await updateProduct(productId, product);
        toast.success('Product updated successfully');
      } else {
        await createProduct(product);
        toast.success('Product created successfully');
      }
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const errorMessage = error.errors.map(err => err.message).join(', ');
        toast.error(`Validation error: ${errorMessage}`);
      } else if (error instanceof AxiosError) {
        // Handle API errors
        const message = error.response?.data?.message || 'An error occurred while saving the product';
        toast.error(message);
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
}