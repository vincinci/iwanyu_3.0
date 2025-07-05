'use client';

import { useState, useEffect } from 'react';
import { clientDb } from './api-client';
import { useTestCart } from './test-cart';

// Check if we're in a test environment or missing API connection
const isTestMode = !process.env.NEXT_PUBLIC_API_URL;

// Cart item type
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendorId: string;
}

// Cart hook for managing cart state
export const useCart = () => {
  // Use test cart if in test mode
  const testCart = useTestCart();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart items on mount (only if not in test mode)
  useEffect(() => {
    if (!isTestMode) {
      loadCartItems();
    }
  }, []);

  const loadCartItems = async () => {
    if (isTestMode) return;
    
    try {
      setLoading(true);
      // Fetch cart data from our API
      const response = await fetch('/api/cart');
      const cartData = await response.json();
      
      // The API returns {items: CartItem[], ...} structure
      const items = cartData.items || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error('Failed to load cart items:', error);
      // Ensure we always have an array
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (isTestMode) {
      return testCart.addToCart(productId, quantity);
    }
    
    try {
      setLoading(true);
      
      // For now, since we're dealing with a mock API, we'll create a mock item
      const mockItem = {
        productId,
        quantity,
        name: `Product ${productId}`,
        price: 99990,
        image: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`,
      };
      
      // Add to cart via API
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockItem),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      
      // Reload cart items
      await loadCartItems();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (isTestMode) {
      return testCart.removeFromCart(itemId);
    }
    
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      await loadCartItems();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (isTestMode) {
      return testCart.updateQuantity(itemId, quantity);
    }
    
    try {
      setLoading(true);
      
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }
      
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }
      
      await loadCartItems();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = () => {
    if (isTestMode) {
      return testCart.getCartCount();
    }
    // Ensure cartItems is an array before calling reduce
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (isTestMode) {
      return testCart.getCartTotal();
    }
    // Ensure cartItems is an array before calling reduce
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = async () => {
    if (isTestMode) {
      return testCart.clearCart();
    }
    
    try {
      setLoading(true);
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Return test cart data if in test mode
  if (isTestMode) {
    return testCart;
  }

  return {
    items: cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
    refresh: loadCartItems,
  };
};
