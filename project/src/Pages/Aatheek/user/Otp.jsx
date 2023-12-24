// OTPPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const OTPPage = () => {
  const { email } = useParams();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('otpToken'));

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }

    // Clear the token after 2 minutes
    const tokenClearTimer = setTimeout(() => {
      localStorage.removeItem('otpToken');
      setToken(null);
      navigate('/forgot-password');
    }, 2 * 60 * 1000);

    return () => clearTimeout(tokenClearTimer);
  }, [token, navigate]);


  useEffect(() => {
    // Define your function here
    const myFunction = () => {
      console.log('Running myFunction');
      // Add your logic here
      if(!localStorage.getItem('otpToken')){
        window.location.reload();
      }

    };

    // Set up an interval to run the function every 1000 milliseconds (1 second)
    const intervalId = setInterval(myFunction, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount




  const onFinish = async (values) => {
    try {
      // Make a request to the backend to verify the OTP
      const response = await axios.post('http://localhost:5050/user/verify-otp', {
        email,
        otp: values.otp
      });

      if (response.data.message) {
        // Password reset successful, you can navigate to a success page or handle it accordingly
        console.log('otp verified!');
        
        const newToken = response.data.token;
          localStorage.setItem('rePassToken', newToken);
          console.log('passReToken obtained:', newToken)
        
        navigate(`/reset-pass/${email}`);

      } else if(response.data.error === 'Invalid OTP') {
        // If OTP is incorrect or verification fails, display an error message
        setError(response.data.error || 'Invalid OTP');
        console.log('Invalid OTP');
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error('Error:', error.message);
    }
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
