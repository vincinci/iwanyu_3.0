'use client';

import { useState, useEffect } from 'react';
import { clientDb } from './database';
import { useTestCart } from './test-cart';

// Check if we're in a test environment or missing Supabase config
const isTestMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cart hook for managing cart state
export const useCart = () => {
  // Use test cart if in test mode
  const testCart = useTestCart();
  
  const [cartItems, setCartItems] = useState<any[]>([]);
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
      const { data } = await clientDb.getCartItems();
      setCartItems(data || []);
    } catch (error) {
      console.error('Failed to load cart items:', error);
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
      
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.productId === productId);
      
      if (existingItem) {
        // Update quantity
        await clientDb.updateCartItem(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Add new item
        await clientDb.addToCart(productId, quantity);
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
      await clientDb.removeFromCart(itemId);
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
      
      await clientDb.updateCartItem(itemId, quantity);
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
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (isTestMode) {
      return testCart.getCartTotal();
    }
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = async () => {
    if (isTestMode) {
      return testCart.clearCart();
    }
    
    try {
      setLoading(true);
      // Remove all items one by one (could be optimized with a bulk delete endpoint)
      await Promise.all(cartItems.map(item => clientDb.removeFromCart(item.id)));
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
