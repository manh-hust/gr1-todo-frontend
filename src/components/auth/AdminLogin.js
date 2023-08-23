import { Button, Form, Input, message } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAdminLogin } from '../../api/authApi';
import AuthLayout from '../../layouts/AuthLayout';
import { AuthContext } from '../../providers/AuthProvider';

const AdminLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (value) => {
    try {
      const response = await authAdminLogin(value);
      if (response.success) {
        login(response.data);
        navigate('/admin/notifications');
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

  return (
    <AuthLayout>
      {contextHolder}
      <div className="w-[480px] h-[400px] shadow-2xl shadow-yellow-200">
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
        </Form>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
