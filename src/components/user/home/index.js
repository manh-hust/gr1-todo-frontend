import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import axiosApi from '../../../api/axiosApi';
import { home } from '../../../constants/pages/home';
import { AuthContext } from '../../../providers/AuthProvider';
import Sidebar from '../Sidebar';
import CreateTask from './CreateTask';
import ListTask from './ListTask';
import TaskDetail from './TaskDetail';
const API_URL = '/auth/logout';

const Home = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const [initLoading, setInitLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [selectedKey, setSelectedKey] = useState('todo');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleLogout = async () => {
    try {
      await axiosApi.post(API_URL);
      logout();
    } catch (error) {
      console.log(error);
      alert('Something went wrong with logout');
    }
  };

  const showDrawer = (item) => {
    setOpen(true);
    setSelectedTask(item);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

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
    history: [
      {
        id: 1,
        name: 'History task 1',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 2,
        name: 'History task 2',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
      {
        id: 3,
        name: 'History task 3',
        endDate: '2021-06-28 12:00',
        startDate: '2021-06-28 12:00',
      },
    ],
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
        <Button className="w-full">{home.logout}</Button>
      </div>

      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">{home.tasks}</h1>
        <ListTask
          list={list}
          showDrawer={showDrawer}
          type={selectedKey}
          setSelectedTask={setSelectedTask}
        />
        <CreateTask />
      </div>
      <TaskDetail
        onClose={onClose}
        open={open}
        task={selectedTask}
        type={selectedKey}
      />
    </div>
  );
};

export default Home;
