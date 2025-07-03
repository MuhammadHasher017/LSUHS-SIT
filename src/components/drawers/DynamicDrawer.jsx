import React, { Children } from 'react';
import { Drawer, Button } from 'antd';
import DynamicTabsContent from '@/components/drawers/DynamicTabsContent';

const DynamicDrawer = ({ 
  visible, 
  onClose, 
  title = 'Drawer',
  children,
  width = 1200,
  placement = 'right',
  extra,
  tabs,
  record,
  activeTabKey,
  onTabChange
}) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      onClose={onClose}
      open={visible}
      width={width}
      extra={extra}
      className='custom-padding-tabs'
    >
      {tabs && tabs.length > 0 ? (
        <DynamicTabsContent
          tabs={tabs}
          record={record}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
        />
      ) : (
        children
      )}
    </Drawer>
  );
};

export default DynamicDrawer;
