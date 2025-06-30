import React from 'react';
import { Typography, Space, Tag, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;

const ArticleDetailContent = ({ article }) => {
  if (!article) return null;
  
  return (
    <div>
      <Title level={4}>{article.title}</Title>
      <Paragraph type="secondary">Short description</Paragraph>
      
      <Paragraph>
        {article.content || 'Example description here lorem ipsum dolor sit amet la, text funding campaign here ipsum pasum.'}
      </Paragraph>
      
      <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
        <div>
          <Text strong>Author</Text>
          <div>{article.author}</div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <Text strong>Publish Date</Text>
          <div>{article.datePublished}</div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <Text strong>Article cover</Text>
          <div>
            {article.cover ? (
              <img src={article.cover} alt="Article cover" style={{ maxWidth: '100%', marginTop: 8 }} />
            ) : (
              <Text type="secondary">No cover image</Text>
            )}
          </div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <Text strong>Category</Text>
          <div>{article.category}</div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <Text strong>Tags</Text>
          <div>
            {article.tags && article.tags.split(', ').map(tag => (
              <Tag key={tag} color="blue" style={{ marginBottom: 4 }}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </Space>
      
      <Divider />
      
      <Title level={5}>Content</Title>
      <div dangerouslySetInnerHTML={{ __html: article.content || '<p>1. Why Movement Matters</p><p>Staying active isn\'t just about exercise—it\'s about keeping your body moving throughout the day. Regular movement helps:</p><ul><li>Boost energy levels and reduce tiredness.</li><li>Improve focus and mood, making you feel happier.</li><li>Strengthen your muscles, bones, and heart for long-term health.</li><li>Support healthy weight management and overall wellness.</li></ul><p>2. Ways to Stay Active</p><p>You don\'t need a gym to be active—movement can be part of your daily routine!</p>' }} />
    </div>
  );
};

export default ArticleDetailContent;
