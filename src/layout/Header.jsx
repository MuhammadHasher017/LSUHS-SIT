import React, { useState } from 'react';
import { Layout, Space, Button, Input, Typography, Upload, DatePicker, Select, Divider, Dropdown, Avatar } from 'antd';
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
  ReloadOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import DynamicModal from '../components/modals/DynamicModal';
import ArticleFormContent from '../components/content/ArticleFormContent';
import ExportFormContent from '../components/content/ExportFormContent';
import { getAddFormComponent, getAddModalConfig } from '@/utils/formFactory';

const { Header: AntHeader } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Header = ({ collapsed, toggleSidebar, title, onSearch, onDataRefresh }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  
  // Determine current page entity type based on pathname
  const getCurrentEntityType = () => {
    if (pathname.includes('/patients')) return 'patients';
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/results')) return 'results';
    if (pathname.includes('/inventory')) return 'inventory';
    return null;
  };
  
  const currentEntityType = getCurrentEntityType();
  const modalConfig = getAddModalConfig(currentEntityType);
  console.log("modalConfig", modalConfig)

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const handleAddSuccess = () => {
    setModalVisible(false);
    // Trigger data refresh in the parent component
    onDataRefresh?.();
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
        
        {/* Show Add button only for pages that have entities */}
   
        
   
        <Button 
          color="primary" 
          variant="outlined"
          aria-label="Export data"
          onClick={() => handleOpenModal('export')}
        >
          Export
        </Button>
        {currentEntityType && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal('add')}
            aria-label={modalConfig.buttonText}
          >
            {modalConfig.buttonText}
          </Button>
        )}
      </Space>
      
      {/* Dynamic modal for different actions */}
      <DynamicModal 
        visible={modalVisible}
        onCancel={handleCloseModal}
        title={
          modalType === 'add' ? modalConfig.title : 
          modalType === 'export' ? 'Export Data' :
          'Modal'
        }
        footerButtons={null}
        width={modalType === 'add' ? 600 : 480}
        children={
          modalType === 'add' ? 
            getAddFormComponent(currentEntityType, { 
              onSuccess: handleAddSuccess, 
              onCancel: handleCloseModal 
            }) : 
          modalType === 'export' ? <ExportFormContent /> : null
        }
        footer={null} // Let the form handle its own footer
      />
    </AntHeader>
  );
};

export default Header;
