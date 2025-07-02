import React from 'react';
import { Modal, Button } from 'antd';

const DynamicModal = ({ 
  visible, 
  onCancel, 
  title = 'Modal',
  children,
  width = 700,
  footerButtons,
  centered = true
}) => {
  
  return (
    <Modal className='ui-modal'
      title={title}
      open={visible}
      onCancel={onCancel}
      width={width}
      footer={footerButtons}
      centered={centered}
    >
      {children}
    </Modal>
  );
};

export default DynamicModal;
