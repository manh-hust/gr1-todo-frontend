import { Checkbox, Divider, List, Space, Tag, Tooltip } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { updateStatus } from '../../../api/taskApi';
import { taskStatus } from '../../../constants/common/taskStatus';
import { AuthContext } from '../../../providers/AuthProvider';
import TaskDetail from '../TaskDetail';

const ListTask = ({ list, setRefresh }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({});
  const [todayTasks, setTodayTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);
  const handleCheck = async (id) => {
    try {
      const data = {
        status: taskStatus.DONE,
        endAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      };
      const res = await updateStatus(id, data);
      if (res.success) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    console.log(list);

    list.sort((a, b) => {
      if (a.startAt < b.startAt) return -1;
      if (a.startAt > b.startAt) return 1;
      return 0;
    });

    const todayTasks = list.filter((task) => {
      if (task.endAt) return task.endAt.slice(0, 10) === today;
      return task.startAt.slice(0, 10) === today;
    });
    const otherTasks = list.filter((task) => {
      return task.startAt.slice(0, 10) !== today;
    });
    setTodayTasks(todayTasks);
    setOtherTasks(otherTasks);
  }, [list]);

  return (
    <>
      <Divider orientation="left">Today</Divider>
      <List
        className="px-8 mb-12"
        footer={<div></div>}
        itemLayout="horizontal"
        dataSource={todayTasks}
        renderItem={(item) => (
          <List.Item
            className="cursor-pointer border-b-[1px] border-black"
            key={item.id}
            onClick={() => {
              setOpen(true);
              setTask(item);
            }}
          >
            <Checkbox
              className="mr-4 scale-150"
              onChange={(e) => handleCheck(item.id)}
              disabled={item.status === taskStatus.DONE}
              checked={item.status === taskStatus.DONE}
            />
            <List.Item.Meta
              title={
                <div className="flex">
                  <h1
                    className={`mr-12 text-xl ${
                      item.status === taskStatus.DONE && 'line-through'
                    }`}
                  >
                    {item.title}
                  </h1>
                  <Space size={[0, 8]} wrap>
                    {item.tags.map((tag) => (
                      <Tag color={tag.color}>{tag.name}</Tag>
                    ))}
                  </Space>
                </div>
              }
              description={item.members.map((member) => (
                <Tooltip title={member.email}>
                  <span className="mr-2 cursor-pointer hover:text-blue-500">
                    {member.id === user?.id ? 'You' : member.name}
                    {member.isOwner && '(Owner)'}
                  </span>
                </Tooltip>
              ))}
            />
            <div className="text-gray-400">
              {item.status === taskStatus.DONE ? item.endAt : item.startAt}
            </div>
          </List.Item>
        )}
      />
      <Divider orientation="left">Other</Divider>
      <List
        className="px-8"
        footer={<div></div>}
        itemLayout="horizontal"
        dataSource={otherTasks}
        renderItem={(item) => (
          <List.Item
            className="cursor-pointer border-b-[1px] border-black"
            key={item.id}
            onClick={() => {
              setOpen(true);
              setTask(item);
            }}
          >
            <Checkbox
              className="mr-4 scale-150"
              onChange={(e) => handleCheck(item.id)}
              disabled={item.status === taskStatus.DONE}
              checked={item.status === taskStatus.DONE}
            />
            <List.Item.Meta
              title={
                <div className="flex">
                  <h1
                    className={`mr-12 text-xl ${
                      item.status === taskStatus.DONE && 'line-through'
                    }`}
                  >
                    {item.title}
                  </h1>
                  <Space size={[0, 8]} wrap>
                    {item.tags.map((tag) => (
                      <Tag color={tag.color}>{tag.name}</Tag>
                    ))}
                  </Space>
                </div>
              }
              description={item.members.map((member) => (
                <Tooltip title={member.email}>
                  <span className="mr-2 cursor-pointer hover:text-blue-500">
                    {member.id === user?.id ? 'You' : member.name}
                    {member.isOwner && '(Owner)'}
                  </span>
                </Tooltip>
              ))}
            />
            <div className="text-gray-400">
              {item.status === taskStatus.DONE ? item.endAt : item.startAt}
            </div>
          </List.Item>
        )}
      />

      <TaskDetail onClose={onClose} open={open} task={task} userId={user?.id} />
    </>
  );
};

export default ListTask;
