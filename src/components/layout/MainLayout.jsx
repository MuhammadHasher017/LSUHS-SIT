import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MediaSidebar from './MediaSidebar';
import Header from './Header';
import ContentWrapper from './ContentWrapper';
import useMenu from '../../hooks/useMenu.jsx';

const MainLayout = ({ children, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [forceCollapsed, setForceCollapsed] = useState(false);
  const [showMediaSidebar, setShowMediaSidebar] = useState(false);
  const [searchText, setSearchText] = useState('');
  // Initialize useMenu with the current path from location
  const { selectedKeys, currentContentTitle, handleMenuSelect } = useMenu();
  
  // Handle search
  const handleSearch = useCallback((value) => {
    setSearchText(value);
  }, []);

  // Handle media section special behavior
  useEffect(() => {
    // Check if the current path is in the media section
    const isMediaPath = location.pathname.startsWith('/media');
    
    // Show media sidebar and force collapse main sidebar when in Media section
    setShowMediaSidebar(isMediaPath);
    setForceCollapsed(isMediaPath);
  }, [location.pathname]);

  const toggleSidebar = () => {
    // Only allow toggling if not in media section
    if (!showMediaSidebar) {
      setCollapsed(!collapsed);
    }
  };
  
  // Handle media sub-menu selection
  const handleMediaSubMenuSelect = ({ key }) => {
    console.log('Media submenu selected:', key);
    
    // Map media submenu keys to routes
    const mediaRouteMap = {
      'media-all': '/media',
      'media-images': '/media/images',
      'media-videos': '/media/videos',
      'media-audio': '/media/audio',
      'media-documents': '/media/documents'
    };
    
    // Navigate to the corresponding route
    const route = mediaRouteMap[key];
    if (route) {
      navigate(route);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed || forceCollapsed}
        selectedKeys={selectedKeys}
        onMenuSelect={handleMenuSelect}
        theme={theme}
      />
      
      {/* Media Sub-Sidebar */}
      <MediaSidebar 
        visible={showMediaSidebar}
        theme={theme}
        onSelect={handleMediaSubMenuSelect}
      />
      <Layout
        style={{
          marginLeft: (collapsed || forceCollapsed) 
            ? (showMediaSidebar ? 300 : 80) // 80 (collapsed main) + 220 (media sidebar) = 300
            : 210, // Default expanded sidebar width
          transition: 'margin-left 0.2s ease',
          flex: 1,
          width: 'calc(100vw - ' + 
            ((collapsed || forceCollapsed) 
              ? (showMediaSidebar ? '308px' : '80px') 
              : '210px') + 
            ')',
        }}
      >
        <Header
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          title={currentContentTitle}
          onSearch={handleSearch}
        />
        <ContentWrapper theme={theme}>
          {React.cloneElement(children, { searchText: searchText })}
        </ContentWrapper>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
