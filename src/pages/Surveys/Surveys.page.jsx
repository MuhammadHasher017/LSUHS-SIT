import React from 'react';
import useSurveys from './useSurveys.hook';

const Surveys = () => {
  useSurveys();
  return (
    <div>
      Surveys Content
    </div>
  );
};

export default Surveys; 