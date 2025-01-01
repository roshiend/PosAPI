export const mockVendors = [
  { id: '1', name: 'Vendor 1' },
  { id: '2', name: 'Vendor 2' },
  { id: '3', name: 'Vendor 3' }
];

export const mockProductTypes = [
  { id: '1', name: 'Physical' },
  { id: '2', name: 'Digital' },
  { id: '3', name: 'Service' }
];

export const mockShopLocations = [
  { id: '1', name: 'Main Store' },
  { id: '2', name: 'Warehouse' },
  { id: '3', name: 'Online' }
];

export const mockCategories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Books' }
];

export const mockSubcategories = {
  '1': [ // Electronics subcategories
    { id: '101', name: 'Phones', category_id: '1' },
    { id: '102', name: 'Laptops', category_id: '1' },
    { id: '103', name: 'Accessories', category_id: '1' }
  ],
  '2': [ // Clothing subcategories
    { id: '201', name: 'Men', category_id: '2' },
    { id: '202', name: 'Women', category_id: '2' },
    { id: '203', name: 'Kids', category_id: '2' }
  ],
  '3': [ // Books subcategories
    { id: '301', name: 'Fiction', category_id: '3' },
    { id: '302', name: 'Non-Fiction', category_id: '3' },
    { id: '303', name: 'Educational', category_id: '3' }
  ]
};

export const mockListingTypes = [
  { id: '1', name: 'Regular' },
  { id: '2', name: 'Featured' },
  { id: '3', name: 'Sale' }
];