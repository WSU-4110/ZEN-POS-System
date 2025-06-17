import React from 'react';
import './ItemList.css';

function ItemList({ items, onAddToCart }) {
  return (
    <div className="item-list-container">
      <h2 className="item-list-header">Available Products</h2>
      <div className="item-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={() => onAddToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;