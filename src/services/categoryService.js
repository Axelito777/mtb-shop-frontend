const API_URL = 'http://localhost:8080/api';

// Get all categories
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  const data = await response.json();
  return data.success ? data.data : [];
};

// Get category by ID
export const getCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}`);
  const data = await response.json();
  return data.success ? data.data : null;
};