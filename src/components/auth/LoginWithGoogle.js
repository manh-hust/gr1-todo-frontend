import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../api/axiosApi';
import { AuthContext } from '../../providers/AuthProvider';
const LoginWithGoogle = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const getUserInfo = async () => {
      try {
        const response = await axiosApi.get(
          `/auth/google/callback?code=${code}`
        );
        login(response.data);
        navigate('/');
      } catch (error) {
        console.log(error.message);
        alert('Something went wrong with google login');
      }
    };
    if (code) {
      getUserInfo();
    } else {
      window.location.href = '/login';
    }
  }, [login, navigate]);
  return (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};

export default LoginWithGoogle;
