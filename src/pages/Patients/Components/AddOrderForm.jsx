import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
// import { addOrder } from '@/store/slices/ordersSlice'; // Your Redux action

const AddOrderForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch your Redux action
      // await dispatch(addOrder(values));
      
      // Call your API here
      console.log('Adding order:', values);
      
      message.success('Order added successfully!');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add order');
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
      {/* Kit ID and Patient Row */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Form.Item
            label="Kit ID"
            name="kitId"
            rules={[{ required: true, message: 'Please enter kit ID' }]}
          >
            <Input placeholder="Input field" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Patient"
            name="patient"
            rules={[{ required: true, message: 'Please select patient' }]}
          >
            <Select placeholder="-- Choose --">
              <Select.Option value="john_doe">John Doe</Select.Option>
              <Select.Option value="jane_smith">Jane Smith</Select.Option>
              <Select.Option value="bob_wilson">Bob Wilson</Select.Option>
              <Select.Option value="alice_brown">Alice Brown</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Order Date and Delivery Type Row */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Form.Item
            label="Order Date"
            name="orderDate"
            rules={[{ required: true, message: 'Please select order date' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              format="MM/DD/YYYY"
              placeholder="10/10/2025"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Delivery Type"
            name="deliveryType"
            rules={[{ required: true, message: 'Please select delivery type' }]}
          >
            <Select placeholder="-- Choose --">
              <Select.Option value="standard">Standard Delivery</Select.Option>
              <Select.Option value="express">Express Delivery</Select.Option>
              <Select.Option value="overnight">Overnight Delivery</Select.Option>
              <Select.Option value="pickup">Pickup</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Address Delivered */}
      <Form.Item
        label="Address Delivered"
        name="addressDelivered"
        rules={[{ required: true, message: 'Please enter delivery address' }]}
        style={{ marginBottom: 24 }}
      >
        <Input placeholder="Input field" />
      </Form.Item>

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Order
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddOrderForm;