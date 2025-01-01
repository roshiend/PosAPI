import { useState, useEffect } from 'react';
import { SelectOption } from '../types/product';
import {
  fetchVendors,
  fetchProductTypes,
  fetchShopLocations,
  fetchCategories,
  fetchListingTypes,
} from '../services/dropdownService';
import { toast } from 'react-hot-toast';

export function useDropdownData() {
  const [vendors, setVendors] = useState<SelectOption[]>([]);
  const [productTypes, setProductTypes] = useState<SelectOption[]>([]);
  const [shopLocations, setShopLocations] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [listingTypes, setListingTypes] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDropdownData = async () => {
      try {
        const results = await Promise.all([
          fetchVendors().catch(() => []),
          fetchProductTypes().catch(() => []),
          fetchShopLocations().catch(() => []),
          fetchCategories().catch(() => []),
          fetchListingTypes().catch(() => [])
        ]);

        if (!isMounted) return;

        const [
          vendorsData,
          productTypesData,
          shopLocationsData,
          categoriesData,
          listingTypesData
        ] = results;

        setVendors(vendorsData);
        setProductTypes(productTypesData);
        setShopLocations(shopLocationsData);
        setCategories(categoriesData);
        setListingTypes(listingTypesData);
      } catch (error) {
        if (!isMounted) return;
        console.error('Error loading dropdown data:', error);
        toast.error('Failed to load some dropdown data');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDropdownData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    vendors,
    productTypes,
    shopLocations,
    categories,
    listingTypes,
    isLoading
  };
}