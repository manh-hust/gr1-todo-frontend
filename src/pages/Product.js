import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import axiosApi from "../axios";
const API_URL = "/auth/user";

const User = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axiosApi.get(API_URL);
        setUser(data);
      } catch (error) {
        alert("Something went wrong with get user info");
        console.log(error);
      }
    };
    getUserInfo();
  }, [token]);
  return (
    <div>
      <h1>User</h1>
      <div>
        <h2>{user.email}</h2>
        <p>{user.display_name}</p>
      </div>
    </div>
  );
};

export default User;
