// OTPPage.js
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const OTPPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Implement logic to verify OTP and proceed to reset password
  };

  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
    <div className="bg-white p-3 rounded w-md-50 w-lg-25">
      <center><Title level={2}>
        Enter OTP <span role="img" aria-label="exclamation mark">❗</span>
      </Title></center>
      <Text type="secondary">Enter the OTP received to your email.</Text>
      <Form
        name="otpForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="otp"
          rules={[{ required: true, message: 'Please input the OTP!' }]}
        >
          <Input placeholder="OTP" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default OTPPage;
