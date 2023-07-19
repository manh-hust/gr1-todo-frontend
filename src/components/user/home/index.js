import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  List,
  Menu,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import axiosApi from '../../../api/axiosApi';
import { AuthContext } from '../../../providers/AuthProvider';
const API_URL = '/auth/logout';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Tasks', 'tasks', <MailOutlined />),
  getItem('SharingTasks', 'sharing-tasks', <AppstoreOutlined />),
  getItem('History', 'history', <SettingOutlined />),
  getItem('Notifications', 'notifications', <SettingOutlined />),
];
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const Home = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axiosApi.post(API_URL);
      logout();
    } catch (error) {
      console.log(error);
      alert('Something went wrong with logout');
    }
  };
  const [initLoading, setInitLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <div className="flex">
      <div className="w-60 h-screen">
        <div className="flex px-4 py-4 items-center border-r-[1px]">
          <Avatar size={64} icon={<UserOutlined />} className="mr-4" />
          <h2>Username</h2>
        </div>
        <div className="border-b-2 border-gray-200 "></div>
        <Menu mode="inline" items={items} className="pt-8 h-4/5" />;
        <div>
          <Button className="w-full">Logout</Button>
        </div>
      </div>

      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">Tasks</h1>
        <List
          className="px-8"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item className="cursor-pointer">
              <Checkbox className="mr-4" />
              <List.Item.Meta title={item.name?.last} onClick={showDrawer} />
              <div className="text-gray-400">2023/06/28 12:00</div>
            </List.Item>
          )}
        />
        <Form className="absolute bottom-0 w-full px-8">
          <Form.Item>
            <Input
              type="text"
              placeholder="Enter task name"
              className="h-12"
              status="warning"
            />
          </Form.Item>
          <Form.Item className="absolute right-8 top-2 border-l-2">
            <DatePicker className="w-full" bordered={false} />
          </Form.Item>
        </Form>
      </div>

      <Drawer
        title="Task detail"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default Home;
