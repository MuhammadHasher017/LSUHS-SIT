import React from 'react';
import { Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const DeleteConfirmContent = ({ item = {}, itemType = 'item' }) => {
  const itemName = item.title || item.name || 'this ' + itemType;
  
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <DeleteOutlined style={{ fontSize: 48, color: '#ff4d4f', marginBottom: 16 }} />
        
        <Title level={4}>Delete {itemType}?</Title>
        
        <Paragraph>
          Are you sure you want to delete "{itemName}"? {itemType === 'article' && 'There is no way to recover it once it\'s been deleted.'}
        </Paragraph>
      </Space>
    </div>
  );
};

export default DeleteConfirmContent;
