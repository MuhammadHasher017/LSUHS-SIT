import React, { useState } from 'react';
import { Layout, Space, Button, Input, Typography, Upload, DatePicker, Select, Divider } from 'antd';
import { 
  SearchOutlined, 
  ExportOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  UploadOutlined,
  FilterOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import DynamicModal from '../components/modals/DynamicModal';
import ArticleFormContent from '../components/content/ArticleFormContent';
import ExportFormContent from '../components/content/ExportFormContent';

const { Header: AntHeader } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Header = ({ collapsed, toggleSidebar, title, onSearch }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [searchText, setSearchText] = useState('');
  
  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  
  const handleResetSearch = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  // Determine if search should be shown based on current path
  const shouldShowSearch = () => {
    return ['/goals', '/logs/goals', '/library', '/media'].some(path => 
      pathname === path || pathname.startsWith(path)
    );
  };
  return (
    <AntHeader
      style={{
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Space align="center">
        {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{ fontSize: '18px', marginRight: '16px' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        /> */}
        <Title level={1} style={{ margin: 0 , fontSize: '40px', fontWeight:"700"}}>
          {title}
        </Title>
      </Space>
      <Space size="middle">
        {/* Dashboard page - Date range picker */}
        {pathname === '/dashboard' && (
          <>
            <Button
              icon={<SearchOutlined />}
              type="text"
              style={{ border: 'none', background: 'transparent' }}
              aria-label="Search"
            />
            <RangePicker 
              format="MMM D, YYYY"
              separator=" - "
              suffixIcon={<CalendarOutlined />}
              style={{ width: 220 }}
              defaultValue={[null, null]}
              placeholder={['Mar 1', 'Mar 31, 2025']}
            />
          </>
        )}
        
        {/* Media page - Search input, Sort by, Filter, and Upload */}
        {pathname.startsWith('/media') && (
          <>
            <Input
              placeholder="Search media..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchText}
              style={{ width: 250 }}
              allowClear
            />
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleResetSearch}
              disabled={!searchText}
            >
              Reset
            </Button>
            <Space>
              <span>Sort by:</span>
              <Select defaultValue="newest" style={{ width: 120 }}>
                <Option value="newest">Newest first</Option>
                <Option value="oldest">Oldest first</Option>
                <Option value="name">Name</Option>
                <Option value="size">Size</Option>
              </Select>
            </Space>
            <Button 
              icon={<FilterOutlined />}
              aria-label="Filter media"
              style={{ border: 'none', background: 'transparent' }}
            />
            <Button 
              type="primary" 
              icon={<UploadOutlined />}
              aria-label="Upload media"
              onClick={() => handleOpenModal('upload')}
            >
              Upload
            </Button>
          </>
        )}
        
        {/* Goals page - Search input and Export */}
        {(pathname === '/goals' || pathname === '/logs/goals') && (
          <>
            <Input
              placeholder="Search goals..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchText}
              style={{ width: 250 }}
              allowClear
            />
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleResetSearch}
              disabled={!searchText}
            >
              Reset
            </Button>
            <Button 
              type="primary" 
              icon={<ExportOutlined />}
              aria-label="Export goals"
              onClick={() => handleOpenModal('export')}
            >
              Export
            </Button>
          </>
        )}

        {(pathname === '/library') && (
          <>
            <Input
              placeholder="Search articles..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchText}
              style={{ width: 250 }}
              allowClear
            />
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleResetSearch}
              disabled={!searchText}
            >
              Reset
            </Button>
            
            <Button 
              icon={<FilterOutlined />}
              aria-label="Filter articles"
              style={{ border: 'none', background: 'transparent' }}
            />
            
            <Space>
              <span>Sort by:</span>
              <Select defaultValue="newest" style={{ width: 120 }}>
                <Option value="newest">Newest first</Option>
                <Option value="oldest">Oldest first</Option>
                <Option value="name">Name</Option>
                <Option value="size">Size</Option>
              </Select>
            </Space>
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal('add')}
            >
              Add Articles
            </Button>
          </>
        )}
        
        {/* Default search icon and export for other pages */}
        {!['/dashboard', '/media', '/goals', '/logs/goals', '/library'].some(path => 
          pathname === path || pathname.startsWith(path)
        ) && (
          <>
            <Button
              icon={<SearchOutlined />}
              type="text"
              style={{ border: 'none', background: 'transparent' }}
              aria-label="Search"
            />
            <Button 
              type="primary" 
              icon={<ExportOutlined />}
              aria-label="Export data"
              onClick={() => handleOpenModal('export')}
            >
              Export
            </Button>
          </>
        )}
      </Space>
      
      {/* Dynamic modal for different actions */}
      <DynamicModal 
        visible={modalVisible}
        onCancel={handleCloseModal}
        title={
          modalType === 'add' ? 'Add new article' : 
          modalType === 'export' ? 'Export articles' :
          modalType === 'upload' ? 'Upload media' : 'Modal'
        }
        children={
          modalType === 'add' ? <ArticleFormContent /> : 
          modalType === 'export' ? <ExportFormContent /> :
          modalType === 'upload' ? <ExportFormContent /> : null
        }
        footerButtons={
          modalType === 'add' 
            ? [
                <Button key="cancel" onClick={handleCloseModal}>
                  Cancel
                </Button>,
                <Button key="draft" type="default">
                  Save as Draft
                </Button>,
                <Button key="submit" type="primary">
                  Continue
                </Button>
              ]
            : [
                <Button key="cancel" onClick={handleCloseModal}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary">
                  {modalType === 'export' ? 'Export' : 
                   modalType === 'upload' ? 'Upload' : 'Submit'}
                </Button>
              ]
        }
      />
    </AntHeader>
  );
};

export default Header;
