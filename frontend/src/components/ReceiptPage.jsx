import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ReceiptPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phoneNumber || '';
    const cart = location.state?.cart || [];
    const subtotal = location.state?.subtotal || 0;
    const discount = location.state?.discount ?? parseFloat(localStorage.getItem('discount') || '0');
    const total = location.state?.totalAmount ?? 0;

    return (
        <div className="card card-pos p-4 text-center">
            <h4>Receipt</h4>
            {phone ? (
                <p>Rewards phone: {phone}</p>
            ) : (
                <p>No rewards phone entered.</p>
            )}

            <ul className="list-group mb-3">
                {cart.map((item, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <div><strong>{item.name}</strong> × {item.quantity}</div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>

            <div className="d-flex justify-content-between mb-2">
                <strong>Subtotal:</strong>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <strong>Rewards Discount:</strong>
                <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <span>${total.toFixed(2)}</span>
            </div>

            <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => navigate('/rewards')}
            >
                Continue
            </button>
        </div>
    );
}

