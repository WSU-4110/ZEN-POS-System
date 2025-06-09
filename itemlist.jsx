import React from 'react';

function ItemList({ items, onAddToCart }) {
  return (
    <div className="item-container">
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => onAddToCart(item)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
