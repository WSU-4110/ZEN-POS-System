import React, { createContext, useContext, useState } from 'react';
import { postTransaction } from './components/api/api';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const checkoutCart = async ({ employee, phoneNumber }) => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((sum, e) => sum + e.price * e.quantity, 0);
    await postTransaction({
      totalAmount: subtotal,
      employee,
      status: 'completed',
      paymentMethod: 'Cash',
      promotional: false,
      items: cart.map(e => ({
        itemName: e.name,
        quantity: e.quantity,
        price: e.price,
      })),
      phoneNumber: phoneNumber || null
    });
    setCart([]);
  };

  return (
      <CartContext.Provider value={{
        cart,
        setCart,
        checkoutCart,
      }}>
        {children}
      </CartContext.Provider>
  );
}
