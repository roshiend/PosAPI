import React, { useState } from 'react';
import apiClient from '../../utils/api'; // Adjust the path to your utils folder

const ProductForm: React.FC = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    variants: [{ name: '', price: '' }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedVariants = [...productData.variants];
      updatedVariants[index][name] = value;
      setProductData({ ...productData, variants: updatedVariants });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleAddVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { name: '', price: '' }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/products', productData); // Update with the correct endpoint
      console.log('Product submitted successfully:', response.data);
      setProductData({ title: '', description: '', variants: [{ name: '', price: '' }] });
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Product</h2>
      <div>
        <label>
          Product Title:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        </label>
      </div>
      <div>
        <label>
          Product Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description.."
          />
        </label>
      </div>
      <div>
        <h3>Variants</h3>
        {productData.variants.map((variant, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={variant.name}
              onChange={(e) => handleChange(e, index)}
              placeholder="Variant Name"
            />
            <input
              type="number"
              name="price"
              value={variant.price}
              onChange={(e) => handleChange(e, index)}
              placeholder="Variant Price"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddVariant}>
          Add Variant
        </button>
      </div>
      <button type="submit">Submit Product</button>
    </form>
  );
};

export default ProductForm;
