import { Checkbox, List, Space, Tag, Tooltip } from 'antd';
import { updateStatus } from '../../../../api/taskApi';
import { taskStatus } from '../../../../constants/common/taskStatus';

const ListTask = ({ list, showDrawer, type, setRefresh }) => {
  const doneCheck = type === 'done';
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
  return (
    <List
      className="px-8"
      footer={<div></div>}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          className="cursor-pointer border-b-[1px] border-black"
          key={item.id}
        >
          {type !== 'todo' ? (
            <Checkbox
              className="mr-4 scale-150"
              checked={doneCheck}
              disabled={doneCheck}
            />
          ) : (
            <Checkbox
              className="mr-4 scale-150"
              onChange={(e) => handleCheck(item.id)}
            />
          )}
          <List.Item.Meta
            title={
              <div className="flex">
                <h1 className={`mr-12 text-xl ${doneCheck && 'line-through'}`}>
                  {item.title}
                </h1>
                <Space size={[0, 8]} wrap>
                  {item.tags.map((tag) => (
                    <Tag color={tag.color}>{tag.name}</Tag>
                  ))}
                </Space>
              </div>
            }
            onClick={() => showDrawer(item)}
            description={item.members.map((member) => (
              <Tooltip title={member.email}>
                <span className="mr-2 cursor-pointer hover:text-blue-500">
                  {member.name}
                </span>
              </Tooltip>
            ))}
          />
          <div className="text-gray-400">{item.startAt}</div>
        </List.Item>
      )}
    />
  );
};

export default ListTask;
