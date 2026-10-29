import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Changed from Token to Bearer for JWT
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await api.post('/login/refresh/', {
            refresh: refreshToken
          });
          
          // Store the new access token
          const { access } = response.data;
          localStorage.setItem('token', access);

          // Update the failed request's authorization header
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Retry the failed request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and reject
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export const register = (userData) => api.post('/register/', userData);
export const login = (userData) => api.post('/login/', userData);

// Products
export const getProducts = (category) => {
  const url = category ? `/products/?category=${category}` : '/products/';
  return api.get(url);
};

// Cart
export const getCartItems = () => api.get('/cart/');
export const addToCart = (productId, quantity = 1) => 
  api.post('/cart/', { product_id: productId, quantity });
export const updateCartItem = (itemId, quantity) => 
  api.put(`/cart/${itemId}/`, { quantity });
export const removeFromCart = (itemId) => 
  api.delete(`/cart/${itemId}/`);

export default api;
