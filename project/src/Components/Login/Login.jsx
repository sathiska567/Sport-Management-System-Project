import React, { useState } from "react";
import "./Login.css";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Login = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="LoginPage">
      <div className="LoginDetails">
        <h1 className="LoginHeading">GameSync Pro</h1>
        <div>
          <Form name="nest-messages">
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
