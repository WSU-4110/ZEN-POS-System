import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Swal from 'sweetalert2';
import api from './api/api';
import { CartProvider } from './CartContext';

import LoginScreen from './components/LoginScreen';
import DepartmentList from './components/Departments/DepartmentList';
import ItemList from './components/ItemList';
import CartPage from './components/Cart/CartPage';
import RewardsScreen from './components/RewardsScreen';
import ManagerDashboard from './components/Admin/AdminDashboard';

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

  const handleAdminLogin = async () => {
    const { value: password } = await Swal.fire({
      title: 'Admin Access',
      input: 'password',
      inputPlaceholder: 'Enter admin password',
      showCancelButton: true,
      confirmButtonText: 'Login',
      allowOutsideClick: false
    });
    
    if (password === 'admin123') {
      Swal.fire('Success!', 'Admin access granted', 'success');
      window.location.href = '/manager';
    } else if (password) {
      Swal.fire('Error', 'Incorrect password', 'error');
    }
  };

  return (
    <CartProvider> {/* Wrap everything with CartProvider */}
      <BrowserRouter>
        {/* Header */}
        <header className="bg-primary text-white py-2">
          <div className="container d-flex justify-content-between align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <h1 className="h4 m-0">ZEN POS System</h1>
            </Link>
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <Link to="/departments" className="nav-link text-white px-2">
                    Departments
                  </Link>
                </li>
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
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/:id/items" element={<ItemList />} />
            <Route path="/checkout" element={<CartPage />} />
            <Route path="/rewards" element={<RewardsScreen />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </main>

        <button 
          onClick={handleAdminLogin}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          Admin
        </button>
      </BrowserRouter>
    </CartProvider>
  );
}