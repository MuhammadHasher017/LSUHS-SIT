import React from 'react';
import useInventory from './useInventory.hook';

const Inventory = () => {
  useInventory();
  return (
    <div>
      Inventory Content
    </div>
  );
};

export default Inventory; 