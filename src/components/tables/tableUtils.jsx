// Utility functions for DynamicTable

export const openDynamicDrawer = (record, type) => {
  const event = new CustomEvent('openDynamicDrawer', { 
    detail: { record, type } 
  });
  window.dispatchEvent(event);
};

export const openDynamicModal = (record, type) => {
  const event = new CustomEvent('openDynamicModal', { 
    detail: { record, type } 
  });
  window.dispatchEvent(event);
};

export const getActionItems = (record) => {
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

import { Tag, Space, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

export const getTableColumns = (dataType) => {
  // Common columns for all tables
  const commonColumns = [
    {
      title: '',
      key: 'actions',
      width: 60,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
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
          render: (tags) => {
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
          render: (status) => {
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
          render: (text, record) => (
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
          render: (tags) => {
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
    case 'patients':
      return [
        { title: 'Name', dataIndex: 'name', key: 'name', width: 180 },
        { title: 'Age', dataIndex: 'age', key: 'age', width: 80 },
        { title: 'Gender', dataIndex: 'gender', key: 'gender', width: 100 },
        { title: 'Contact', dataIndex: 'contact', key: 'contact', width: 140 },
        { title: 'Insurance', dataIndex: 'insurance', key: 'insurance', width: 200 },
        { title: 'Last Test', dataIndex: 'lastTest', key: 'lastTest', width: 120 },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 100 },
        { title: 'ID', dataIndex: 'id', key: 'id', width: 120 },
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