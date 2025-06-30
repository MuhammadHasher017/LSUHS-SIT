import React, { useMemo } from 'react';
import { Layout, Menu, Image, Typography } from 'antd';
import createMenuItems from '../../data/menuItems.jsx';
import SidebarFooter from './SidebarFooter';
import logo from '../../assets/images/logo.svg';
import logo2 from '../../assets/images/logo_2.png';
import '../../../src/App.css';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ collapsed, selectedKeys, onMenuSelect, theme }) => {
  const primaryColor = theme?.token?.colorPrimary || '#1890ff';
  
  // Sidebar style
  const sidebarStyle = {
    overflow: 'auto',
    backgroundColor: '#fff',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    borderRight: '1px solid #f0f0f0',
    zIndex: 100,
    height: '100vh'
  };
  
  // Create menu items with active icons based on selectedKeys
  const menuItemsWithActiveIcons = useMemo(() => {
    return createMenuItems(selectedKeys);
  }, [selectedKeys]);
  
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={210}
      theme="light"
      className="sidebar-container"
      style={sidebarStyle}
      trigger={null}
    >
      <div className="sidebar-brand">
        <Image
          src={collapsed ? logo2 : logo} preview={false} />
      </div>
      <div className={`sidebar-menu-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Menu 
          theme="light"
          selectedKeys={selectedKeys}
          mode="inline"
          items={menuItemsWithActiveIcons}
          onClick={onMenuSelect}
          className="sidebar-menu"
        />
      </div>
      <SidebarFooter collapsed={collapsed} />
    </Sider>
  );
};

export default Sidebar;
