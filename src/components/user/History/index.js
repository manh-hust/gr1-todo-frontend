import { useState } from 'react';
import useFetchTaskData from '../../../hooks/useFetchTaskData';
import MainLayout from '../../../layouts/MainLayout';
import ListTask from '../ListTask';

const History = () => {
  const [refresh, setRefresh] = useState(false);
  const { doneTasks } = useFetchTaskData(refresh);

  return (
    <MainLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">History</h1>
        <ListTask list={doneTasks} setRefresh={setRefresh} />
      </div>
    </MainLayout>
  );
};

export default History;
