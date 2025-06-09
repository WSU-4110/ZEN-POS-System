import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import RewardsScreen from './components/RewardsScreen';
import ItemList from './components/ItemList';
import ErrorPage from './components/ErrorPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items] = useState([
    { id: 1, name: 'Milk', price: 3.5 },
    { id: 2, name: 'Bread', price: 2.0 },
    { id: 3, name: 'Apple', price: 1.25 }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/rewards" element={<RewardsScreen onContinue={() => console.log("Rewards Done")} />} />
        <Route path="/items" element={<ItemList items={items} onAddToCart={handleAddToCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
