import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import '../index.css';

export default function CartSidebar() {
  const [cart, setCart]   = useState([]);
  const [error, setError] = useState('');
  const user = localStorage.getItem('user') || 'guest';

  const loadCart = async () => {
    try {
      const r = await api.get(`/cart?user=${user}`);
      setCart(r.data);
    } catch {
      setError('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async idx => {
    try {
      await api.delete(`/cart?user=${user}&index=${idx}`);
      loadCart();
    } catch {
      setError('Failed to remove item');
    }
  };

  const total = cart.reduce((sum, e) => sum + e.price * e.quantity, 0);

  return (
    <div className="card card-pos">
      <div className="card-header">Cart</div>
      <div className="card-body">
        {error && <div className="alert alert-warning">{error}</div>}
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group mb-3">
            {cart.map((e, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                <div>
                  <strong>{e.name}</strong><br/>
                  {e.quantity} × ${e.price.toFixed(2)}
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(i)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Total:</strong>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link
          to="/checkout"
          className={`btn btn-primary w-100${cart.length === 0 ? ' disabled' : ''}`}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
