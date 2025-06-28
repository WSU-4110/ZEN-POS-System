import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discountAmount = discount 
    ? discount.type === 'percentage'
      ? subtotal * (discount.value / 100)
      : discount.value
    : 0;

  const total = subtotal - discountAmount;

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(null);
  };

  const applyDiscount = (discount) => {
    setDiscount(discount);
  };

  const removeDiscount = () => {
    setDiscount(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        subtotal,
        discount,
        discountAmount,
        total,
        applyDiscount,
        removeDiscount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}