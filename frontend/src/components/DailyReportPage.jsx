import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

export default function DailyReportPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const logoutAfter = location.state?.logoutAfter;

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/reports/daily')
            .then(res => {
                setReport(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Could not load daily report.');
                setLoading(false);
            });
    }, []);

    const handleConfirmLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return <div className="container mt-4">Loading daily report...</div>;
    if (error) return <div className="container mt-4 text-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Daily Report</h2>
            <div className="card p-3 mb-3">
                <h5>Sales Today</h5>
                <p>{report.totalItems} items sold</p>
            </div>
            <div className="card p-3 mb-3">
                <h5>Total Revenue</h5>
                <p>${report.revenue?.toFixed(2)}</p>
            </div>
            <div className="card p-3">
                <h5>Most Sold Item</h5>
                <p>{report.mostSoldItem}</p>
            </div>
            {logoutAfter && (
                <button className="btn btn-danger mt-4" onClick={handleConfirmLogout}>
                    Confirm Logout
                </button>
            )}
            {!logoutAfter && (
                <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
                    Back
                </button>
            )}
        </div>
    );
}
