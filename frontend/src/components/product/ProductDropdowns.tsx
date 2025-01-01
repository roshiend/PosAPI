import React, { useMemo } from 'react';
import { SelectOption } from '../../types/product';

interface ProductDropdownsProps {
  vendors: SelectOption[];
  productTypes: SelectOption[];
  shopLocations: SelectOption[];
  categories: SelectOption[];
  subcategories: SelectOption[];
  listingTypes: SelectOption[];
  selectedValues: {
    vendor_id: string;
    product_type_id: string;
    shop_location_id: string;
    category_id: string;
    subcategory_id: string;
    listing_type_id: string;
  };
  onValueChange: (field: string, value: string) => void;
}

export default function ProductDropdowns({
  vendors,
  productTypes,
  shopLocations,
  categories,
  subcategories,
  listingTypes,
  selectedValues,
  onValueChange,
}: ProductDropdownsProps) {
  // Filter subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    if (!selectedValues.category_id) return [];
    return subcategories.filter(
      sub => sub.category_id === selectedValues.category_id
    );
  }, [subcategories, selectedValues.category_id]);

  // Reset subcategory when category changes
  const handleCategoryChange = (categoryId: string) => {
    onValueChange('category_id', categoryId);
    onValueChange('subcategory_id', '');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">
          Vendor
        </label>
        <select
          id="vendor"
          value={selectedValues.vendor_id}
          onChange={(e) => onValueChange('vendor_id', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
          Product Type
        </label>
        <select
          id="productType"
          value={selectedValues.product_type_id}
          onChange={(e) => onValueChange('product_type_id', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="shopLocation" className="block text-sm font-medium text-gray-700">
          Shop Location
        </label>
        <select
          id="shopLocation"
          value={selectedValues.shop_location_id}
          onChange={(e) => onValueChange('shop_location_id', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Shop Location</option>
          {shopLocations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={selectedValues.category_id}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <select
          id="subcategory"
          value={selectedValues.subcategory_id}
          onChange={(e) => onValueChange('subcategory_id', e.target.value)}
          disabled={!selectedValues.category_id}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="listingType" className="block text-sm font-medium text-gray-700">
          Listing Type
        </label>
        <select
          id="listingType"
          value={selectedValues.listing_type_id}
          onChange={(e) => onValueChange('listing_type_id', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Listing Type</option>
          {listingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}