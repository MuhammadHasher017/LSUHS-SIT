import React from 'react';
import { Tabs } from 'antd';

const DynamicTabsContent = ({ tabs, record }) => (
  <Tabs
    defaultActiveKey={tabs[0]?.key}
    items={tabs.map(tab => ({
      key: tab.key,
      label: tab.label,
      children: <tab.content record={record} />
    }))}
  />
);

export default DynamicTabsContent; 