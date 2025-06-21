
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import api from './api/api';

import LoginScreen from './components/LoginScreen';
import DepartmentList from './components/DepartmentList';
import ItemList from './components/ItemList';
import CartPage from './components/CartPage';
import RewardsScreen from './components/RewardsScreen';
import ManagerDashboard from './components/ManagerDashboard';

export default function App() {
  const [departments, setDepartments] = useState([]);
  const [loadError, setLoadError] = useState('');

  // Fetch departments once on mount
  useEffect(() => {
    api.get('/departments')
      .then(res => {
        const d = res.data;
        if (Array.isArray(d)) {
          setDepartments(d);
        } else if (Array.isArray(d.departments)) {
          setDepartments(d.departments);
        } else {
          console.error('Unexpected payload', d);
          setLoadError('Invalid departments data');
        }
      })
      .catch(err => {
        console.error('Failed to load departments', err);
        setLoadError('Could not load departments');
      });
  }, []);

  return (
    <BrowserRouter>
      {/* Header */}
      <header className="bg-primary text-white py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none">
            <h1 className="h4 m-0">ZEN POS System</h1>
          </Link>
          <nav>
            <ul className="nav">
              {departments.map(dep => (
                <li key={dep.id} className="nav-item">
                  <Link
                    to={`/departments/${dep.id}/items`}
                    className="nav-link text-white px-2"
                  >
                    {dep.name}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link to="/checkout" className="nav-link text-white px-2">
                  🛒 Cart
                </Link>
              </li>
              {loadError && (
                <li className="nav-item">
                  <span className="nav-link text-warning">{loadError}</span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          {/* Departments landing */}
          <Route path="/departments" element={<DepartmentList />} />

          {/* Items in a department */}
          <Route path="/departments/:id/items" element={<ItemList />} />

          {/* Checkout / Cart page */}
          <Route path="/checkout" element={<CartPage />} />

          {/* Other screens */}
          <Route path="/rewards" element={<RewardsScreen />} />
          <Route path="/manager" element={<ManagerDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
