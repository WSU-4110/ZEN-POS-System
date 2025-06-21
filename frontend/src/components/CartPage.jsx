import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function CartPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || 'guest';
  
  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/cart?user=${user}`);
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to load cart', err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async idx => {
    try {
      await api.delete(`/cart?user=${user}&index=${idx}`);
      await loadCart();
    } catch {
      alert('Could not remove item');
    }
  };

  const handlePlaceOrder = async () => {
    if (!entries.length) return alert('Your cart is empty');
  
    try {
      for (let i = entries.length - 1; i >= 0; i--) {
        await api.delete(`/cart?user=${user}&index=${i}`);
      }
      alert('Order placed!');
      navigate('/');
    } catch {
      alert('✕ Could not place order');
    }
  };

  const subtotal = entries.reduce((sum, e) => sum + e.price * e.quantity, 0);

  if (loading) return <p>Loading cart…</p>;

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="col-md-8">
        <h2>Your Cart</h2>
        {entries.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group mb-3">
            {entries.map((e, idx) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                <div>
                  <strong>{e.name}</strong> &times; {e.quantity}
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3">${(e.price * e.quantity).toFixed(2)}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="d-flex justify-content-between mb-4">
          <strong>Subtotal:</strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <button
          className="btn btn-success"
          onClick={handlePlaceOrder}
          disabled={entries.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
