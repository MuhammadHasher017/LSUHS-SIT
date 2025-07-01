import React from 'react';
import useUnauthorized from './useUnauthorized.hook';

const Unauthorized = () => {
  useUnauthorized();
  return (
    <div>
      You don't have permission to access this page
    </div>
  );
};

export default Unauthorized; 