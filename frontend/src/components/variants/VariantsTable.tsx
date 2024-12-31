import React from 'react';
import { Trash2 } from 'lucide-react';
import { ProductOption, ProductVariant } from '../../types/product';

interface VariantsTableProps {
  variants: ProductVariant[];
  options: ProductOption[];
  onUpdateVariant: (variantId: string, updates: Partial<ProductVariant>) => void;
  onDeleteVariant: (variant: ProductVariant) => void;
}

export default function VariantsTable({ 
  variants, 
  options, 
  onUpdateVariant,
  onDeleteVariant 
}: VariantsTableProps) {
  const hasOptionValues = options.some(option => option.values.length > 0);

  if (!hasOptionValues) {
    return null;
  }

  const getVariantTitle = (variant: ProductVariant): string => {
    return [variant.option1, variant.option2, variant.option3]
      .filter(Boolean)
      .join(' / ');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Variants</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants.map((variant) => (
              <tr key={variant.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getVariantTitle(variant)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    step="0.01"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={variant.price}
                    onChange={(e) => onUpdateVariant(variant.id, { price: e.target.value })}
                    placeholder="0.00"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={variant.quantity}
                    onChange={(e) => onUpdateVariant(variant.id, { quantity: e.target.value })}
                    placeholder="0"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={variant.sku}
                    onChange={(e) => onUpdateVariant(variant.id, { sku: e.target.value })}
                    placeholder="SKU"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onDeleteVariant(variant)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete variant"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}