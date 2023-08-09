import {
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  FullscreenExitOutlined,
  HistoryOutlined,
  NotificationOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { home } from '../../../constants/pages/home';

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
const items = [
  getItem(home.tasks, 'tasks', <AppstoreOutlined />, [
    getItem(home.todo, 'todo', <CalendarOutlined />),
    getItem(home.inProgress, 'inProgress', <FullscreenExitOutlined />),
    getItem(home.done, 'done', <CheckCircleOutlined />),
  ]),
  getItem(home.sharingTasks, 'sharingTasks', <ShareAltOutlined />),
  getItem(home.history, 'history', <HistoryOutlined />),
  getItem(home.notifications, 'notifications', <NotificationOutlined />),
];

const Sidebar = ({ setSelectedKey }) => {
  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['tasks']}
      defaultSelectedKeys={['todo']}
      items={items}
      className="pt-8 h-4/5"
      onClick={(e) => setSelectedKey(e.key)}
    />
  );
};

export default Sidebar;
