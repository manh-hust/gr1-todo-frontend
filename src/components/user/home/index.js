import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import axiosApi from '../../../api/axiosApi';
import { home } from '../../../constants/pages/home';
import useFetchTaskData from '../../../hooks/useFetchTaskData';
import { AuthContext } from '../../../providers/AuthProvider';
import Sidebar from '../Sidebar';
import CreateTask from './CreateTask';
import ListTask from './ListTask';
import TaskDetail from './TaskDetail';
const API_URL = '/auth/logout';

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { allTask, error, tags, members } = useFetchTaskData(refresh);
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

  useEffect(() => {
    setList(allTask[selectedKey]);
  }, [selectedKey]);

  useEffect(() => {
    setList(allTask?.todo);
  }, [allTask]);

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
          setRefresh={setRefresh}
        />
        <CreateTask tags={tags} setRefresh={setRefresh} />
      </div>
      <TaskDetail
        onClose={onClose}
        open={open}
        task={selectedTask}
        type={selectedKey}
        members={members}
      />
    </div>
  );
};

export default Home;
