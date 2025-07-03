import React from 'react';
import { Tabs } from 'antd';

const DynamicTabsContent = ({ tabs, record, activeTabKey, onTabChange }) => (
  <Tabs
  className="tabs-content"
    activeKey={activeTabKey}
    onChange={onTabChange}
    items={tabs.map(tab => ({
      key: tab.key,
      label: tab.label,
      children: <tab.content record={record} />
    }))}
  />
);

export default DynamicTabsContent; 