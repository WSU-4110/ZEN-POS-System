import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function ReceiptPage() {
    const [receipt, setReceipt] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phone;

    useEffect(() => {
        const fetchLatestReceipt = async () => {
            try {
                const res = await api.get(`/orders/latest?phone=${phone}`);
                setReceipt(res.data);
            } catch {
                alert('Could not load receipt.');
            }
        };

        if (phone) {
            fetchLatestReceipt();
        } else {
            alert('No phone number provided');
            navigate('/rewards');
        }
    }, [phone, navigate]);

    useEffect(() => {
        console.log('Full receipt:', receipt);
    }, [receipt]);

    if (!receipt) return <p>Loading receipt…</p>;

    return (
        <div className="card p-4">
            <h4>Receipt</h4>
            <p><strong>Phone:</strong> {receipt.phoneNumber}</p>
            <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
            <ul className="list-group my-3">
                {receipt.items && receipt.items.length > 0 ? (
                    receipt.items.map((item, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No items found in this order.</li>
                )}
            </ul>

            <div className="text-end">
                <strong>Total: ${receipt.total.toFixed(2)}</strong>
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/rewards/')}>
                Continue Shopping
            </button>
        </div>
    );
}
