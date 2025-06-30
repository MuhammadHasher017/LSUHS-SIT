import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Table, Space, Typography, Button, Tag, Dropdown, Card } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import DynamicDrawer from '../drawers/DynamicDrawer';
import DynamicModal from '../modals/DynamicModal';
import ArticleDetailContent from '../content/ArticleDetailContent';
import ArticleFormContent from '../content/ArticleFormContent';
import DeleteConfirmContent from '../content/DeleteConfirmContent';

const { Title } = Typography;

// Function to open dynamic drawer
export const openDynamicDrawer = (record: any, type: string) => {
  const event = new CustomEvent('openDynamicDrawer', { 
    detail: { record, type } 
  });
  window.dispatchEvent(event);
};

// Function to open dynamic modal
export const openDynamicModal = (record: any, type: string) => {
  const event = new CustomEvent('openDynamicModal', { 
    detail: { record, type } 
  });
  window.dispatchEvent(event);
};

// Action menu items for table rows
export const getActionItems = (record: any) => {
  return [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => openDynamicDrawer(record, 'view'),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => openDynamicModal(record, 'edit'),
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => openDynamicModal(record, 'delete'),
    },
  ];
};

// Function to get dynamic table columns based on data type
export const getTableColumns = (dataType: string) => {
  // Common columns for all tables
  const commonColumns = [
    {
      title: '',
      key: 'actions',
      width: 60,
      align: 'center',
      fixed: 'right',
      render: (_: any, record: any) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Specific columns based on data type
  switch (dataType) {
    case 'goals':
      return [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 100, fixed: 'left' },
        { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
        { title: 'Address', dataIndex: 'address', key: 'address', width: 250 },
        { title: 'Goal', dataIndex: 'goal', key: 'goal', ellipsis: true, width: 300 },
        { title: 'Category', dataIndex: 'category', key: 'category', width: 120 },
        { title: 'Log Date', dataIndex: 'logDate', key: 'logDate', width: 180 },
        ...commonColumns
      ];
    case 'library':
      return [
        { title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
        { title: 'Category', dataIndex: 'category', key: 'category', width: 150 },
        { 
          title: 'Tags', 
          dataIndex: 'tags', 
          key: 'tags',
          width: 250,
          render: (tags: string) => {
            if (!tags) return null;
            return (
              <>
                {tags.split(', ').map(tag => (
                  <Tag key={tag} color="blue" style={{ marginBottom: '4px' }}>
                    {tag}
                  </Tag>
                ))}
              </>
            );
          }
        },
        { title: 'Author', dataIndex: 'author', key: 'author', width: 150 },
        { 
          title: 'Status', 
          dataIndex: 'status', 
          key: 'status',
          width: 120,
          render: (status: string) => {
            let color = 'green';
            if (status === 'Draft') {
              color = 'gray';
            } else if (status === 'Scheduled') {
              color = 'orange';
            }
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            );
          }
        },
        { title: 'Date Published', dataIndex: 'datePublished', key: 'datePublished', width: 150 },
        ...commonColumns
      ];
    case 'media':
      return [
        { 
          title: 'Name', 
          dataIndex: 'name', 
          key: 'name',
          width: 300,
          render: (text: string, record: any) => (
            <Space>
              {record.icon === 'pdf' ? 
                <span style={{ color: '#1890ff', fontSize: '16px' }}>📄</span> : 
                <span style={{ color: '#ff4d4f', fontSize: '16px' }}>🎬</span>}
              {text}
            </Space>
          )
        },
        { title: 'File size', dataIndex: 'fileSize', key: 'fileSize', width: 100 },
        { 
          title: 'Tags', 
          dataIndex: 'tags', 
          key: 'tags',
          width: 250,
          render: (tags: string) => {
            if (!tags) return null;
            return (
              <>
                {tags.split(', ').map(tag => (
                  <Tag key={tag} color="blue" style={{ marginBottom: '4px' }}>
                    {tag}
                  </Tag>
                ))}
              </>
            );
          }
        },
        { title: 'Date Added', dataIndex: 'dateAdded', key: 'dateAdded', width: 150 },
        ...commonColumns
      ];
    default:
      return [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
        { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
        ...commonColumns
      ];
  }
};

interface DynamicTableProps {
  dataType: string;
  data: any[];
  pagination?: any;
  searchText?: string;
  onSearch?: (text: string) => void;
  onRowClick?: (record: any) => void;
  mediaType?: string;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ 
  dataType,
  data = [], 
  pagination: paginationProps = {},
  searchText = '',
  onSearch,
  onRowClick,
  mediaType = 'all'
}) => {
  // State for UI
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortInfo, setSortInfo] = useState<{ field: string | null, order: string | null }>({ field: null, order: null });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [actionType, setActionType] = useState('');
  
  // Ref for search input to avoid re-creating debounce function
  const searchInputRef = useRef<any>(null);
  
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
  
  // Handle search input change with debounce
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setLoading(true);
    
    // Clear previous timeout
    if (searchInputRef.current) {
      clearTimeout(searchInputRef.current);
    }
    
    // Set new timeout for debounce
    searchInputRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
      setLoading(false);
    }, 300);
  }, [onSearch]);
  
  // Handle reset search
  const handleResetSearch = useCallback(() => {
    if (onSearch) {
      onSearch('');
    }
    if (searchInputRef.current) {
      clearTimeout(searchInputRef.current);
    }
  }, [onSearch]);
  
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
  }, [dataType]);
  
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
        title={actionType === 'view' ? 'Detail' : 'Action'}
        extra={null}
        children={
          actionType === 'view' && selectedRecord ? (
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
