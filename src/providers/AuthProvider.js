import React, { useEffect, useState } from 'react';
import { getUser } from '../api/authApi';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('todo-token');
    if (storedToken) {
      setAuthenticated(true);
    }
  }, []);

  const login = async (data) => {
    if (!data.token) return;
    localStorage.setItem('todo-token', data.token);
    setAuthenticated(true);
    try {
      const response = await getUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {}
  };

  const logout = () => {
    localStorage.removeItem('todo-token');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
