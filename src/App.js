import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthProvider";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Product from "./pages/Product";
const App = () => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <AuthMiddleware isAuthenticated={authenticated}>
              <Product />
            </AuthMiddleware>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
