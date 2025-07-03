import React from 'react';
import './InfoCard.css';
import { ArrowDownIcon, ArrowUpIcon } from '@/utils/icons';
import { Typography } from 'antd';

const { Text} = Typography;


const InfoCard = ({ 
  title = "Total Patients", 
  iconComponent: IconComponent,
  value = "1,250", 
  percentage = "12%", 
  userCount = "7",
  trendDirection = "up", // "up" or "down"
}) => {
  return (
    <div className="dynamic-card">
      <div className="card-header">
        <span className="card-title">{title}</span>
        {IconComponent && (
          <div className="icon-container">
            <IconComponent />
          </div>
        )}
      </div>
      
      <div className="main-text">
        <Text className="main-number">{value}</Text>
      </div>
      
      <div className="trend-indicator">
        <div className={`trend-icon-container ${trendDirection}`}>
          {trendDirection == 'up' ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon  />
          )}
          <Text>{percentage}</Text>
        </div>
        <Text>({userCount} users)</Text>
      </div>
    </div>
  );
};

export default InfoCard;