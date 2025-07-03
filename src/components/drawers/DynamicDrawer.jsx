import React, { Children } from 'react';
import { Drawer, Button } from 'antd';
import DynamicTabsContent from '@/components/content/DynamicTabsContent';

const DynamicDrawer = ({ 
  visible, 
  onClose, 
  title = 'Drawer',
  children,
  width = 1200,
  placement = 'right',
  extra,
  tabs,
  record
}) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      onClose={onClose}
      open={visible}
      width={width}
      extra={extra}
    >
      {tabs && tabs.length > 0 ? (
        <DynamicTabsContent tabs={tabs} record={record} />
      ) : (
        children
      )}
    </Drawer>
  );
};

export default DynamicDrawer;
