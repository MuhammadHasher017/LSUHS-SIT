import React from 'react';
import useEvents from './useEvents.hook';

const Events = () => {
  useEvents();
  return (
    <div>
      Events Content
    </div>
  );
};

export default Events; 