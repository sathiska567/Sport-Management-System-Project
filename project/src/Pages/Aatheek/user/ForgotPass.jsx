// ForgotPassword.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};




//otp
const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5050/user/get-otp', { email: values.email });

      if (response.data.message) {
        console.log('OTP sent successfully');

        const newToken = response.data.token;
          localStorage.setItem('otpToken', newToken);
          console.log('OTP Token obtained:', newToken)
        
        
        // Navigate to the OTP input page
        navigate(`/otp-reset-pass/${values.email}`);

      } else {
        // If the email is not valid, display an error message
        setError('Invalid email address');
        console.log('invalid email');
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error('Error:', error.message);
    }
  };



  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-md-50 w-lg-25">
        <center>
          <Title level={2}>
            Forgot Password <span role="img" aria-label="exclamation mark">❗</span>
          </Title>
        </center>
        <Text type="secondary">Enter your email, and we'll get the password reset code to your inbox.</Text>
        
        {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} />}

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

        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
