import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
<<<<<<< Updated upstream
import '../index.css';
=======
import { useAuth } from '../context/AuthContext';
import '../CheckouPage.css';
>>>>>>> Stashed changes

export default function CheckoutPage() {
  const [cart, setCart]   = useState([]);
  const [error, setError] = useState('');
  const user = localStorage.getItem('user') || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/cart?user=${user}`)
       .then(r => setCart(r.data))
       .catch(() => setError('Failed to load cart'));
  }, [user]);

  const handleConfirm = async () => {
    try {
      await api.delete(`/cart/clear?user=${user}`);
      alert('Order confirmed!');
      navigate('/departments');
    } catch {
      setError('Failed to confirm order');
    }
  };

  const total = cart.reduce((sum, e) => sum + e.price * e.quantity, 0);

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

