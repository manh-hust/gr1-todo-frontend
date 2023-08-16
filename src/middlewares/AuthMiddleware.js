import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const token = localStorage.getItem('todo-token');
  useEffect(() => {
    if (!authenticated && !token) {
      navigate('/login');
    }
  }, [authenticated, navigate, token]);

  return <>{children}</>;
};

export default AuthMiddleware;
