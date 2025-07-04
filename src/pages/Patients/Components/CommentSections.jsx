import React, { useState } from 'react';
import { Avatar, Input, Button, List, Typography, Space, message } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
// import { addComment } from '@/store/slices/commentsSlice'; // Your Redux action

const { Text } = Typography;
const { TextArea } = Input;

const CommentsSection = ({ patientId }) => {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Mock data - replace with actual data from your state/API
  // Set to empty array to show the empty state, or add comments to show the list
  const [comments, setComments] = useState([
    // Uncomment below to see comments view
    // {
    //   id: 1,
    //   author: 'Andrea Johnson, MD',
    //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis velit elit, eget sodales diam bibendum id. Praesent tempor sagittis hendrerit. Pellentesque nibh lacus, suscipit pretium dui id, bibendum porttitor augue.',
    //   timestamp: '10/10/2025 10:30 AM',
    //   avatar: 'A'
    // },
    // {
    //   id: 2,
    //   author: 'Andrea Johnson, MD',
    //   content: 'Nam mollis velit elit, eget sodales diam bibendum id. Praesent tempor sagittis hendrerit. Pellentesque nibh lacus, suscipit pretium dui id, bibendum porttitor augue.',
    //   timestamp: '10/10/2025 10:30 AM',
    //   avatar: 'A'
    // }
  ]);

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    setLoading(true);
    try {
      // Create new comment object
      const comment = {
        id: Date.now(),
        author: 'Current User, MD', // Replace with actual user info
        content: newComment,
        timestamp: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        avatar: 'C' // Replace with actual user initial
      };

      // Add to local state (replace with Redux dispatch)
      setComments([comment, ...comments]);
      
      // Dispatch Redux action
      // await dispatch(addComment({ patientId, comment }));
      
      setNewComment('');
      message.success('Comment added successfully!');
    } catch (error) {
      message.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      {comments.length > 0 ? (
        <>
          {/* Comments List */}
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item 
                style={{ 
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      size={40}
                      style={{ 
                        backgroundColor: '#d9d9d9',
                        color: '#666',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >
                      {comment.avatar}
                    </Avatar>
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: '14px', color: '#262626' }}>
                        {comment.author}
                      </Text>
                      <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        {comment.timestamp}
                      </Text>
                    </div>
                  }
                  description={
                    <Text style={{ 
                      fontSize: '14px', 
                      color: '#595959',
                      lineHeight: '1.5',
                      marginTop: '4px',
                      display: 'block'
                    }}>
                      {comment.content}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />

          {/* Add Comment Section */}
          <div style={{ 
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '6px',
            border: '1px solid #f0f0f0'
          }}>
            <Space.Compact style={{ width: '100%' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                width: '100%'
              }}>
                <PlusOutlined 
                  style={{ 
                    color: '#8c8c8c',
                    marginTop: '8px',
                    fontSize: '16px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pellentesque nibh lacus, suscipit pretium dui id, bibendum porttitor augue."
                    rows={3}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      resize: 'none',
                      padding: '4px 0',
                      fontSize: '14px'
                    }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    marginTop: '8px' 
                  }}>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSubmit}
                      loading={loading}
                      size="small"
                      style={{
                        backgroundColor: '#722ed1',
                        borderColor: '#722ed1',
                        borderRadius: '20px',
                        height: '32px',
                        paddingLeft: '12px',
                        paddingRight: '12px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Space.Compact>
          </div>
        </>
      ) : (
        <>
          {/* Empty State */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            textAlign: 'center'
          }}>
            {/* Comment Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              border: '2px solid #e8e8e8'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3 16.31L2 22L7.69 21C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.75 8.5 19.31L7.81 18.96L4.41 19.59L5.04 16.19L4.69 15.5C4.25 14.46 4 13.26 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#bfbfbf"/>
              </svg>
            </div>
            
            <Text strong style={{ 
              fontSize: '16px', 
              color: '#262626',
              marginBottom: '8px',
              display: 'block'
            }}>
              No comment yet
            </Text>
            
            <Text style={{ 
              fontSize: '14px', 
              color: '#8c8c8c',
              marginBottom: '32px',
              maxWidth: '300px'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </div>

          {/* Simple Add Comment Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '6px',
            border: '1px solid #f0f0f0',
            marginTop: '20px'
          }}>
            <PlusOutlined style={{ color: '#8c8c8c', fontSize: '16px' }} />
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a comment"
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px'
              }}
              suffix={
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmit}
                  loading={loading}
                  size="small"
                  style={{
                    backgroundColor: '#722ed1',
                    borderColor: '#722ed1',
                    borderRadius: '20px',
                    height: '28px',
                    width: '28px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsSection;