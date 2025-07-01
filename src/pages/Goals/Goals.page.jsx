import React from 'react';
import useGoals from './useGoals.hook';

const Goals = () => {
  useGoals();
  return (
    <div>
      Goals Content
    </div>
  );
};

export default Goals; 