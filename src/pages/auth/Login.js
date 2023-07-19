import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import axiosApi from '../../api/axiosApi';
import AuthLayout from '../../layouts/AuthLayout';

const API_URL = '/auth/login';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({});

  const handleLogin = async () => {
    try {
      const { data } = await axiosApi.post(API_URL, JSON.stringify(loginInfo));
      login(data);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong with login');
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const { data } = await axiosApi.get('/auth/google');
      window.location.href = data.redirectUrl;
    } catch (error) {
      alert('Something went wrong with google login');
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
      alert('Something went wrong with email login');
    }
  };

  return (
    <AuthLayout>
      <div className="w-[480px] h-[480px] shadow-2xl shadow-yellow-200">
        <h1 className="text-center text-3xl mb-4">Login</h1>
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={handleLogin}
          className="px-8"
        >
          <Form.Item name="email" label="Email">
            <Input className="h-12" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input className="h-12" />
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
          <Button className="w-full text-xl h-12 flex items-center justify-center">
            <FcGoogle className="mr-2" />
            Login with google
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
