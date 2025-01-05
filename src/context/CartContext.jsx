import { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addToCart, updateCartItem, removeFromCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await getCartItems();
      setCartItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
      setError('Failed to fetch cart items');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addItem = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          message: 'Please login to add items to cart' 
        } 
      });
      return false;
    }

    try {
      setLoading(true);
      const response = await addToCart(productId, quantity);
      
      setCartItems(prev => {
        const exists = prev.find(item => item.id === response.data.id);
        if (exists) {
          return prev.map(item =>
            item.id === response.data.id ? response.data : item
          );
        }
        return [...prev, response.data];
      });
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login', { 
          state: { 
            from: window.location.pathname,
            message: 'Your session has expired. Please login again.' 
          } 
        });
      }
      
      // Set error message based on response
      const errorMessage = err.response?.data?.error || 'Failed to add item to cart';
      setError(errorMessage);
      
      // Return false to indicate failure
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return false;
    }

    try {
      setLoading(true);
      const response = await updateCartItem(itemId, quantity);
      setCartItems(prev =>
        prev.map(item => (item.id === itemId ? response.data : item))
      );
      setError(null);
      return true;
    } catch (err) {
      console.error('Error updating cart:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
      setError('Failed to update cart item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return false;
    }

    try {
      setLoading(true);
      await removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      setError(null);
      return true;
    } catch (err) {
      console.error('Error removing from cart:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
      setError('Failed to remove item from cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setError(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.total_price, 0);
  };

  const value = {
    cartItems,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
