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
  
  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
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
        <Title level={1} style={{ margin: 0 , fontSize: '40px', fontWeight:"700"}}>
          {title}
        </Title>
      </Space>
      <Space size="middle">
        {/* Dashboard page - Date range picker */}
        {pathname === '/dashboard' && (
            <RangePicker 
              format="MMM D, YYYY"
              separator=" - "
              suffixIcon={<CalendarOutlined />}
              style={{ width: 220 }}
              defaultValue={[null, null]}
              placeholder={['Mar 1', 'Mar 31, 2025']}
            />
        )}
        
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
