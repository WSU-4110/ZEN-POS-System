import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(stored);
  }, []);

  const login = (username) => {
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
