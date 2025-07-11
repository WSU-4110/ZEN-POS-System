import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleGoToReport = () => {
        navigate('/report');
    };

    return (
        <div className="d-flex gap-2">
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-3">
                Logout
            </button>
            <button onClick={handleGoToReport} className="btn btn-outline-info btn-sm">
                View Report
            </button>
        </div>
    );
}
