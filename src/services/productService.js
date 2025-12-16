import API_BASE_URL from '../config/api.js';
const API_URL = API_BASE_URL;

// Helper para headers con autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Get all products
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data.success ? data.data : [];
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data.success ? data.data : null;
};

// Add product (admin only)
export const addProduct = async (productData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  return response.json();
};

// Update product (admin only)
export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData)
  });
  return response.json();
};

// Delete product (admin only)
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};