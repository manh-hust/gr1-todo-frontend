import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("todo-token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  const login = (data) => {
    if (!data.access_token) return;
    localStorage.setItem("todo-token", data.access_token);
    setToken(data.access_token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("todo-token");
    setToken(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        token,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
