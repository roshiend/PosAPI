import { useState, useEffect } from 'react';
import { SelectOption } from '../types/product';
import {
  fetchVendors,
  fetchProductTypes,
  fetchShopLocations,
  fetchCategories,
  fetchSubcategories,
  fetchListingTypes,
} from '../services/dropdownService';
import { toast } from 'react-hot-toast';

export function useDropdownData(selectedCategoryId: string = '') {
  const [vendors, setVendors] = useState<SelectOption[]>([]);
  const [productTypes, setProductTypes] = useState<SelectOption[]>([]);
  const [shopLocations, setShopLocations] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [subcategories, setSubcategories] = useState<SelectOption[]>([]);
  const [listingTypes, setListingTypes] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all dropdown data except subcategories
  useEffect(() => {
    let isMounted = true;

    const loadDropdownData = async () => {
      try {
        const results = await Promise.allSettled([
          fetchVendors(),
          fetchProductTypes(),
          fetchShopLocations(),
          fetchCategories(),
          fetchListingTypes()
        ]);

        if (!isMounted) return;

        // Process results and handle individual failures
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            switch (index) {
              case 0: setVendors(result.value); break;
              case 1: setProductTypes(result.value); break;
              case 2: setShopLocations(result.value); break;
              case 3: setCategories(result.value); break;
              case 4: setListingTypes(result.value); break;
            }
          } else {
            toast.error(`Failed to load ${getDropdownName(index)}`);
          }
        });
      } catch (error) {
        if (!isMounted) return;
        toast.error('Failed to load dropdown data');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDropdownData();
    return () => { isMounted = false; };
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    let isMounted = true;

    const loadSubcategories = async () => {
      if (!selectedCategoryId) {
        setSubcategories([]);
        return;
      }

      try {
        const data = await fetchSubcategories(selectedCategoryId);
        if (isMounted) {
          setSubcategories(data);
        }
      } catch (error) {
        if (isMounted) {
          setSubcategories([]);
          toast.error('Failed to load subcategories');
        }
      }
    };

    loadSubcategories();
    return () => { isMounted = false; };
  }, [selectedCategoryId]);

  return {
    vendors,
    productTypes,
    shopLocations,
    categories,
    subcategories,
    listingTypes,
    isLoading
  };
}

function getDropdownName(index: number): string {
  const names = ['vendors', 'product types', 'shop locations', 'categories', 'listing types'];
  return names[index] || 'data';
}