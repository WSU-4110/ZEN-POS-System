import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LogoutButton from './components/LogoutButton';

import { CartProvider } from './CartContext';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import ReceiptPage from './components/ReceiptPage';

import DepartmentList from './components/Departments/DepartmentList';
import ItemList from './components/ItemList';
import CartPage from './components/Cart/CartPage';
import RewardsScreen from './components/RewardsScreen';
import LoginScreen from './components/LoginScreen';
import ManagerDashboard from './components/Admin/AdminDashboard';
import AdminPasswordPrompt from './components/Admin/AdminPasswordPrompt';
import DailyReportPage from './components/DailyReportPage';



function InnerApp() {
    const { user } = useAuth();
    const isLoggedIn = !!user;

    return (
        <CartProvider>
            <BrowserRouter>
                <header className="bg-primary text-white py-2">
                    <div className="container d-flex justify-content-between align-items-center">
                        <Link to="/" className="text-white text-decoration-none">
                            <h1 className="h4 m-0">ZEN POS System</h1>
                        </Link>
                        {isLoggedIn && (
                            <nav className="d-flex align-items-center">
                                <ul className="nav mb-0">
                                    <li className="nav-item">
                                        <Link to="/departments" className="nav-link text-white px-2">Departments</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/checkout" className="nav-link text-white px-2">🛒 Cart</Link>
                                    </li>
                                </ul>
                                <LogoutButton />
                            </nav>
                        )}
                    </div>
                </header>

                <main className="container my-4">
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/rewards" element={isLoggedIn ? <RewardsScreen /> : <Navigate to="/" />} />
                        <Route path="/departments" element={isLoggedIn ? <DepartmentList /> : <Navigate to="/" />} />
                        <Route path="/departments/:id/items" element={isLoggedIn ? <ItemList /> : <Navigate to="/" />} />
                        <Route path="/checkout" element={isLoggedIn ? <CartPage /> : <Navigate to="/" />} />
                        <Route path="/receipt" element={isLoggedIn ? <ReceiptPage /> : <Navigate to="/" />} />
                        <Route path="/manager" element={<ManagerDashboard />} />
                        <Route path="*" element={<p>Page not found</p>} />
                        <Route path="/report" element={<DailyReportPage />} />

                    </Routes>
                </main>

                <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    <AdminPasswordPrompt />
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
    );

}

