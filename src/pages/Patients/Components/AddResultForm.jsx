import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Row, Col, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
// import { addResult } from '@/store/slices/resultsSlice'; // Your Redux action

const { TextArea } = Input;
const { Dragger } = Upload;

const AddResultForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch your Redux action
      // await dispatch(addResult(values));
      
      // Call your API here
      console.log('Adding result:', values);
      
      message.success('Result added successfully!');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add result');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Replace with your upload endpoint
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* Patient */}
      <Form.Item
        label="Patient"
        name="patient"
        rules={[{ required: true, message: 'Please select patient' }]}
        style={{ marginBottom: 16 }}
      >
        <Select placeholder="-- Choose --">
          <Select.Option value="john_doe">John Doe</Select.Option>
          <Select.Option value="jane_smith">Jane Smith</Select.Option>
          <Select.Option value="bob_wilson">Bob Wilson</Select.Option>
          <Select.Option value="alice_brown">Alice Brown</Select.Option>
        </Select>
      </Form.Item>

      {/* Sno */}
      <Form.Item
        label="Sno"
        name="sno"
        rules={[{ required: true, message: 'Please enter serial number' }]}
        style={{ marginBottom: 16 }}
      >
        <Input placeholder="Input field" />
      </Form.Item>

      {/* Physician Name and Result Document Row */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Form.Item
            label="Physician Name"
            name="physicianName"
            rules={[{ required: true, message: 'Please enter physician name' }]}
          >
            <Input placeholder="Input field" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Result Document"
            name="resultDocument"
          >
            <Dragger {...uploadProps} style={{ height: 80 }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drop file here or <span style={{ color: '#1890ff' }}>Browse</span></p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>

      {/* Note */}
      <Form.Item
        label="Note"
        name="note"
        style={{ marginBottom: 24 }}
      >
        <TextArea 
          rows={4} 
          placeholder="Write description here..."
        />
      </Form.Item>

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Result
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddResultForm;