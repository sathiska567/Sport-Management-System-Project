import React, { useState } from "react";
import "./SignUp.css";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };


  // handle registration
const onFinish = async()=>{
  console.log(name,email,password);
  
  try {

    const response = await axios.post('http://localhost:8080/api/v1/user/register', {username:name,email:email,password:password}  );
    console.log(response);

    if(response.data.success){
        message.success("Registration is successfull")
        navigate("/")
    }
    else{
      message.success(response.data.message)
    }
    
  } catch (error) {
    message.error(error)
  }
}


  return (
    <div className="SignUpPage">
      <div className="SignUpDetails">
        <h1 className="SignUpHeading">GameSync Pro</h1>
        <div>
          <Form name="nest-messages" onFinish={onFinish} >
            <label htmlFor="" className="SignUpLabel">
              User Name:
            </label>
            <Input
              type="text"
              className="SignUpInput"
              id="name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="SignUpLabel">
              Email:
            </label>
            <Input
              type="email"
              className="SignUpInput"
              id="email"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="" className="SignUpLabel">
              Create a Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className="SignUpInput"
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={togglePasswordVisibility}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="" className="SignUpLabel">
              Confirm Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className="SignUpInput"
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={togglePasswordVisibility}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ whiteSpace: "nowrap" }}>
              <span>Have account already? </span>
              <a href="/" className="SignUpLink">
                Sign In
              </a>
            </div>
            <Button type="primary" className="SignUpButton" htmlType="submit">
              CREATE AN ACCOUNT
            </Button>
          </Form>
          <p className="copyright">
            Copyright &copy;2024 Design by DevOps DreamViewers
          </p>
        </div>
      </div>
      <div className="SignUpImage">
        <img
          src="/log.jpg"
          alt="SignUpImage"
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

export default SignUp;
