import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import OptionsList from './options/OptionsList';
import VariantsTable from './variants/VariantsTable';
import { Option, Variant } from '../types/variants';
import { generateVariantCombinations, createVariant, findExistingVariant } from '../utils/variantUtils';

export default function VariantManager() {
  const [options, setOptions] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [lastUpdatedVariant, setLastUpdatedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    updateVariants();
  }, [options]);

  const updateVariants = () => {
    const combinations = generateVariantCombinations(options);
    
    setVariants(prevVariants => {
      // Get default values from last updated variant
      const defaultValues = lastUpdatedVariant ? {
        price: lastUpdatedVariant.price,
        quantity: lastUpdatedVariant.quantity,
        sku: lastUpdatedVariant.sku
      } : {};

      return combinations.map(combination => {
        const existingVariant = findExistingVariant(combination, prevVariants, options);
        return createVariant(combination, existingVariant, defaultValues);
      });
    });
  };

  const addOption = () => {
    if (options.length >= 3) {
      alert('Maximum 3 options allowed');
      return;
    }
    const newOption: Option = {
      id: crypto.randomUUID(),
      name: '',
      values: []
    };
    setOptions([...options, newOption]);
  };

  const updateOption = (updatedOption: Option) => {
    setOptions(options.map(opt => 
      opt.id === updatedOption.id ? updatedOption : opt
    ));
  };

  const removeOption = (optionId: string) => {
    setOptions(options.filter(opt => opt.id !== optionId));
  };

  const updateVariant = (variantId: string, updates: Partial<Variant>) => {
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Options</h3>
        </div>
        
        <OptionsList
          options={options}
          onUpdateOption={updateOption}
          onRemoveOption={removeOption}
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
        options={options}
        onUpdateVariant={updateVariant}
      />
    </div>
  );
}