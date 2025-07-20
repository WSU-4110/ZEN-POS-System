import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, deleteCartItem, postCartItemCustom, clearCartItems } from '../api/api';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [discount, setDiscount] = useState(null);
    const user = localStorage.getItem('user') || 'guest';

    const loadCart = async () => {
        try {
            const data = await fetchCart(user);
            setItems(data);
        } catch {
            setItems([]);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const addItem = async (newItem) => {
        await postCartItemCustom(user, {
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity
        });
        await loadCart();
    };

    const removeItem = async (index) => {
        await deleteCartItem(user, index);
        await loadCart();
    };

    const clearCart = async () => {
        await clearCartItems(user);
        setDiscount(null);
        setItems([]);
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discountAmount = discount
        ? discount.type === 'percentage'
            ? subtotal * (discount.value / 100)
            : discount.value
        : 0;

    const total = subtotal - discountAmount;

    const applyDiscount = (discountObj) => {
        setDiscount(discountObj);
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
                removeDiscount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
