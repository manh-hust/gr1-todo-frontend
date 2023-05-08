import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import LoginWithGoogle from "./pages/LoginWithGoogle";
import Product from "./pages/Product";
import Register from "./pages/Register";
import VerifyEmailLogin from "./pages/VerifyEmailLogin";
const App = () => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={
            <AuthMiddleware isAuthenticated={authenticated}>
              <Product />
            </AuthMiddleware>
          }
        />
        <Route path="/callback/google" element={<LoginWithGoogle />} />
        <Route path="/verify/mail-otp" element={<VerifyEmailLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
