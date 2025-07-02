import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log('Form values:', values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onGoogleSignUp = () => {
    console.log('Google sign up clicked');
  };

  return (
    <div className='auth-container'>
      <h1>Create Account</h1>

      <Form form={form} layout={"vertical"} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="Angelina" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input placeholder="Miller" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="angelinamiller@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
            size="large"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Divider>or</Divider>

      <Button 
        block 
        size="large" 
        icon={<GoogleOutlined />}
        onClick={onGoogleSignUp}
      >
        Sign Up with Google
      </Button>
    </div>
  );
};

export default SignUpForm;