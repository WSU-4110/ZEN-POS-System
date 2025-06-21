import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const BUNS     = ['Sesame', 'Whole Wheat', 'Gluten-Free'];
const PATTIES  = ['Beef', 'Chicken', 'Veggie'];
const TOPPINGS = ['Lettuce', 'Tomato', 'Onion', 'Pickles', 'Cheese'];
const COMBOS   = ['Fries & Drink', 'Salad & Drink', 'Nothing'];

export default function BurgerCustomizer() {
  const { addCustom } = useCart();
  const [bun, setBun]           = useState(BUNS[0]);
  const [patty, setPatty]       = useState(PATTIES[0]);
  const [toppings, setToppings] = useState([]);
  const [combo, setCombo]       = useState(COMBOS[0]);
  const [quantity, setQuantity] = useState(1);

  const toggleTopping = t =>
    setToppings(ts =>
      ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]
    );

  const addToCart = () => {
    const name  = `${patty} Burger on ${bun}`;
    const price = 9.99 + (combo !== 'Nothing' ? 2.99 : 0);
    addCustom(name, price, quantity);
    alert(`Added ${quantity} custom burger(s)`);
  };

  return (
    <div className="p-4">
      <h2>Build Your Burger</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-3">
            <label>Bun:</label>
            <select
              className="form-select"
              value={bun}
              onChange={e => setBun(e.target.value)}
            >
              {BUNS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label>Patty:</label>
            <select
              className="form-select"
              value={patty}
              onChange={e => setPatty(e.target.value)}
            >
              {PATTIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label>Toppings:</label>
            <div>
              {TOPPINGS.map(t => (
                <div key={t} className="form-check form-check-inline">
                  <input
                    id={`top-${t}`}
                    className="form-check-input"
                    type="checkbox"
                    checked={toppings.includes(t)}
                    onChange={() => toggleTopping(t)}
                  />
                  <label className="form-check-label" htmlFor={`top-${t}`}>
                    {t}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label>Combo:</label>
            <select
              className="form-select"
              value={combo}
              onChange={e => setCombo(e.target.value)}
            >
              {COMBOS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Qty:</label>
            <input
              type="number"
              className="form-control customizer-qty"
              min="1"
              value={quantity}
              onChange={e => setQuantity(+e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


