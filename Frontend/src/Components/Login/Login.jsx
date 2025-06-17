import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Basic validation
    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password');
      return;
    }

    // Call the onLogin prop from App.js
    onLogin(); // This sets isLoggedIn to true in App.js
    
    // Navigate to departments page
    navigate('/departments');
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Log In</div>
        <div className="underline"></div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input 
              type="text" 
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;