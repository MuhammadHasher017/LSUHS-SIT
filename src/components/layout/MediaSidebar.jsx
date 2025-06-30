import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { 
  PictureOutlined, 
  VideoCameraOutlined, 
  SoundOutlined, 
  FileOutlined,
  FolderOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

/**
 * MediaSidebar component - Sub sidebar specifically for Media section
 * Appears when Media is selected in the main sidebar
 */
const MediaSidebar = ({ visible, theme, onSelect }) => {
  // Get the current path to determine which media item should be selected
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine the selected key based on the current path
  const getSelectedKey = () => {
    if (pathname === '/media/images') return 'media-images';
    if (pathname === '/media/videos') return 'media-videos';
    if (pathname === '/media/audio') return 'media-audio';
    if (pathname === '/media/documents') return 'media-documents';
    return 'media-all';
  };
  // Media section sub-menu items
  const mediaSubMenuItems = [
    {
      key: 'media-all',
      icon: <FolderOutlined />,
      label: 'All Media'
    },
    {
      key: 'media-images',
      icon: <PictureOutlined />,
      label: 'Images'
    },
    {
      key: 'media-videos',
      icon: <VideoCameraOutlined />,
      label: 'Videos'
    },
    {
      key: 'media-audio',
      icon: <SoundOutlined />,
      label: 'Audio'
    },
    {
      key: 'media-documents',
      icon: <FileOutlined />,
      label: 'Documents'
    }
  ];

  const primaryColor = theme?.token?.colorPrimary || '#1890ff';

  // If not visible, don't render
  if (!visible) return null;

  return (
    <Sider
      width={220}
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 80, // Position right after the collapsed main sidebar
        top: 0,
        bottom: 0,
        borderRight: '1px solid #f0f0f0',
        zIndex: 99 // Just below the main sidebar
      }}
    >
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '24px',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <Title level={4} style={{ margin: 0, color: primaryColor }}>
          Media
        </Title>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={[getSelectedKey()]}
        selectedKeys={[getSelectedKey()]}
        mode="inline"
        items={mediaSubMenuItems}
        onClick={onSelect}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default MediaSidebar;
