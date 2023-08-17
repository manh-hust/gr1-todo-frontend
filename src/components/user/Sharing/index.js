import { useState } from 'react';
import useFetchTaskData from '../../../hooks/useFetchTaskData';
import MainLayout from '../../../layouts/MainLayout';
import CreateTask from '../CreateTask';
import ListTask from '../ListTask';

const Sharing = () => {
  const [refresh, setRefresh] = useState(false);
  const { sharingTasks, tags } = useFetchTaskData(refresh);
  return (
    <MainLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">Sharing tasks</h1>
        <ListTask list={sharingTasks} setRefresh={setRefresh} />
        <CreateTask tags={tags} setRefresh={setRefresh} />
      </div>
    </MainLayout>
  );
};

export default Sharing;
