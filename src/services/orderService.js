import API_BASE_URL from '../config/api.js';
const API_URL = API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Get my orders
export const getMyOrders = async () => {
  const response = await fetch(`${API_URL}/orders/my-orders`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  return data.success ? data.data : [];
};

// Create order
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData)
  });
  return response.json();
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  return data.success ? data.data : null;
};