// ForgotPassword.js
import React from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const layout = {
    labelCol: {
      span: 24, // Set to full width on small screens
    },
    wrapperCol: {
      span: 24, // Set to full width on small screens
    },
  };
  
  const tailLayout = {
    wrapperCol: {
      span: 24, // Set to full width on small screens
    },
  };

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Implement logic to send reset code to email
  };

  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
    <div className="bg-white p-3 rounded w-md-50 w-lg-25">
      <center><Title level={2}>
        Forgot Password <span role="img" aria-label="exclamation mark">❗</span>
      </Title></center>
      <Text type="secondary">Enter your email, and we'll get the password reset code to your inbox.</Text>
      <Form {...layout}
        name="forgotPasswordForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Link to="/login">Back to Login</Link>
    </div>
    </div>
  );
};

export default ForgotPassword;
