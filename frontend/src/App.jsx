import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { CartProvider } from './CartContext';
import DepartmentList from './components/Departments/DepartmentList';
import ItemList from './components/ItemList';
import CartPage from './components/Cart/CartPage';
import RewardsScreen from './components/RewardsScreen';
import LoginScreen from './components/LoginScreen';
import ManagerDashboard from './components/Admin/AdminDashboard';
import AdminPasswordPrompt from './components/Admin/AdminPasswordPrompt';

export default function App() {
    return (
        <CartProvider>
            <BrowserRouter>
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
                            </ul>
                        </nav>
                    </div>
                </header>

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

                <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    <AdminPasswordPrompt />
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}
