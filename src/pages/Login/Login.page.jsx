import React from 'react';
import useLogin from './useLogin.hook';
import { Form, Input, Button, Alert } from 'antd';

const LoginPage = () => {
  const { handleLogin, loading, error } = useLogin();

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}> 
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}> 
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
    </div>
  );
};

export default LoginPage; 