import React from 'react';
import { Avatar, List, Typography, Space } from 'antd';
import { MessageOutlined, CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ActivitySection = ({ patientId }) => {
  // Mock data - replace with actual data from your state/API
  const activityData = {
    recent: [
      {
        id: 1,
        type: 'comment',
        author: 'Andrea Johnson, MD',
        action: 'lorem ipsum dolor sit amet Contact goes here',
        timestamp: '2 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=1' // Replace with actual avatar URL
      },
      {
        id: 2,
        type: 'event',
        author: 'Angelina Muller',
        action: 'join an event on Mar 24, 2025',
        timestamp: '36 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=2'
      },
      {
        id: 3,
        type: 'event',
        author: 'Angelina Muller',
        action: 'join an event on Mar 24, 2025',
        timestamp: '36 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=2'
      }
    ],
    lastWeek: [
      {
        id: 4,
        type: 'comment',
        author: 'Andrea Johnson, MD',
        action: 'lorem ipsum dolor sit amet Contact goes here',
        timestamp: '2 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=1'
      },
      {
        id: 5,
        type: 'event',
        author: 'Angelina Muller',
        action: 'join an event on Mar 24, 2025',
        timestamp: '36 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=2'
      },
      {
        id: 6,
        type: 'event',
        author: 'Angelina Muller',
        action: 'join an event on Mar 24, 2025',
        timestamp: '36 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=2'
      }
    ]
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return (
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#fadb14',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            border: '2px solid white'
          }}>
            <MessageOutlined style={{ fontSize: '10px', color: 'white' }} />
          </div>
        );
      case 'event':
        return (
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#722ed1',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            border: '2px solid white'
          }}>
            <CalendarOutlined style={{ fontSize: '10px', color: 'white' }} />
          </div>
        );
      default:
        return null;
    }
  };

  const ActivityItem = ({ item }) => (
    <List.Item style={{ padding: '12px 0', border: 'none' }}>
      <List.Item.Meta
        avatar={
          <div style={{ position: 'relative' }}>
            <Avatar 
              size={40}
              src={item.avatar}
              style={{ 
                backgroundColor: '#f56a00',
              }}
            >
              {item.author.charAt(0)}
            </Avatar>
            {getActivityIcon(item.type)}
          </div>
        }
        title={
          <div>
            <Text strong style={{ fontSize: '14px', color: '#262626' }}>
              {item.author}
            </Text>
            <Text style={{ fontSize: '14px', color: '#595959', marginLeft: '4px' }}>
              {item.action}
            </Text>
          </div>
        }
        description={
          <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
            {item.timestamp}
          </Text>
        }
      />
    </List.Item>
  );

  return (
    <div style={{ padding: '16px 0' }}>
      {/* Recent Section */}
      <div style={{ marginBottom: '32px' }}>
        <Text strong style={{ 
          fontSize: '16px', 
          color: '#262626',
          marginBottom: '16px',
          display: 'block'
        }}>
          Recent
        </Text>
        
        <List
          itemLayout="horizontal"
          dataSource={activityData.recent}
          renderItem={(item) => <ActivityItem item={item} />}
        />
      </div>

      {/* Last 7 days Section */}
      <div>
        <Text strong style={{ 
          fontSize: '16px', 
          color: '#262626',
          marginBottom: '16px',
          display: 'block'
        }}>
          Last 7 days
        </Text>
        
        <List
          itemLayout="horizontal"
          dataSource={activityData.lastWeek}
          renderItem={(item) => <ActivityItem item={item} />}
        />
      </div>
    </div>
  );
};

export default ActivitySection;