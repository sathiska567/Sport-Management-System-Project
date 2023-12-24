// ResetPassword.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;

const ResetPassword = () => {

  const {email} = useParams();
  const navigate = useNavigate();
  
  const [token, setToken] = useState(localStorage.getItem('rePassToken'));

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }

    // Clear the token after 2 minutes
    const tokenClearTimer = setTimeout(() => {
      localStorage.removeItem('rePassToken');
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
      if(!localStorage.getItem('rePassToken')){
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
      // Send a POST request to the backend with the new password
      const response = await axios.post('http://localhost:5050/user/reset-password', {
        email,
        newPassword: values.newPassword,
        token
      });

      // Handle the response from the backend
      if (response.data.message) {
        console.log('Password was reset successfully');

        // Clear the token immediately after changing the password
        localStorage.removeItem('rePassToken');
        setToken(null);
        navigate('/');


      } else {
        console.log('Failed to reset password');
        // Handle other responses or errors from the backend
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error.message);
    }

  };

  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
    <div className="bg-white p-3 rounded w-md-50 w-lg-25">
      <center><Title level={2}>Reset Password</Title></center>
      <Form
        name="resetPasswordForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default ResetPassword;
