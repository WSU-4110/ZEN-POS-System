import React, { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const login = async (username, password) => {
    // POST /api/login { username, password }
    await api.post('/login', { username, password });
    setUser(username);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
