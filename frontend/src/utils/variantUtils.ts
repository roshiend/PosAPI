import { ProductOption, ProductVariant } from '../types/product';

export function generateVariantCombinations(options: ProductOption[]): string[][] {
  if (!options.length) return [];
  
  const generateHelper = (index = 0, current: string[] = []): string[][] => {
    if (index === options.length) {
      return [current];
    }

    const combinations: string[][] = [];
    const currentOption = options[index];

    if (!currentOption.values.length) {
      return generateHelper(index + 1, current);
    }

    for (const value of currentOption.values) {
      combinations.push(...generateHelper(index + 1, [...current, value]));
    }

    return combinations;
  };

  return generateHelper();
}

export function findExistingVariant(
  combination: string[], 
  variants: ProductVariant[]
): ProductVariant | undefined {
  return variants.find(variant => {
    return combination.every((value, index) => {
      const optionKey = `option${index + 1}` as keyof Pick<ProductVariant, 'option1' | 'option2' | 'option3'>;
      return variant[optionKey] === value;
    });
  });
}

export function createVariant(
  combination: string[], 
  existingVariant?: ProductVariant,
  defaultValues: Partial<ProductVariant> = {}
): ProductVariant {
  return {
    id: existingVariant?.id || crypto.randomUUID(),
    option1: combination[0] || null,
    option2: combination[1] || null,
    option3: combination[2] || null,
    price: existingVariant?.price || defaultValues.price || '',
    quantity: existingVariant?.quantity || defaultValues.quantity || '0',
    sku: existingVariant?.sku || defaultValues.sku || ''
  };
}