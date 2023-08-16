import { Spin } from 'antd';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callbackGoogle } from '../../api/authApi';
import { AuthContext } from '../../providers/AuthProvider';
const LoginWithGoogle = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const getUserInfo = async () => {
      try {
        const response = await callbackGoogle(code);
        login(response.data);
        navigate('/');
      } catch (error) {
        console.log(error.message);
      }
    };
    if (code) {
      getUserInfo();
    } else {
      window.location.href = '/login';
    }
  }, [login, navigate]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default LoginWithGoogle;
