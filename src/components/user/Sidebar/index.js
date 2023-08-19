import {
  CalendarOutlined,
  HistoryOutlined,
  NotificationOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['tasks']}
      className="pt-8 h-4/5"
      selectedKeys={pathname === '/' ? ['tasks'] : pathname.split('/').slice(1)}
    >
      <Menu.Item key="tasks" icon={<CalendarOutlined />}>
        <Link to="/">Tasks</Link>
      </Menu.Item>
      <Menu.Item key="sharing" icon={<ShareAltOutlined />}>
        <Link to="/sharing">Sharing Tasks</Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<HistoryOutlined />}>
        <Link to="/history">History</Link>
      </Menu.Item>
      <Menu.Item key="notifications" icon={<NotificationOutlined />}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
