import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import SideBar from '../DashboardSideBar/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
        const [componentSize, setComponentSize] = useState('default');
        const navigate = useNavigate();

        const onFormLayoutChange = ({ size }) => {
                setComponentSize(size);
        };


        // handle position registration
        const handleSubmit = async (values) => {
                console.log(values);

                const res = await axios.post("http://localhost:8080/api/v1/user/apply-position", values)
                console.log(res);
                navigate("/dashboad") 

        }


        return (
                <div>
                        <SideBar>
                                <Form
                                        labelCol={{ span: 4, }}
                                        wrapperCol={{ span: 14, }}
                                        layout="horizontal"
                                        initialValues={{ size: componentSize, }}
                                        onValuesChange={onFormLayoutChange}
                                        onFinish={handleSubmit}
                                        size={componentSize}
                                        style={{ maxWidth: 600, }}
                                >


                                        <Form.Item label="User name" name="userName">
                                                <Input type='text' />
                                        </Form.Item>

                                        <Form.Item label="experienced" name="experienced">
                                                <Input type='text' />
                                        </Form.Item>

                                        <Form.Item label=" ">
                                                <Button type="primary" htmlType="submit">
                                                        Submit
                                                </Button>
                                        </Form.Item>

                                </Form>

                        </SideBar>

                </div>

        )
}

export default App;