import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { createTask } from '../../../api/taskApi';
const CreateTask = ({ tags, setIsRefresh }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
    tagName: tag.tagName,
  }));

  const handleSubmit = async (values) => {
    const startAt =
      values.startAtDate.format('YYYY-MM-DD') +
      ' ' +
      values.startAtTime.format('HH:mm');
    const task = {
      title: values.title,
      startAt: startAt,
      tags: [values.tags],
    };
    try {
      const res = await createTask(task);
      if (res.success) {
        form.resetFields();
        setOpen(false);
        setIsRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      className="absolute bottom-0 w-full px-8"
      onFinish={handleSubmit}
      form={form}
    >
      {open ? (
        <>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input task name!',
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter task name"
              className="h-12"
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="tags"
            className="absolute right-96 top-2 border-l-2 w-32 pl-4"
          >
            <Select
              className="border-none w-full outline-none"
              placeholder="Select a type"
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="startAtDate"
            className="absolute right-56 top-2 border-l-2"
          >
            <DatePicker
              className="w-32"
              bordered={false}
              placeholder="Due date"
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
          <Form.Item
            name="startAtTime"
            className="absolute right-28 top-2 border-l-2"
          >
            <DatePicker
              className="w-24"
              bordered={false}
              placeholder="Time"
              picker="time"
              format={'HH:mm'}
            />
          </Form.Item>
          <Form.Item className="absolute right-8 top-0">
            <Button
              htmlType="submit"
              className="h-12 border-none flex items-center bg-blue-500 w-16 justify-center rounded-l-none"
            >
              <SendOutlined className="text-white text-xl" />
            </Button>
          </Form.Item>
        </>
      ) : (
        <Form.Item>
          <Button
            className="h-12 border-none flex items-center w-full justify-start bg-blue-500 text-white text-lg hover:bg-blue-500"
            onClick={() => setOpen(true)}
          >
            <PlusOutlined /> Add a task
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default CreateTask;
