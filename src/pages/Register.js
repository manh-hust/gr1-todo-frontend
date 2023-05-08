import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../axios";

const API_URL = "/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({});

  const handleRegister = async () => {
    try {
      const response = await axiosApi.post(API_URL, JSON.stringify(loginInfo));
      if (response.success) {
        alert("Register success, can login now");
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong with register");
    }
  };

  const handleRegsiterWithGoogle = async () => {
    try {
      const { data } = await axiosApi.get("/auth/google");
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong with google login");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form style={{ width: 360, display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name</label>
        <input
          type="name"
          name="name"
          id="name"
          required={true}
          onChange={(e) => setLoginInfo({ ...loginInfo, name: e.target.value })}
        />
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
        <label htmlFor="password_confirmation">Confirm password</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          onChange={(e) =>
            setLoginInfo({
              ...loginInfo,
              password_confirmation: e.target.value,
            })
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
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleRegsiterWithGoogle}>Use google account</button>
      </div>
    </div>
  );
};

export default Register;
