import React, { useState } from "react";
import "./SignUp.css";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {useNavigate } from "react-router-dom";

const SignUp = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div className="SignUpPage">
      <div className="SignUpDetails">
        <h1 className="SignUpHeading">GameSync Pro</h1>
        <div>
          <Form name="nest-messages">
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
