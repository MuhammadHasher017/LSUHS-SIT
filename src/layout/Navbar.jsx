import React from 'react';
import { Badge, Avatar, Dropdown, Space, Layout } from 'antd';
const { Header } = Layout;
import { BellOutlined, UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../App.css';

const Notification = () => {
  const notificationItems = [
    {
      key: '1',
      label: (
        <div>
          <strong>New message</strong>
          <p style={{ margin: '4px 0 0', fontSize: '12px' }}>You have a new message from admin</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <strong>New update</strong>
          <p style={{ margin: '4px 0 0', fontSize: '12px' }}>System has been updated</p>
        </div>
      ),
    },
    {
      key: '3',
      type: 'divider',
    },
    {
      key: '4',
      label: <div style={{ textAlign: 'center' }}>View all notifications</div>,
    },
  ];

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={["click"]}
      overlayStyle={{ maxWidth: '260px' }}
      arrow
    >
      <div className="footer-item notification-item" style={{ cursor: 'pointer', position: 'relative', marginRight: 24 }}>
        <div className="icon-container">
          <BellOutlined style={{ fontSize: '24px', color: '#555' }} />
          <Badge 
            count={1} 
            size="small" 
            style={{ 
              backgroundColor: '#ff4d4f',
              position: 'absolute',
              top: '-10px',
              right: '-7px',
              fontSize: '11px',
            }} 
          />
        </div>
      </div>
    </Dropdown>
  );
};

const Navbar = () => {
  const userDropdownItems = [
    {
      key: '1',
      label: (
        <Space>
          <UserOutlined />
          Profile
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Space>
          <SettingOutlined />
          Settings
        </Space>
      ),
    },
    {
      key: '3',
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <Space>
          <LogoutOutlined />
          Logout
        </Space>
      ),
    },
  ];

  // Mock current user
  const currentUser = {
    full_name: "Randall N.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  return (
    <Header className='navbar-header'>
      <Notification />
      <Dropdown 
        menu={{ items: userDropdownItems }} 
        trigger={["click"]} 
        placement="bottomRight"
        arrow
      >
        <div className="user-dropdown-navbar" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            {currentUser.image ? (
              <Avatar size={32} src={currentUser.image} />
            ) : (
              <Avatar className="user-avatar" size={32}>
                {currentUser?.full_name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </div>
          <div className="user-info" style={{ marginLeft: 12, display: 'flex', alignItems: 'center' }}>
            <span className="username" style={{ fontWeight: 600 }}>{currentUser ? currentUser.full_name : ""}</span>
            <DownOutlined className="dropdown-icon" />
          </div>
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar; 