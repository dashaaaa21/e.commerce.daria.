const BASE_URL = 'https://fakestoreapi.com';

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const fetchProducts = async (category = null) => {
  const url = category 
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return response.json();
};
