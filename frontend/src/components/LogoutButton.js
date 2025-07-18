import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleGoToReportBeforeLogout = () => {
        navigate('/report', { state: { logoutAfter: true } });
    };

    return (
        <div className="d-flex gap-2">
            <button onClick={handleGoToReportBeforeLogout} className="btn btn-outline-light btn-sm ms-3">
                Logout
            </button>
            <button onClick={() => navigate('/report')} className="btn btn-outline-info btn-sm">
                View Report
            </button>
        </div>
    );
}

