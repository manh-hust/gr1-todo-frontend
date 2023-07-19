import { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthProvider';
import AuthMiddleware from './middlewares/AuthMiddleware';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/Login';
import LoginWithGoogle from './pages/auth/LoginWithGoogle';
import Register from './pages/auth/Register';
import VerifyEmailLogin from './pages/auth/VerifyEmailLogin';

const App = () => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={
            <AuthMiddleware isAuthenticated={authenticated}></AuthMiddleware>
          }
        />
        <Route path="/callback/google" element={<LoginWithGoogle />} />
        <Route path="/verify/mail-otp" element={<VerifyEmailLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
