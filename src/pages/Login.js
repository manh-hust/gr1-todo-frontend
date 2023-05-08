import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axiosApi from "../axios";

const API_URL = "/auth/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({});

  const handleLogin = async () => {
    try {
      const { data } = await axiosApi.post(API_URL, JSON.stringify(loginInfo));
      login(data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong with login");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const { data } = await axiosApi.get("/auth/google");
      window.location.href = data.redirectUrl;
    } catch (error) {
      alert("Something went wrong with google login");
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      await axiosApi.post("/auth/login/email-otp", {
        email: loginInfo.email,
      });
      alert("Check your email for OTP code");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong with email login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form style={{ width: 360, display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 360,
          marginTop: 12,
        }}
      >
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLoginWithGoogle}>Login with google</button>
        <button onClick={handleLoginWithEmail}>Login email</button>
      </div>
    </div>
  );
};

export default LoginPage;
