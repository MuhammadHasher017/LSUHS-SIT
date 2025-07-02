import React from 'react';
import useLogin from './useLogin.hook';
import { Form, Input, Button, Alert, Divider } from 'antd';

const LoginPage = () => {
  const { handleLogin, loading, error } = useLogin();

  return (
    <div className="d-flex auth-container vh-100">
      <div className='col primary-bg vh-100'></div>
      <div className='flex-grow-1'>
      <div className="login-form-container">
        <div className='login-form'>
        <h1>Login</h1>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}> 
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}> 
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item style={{ paddingTop: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
          <Divider style={{ marginBottom: 20 }} plain>or</Divider>
          <Form.Item>
            <Button type="default" block>
              <div className='d-flex align-items-center d-block w-100'>
                <img src="../src/assets/icons/google-icon.svg" alt="Google Icon" />
                <span className='flex-grow-1 text-center'>
                  Login with Google
                </span>
              </div>
            </Button>
          </Form.Item>
        </Form>
      {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
      </div>
      <div className='login-footer'>
          <p>Don't have an account? <a href="#">Sign Up</a></p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default LoginPage; 