import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const SpinComponent = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 24,
          backgroundColor: 'red',
        }}
        spin
      />
    }
  />
);
export default SpinComponent;