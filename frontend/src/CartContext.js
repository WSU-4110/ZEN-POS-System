import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create an observable CartService (Observer Pattern)
class CartObservable {
  constructor() {
    this.subscribers = [];
  }
  subscribe(callback) {
    this.subscribers.push(callback);
  }
  notify(items) {
    this.subscribers.forEach(sub => sub(items));
  }
}

// 2. Singleton instance (optional)
export const cartObserver = new CartObservable();

// 3. React Context (unchanged, but now notifies observers)
const CartCtx = createContext();
export function useCart() { return useContext(CartCtx); }

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Notify observers when cart changes
  useEffect(() => {
    cartObserver.notify(items);
  }, [items]);

  const add = entry => {
    setItems(prev => {
      const ix = prev.findIndex(e => !entry.custom && e.id === entry.id);
      const updatedItems = ix >= 0 
        ? prev.map((e, i) => i === ix ? { ...e, qty: e.qty + entry.qty } : e)
        : [...prev, entry];
      return updatedItems;
    });
  };

  const remove = idx => 
    setItems(prev => prev.filter((_, i) => i !== idx));

  const clear = () => setItems([]);

  const total = items.reduce((sum, e) => sum + e.price * e.qty, 0);

  return (
    <CartCtx.Provider value={{ items, add, remove, clear, total }}>
      {children}
    </CartCtx.Provider>
  );
}
