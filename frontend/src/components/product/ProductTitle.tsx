import React from 'react';

interface ProductTitleProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export default function ProductTitle({ title, onTitleChange }: ProductTitleProps) {
  return (
    <div className="mb-6">
      <label htmlFor="product-title" className="block text-sm font-medium text-gray-700 mb-1">
        Product Title
      </label>
      <input
        type="text"
        id="product-title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter product title"
      />
    </div>
  );
}