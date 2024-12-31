import { z } from 'zod';

const optionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Option name is required'),
  values: z.array(z.string()).min(1, 'At least one option value is required'),
  position: z.number()
});

const variantSchema = z.object({
  id: z.string(),
  option1: z.string().nullable(),
  option2: z.string().nullable(),
  option3: z.string().nullable(),
  price: z.string().min(1, 'Price is required'),
  quantity: z.string(),
  sku: z.string()
});

export const productSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  description: z.string(),
  options: z.array(optionSchema),
  variants: z.array(variantSchema)
});