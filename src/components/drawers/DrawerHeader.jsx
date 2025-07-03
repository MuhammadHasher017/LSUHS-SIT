import React from 'react';
import { Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Drawer.styles.css';

const DrawerHeader = ({
  avatar,
  showAvatar = true,
  title,
  subtitle,
  status,
  showStatus = true,
  actions, // React node(s) for right side
}) => (
  <div className="drawer-header-root">
    <div className="drawer-header-left">
      {showAvatar &&  <Avatar src={avatar || undefined} size={48} className="drawer-header-avatar" icon={!avatar &&<UserOutlined />} />}
      <div>
        <div className="drawer-header-title">{title}</div>
        {subtitle && <div className="drawer-header-subtitle">{subtitle}</div>}
      </div>
      {showStatus && status && (
        <Tag color={status === 'Active' ? 'green' : 'red'} className="drawer-header-status">
          {status}
        </Tag>
      )}
    </div>
    <div className="drawer-header-actions">
      {actions}
    </div>
  </div>
);

export default DrawerHeader; 