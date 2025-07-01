import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../index.css';
import { useAuth } from '../context/AuthContext'; // ✅ ADD THIS LINE

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ now this works

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/login', { username, password });
      login(username);
      navigate('/rewards');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
      <div className="login-screen">
        <div className="login-card">
          <h3 className="text-center">ZEN POS Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  );
}
