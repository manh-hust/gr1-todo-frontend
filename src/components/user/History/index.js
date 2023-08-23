import { Spin } from 'antd';
import React from 'react';
import useFetchData from '../../../hooks/useFetchData';
import MainLayout from '../../../layouts/MainLayout';
import ListTask from '../ListTask';

const History = () => {
  const { data: doneTasks, loading } = useFetchData('/tasks/done');

  return (
    <MainLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">History</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center mt-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="max-h-[560px] overflow-auto">
            <ListTask list={doneTasks} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default History;
