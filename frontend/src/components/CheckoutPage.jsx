import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/cart?user=${user}`)
        .then(r => setCart(r.data))
        .catch(() => setError('Failed to load cart'));
  }, [user]);

  const handleConfirm = async () => {
    try {
      const { data } = await api.post(`/order?user=${user}`);
      await api.post(`/cart/clear?user=${user}`);
      setReceipt(data);
    } catch {
      setError('Failed to confirm order');
    }
  };

  const total = cart.reduce((sum, e) => sum + e.price * e.quantity, 0);

  if (receipt) {
    return (
        <div className="receipt-container">
          <h2>Order Confirmed!</h2>
          <p><strong>Order ID:</strong> {receipt.id}</p>
          <p><strong>Date:</strong> {receipt.createdAt?.slice(0, 10)}</p>
          <ul className="list-group mb-3">
            {receipt.items.map((item, i) => (
                <li className="list-group-item d-flex justify-content-between" key={i}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${receipt.total.toFixed(2)}</p>
          <button className="btn btn-primary" onClick={() => navigate('/departments')}>
            Back to Departments
          </button>
        </div>
    );
  }

  return (
      <div>
        <button className="btn btn-outline-secondary back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="card card-pos">
          <div className="card-header">Checkout</div>
          <div className="card-body">
            {error && <div className="alert alert-warning">{error}</div>}

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                  <ul className="list-group mb-3">
                    {cart.map((e, i) => (
                        <li className="list-group-item d-flex justify-content-between" key={i}>
                          <span>{e.name} x {e.quantity}</span>
                          <span>${(e.price * e.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong>${total.toFixed(2)}</strong>
                  </div>

                  <button className="btn btn-success w-100" onClick={handleConfirm}>
                    Confirm Order
                  </button>
                </>
            )}
          </div>
        </div>
      </div>
  );
}
