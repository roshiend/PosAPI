import { useState, useEffect } from 'react';
import { SelectOption } from '../types/product';
import { fetchSubcategoriesForCategory } from '../services/dropdownService';
import { toast } from 'react-hot-toast';

export function useSubcategories(categoryId: string) {
  const [subcategories, setSubcategories] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSubcategories = async () => {
      if (!categoryId) {
        setSubcategories([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSubcategoriesForCategory(categoryId);
        if (isMounted) {
          setSubcategories(data || []); // Ensure we always set an array
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load subcategories';
          setError(error instanceof Error ? error : new Error(errorMessage));
          toast.error(errorMessage);
          setSubcategories([]); // Reset subcategories on error
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSubcategories();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return { subcategories, isLoading, error };
}