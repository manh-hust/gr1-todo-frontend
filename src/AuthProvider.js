import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("shopi_token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  const login = (data) => {
    if (!data.access_token) return;
    localStorage.setItem("shopi_token", data.access_token);
    localStorage.setItem("shopi_refresh_token", data.refresh_token);
    localStorage.setItem("shopi_expires_in", data.expires_in);
    setToken(data.access_token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("shopi_token");
    localStorage.removeItem("shopi_refresh_token");
    localStorage.removeItem("shopi_expires_in");
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
