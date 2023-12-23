import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to clear the error message
  const clearError = () => {
    setError('');
  };

  const onFinish = async () => {
    // Clear the error message on form submission
    clearError();

    // Validation checks
    if (!values.username || !values.password || !values.cpassword) {
      setError('All fields must be filled out');
      return;
    }

    if (values.password !== values.cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/register', values);

      // Check if registration was successful based on the response from the server
      if (response.data.success) {

        // setError(response.data.message)
        console.log('Admin registered successfully!');

        // Redirect to the login page after successful registration
        navigate('/');

      } else {
        setError(response.data.message);
      }

    } catch (error) {
      
      console.error('Registration error:', error.response.data.message);
      // console.error('Registration error:', error.message);
      setError(error.response.data.message); // Set the error message state
    }
  };

  return (
    <div className="dash d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-md-50 w-lg-25">
        <center>
          <h2>User Sign-Up</h2>
        </center>
        <Form
          {...layout}
          name="registerForm"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input onChange={(e) => { setValues({ ...values, username: e.target.value }); clearError(); }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input onChange={(e) => { setValues({ ...values, email: e.target.value }); clearError(); }} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password onChange={(e) => { setValues({ ...values, password: e.target.value }); clearError(); }} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="cpassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password onChange={(e) => { setValues({ ...values, cpassword: e.target.value }); clearError(); }} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="w-100">
              Sign up
            </Button>
          </Form.Item>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <p>You agree to our terms and conditions</p>
          <Form.Item {...tailLayout}>
            <Link to="/" className="btn btn-primary btn-default border text-decoration-none w-100">
              Log In
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
