import React from 'react';
import useOrders from './useOrders.hook';

const Orders = () => {
  useOrders();
  return (
    <div>
      Orders Content
    </div>
  );
};

export default Orders; 