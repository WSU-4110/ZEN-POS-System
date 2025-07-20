import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pinLogin } from './api/api'
import { useAuth } from './context/AuthContext'
import "./LoginScreen.css"

export default function LoginScreen() {
  const [pin, setPin]     = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await pinLogin(pin)
      login(data.username, data.role)
      navigate('/rewards')
    } catch {
      setError('Invalid PIN')
    }
  }

  return (
      <div className="login-screen">
        <div className="login-card">
          <h3 className="text-center">ZEN POS PIN Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">PIN</label>
              <input
                  type="password"
                  className="form-control"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="Enter your PIN"
                  required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  )
}
