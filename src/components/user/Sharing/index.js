import { Spin } from 'antd';
import useFetchData from '../../../hooks/useFetchData';
import MainLayout from '../../../layouts/MainLayout';
import CreateTask from '../CreateTask';
import ListTask from '../ListTask';

const Sharing = () => {
  const { data: sharingTasks, loading } = useFetchData('/tasks/sharing');
  const { data: tags } = useFetchData('/tags');
  return (
    <MainLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">Sharing tasks</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center mt-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="max-h-[560px] overflow-auto">
            <ListTask list={sharingTasks} />
          </div>
        )}
        <CreateTask tags={tags} />
      </div>
    </MainLayout>
  );
};

export default Sharing;
