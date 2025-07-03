import React, { useState } from 'react';
import { Form, Input, Button, Alert, Divider, Row, Col } from 'antd';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (values) => {
    setLoading(true);
    setError(null);
    console.log('Sign up values:', values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // setError('Sign up failed!'); // Uncomment to simulate error
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    // Google sign up logic here
  };

  return (
    <div className="d-flex auth-container vh-100">
      <div className='col primary-bg vh-100'></div>
      <div className='flex-grow-1'>
        <div className="login-form-container">
          <div className='login-form'>
            <h1>Sign Up</h1>
            <Form layout="vertical" onFinish={handleSignUp}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}> 
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}> 
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}> 
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}> 
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item style={{ paddingTop: 8 }}>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Sign Up
                </Button>
              </Form.Item>
              <Divider style={{ marginBottom: 20 }} plain>or</Divider>
              <Form.Item>
                <Button type="default" block onClick={handleGoogleSignUp}>
                  <div className='d-flex align-items-center d-block w-100'>
                    <img src="../src/assets/icons/google-icon.svg" alt="Google Icon" />
                    <span className='flex-grow-1 text-center'>
                      Sign Up with Google
                    </span>
                  </div>
                </Button>
              </Form.Item>
            </Form>
            {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
          </div>
          <div className='login-footer'>
            <p>Already have an account? <a href="#">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;