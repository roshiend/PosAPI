import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './ProductDetails';
import ProductDropdowns from './ProductDropdowns';
import OptionsList from '../options/OptionsList';
import VariantsTable from '../variants/VariantsTable';
import { Product, ProductVariant } from '../../types/product';
import { generateVariantCombinations, createVariant, findExistingVariant } from '../../utils/variantUtils';
import { useProductSubmission } from '../../hooks/useProductSubmission';
import { useDropdownData } from '../../hooks/useDropdownData';

export default function ProductManager() {
  const [product, setProduct] = useState<Product>({
    title: '',
    description: '',
    options: [],
    vendor_id: '',
    product_type_id: '',
    shop_location_id: '',
    category_id: '',
    subcategory_id: '',
    listing_type_id: ''
  });
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [lastUpdatedVariant, setLastUpdatedVariant] = useState<ProductVariant | null>(null);
  
  const { handleSubmit, isSubmitting } = useProductSubmission();
  const { 
    vendors, 
    productTypes, 
    shopLocations, 
    categories, 
    subcategories, 
    listingTypes, 
    isLoading 
  } = useDropdownData(product.category_id);

  useEffect(() => {
    updateVariants();
  }, [product.options]);

  const updateVariants = () => {
    const combinations = generateVariantCombinations(product.options);
    
    setVariants(prevVariants => {
      const defaultValues = lastUpdatedVariant ? {
        price: lastUpdatedVariant.price,
        quantity: lastUpdatedVariant.quantity,
        sku: lastUpdatedVariant.sku
      } : {};

      return combinations.map(combination => {
        const existingVariant = findExistingVariant(combination, prevVariants);
        return createVariant(combination, existingVariant, defaultValues);
      });
    });
  };

  const handleTitleChange = (title: string) => {
    setProduct(prev => ({ ...prev, title }));
  };

  const handleDescriptionChange = (description: string) => {
    setProduct(prev => ({ ...prev, description }));
  };

  const addOption = () => {
    if (product.options.length >= 3) {
      toast.error('Maximum 3 options allowed');
      return;
    }

    const newOption = {
      id: crypto.randomUUID(),
      name: '',
      values: [],
      position: product.options.length + 1
    };

    setProduct(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
  };

  const updateOption = (updatedOption: ProductOption) => {
    setProduct(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === updatedOption.id ? updatedOption : opt
      )
    }));
  };

  const removeOption = (optionId: string) => {
    setProduct(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== optionId)
    }));
  };

  const removeOptionValue = (optionId: string, valueToRemove: string) => {
    setProduct(prev => ({
      ...prev,
      options: prev.options.map(opt => {
        if (opt.id === optionId) {
          return {
            ...opt,
            values: opt.values.filter(v => v !== valueToRemove)
          };
        }
        return opt;
      })
    }));
  };

  const updateVariant = (variantId: string, updates: Partial<ProductVariant>) => {
    setVariants(prevVariants => {
      const newVariants = prevVariants.map(variant => {
        if (variant.id === variantId) {
          const updatedVariant = { ...variant, ...updates };
          setLastUpdatedVariant(updatedVariant);
          return updatedVariant;
        }
        return variant;
      });
      return newVariants;
    });
  };

  const deleteVariant = (variant: ProductVariant) => {
    setVariants(prevVariants => prevVariants.filter(v => v.id !== variant.id));
  };

  const handleDropdownChange = (field: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory when category changes
      ...(field === 'category_id' ? { subcategory_id: '' } : {})
    }));
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <ProductDetails
        title={product.title}
        description={product.description}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Product Details</h3>
        <ProductDropdowns
          vendors={vendors}
          productTypes={productTypes}
          shopLocations={shopLocations}
          categories={categories}
          subcategories={subcategories}
          listingTypes={listingTypes}
          selectedValues={{
            vendor_id: product.vendor_id,
            product_type_id: product.product_type_id,
            shop_location_id: product.shop_location_id,
            category_id: product.category_id,
            subcategory_id: product.subcategory_id,
            listing_type_id: product.listing_type_id
          }}
          onValueChange={handleDropdownChange}
          isLoading={isLoading}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Options</h3>
        </div>
        
        <OptionsList
          options={product.options}
          onUpdateOption={updateOption}
          onRemoveOption={removeOption}
          onRemoveOptionValue={removeOptionValue}
        />

        <div className="p-4">
          <button
            onClick={addOption}
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <Plus size={20} className="mr-2" />
            Add another option
          </button>
        </div>
      </div>

      <VariantsTable
        variants={variants}
        options={product.options}
        onUpdateVariant={updateVariant}
        onDeleteVariant={deleteVariant}
      />

      <div className="flex justify-end">
        <button
          onClick={() => handleSubmit(product)}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </div>
  );
}