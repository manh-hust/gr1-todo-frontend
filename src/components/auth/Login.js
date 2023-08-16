import { Button, Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin, loginByGoogle } from '../../api/authApi';
import axiosApi from '../../api/axiosApi';
import AuthLayout from '../../layouts/AuthLayout';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (value) => {
    try {
      const response = await authLogin(value);
      if (response.success) {
        login(response.data);
        navigate('/');
      } else {
        messageApi.open({
          type: 'error',
          content: response.error[0],
        });
      }
    } catch (error) {
      console.log(error.message);
      messageApi.open({
        type: 'error',
        content: 'Login failed. Please try again later',
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const { data } = await loginByGoogle();
      window.location.href = data.redirectUrl;
    } catch (error) {
      messageApi.error(error.data.error[0]);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      await axiosApi.post('/auth/login/email-otp', {
        email: loginInfo.email,
      });
      alert('Check your email for OTP code');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthLayout>
      {contextHolder}
      <div className="w-[480px] h-[520px] shadow-2xl shadow-yellow-200">
        <h1 className="text-center text-3xl mb-4">Login</h1>
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={handleLogin}
          className="px-8"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
              {
                type: 'email',
                message: 'Please input valid email',
              },
            ]}
          >
            <Input className="h-12" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters',
              },
              {
                max: 30,
                message: 'Password must be at most 30 characters',
              },
            ]}
          >
            <Input className="h-12" type="password" />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full bg-blue-500 text-white text-xl h-12 mt-8"
          >
            Login
          </Button>
          <Button className="w-full text-xl h-12 flex items-center justify-center">
            <MdEmail className="mr-2" />
            Login by email
          </Button>
          <Button
            className="w-full text-xl h-12 flex items-center justify-center mb-8"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="mr-2" />
            Login with google
          </Button>
          <Link to="/register" className="text-center block mt-4">
            Don't have an account? Register
          </Link>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Login;
