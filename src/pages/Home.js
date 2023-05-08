import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axiosApi from "../axios";
const API_URL = "/auth/logout";

const Home = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axiosApi.post(API_URL);
      logout();
    } catch (error) {
      console.log(error);
      alert("Something went wrong with logout");
    }
  };
  return (
    <>
      <h1>Home</h1>
      {authenticated ? (
        <>
          <Link to="/user">User</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </>
  );
};

export default Home;
