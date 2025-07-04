import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Row, Col, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
// import { addInsurance } from '@/store/slices/insuranceSlice'; // Your Redux action

const { Dragger } = Upload;

const AddInsuranceForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch your Redux action
      // await dispatch(addInsurance(values));
      
      // Call your API here
      console.log('Adding insurance:', values);
      
      message.success('Insurance added successfully!');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add insurance');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*,.pdf',
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
      {/* Information Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Information</h3>
        
        {/* Insurance Provider */}
        <Form.Item
          label="Insurance Provider"
          name="insuranceProvider"
          rules={[{ required: true, message: 'Please enter insurance provider' }]}
          style={{ marginBottom: 16 }}
        >
          <Input placeholder="Input field" />
        </Form.Item>

        {/* Member Name and Member ID Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item
              label="Member Name"
              name="memberName"
              rules={[{ required: true, message: 'Please enter member name' }]}
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Member ID"
              name="memberId"
              rules={[{ required: true, message: 'Please enter member ID' }]}
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
        </Row>

        {/* Group Number and Plan Type Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item
              label="Group Number"
              name="groupNumber"
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Plan Type"
              name="planType"
              rules={[{ required: true, message: 'Please select plan type' }]}
            >
              <Select placeholder="-- Choose --">
                <Select.Option value="hmo">HMO</Select.Option>
                <Select.Option value="ppo">PPO</Select.Option>
                <Select.Option value="epo">EPO</Select.Option>
                <Select.Option value="pos">POS</Select.Option>
                <Select.Option value="hdhp">High Deductible Health Plan</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Effective Date and Expiration Date Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item
              label="Effective Date"
              name="effectiveDate"
              rules={[{ required: true, message: 'Please select effective date' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                placeholder="mm/dd/yyyy"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Expiration Date"
              name="expirationDate"
              rules={[{ required: true, message: 'Please select expiration date' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                placeholder="mm/dd/yyyy"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Primary Care Provider and PCP Phone Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item
              label="Primary Care Provider (PCP)"
              name="primaryCareProvider"
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="PCP Phone"
              name="pcpPhone"
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
        </Row>

        {/* Customer Service Phone and Rx BIN/Rx PCN Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Customer Service Phone"
              name="customerServicePhone"
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rx BIN / Rx PCN"
              name="rxBinPcn"
            >
              <Input placeholder="Input field" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Insurance Card Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Insurance Card</h3>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Front of card" name="frontCard">
              <Dragger {...uploadProps} style={{ height: 120 }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Drop file here or <span style={{ color: '#1890ff' }}>Browse</span></p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Back of card" name="backCard">
              <Dragger {...uploadProps} style={{ height: 120 }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Drop file here or <span style={{ color: '#1890ff' }}>Browse</span></p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Insurance
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddInsuranceForm;