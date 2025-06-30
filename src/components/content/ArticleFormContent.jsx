import React, { useState } from 'react';
import { Input, Select, Upload, Button, Typography, Space, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const ArticleFormContent = ({ initialData = {}, onChange }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    author: initialData.author || '',
    cover: initialData.cover || null,
    category: initialData.category || '',
    tags: initialData.tags ? initialData.tags.split(', ') : [],
    content: initialData.content || '',
  });

  const handleChange = (name, value) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    if (onChange) {
      onChange(updatedForm);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Title</Text>
        <Input 
          placeholder="Title..." 
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>Author</Text>
        <Input 
          placeholder="Coach Jenny" 
          value={form.author}
          onChange={(e) => handleChange('author', e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>Article cover</Text>
        <Upload 
          name="cover"
          listType="picture"
          maxCount={1}
          style={{ marginTop: 8 }}
        >
          <Button icon={<UploadOutlined />}>Browse</Button>
        </Upload>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>Category</Text>
        <Select
          placeholder="Select category"
          style={{ width: '100%', marginTop: 8 }}
          value={form.category || undefined}
          onChange={(value) => handleChange('category', value)}
        >
          <Option value="Lifestyle">Lifestyle</Option>
          <Option value="Coaching">Coaching</Option>
          <Option value="Health Tips">Health Tips</Option>
          <Option value="Nutrition">Nutrition</Option>
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>Tags</Text>
        <Select
          mode="tags"
          placeholder="Add tags..."
          style={{ width: '100%', marginTop: 8 }}
          value={form.tags}
          onChange={(value) => handleChange('tags', value)}
        >
          <Option value="kids">kids</Option>
          <Option value="activity">activity</Option>
          <Option value="fitness">fitness</Option>
          <Option value="goal-setting">goal-setting</Option>
          <Option value="progress">progress</Option>
          <Option value="tips">tips</Option>
        </Select>
      </div>

      <Divider />

      <div>
        <Title level={5}>Content</Title>
        <Text type="secondary">Add content to this article (must be filled for article to complete)</Text>
        <div style={{ marginTop: 16 }}>
          <Input.TextArea 
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            style={{ height: 200 }}
            placeholder="Enter article content here..."
            autoSize={{ minRows: 8, maxRows: 12 }}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleFormContent;
