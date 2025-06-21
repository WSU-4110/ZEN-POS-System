import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }        from 'react-router-dom';
import api                                from '../api/api';

export default function ItemList() {
  const { id }       = useParams();    
  const navigate     = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {    api.get(`/departments/${id}/items`)
       .then(res => setItems(res.data))
       .catch(err => console.error('Load items failed', err));
  }, [id]);

  const handleAddToCart = async (itemId) => {
    try {
      const user = localStorage.getItem('user') || 'guest';
      await api.post(`/cart/add?user=${user}&itemId=${itemId}`);
      alert('✓ Added to cart');
    } catch {
      alert('✕ Could not add to cart');
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div className="col-md-8">
        <h2 className="mb-3">Items</h2>
        <div className="row gx-3 gy-4">
          {items.map(item => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
