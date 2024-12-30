// Utility functions for variant management
export function generateVariantCombinations(options: Option[]): string[][] {
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
  variants: Variant[], 
  options: Option[]
): Variant | undefined {
  // First try exact match
  const exactMatch = variants.find(variant => 
    variant.options.length === combination.length &&
    variant.options.every((opt, i) => opt === combination[i])
  );

  if (exactMatch) return exactMatch;

  // Try to match based on option names and values
  return variants.find(variant => {
    return combination.every((value, index) => {
      const optionName = options[index]?.name;
      const variantValue = variant.options[index];
      return value === variantValue && optionName;
    });
  });
}

export function createVariant(
  combination: string[], 
  existingVariant?: Variant,
  defaultValues: Partial<Variant> = {}
): Variant {
  return {
    id: existingVariant?.id || crypto.randomUUID(),
    options: combination,
    price: existingVariant?.price || defaultValues.price || '',
    quantity: existingVariant?.quantity || defaultValues.quantity || '0',
    sku: existingVariant?.sku || defaultValues.sku || ''
  };
}