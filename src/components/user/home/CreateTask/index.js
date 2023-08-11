import { SendOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

const CreateTask = () => {
  return (
    <Form className="absolute bottom-0 w-full px-8">
      <Form.Item>
        <Input
          type="text"
          placeholder="Enter task name"
          className="h-12"
          status="warning"
        />
      </Form.Item>
      <Form.Item className="absolute right-96 top-2 border-l-2 w-32 pl-4">
        <Select
          className="border-none w-full outline-none"
          placeholder="Select a type"
          options={[
            {
              value: 'blue',
              label: 'Jack',
              color: 'blue',
            },
            {
              value: 'red',
              label: 'Lucy',
              color: 'red',
            },
            {
              value: 'yellow',
              label: 'Tom',
              color: 'yellow',
            },
          ]}
        />
      </Form.Item>
      <Form.Item className="absolute right-56 top-2 border-l-2">
        <DatePicker className="w-32" bordered={false} placeholder="Due date" />
      </Form.Item>
      <Form.Item className="absolute right-28 top-2 border-l-2">
        <DatePicker
          className="w-24"
          bordered={false}
          placeholder="Time"
          picker="time"
        />
      </Form.Item>
      <Form.Item className="absolute right-8 top-0">
        <Button className="h-12 border-none flex items-center bg-blue-500 w-16 justify-center rounded-l-none">
          <SendOutlined className="text-white text-xl" />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTask;
