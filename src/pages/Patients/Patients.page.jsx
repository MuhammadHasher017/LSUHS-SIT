import React from 'react';
import usePatients from './usePatients.hook';

const Patients = () => {
  usePatients();
  return (
    <div>
      Patients Content
    </div>
  );
};

export default Patients; 