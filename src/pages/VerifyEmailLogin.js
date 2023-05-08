import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axiosApi from "../axios";
const VerifyEmailLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const loginWithEmailOtp = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("userId");
        const signature = urlParams.get("signature");
        const { data } = await axiosApi.get("/auth/login/email-otp/verify", {
          params: {
            userId,
            signature,
          },
        });
        login(data);
        navigate("/");
      } catch (error) {
        console.log(error.message);
        alert("Something went wrong with email login");
      }
    };
    loginWithEmailOtp();
  }, [navigate, login]);
  return <h1> Loading ...</h1>;
};

export default VerifyEmailLogin;
