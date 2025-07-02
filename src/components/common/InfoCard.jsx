import React from 'react';
import './InfoCard.css';

const InfoCard = ({ 
  title = "Total Patients", 
  iconSrc,
  mainText = "1,250", 
  percentage = "12%", 
  userCount = "42 users",
  trendDirection = "up", // "up" or "down"
  trendIcon: TrendIcon // Pass your up/down arrow icon component
}) => {
  return (
    <div className="dynamic-card">
      {/* Header */}
      <div className="card-header">
        <span className="card-title">{title}</span>
        {iconSrc && (
          <div className="icon-container">
            <img src={iconSrc} alt={title} className="icon" />
          </div>
        )}
      </div>
      
      {/* Main Text */}
      <div className="main-text">
        <span className="main-number">{mainText}</span>
      </div>
      
      {/* Growth/Trend Indicator */}
      <div className="trend-indicator">
        <div className={`trend-icon-container ${trendDirection}`}>
          {TrendIcon ? (
            <TrendIcon className="trend-icon" />
          ) : (
            <div className={`default-dot ${trendDirection}`}></div>
          )}
        </div>
        <span className="percentage">{percentage}</span>
        <span className="users-count">({userCount})</span>
      </div>
    </div>
  );
};

export default InfoCard;