import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../../themes/theme.json';

const WithAntdTheme = ({ children }) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default WithAntdTheme; 