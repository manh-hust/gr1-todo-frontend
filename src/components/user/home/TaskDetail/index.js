import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  InsertRowAboveOutlined,
  PlusOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Drawer,
  List,
  Modal,
  Select,
  Tag,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';

const TaskDetail = ({ onClose, open, task, type, members }) => {
  const doneCheck = type === 'done';
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const showModalDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOkDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const showModalInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleOkInvite = () => {
    setIsInviteModalOpen(false);
  };

  const handleCancelInvite = () => {
    setIsInviteModalOpen(false);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const data = [
    {
      title: 'Start date',
      icon: <RocketOutlined className="text-xl" />,
      content: task?.startAt,
    },
    {
      title: 'Due date',
      icon: <CalendarOutlined className="text-xl" />,
      content: task?.endAt,
    },
    {
      title: 'Remind me',
      icon: <ClockCircleOutlined className="text-xl" />,
    },
    {
      title: 'Type',
      icon: <InsertRowAboveOutlined className="text-xl" />,
      content: task?.tags.map((tag) => <Tag color={tag.color}>{tag.name}</Tag>),
    },
    {
      title: 'Members',
      icon: <UsergroupAddOutlined className="text-xl" />,
      content: (
        <Button className="flex items-center" onClick={showModalInvite}>
          <PlusOutlined />
          Invite
        </Button>
      ),
      description: task?.members?.map((member) => (
        <Tooltip title={member.email}>
          <span className="mr-2 cursor-pointer hover:text-blue-500">
            {member.name}
          </span>
        </Tooltip>
      )),
    },
    {
      title: 'Description',
      icon: <ZoomInOutlined className="text-xl" />,
      description: task?.description,
    },
    {
      title: 'Note',
      icon: <InfoCircleOutlined className="text-xl" />,
      description: task?.note,
    },
  ];
  return (
    <>
      <Drawer
        title={
          <h1 className="relative text-xl">
            <Checkbox className="mr-4 scale-150" checked={doneCheck} />{' '}
            {task?.title}
          </h1>
        }
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
        <Button
          className="w-full absolute bottom-0 right-0 rounded-none flex items-center justify-center bg-gray-200"
          type="text"
          onClick={showModalDelete}
        >
          <DeleteOutlined /> Delete
        </Button>
      </Drawer>

      {/* Invite members */}
      <Modal
        title="Invite members"
        open={isInviteModalOpen}
        onOk={handleOkInvite}
        onCancel={handleCancelInvite}
        footer={null}
      >
        <Select
          mode="multiple"
          placeholder="Select members . . ."
          value={selectedItems}
          onChange={(value) => setSelectedItems(value)}
          className="w-full mt-8"
          options={members.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
        <Button
          className="mt-4 bg-blue-500"
          type="primary"
          onClick={handleOkInvite}
        >
          Invite
        </Button>
      </Modal>

      {/* Delete task */}
      <Modal
        title="Delete task"
        open={isDeleteModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={null}
      >
        <p>Are you sure you want to delete "{task?.name}"?</p>
        <div className="flex justify-end mt-4">
          <Button className="mr-4" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button type="primary" danger onClick={handleOkDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetail;
