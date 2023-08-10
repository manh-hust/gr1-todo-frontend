import { Checkbox, List, Space, Tag } from 'antd';
import React from 'react';

const ListTask = ({ list, showDrawer, type }) => {
  return (
    <List
      className="px-8"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="cursor-pointer">
          {type !== 'todo' && (
            <Checkbox className="mr-4" checked={type === 'done'} />
          )}
          <List.Item.Meta
            title={
              <div className="flex">
                <h1 className="mr-12 text-xl">{item.name}</h1>
                <Space size={[0, 8]} wrap>
                  <Tag color="#2db7f5">Private</Tag>
                  <Tag color="#87d068">Homework</Tag>
                  <Tag color="#108ee9">Relax</Tag>
                </Space>
              </div>
            }
            onClick={() => showDrawer(item)}
            description={item.members?.join(', ')}
          />

          <div className="text-gray-400">{item.endDate}</div>
        </List.Item>
      )}
    />
  );
};

export default ListTask;
