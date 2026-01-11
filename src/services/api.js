const BASE_URL = 'https://fakestoreapi.com';

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export const fetchCategories = async () => {
  const response = await fetchWithRetry(`${BASE_URL}/products/categories`);
  return response.json();
};

export const fetchProducts = async (category = null) => {
  const url = category 
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;
  
  const response = await fetchWithRetry(url);
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetchWithRetry(`${BASE_URL}/products/${id}`);
  return response.json();
};
