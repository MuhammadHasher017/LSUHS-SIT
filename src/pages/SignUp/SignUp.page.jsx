import React from 'react';
import useSignUp from './useSignUp.hook';
import { Form, Input, Button, Alert } from 'antd';

const SignUpPage = () => {
  const { handleSignUp, loading, error } = useSignUp();

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <Form layout="vertical" onFinish={handleSignUp}>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}> 
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}> 
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
    </div>
  );
};

export default SignUpPage; 