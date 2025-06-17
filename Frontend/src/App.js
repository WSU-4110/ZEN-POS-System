import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RewardsScreen from './Components/RewardsScreen/RewardsScreen';
import ItemList from './Components/ItemList/ItemList';
import ErrorPage from './Components/ErrorPage';
import Login from './Components/Login/Login';
import DepartmentSelection from './Components/DepartmentSelection/DepartmentSelection';

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
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/departments" element={<DepartmentSelection />} />
        <Route path="/rewards" element={<RewardsScreen onContinue={() => console.log("Rewards Done")} />} />
        <Route path="/items" element={<ItemList items={items} onAddToCart={handleAddToCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;