import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const API_URL = "http://localhost:8000/api/auth/logout";

const Home = () => {
  const { authenticated, logout, token } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      axios.post(
        API_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Home</h1>
      {authenticated ? (
        <>
          <Link to="/products">Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
};

export default Home;
