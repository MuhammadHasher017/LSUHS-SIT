import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
// import { addPatient } from '@/store/slices/patientsSlice'; // Your Redux action

const { TextArea } = Input;

const AddPatientForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch your Redux action
      // await dispatch(addPatient(values));
      
      // Call your API here
      console.log('Adding patient:', values);
      
      message.success('Patient added successfully!');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* General Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>General</h3>
        
        {/* Avatar and Name Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={4}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
          </Col>
          <Col span={20}>
            <Form.Item
              name="patientName"
              rules={[{ required: true, message: 'Please enter patient name' }]}
            >
              <Input placeholder="Patient Name" />
            </Form.Item>
          </Col>
        </Row>

        {/* First and Last Name Row */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Gender and Date of Birth Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select placeholder="-- Choose Gender --">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please select date of birth' }]}
            >
              <Select placeholder="-- Choose Date of Birth --">
                <Select.Option value="1990">1990</Select.Option>
                <Select.Option value="1991">1991</Select.Option>
                <Select.Option value="1992">1992</Select.Option>
                {/* Add more years as needed */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Contact Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Contact</h3>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Address Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Address</h3>
        
        <Form.Item
          name="address"
          style={{ marginBottom: 16 }}
        >
          <Input placeholder="Street Address" />
        </Form.Item>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Form.Item name="city">
              <Select placeholder="-- Choose City --">
                <Select.Option value="karachi">Karachi</Select.Option>
                <Select.Option value="lahore">Lahore</Select.Option>
                <Select.Option value="islamabad">Islamabad</Select.Option>
                <Select.Option value="rawalpindi">Rawalpindi</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="state">
              <Select placeholder="-- Choose State --">
                <Select.Option value="punjab">Punjab</Select.Option>
                <Select.Option value="sindh">Sindh</Select.Option>
                <Select.Option value="kpk">KPK</Select.Option>
                <Select.Option value="balochistan">Balochistan</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="country">
              <Select placeholder="-- Choose Country --">
                <Select.Option value="pakistan">Pakistan</Select.Option>
                <Select.Option value="india">India</Select.Option>
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="uk">UK</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="zipCode">
              <Input placeholder="Zip Code" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Notes Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Notes</h3>
        
        <Form.Item name="notes">
          <TextArea 
            rows={4} 
            placeholder="Add any additional notes about the patient..."
          />
        </Form.Item>
      </div>

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Patient
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddPatientForm;