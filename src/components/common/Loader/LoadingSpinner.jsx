import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ tip = 'Loading...', size = 'large', style = {} }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, ...style }}>
    <Spin tip={tip} size={size} />
  </div>
);

export default LoadingSpinner; 