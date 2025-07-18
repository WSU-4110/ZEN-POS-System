import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RewardsScreen() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [discount, setDiscount] = useState(0);
    const [applied, setApplied] = useState(false);
    const navigate = useNavigate();

    const handleApplyRewards = async () => {
        if (!phone) return setError('Phone number is required');
        try {
            const res = await axios.post('http://localhost:8080/api/rewards/enroll', { phoneNumber: phone });
            const disc = res.data && res.data.discount !== undefined ? res.data.discount : 3;
            setDiscount(disc);
            setApplied(true);
            setError('');
            localStorage.setItem('phoneNumber', phone);
            localStorage.setItem('discount', disc);
        } catch {
            s
            setDiscount(3);
            setApplied(true);
            setError('');
            localStorage.setItem('phoneNumber', phone);
            localStorage.setItem('discount', 3);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('phoneNumber', '');
        localStorage.setItem('discount', 0);
        navigate('/departments');
    };

    const handleContinue = () => {
        navigate('/departments');
    };

    return (
        <div className="card card-pos p-4 text-center">
            <h4>Rewards</h4>
            <p>Enter your phone number to enroll or apply rewards.</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="form-control mb-3"
                placeholder="Phone Number"
                required
            />
            <button className="btn btn-primary w-100 mb-2" type="button" onClick={handleApplyRewards}>
                Apply Rewards
            </button>
            {applied && <div className="alert alert-success">Discount applied: ${discount.toFixed(2)}</div>}
            <button className="btn btn-success w-100 mb-2" onClick={handleContinue}>
                Continue
            </button>
            <button className="btn btn-secondary w-100" onClick={handleSkip}>
                Skip
            </button>
        </div>
    );
}
