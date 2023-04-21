import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const API_URL = "http://127.0.0.1:8000/api/auth/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({});
  const handleLogin = async () => {
    try {
      const {
        data: { token },
      } = await axios.post(API_URL, JSON.stringify(loginInfo), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      login(token.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
      </form>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
