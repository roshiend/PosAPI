import { toast } from 'react-hot-toast';

export const handleError = (error: unknown, context: string) => {
  // Safe stringification of error details
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  
  // Log error safely without complex objects
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${context} error:`, errorMessage);
  }
  
  return {
    error: true,
    message: `Failed to load ${context}`
  };
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};