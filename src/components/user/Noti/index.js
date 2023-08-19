import { List, Spin } from 'antd';
import useFetchData from '../../../hooks/useFetchData';
import MainLayout from '../../../layouts/MainLayout';

const Noti = () => {
  const { loading, data } = useFetchData('/notifications');

  return (
    <MainLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <h1 className="my-8 text-3xl px-4">Notifications</h1>
        {loading ? (
          <div className="w-full h-full flex justify-center mt-40">
            <Spin size="large" />
          </div>
        ) : (
          <List
            className="px-8"
            footer={<div></div>}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item className="border-b-[1px] border-black" key={item.id}>
                <List.Item.Meta
                  title={<h1 className={`mr-12 text-xl `}>{item.title}</h1>}
                  description={<p>{item.content}</p>}
                />
                <div className="text-gray-400">2021-09-01 12:00:00</div>
              </List.Item>
            )}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Noti;
