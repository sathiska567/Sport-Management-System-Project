// ResetPassword.js
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const ResetPassword = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Implement logic to reset password
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
