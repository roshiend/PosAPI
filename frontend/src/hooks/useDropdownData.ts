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
import { showErrorToast } from '../utils/errorHandling';

export function useDropdownData(selectedCategoryId: string = '') {
  const [vendors, setVendors] = useState<SelectOption[]>([]);
  const [productTypes, setProductTypes] = useState<SelectOption[]>([]);
  const [shopLocations, setShopLocations] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [subcategories, setSubcategories] = useState<SelectOption[]>([]);
  const [listingTypes, setListingTypes] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [
          vendorData,
          productTypeData,
          locationData,
          categoryData,
          listingTypeData
        ] = await Promise.all([
          fetchVendors(),
          fetchProductTypes(),
          fetchShopLocations(),
          fetchCategories(),
          fetchListingTypes()
        ]);

        if (!mounted) return;

        setVendors(vendorData);
        setProductTypes(productTypeData);
        setShopLocations(locationData);
        setCategories(categoryData);
        setListingTypes(listingTypeData);
      } catch (error) {
        if (!mounted) return;
        showErrorToast('Failed to load form data. Please try again.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadSubcategories = async () => {
      if (!selectedCategoryId) {
        setSubcategories([]);
        return;
      }

      try {
        const data = await fetchSubcategories(selectedCategoryId);
        if (mounted) {
          setSubcategories(data);
        }
      } catch (error) {
        if (mounted) {
          showErrorToast('Failed to load subcategories');
          setSubcategories([]);
        }
      }
    };

    loadSubcategories();
    return () => { mounted = false; };
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