import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, DatePicker, Drawer, Form, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import axiosApi from '../../../api/axiosApi';
import { home } from '../../../constants/pages/home';
import { AuthContext } from '../../../providers/AuthProvider';
import ListTask from '../ListTask';
import Sidebar from '../Sidebar';

const API_URL = '/auth/logout';

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
  const [list, setList] = useState([]);
  const [selectedKey, setSelectedKey] = useState('todo');

  const data = {
    todo: [
      {
        id: 1,
        name: 'Drink milk',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 2,
        name: 'Eat eggs',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 3,
        name: 'Eat bread',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
    ],
    inProgress: [
      {
        id: 1,
        name: 'Drink milk',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 2,
        name: 'Eat eggs',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 3,
        name: 'Eat bread',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
    ],
    done: [
      {
        id: 1,
        name: 'Done task 1',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 2,
        name: 'Done task 2',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
    ],
    sharingTasks: [
      {
        id: 1,
        name: 'Sharing task 1',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
        members: ['member 1', 'member 2', 'member 3'],
      },
      {
        id: 2,
        name: 'Sharing task 2',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
        members: ['member 1', 'member 2', 'member 3'],
      },
    ],
    history: ['History 1', 'History 2', 'History 3'],
  };

  useEffect(() => {
    setList(data[selectedKey]);
  }, [selectedKey]);

  return (
    <div className="flex">
      <div className="w-60 h-screen">
        <div className="flex px-4 py-4 items-center border-r-[1px]">
          <Avatar size={64} icon={<UserOutlined />} className="mr-4" />
          <h2>Username</h2>
        </div>
        <div className="border-b-2 border-gray-200 " />
        <Sidebar setSelectedKey={setSelectedKey} />
        <div>
          <Button className="w-full">{home.logout}</Button>
        </div>
      </div>

      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">{home.tasks}</h1>
        <ListTask list={list} showDrawer={showDrawer} type={selectedKey} />
        <Form className="absolute bottom-0 w-full px-8">
          <Form.Item>
            <Input
              type="text"
              placeholder="Enter task name"
              className="h-12"
              status="warning"
            />
            <Button type="primary">{/* <SendOutlined /> */}Send</Button>
          </Form.Item>
          <Form.Item className="border-l-2 absolute right-20 top-2">
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
