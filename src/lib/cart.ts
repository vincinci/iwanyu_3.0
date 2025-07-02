'use client';

import { useState } from 'react';

// Simple cart state management - in a real app, you'd use Redux/Zustand/Context
let cartItems: any[] = [];
const cartSubscribers: (() => void)[] = [];

export const useCart = () => {
  const [, forceUpdate] = useState({});

  const addToCart = (product: any, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }
    
    // Notify all subscribers
    cartSubscribers.forEach(callback => callback());
    forceUpdate({});
  };

  const removeFromCart = (productId: number) => {
    cartItems = cartItems.filter(item => item.id !== productId);
    cartSubscribers.forEach(callback => callback());
    forceUpdate({});
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      cartSubscribers.forEach(callback => callback());
      forceUpdate({});
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
  };
};
