'use client';

import { useState, useEffect } from 'react';
import { clientDb } from './database';

// Cart hook for managing cart state
export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart items on mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
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
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = async () => {
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
