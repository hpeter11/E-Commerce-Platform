const BASE_URL = 'https://dummyjson.com';

// Function to fetch products from the API
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data.products;
    // Get products, otherwise throw an error
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to search products by query from the API
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    const data = await response.json();
    return data.products;
    // Use search query to get results, otherwise throw an error
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
