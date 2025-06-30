import React from 'react';
import { Badge, Avatar, Dropdown, Space } from 'antd';
import { BellOutlined, UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../../src/App.css';

// Notification component
const Notification = ({ collapsed }) => {
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
      overlayStyle={{ maxWidth: '260px', position: 'absolute', left: '20px', }}
      overlayClassName={collapsed ? "dropdown-collapsed" : "dropdown-expanded"}
      arrow
         >
      <div className="footer-item notification-item"  >
        <div className="icon-container">
          <BellOutlined style={{ fontSize: '22px', color: '#555' }} />
          <Badge 
            count={1} 
            size="small" 
            style={{ 
              backgroundColor: '#ff4d4f',
              position: 'absolute',
              top: '-14px',
              right: '-7px',
              fontSize: '11px',
            }} 
          />
        </div>
        {!collapsed && (
          <>
            <span className="item-text" >Notifications</span>
          </>
        )}
      </div>
    </Dropdown>
  );
};

// User dropdown trigger component
const TriggerBottom = () => (
  <DownOutlined className="dropdown-icon" style={{ marginLeft: 'auto' }} />
);

const SidebarFooter = ({ collapsed }) => {
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
    <div className="bottom-sidebar">
      <Notification collapsed={collapsed} />
      
      <Dropdown 
        menu={{ items: userDropdownItems }} 
        trigger={["click"]} 
        placement="topLeft"
        overlayClassName={collapsed ? "dropdown-collapsed" : "dropdown-expanded"}
        overlayStyle={ { position: 'absolute', left: '20px'}}
        arrow
      >
        <div className="user-dropdown-sidebar" onClick={(e) => e.preventDefault()}>
          <div>
            {currentUser.image ? (
              <Avatar size={30} src={currentUser.image} style={{ border: '2px solid #f0f0f0' }} />
            ) : (
              <Avatar className="user-avatar" size={30}>
                {currentUser?.full_name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </div>

          {!collapsed && (
            <div className="user-info">
              <div className="user-name-container">
                <span className="username">{currentUser ? currentUser.full_name : ""}</span>
              </div>
              <div className="trigger-container">
                <TriggerBottom />
              </div>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default SidebarFooter;
