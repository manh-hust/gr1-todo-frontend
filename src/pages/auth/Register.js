import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../api/axiosApi';
import AuthLayout from '../../layouts/AuthLayout';

const API_URL = '/auth/register';

const Register = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({});

  const handleRegister = async () => {
    try {
      const response = await axiosApi.post(API_URL, JSON.stringify(loginInfo));
      if (response.success) {
        alert('Register success, can login now');
        navigate('/login');
      }
    } catch (error) {
      alert('Something went wrong with register');
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const { data } = await axiosApi.get('/auth/google');
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong with google login');
    }
  };

  return (
    <AuthLayout>
      <div className="w-[480px] h-[600px] shadow-2xl shadow-yellow-200">
        <h1 className="text-center text-3xl mb-4">Register</h1>
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={handleRegister}
          className="px-8"
        >
          <Form.Item name="name" label="Username">
            <Input className="h-12" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input className="h-12" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input className="h-12" />
          </Form.Item>
          <Form.Item name="password_confirmation" label="Confirm password">
            <Input className="h-12" />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full bg-blue-500 text-white text-xl h-12"
          >
            Register
          </Button>
          <Button
            onClick={handleRegisterWithGoogle}
            className="w-full text-xl h-12 flex items-center justify-center"
          >
            <FcGoogle className="mr-2" />
            Use google account
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Register;
