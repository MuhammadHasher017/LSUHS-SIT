import React from 'react';
import useResults from './useResults.hook';

const Results = () => {
  useResults();
  return (
    <div>
      Results Content
    </div>
  );
};

export default Results; 