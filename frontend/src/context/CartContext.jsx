import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const user = localStorage.getItem('user') || 'guest';

  const loadCart = async () => {
    try {
      const { data } = await api.get(`/cart?user=${user}`);
      setItems(data);
    } catch (e) {
      setItems([]);
    }
  };

  useEffect(() => { loadCart(); }, []);

  useEffect(() => {
    setTotal(items.reduce((sum, it) => sum + it.price * it.quantity, 0));
  }, [items]);

  const addItem = async itemId => {
    await api.post(`/cart/add?user=${user}&itemId=${itemId}`);
    await loadCart();
  };

  const addCustom = async payload => {
    await api.post(`/cart/addCustom?user=${user}`, payload);
    await loadCart();
  };

  const removeItem = async idx => {
    await api.delete(`/cart?user=${user}&index=${idx}`);
    await loadCart();
  };

  const clearCart = async () => {
    await api.delete(`/cart/clear?user=${user}`);
    await loadCart();
  };

  const checkout = async () => {
    await api.post(`/order?user=${user}`);
    await clearCart();
  };

  return (
      <CartContext.Provider value={{
        items, total,
        addItem, addCustom, removeItem,
        clearCart, checkout
      }}>
        {children}
      </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
