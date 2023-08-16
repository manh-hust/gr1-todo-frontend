import { Button, Form, Input, message } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { loginByGoogle, register } from '../../api/authApi';
import AuthLayout from '../../layouts/AuthLayout';

const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleRegister = async (value) => {
    try {
      const response = await register(value);
      if (response.success) {
        messageApi.open({
          type: 'success',
          content: 'Register successfully, please login',
        });
        navigate('/login');
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Register failed. Please try again later',
      });
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const { data } = await loginByGoogle();
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.log(error.message);
      messageApi.open({
        type: 'error',
        content: 'Register failed. Please try again later',
      });
    }
  };

  return (
    <AuthLayout>
      {contextHolder}
      <div className="w-[480px] h-[640px] shadow-2xl shadow-yellow-200">
        <h1 className="text-center text-3xl mb-4">Register</h1>
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={handleRegister}
          className="px-8"
        >
          <Form.Item
            name="name"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
              {
                min: 3,
                message: 'Username must be at least 3 characters',
              },
              {
                max: 255,
                message: 'Username must be at most 255 characters',
              },
            ]}
          >
            <Input className="h-12" />
          </Form.Item>
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
          <Form.Item
            name="password_confirmation"
            label="Confirm password"
            rules={[
              {
                required: true,
                message: 'Please input your password confirmation',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Password confirmation does not match')
                  );
                },
              }),
            ]}
          >
            <Input className="h-12" type="password" />
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full bg-blue-500 text-white text-xl h-12"
          >
            Register
          </Button>
          <Button
            onClick={handleRegisterWithGoogle}
            className="w-full text-xl h-12 flex items-center justify-center mb-8"
          >
            <FcGoogle className="mr-2" />
            Use google account
          </Button>
          <Link to="/login" className="text-center block mt-4">
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default Register;
