import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api/api';
import Swal from 'sweetalert2';


export default function ItemList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/departments/${id}/items`)
            .then(res => setItems(res.data))
            .catch(err => {
                console.error('Error loading items:', err);
                setError('Failed to load items.');
            });
    }, [id]);

    const handleAddToCart = async (item) => {
        const { value: quantity } = await Swal.fire({
            title: `Add Quantity for ${item.name}`,
            input: 'number',
            inputValue: 1,
            inputAttributes: {
                min: 1,
                max: item.stock,
                step: 1
            },
            showCancelButton: true
        });

        if (!quantity || quantity <= 0) return;

        try {
            const user = localStorage.getItem('user') || 'guest';
            await api.post(`/cart/add?user=${user}&itemId=${item.id}&quantity=${quantity}`);
            Swal.fire('Added!', `${quantity} x ${item.name} added to cart.`, 'success');
        } catch (err) {
            Swal.fire('Error', err.response?.data || 'Failed to add item', 'error');
        }
    };

    return (
        <div className="container">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <h2>Items</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {items.length === 0 ? (
                <p>No items found in this department.</p>
            ) : (
                <div className="row">
                    {items.map(item => (
                        <div className="col-md-4 mb-3" key={item.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text mb-2">${item.price.toFixed(2)}</p>
                                    <p className="card-text">Stock: {item.stock}</p>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
