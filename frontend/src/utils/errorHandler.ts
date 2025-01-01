import { toast } from 'react-hot-toast';
import { ZodError } from 'zod';

export function handleError(error: unknown): void {
  if (error instanceof ZodError) {
    error.errors.forEach(err => {
      const field = err.path.join('.');
      toast.error(`${field}: ${err.message}`);
    });
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred');
  }
}