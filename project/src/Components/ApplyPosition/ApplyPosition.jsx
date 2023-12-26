import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, message } from 'antd';
import SideBar from '../DashboardSideBar/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';

const App = () => {
        const [componentSize, setComponentSize] = useState('default');
        const navigate = useNavigate();

const onFormLayoutChange = ({ size }) => {
                setComponentSize(size);
        };


// handle position registration
const handleSubmit = async (values) => {
                try {

               const res = await axios.post("http://localhost:8080/api/v1/user/apply-position", values)
               message.success("Position Applying successfull")
                navigate("/dashboad")
                  
                } catch (error) {
                  message.error(error);
                }

        }


return (
        <div>
        <SideBar>

        <div>
      <div className="UserApplicationFormHeader">
        <h3>Application</h3>
      </div>
      <div className="UserApplicationFormApplication">
        
      <Form layout='verticle' onFinish={handleSubmit} className='m-3'>
            <h3 className='text-light'>Personal Details : </h3>
            <Row gutter={20}>   {/*gutter is use to add any spaces */}

               <Col xs={24} md={24} lg={8}>
                  <Form.Item label='First name' name='FirstName' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your name' />
                  </Form.Item>
               </Col>

                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='last Name' name='LastName' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your last Name' />
                  </Form.Item>
               </Col>

              <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Email' name='Email' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your Email' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Age' name='Age' required rules={[{ required: true }]}>
                     <Input type='number' placeholder='Enter your Age' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={24} lg={8}>
                  <Form.Item label='UserRole' name='UserRole' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your UserRole' />
                  </Form.Item>
               </Col>
               <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Experience' name='Experience' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your Experience' />
                  </Form.Item>
               </Col>

               <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Distric' name='Distric' required rules={[{ required: true }]}>
                     <Input type='text' placeholder='Enter your Distric' />
                  </Form.Item>
               </Col>

               <Col xs={24} md={24} lg={8}>
                  <button className="btn btn-primary form-btn" type='submit'>
                     Submit
                  </button>
               </Col>


            </Row>
       </Form>

      </div>
    </div>
                               
        </SideBar>

                </div>

        )
}

export default App;