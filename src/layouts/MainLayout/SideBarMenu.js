import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React, { useContext } from 'react';
import { authLogout } from '../../api/authApi';
import Sidebar from '../../components/user/Sidebar';
import { AuthContext } from '../../providers/AuthProvider';

const SideBarMenu = () => {
  const { logout, user } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await authLogout();
      logout();
    } catch (error) {
      console.log(error);
      alert('Something went wrong with logout');
    }
  };

  return (
    <div className="w-60 h-screen">
      <div className="flex px-4 py-4 items-center border-r-[1px]">
        <Avatar size={64} icon={<UserOutlined />} className="mr-4" />
        <h2>{user?.name}</h2>
      </div>

      <div className="border-b-2 border-gray-200 " />
      <Sidebar />

      <Button className="w-full" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default SideBarMenu;
