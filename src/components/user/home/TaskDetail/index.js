import {
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  InsertRowAboveOutlined,
  PlusOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { Button, Drawer, List, Modal, Select, Tag } from 'antd';
import React, { useState } from 'react';
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const TaskDetail = ({ onClose, open, task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const data = [
    {
      title: 'Start date',
      icon: <RocketOutlined className="text-xl" />,
      content: task?.startDate,
    },
    {
      title: 'Due date',
      icon: <CalendarOutlined className="text-xl" />,
      content: task?.endDate,
    },
    {
      title: 'Remind me',
      icon: <ClockCircleOutlined className="text-xl" />,
    },
    {
      title: 'Type',
      icon: <InsertRowAboveOutlined className="text-xl" />,
      content: <Tag color="violet">Homework</Tag>,
    },
    {
      title: 'Members',
      icon: <UsergroupAddOutlined className="text-xl" />,
      content: (
        <Button className="flex items-center" onClick={showModal}>
          <PlusOutlined />
          Invite
        </Button>
      ),
      description: task?.members?.join(', '),
    },
    {
      title: 'Description',
      icon: <ZoomInOutlined className="text-xl" />,
      description: task?.description,
    },
    {
      title: 'Note',
      icon: <InfoCircleOutlined className="text-xl" />,
      description: task?.status,
    },
  ];
  return (
    <>
      <Drawer
        title={<h1 className="text-xl">{task?.name}</h1>}
        placement="right"
        onClose={onClose}
        open={open}
        closeIcon={false}
      >
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                className="items-center"
                avatar={item.icon}
                title={
                  <div className="flex mt-[4px] justify-between">
                    <h1>{item.title}</h1>
                    <div className="text-gray-400">{item.content}</div>
                  </div>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Drawer>
      <Modal
        title="Invite members"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Select
          mode="multiple"
          placeholder="Select members . . ."
          value={selectedItems}
          onChange={setSelectedItems}
          className="w-full mt-8"
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
        <Button className="mt-4 bg-blue-500" type="primary" onClick={handleOk}>
          Invite
        </Button>
      </Modal>
    </>
  );
};

export default TaskDetail;
