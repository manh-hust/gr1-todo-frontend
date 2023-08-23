import { Spin, notification } from 'antd';
import React, { useEffect } from 'react';
import { home } from '../../../constants/pages/home';
import useFetchData from '../../../hooks/useFetchData';
import MainLayout from '../../../layouts/MainLayout';
import CreateTask from '../CreateTask';
import ListTask from '../ListTask';

const Home = () => {
  const [isRefresh, setIsRefresh] = React.useState(false);
  const { data: todoTask, loading } = useFetchData('/tasks/todo', isRefresh);
  const { data: tags } = useFetchData('/tags');
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todoTaskNoti = todoTask?.filter((task) => {
      return task.startAt.slice(0, 10) === today;
    });

    if (todoTaskNoti?.length !== 0) {
      api.info({
        message: 'You have tasks to do',
        description: 'Please check your tasks',
      });
    }
  }, [todoTask]);

  return (
    <MainLayout>
      {contextHolder}
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">{home.tasks}</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center mt-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="max-h-[560px] overflow-auto">
            <ListTask list={todoTask} setIsRefresh={setIsRefresh} />
          </div>
        )}
        <CreateTask tags={tags} setIsRefresh={setIsRefresh} />
      </div>
    </MainLayout>
  );
};

export default Home;
