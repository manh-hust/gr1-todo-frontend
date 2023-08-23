import { Button, Form, Input, Modal, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { createNotification } from '../../../api/adminApi';
import useFetchData from '../../../hooks/useFetchData';
import AdminLayout from '../../../layouts/AdminLayout';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const Notification = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const { data, error, loading } = useFetchData('/notifications', isRefresh);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await createNotification(values);
      if (res.success) {
        setIsModalOpen(false);
        form.resetFields();
        setIsRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 h-screen overflow-y-auto relative">
        <div className="flex justify-between items-center px-6 py-8">
          <h1 className="text-3xl">System notifications</h1>
          <Button type="primary" className="bg-blue-500" onClick={showModal}>
            Create
          </Button>
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center mt-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="max-h-[560px] overflow-auto px-6">
            <Table columns={columns} dataSource={data} />
          </div>
        )}
      </div>

      {/* Create noti modal */}
      <Modal
        title="Create notification"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form className="mt-12" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title',
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input content',
              },
            ]}
          >
            <Input.TextArea
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Create
          </Button>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Notification;
