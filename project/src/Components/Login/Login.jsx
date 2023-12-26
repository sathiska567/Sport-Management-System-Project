import React, { useState } from "react";
import "./Login.css";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const naviagte = useNavigate()

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };


  // Handle login user
  const onFinish = async (values) => {
    console.log(email,password);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', {email , password});

      console.log('Login successful');
      console.log(res.data);

      localStorage.setItem('email', values.email);
      localStorage.setItem('token', res.data.token);

      // check backend validation
      if(res.data.success){
      // Redirect to the admin dashboard or another page after successful login
      naviagte('/dashboad');
       message.success("Login successfull")
      }

      else{
        message.error("Invalid credential")
      }     


    } catch (error) {
      // Handle login error (display error message, etc.)
      // console.error('Login error:', error.response.data.message);
      console.log("Login error");

      // setError(error.response?.data?.message);
      message.error('Login failed. Please check your credentials.');
    }
  };




  return (
    <div className="LoginPage">
      <div className="LoginDetails">
        <h1 className="LoginHeading">GameSync Pro</h1>
        <div>
          <Form name="nest-messages" onFinish={onFinish}>
            <label htmlFor="" className="LoginLabel">
              Email:
            </label>
            <Input
              type="email"
              className="LoginInput"
              id="email"
              name="email"
              rules={[
                {
                  required: true,
                },                
              ]}
              onChange={(e) => setEmail(e.target.value)}

            />
            <label htmlFor="" className="LoginLabel">
              Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className="LoginInput"
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={togglePasswordVisibility}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <a href="/" className="LoginLink">
              Forgot Password?
            </a>
            <Button type="primary" className="LoginButton" htmlType="submit">
              SIGN IN
            </Button>
          </Form>
          <p className="copyright">
            Copyright &copy;2024 Design by DevOps DreamViewers
          </p>
        </div>
      </div>
      <div className="LoginImage">
        <img
          src="/log.jpg"
          alt="LoginImage"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  );
};

export default Login;
