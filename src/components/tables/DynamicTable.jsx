import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Table, Space, Typography, Button, Tag, Dropdown, Card, Menu } from 'antd';
import { getTableColumns } from './tableUtils';
import DynamicModal from '../modals/DynamicModal';
import DynamicDrawer from '../drawers/DynamicDrawer';
import DrawerHeader from '@/components/drawers/DrawerHeader';
import ArticleFormContent from '../content/ArticleFormContent';
import ArticleDetailContent from '../content/ArticleDetailContent';
import DeleteConfirmContent from '../content/DeleteConfirmContent';
import { LeftOutlined, RightOutlined, CloseOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DynamicTable = ({ 
  dataType,
  data = [], 
  pagination: paginationProps = {},
  searchText = '',
  onRowClick,
  mediaType = 'all',
  customColumns,
  isTab = false,
  tabsItem = []
}) => {
  // State for UI
  const [loading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortInfo, setSortInfo] = useState({ field: null, order: null });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [actionType, setActionType] = useState('');
  const [activeTabKey, setActiveTabKey] = useState(tabsItem?.[0]?.key || 'overview');
  

  const items = [{ key: '1', label: 'Action 1' }, { key: '2', label: 'Action 2' }]

  // Ref for search input to avoid re-creating debounce function
  const searchInputRef = useRef(null);
  
  // Get search fields based on data type
  const getSearchFields = () => {
    switch (dataType) {
      case 'goals':
        return ['name', 'goal', 'category', 'address', 'id'];
      case 'library':
        return ['title', 'category', 'tags', 'author', 'status', 'datePublished'];
      case 'media':
        return ['name', 'tags', 'fileSize', 'dateAdded'];
      default:
        return ['name', 'id'];
    }
  };
  
  // Fields to search in
  const searchFields = useMemo(() => getSearchFields(), [dataType]);
  
  // Filter data based on search text
  const filterData = useCallback((dataSource, text) => {
    if (!text) return dataSource;
    
    const lowerCaseText = text.toLowerCase();
    return dataSource.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(lowerCaseText);
      })
    );
  }, [searchFields]);
  
  // Filter data based on media type
  const filterByType = useCallback((dataSource, type) => {
    if (dataType !== 'media' || type === 'all') return dataSource;
    
    const typeMap = {
      'images': 'image',
      'videos': 'video',
      'audio': 'audio',
      'documents': 'pdf'
    };
    
    const fileType = typeMap[type] || null;
    if (!fileType) return dataSource;
    
    return dataSource.filter(item => item.type === fileType);
  }, [dataType]);
  
  // Sort data based on field and order
  const sortData = useCallback((dataSource, field, order) => {
    if (!field) return dataSource;
    
    return [...dataSource].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const comparison = valueA.localeCompare(valueB);
        return order === 'ascend' ? comparison : -comparison;
      }
      
      if (valueA < valueB) return order === 'ascend' ? -1 : 1;
      if (valueA > valueB) return order === 'ascend' ? 1 : -1;
      return 0;
    });
  }, []);
  
  // Process data with filtering and sorting
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply media type filter if applicable
    result = filterByType(result, mediaType);
    
    // Apply search filter
    if (searchText) {
      result = filterData(result, searchText);
    }
    
    // Apply sorting
    if (sortInfo.field) {
      result = sortData(result, sortInfo.field, sortInfo.order);
    }
    
    return result;
  }, [data, mediaType, searchText, sortInfo, filterByType, filterData, sortData]);
  
  // Handle drawer events
  const handleOpenDrawer = useCallback((record, type) => {
    setSelectedRecord(record);
    setActionType(type);
    setDrawerVisible(true);
  }, []);
  
  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
  }, []);
  
  // Handle modal events
  const handleOpenModal = useCallback((record, type) => {
    setSelectedRecord(record);
    setActionType(type);
    setModalVisible(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  
  // Handle table change for sorting
  const handleTableChange = useCallback((pagination, filters, sorter) => {
    if (sorter && sorter.field) {
      setSortInfo({
        field: sorter.field,
        order: sorter.order
      });
    } else {
      setSortInfo({ field: null, order: null });
    }
  }, []);
  
  // Add event listeners for dynamic drawer and modal
  useEffect(() => {
    const handleDynamicDrawer = (event) => {
      const { record, type } = event.detail;
      handleOpenDrawer(record, type);
    };
    
    const handleDynamicModal = (event) => {
      const { record, type } = event.detail;
      handleOpenModal(record, type);
    };
    
    window.addEventListener('openDynamicDrawer', handleDynamicDrawer);
    window.addEventListener('openDynamicModal', handleDynamicModal);
    
    return () => {
      window.removeEventListener('openDynamicDrawer', handleDynamicDrawer);
      window.removeEventListener('openDynamicModal', handleDynamicModal);
    };
  }, [handleOpenDrawer, handleOpenModal]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchInputRef.current) {
        clearTimeout(searchInputRef.current);
      }
    };
  }, []);
  
  // Get table columns with sorting capability
  const columns = useMemo(() => {
    if (customColumns) return customColumns;
    const baseColumns = getTableColumns(dataType);
    return baseColumns.map(column => {
      // Skip the actions column
      if (column.key === 'actions') {
        return column;
      }
      return {
        ...column,
        sorter: true
      };
    });
  }, [dataType, customColumns]);
  
  // Pagination configuration
  const pagination = {
    
    showSizeChanger: true,
    pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total, range) => {
      if (dataType === 'library') {
        return `Showing ${range[0]}-${range[1]} of ${total} articles`;
      } else if (dataType === 'media') {
        return `Showing ${range[0]}-${range[1]} of ${total} media`;
      } else {
        return `${range[0]}-${range[1]} of ${total} items`;
      }
    },
    style: { marginTop: '24px' },
    onChange: (_, size) => setPageSize(size),
    ...paginationProps
  };
  
  const currentTabIndex = tabsItem ? tabsItem.findIndex(tab => tab.key === activeTabKey) : -1;
  
  useEffect(() => {
    if (drawerVisible && tabsItem && tabsItem.length > 0) {
      setActiveTabKey(tabsItem[0].key);
    }
  }, [drawerVisible, tabsItem]);
  
  return (
    <div className="table-ui-container">
      <Table
        columns={columns}
        dataSource={processedData}
        pagination={pagination}
        scroll={{ x: 1200, y: 'calc(100vh - 380px)' }}
        sticky
        rowKey="key"
        loading={loading}
        onChange={handleTableChange}
        onRow={onRowClick ? (record) => ({
          onClick: () => onRowClick(record),
          style: { cursor: 'pointer' }
        }) : undefined}
      />
      
      {/* Dynamic Drawer */}
      <DynamicDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        title={
          <DrawerHeader
            avatar={selectedRecord?.avatar}
            title={selectedRecord?.name}
            subtitle={selectedRecord?.id ? `ID${selectedRecord.id}` : ''}
            status={selectedRecord?.status}
            showAvatar={true}
            showStatus={!!selectedRecord?.status}
            actions={
              <>
                <Button
                  icon={<LeftOutlined />} type="text"
                  disabled={currentTabIndex <= 0}
                  onClick={() => setActiveTabKey(tabsItem[currentTabIndex - 1].key)}
                />
                <Button
                  icon={<RightOutlined />} type="text"
                  disabled={currentTabIndex >= tabsItem?.length - 1}
                  onClick={() => setActiveTabKey(tabsItem[currentTabIndex + 1].key)}
                />
                <Dropdown  menu={{items}} trigger={['click']}>
                  <Button icon={<EllipsisOutlined />} type="text" />
                </Dropdown>
                <Button icon={<CloseOutlined />} type="text" onClick={handleCloseDrawer} />
              </>
            }
          />
        }
        extra={null}
        tabs={isTab ? tabsItem: undefined}
        record={selectedRecord}
        activeTabKey={activeTabKey}
        onTabChange={setActiveTabKey}
        children={
          actionType === 'view' && selectedRecord && (!customColumns || customColumns !== getTableColumns('patients')) ? (
            <ArticleDetailContent article={selectedRecord} />
          ) : null
        }
      />
      
      {/* Dynamic Modal */}
      <DynamicModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        title={
          actionType === 'edit' ? 'Edit Article' : 
          actionType === 'delete' ? 'Confirm Delete' : 'Modal'
        }
        children={
          actionType === 'edit' ? (
            <ArticleFormContent initialData={selectedRecord} onChange={() => {}} />
          ) : actionType === 'delete' ? (
            <DeleteConfirmContent item={selectedRecord} itemType={dataType === 'library' ? 'article' : 'item'} />
          ) : null
        }
        footerButtons={
          actionType === 'edit' ? [
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary">
              Save Changes
            </Button>
          ] : actionType === 'delete' ? [
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" danger>
              Delete
            </Button>
          ] : []
        }
      />
    </div>
  );
};

export default DynamicTable;
