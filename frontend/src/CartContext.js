import React, { createContext, useContext, useState } from 'react';

const CartCtx = createContext();
export function useCart() { return useContext(CartCtx); }

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = entry => {
    setItems(prev => {
      const ix = prev.findIndex(e => !entry.custom && e.id === entry.id);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix].qty += entry.qty;
        return copy;
      }
      return [...prev, entry];
    });
  };

  const remove = idx =>
    setItems(prev => prev.filter((_,i) => i !== idx));

  const clear = () => setItems([]);

  const total = items.reduce((sum,e) => sum + e.price * e.qty, 0);

  return (
    <CartCtx.Provider value={{ items, add, remove, clear, total }}>
      {children}
    </CartCtx.Provider>
  );
}
