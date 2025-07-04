import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, message, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
// import { addEvent } from '@/store/slices/eventsSlice'; // Your Redux action

const AddEventForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch your Redux action
      // await dispatch(addEvent(values));
      
      // Call your API here
      console.log('Adding event:', values);
      
      message.success('Event added successfully!');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add event');
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
      {/* Event Name */}
      <Form.Item
        label="Event Name"
        name="eventName"
        rules={[{ required: true, message: 'Please enter event name' }]}
        style={{ marginBottom: 16 }}
      >
        <Input placeholder="Input field" />
      </Form.Item>

      {/* Location */}
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please select location' }]}
        style={{ marginBottom: 16 }}
      >
        <Select placeholder="-- Choose --">
          <Select.Option value="clinic_a">Clinic A</Select.Option>
          <Select.Option value="clinic_b">Clinic B</Select.Option>
          <Select.Option value="hospital_main">Main Hospital</Select.Option>
          <Select.Option value="lab_center">Lab Center</Select.Option>
          <Select.Option value="remote">Remote</Select.Option>
        </Select>
      </Form.Item>

      {/* Date and Time Row */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              format="MM/DD/YYYY"
              placeholder="mm/dd/yyyy"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please select time' }]}
          >
            <TimePicker 
              style={{ width: '100%' }} 
              format="HH:mm"
              placeholder="00:00 - 00:00"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Capacity and Kit Assigned Row */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please enter capacity' }]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Kit Assigned"
            name="kitAssigned"
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Event
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddEventForm;