import React from 'react';
import useSettings from './useSettings.hook';

const Settings = () => {
  useSettings();
  return (
    <div>
      Settings Content
    </div>
  );
};

export default Settings; 