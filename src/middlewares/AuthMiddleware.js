import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthMiddleware = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, token]);

  return <>{children}</>;
};

export default AuthMiddleware;
