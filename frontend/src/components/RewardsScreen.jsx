import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/api';
import '../index.css';

export default function RewardsScreen() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!phone) return setError('Phone number is required');

        try {
            await api.post('/rewards/enroll', { phoneNumber: phone });
            localStorage.setItem('phoneNumber', phone); 
            navigate('/departments'); 
        } catch {
            setError('Failed to enroll. Try again.');
        }
    };

    const handleSkip = () => {
        navigate('/itemList'); 
    };

    return (
        <div className="card card-pos p-4 text-center">
            <h4>Rewards</h4>
            <p>Enter your phone number to enroll or continue</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    required
                />
                <button className="btn btn-success w-100 mb-2" type="submit">
                    Continue
                </button>
            </form>

            <button className="btn btn-secondary w-100" onClick={handleSkip}>
                Skip
            </button>
        </div>
    );
}
