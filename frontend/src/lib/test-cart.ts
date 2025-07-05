'use client';

import { useState, useEffect } from 'react';

// Mock cart item type for testing
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    images?: string[];
    vendor?: {
      businessName: string;
    };
  };
}

// Simple localStorage-based cart for testing without Supabase
export const useTestCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('test-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('test-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    setLoading(true);
    try {
      // Create a mock product
      const mockProduct = {
        id: productId,
        name: `Product ${productId}`,
        price: 99990,
        images: ['/placeholder-product.svg'],
        vendor: { businessName: 'Test Vendor' }
      };

      // Check if item already exists
      const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedItems);
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId,
          quantity,
          product: mockProduct
        };
        setCartItems(prev => [...prev, newItem]);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
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
    setLoading(true);
    try {
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
    refresh: () => {} // No-op for compatibility
  };
};
