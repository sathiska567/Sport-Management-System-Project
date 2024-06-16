import React, { useState } from "react";
import "./Login.css";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  // Custom validation
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState("");

  const validateFields = () => {
    if (!email) {
      message.error({
        content: "Please enter your email",
        className: "custom-message",
      });
      setEmailError(true);
      setError("Please enter your email");
      return false;
    } else {
      setEmailError(false);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.error({
        content: "Please enter a valid email address",
        className: "custom-message",
      });
      setEmailError(true);
      setError("Please enter a valid email address");
      return false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      message.error({
        content: "Please enter your password",
        className: "custom-message",
      });
      setPasswordError(true);
      setError("Please enter your password");
      return false;
    } else {
      setPasswordError(false);
    }

    /*  if (password.length < 6) {
      message.error({ content: 'Password must be at least 6 characters long', className: 'custom-message' });
      return false;
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
    if (!passwordPattern.test(password)) {
      message.error({ content: 'Password must contain at least one uppercase letter and one number', className: 'custom-message' });
      return false;
    }  */
    return true;
  };

  // Handle login user
  const onFinish = async () => {
    setEmailError(null);
    setPasswordError(null);
    setError("");
    if (!validateFields()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login", {
        email,
        password,
      });

      console.log("Login successful");
      console.log(res.data);

      localStorage.setItem("email", email);
      localStorage.setItem("token", res.data.token);

      // Check backend validation
      if (res.data.success) {
        // Redirect to the admin dashboard or another page after successful login
        navigate("/dashboad");
        message.success({
          content: "Login successful",
          className: "custom-message-success",
        });
      } else {
        message.error({
          content: res.data.message,
          className: "custom-message",
        });
        setEmailError(true);
        setPasswordError(true);
        setError(res.data.message);
      }
    } catch (error) {
      // Handle login error (display error message, etc.)
      console.log("Login error");

      // setError(error.response?.data?.message);
      message.error({
        content: "Error occured while login ",
        className: "custom-message",
      });
      setError(error);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginDetails">
        <h1 className="LoginHeading">GameSync Pro</h1>
        <div style={{ height: "65%" }}>
          <Form name="loginForm" onFinish={onFinish}>
            <label htmlFor="email" className="LoginLabel">
              Email:
            </label>
            <Input
              type="text"
              className={`LoginInput ${
                emailError == null ? "" : emailError ? "error" : "success"
              }`}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="password" className="LoginLabel">
              Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className={`LoginInput ${
                passwordError == null ? "" : passwordError ? "error" : "success"
              }`}
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={togglePasswordVisibility}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span style={{ color: "red" }}>{error}</span>}
            <a href="/forgot-password" className="LoginLink">
              Forgot Password?
            </a>
            <p>
              Don't have an account?
              <a href="/register" className="LoginLink">
                Create a new account.
              </a>
            </p>
            <Button type="primary" className="LoginButton" htmlType="submit">
              SIGN IN
            </Button>
          </Form>
          <p className="copyright">
            Copyright ©2024 Design by DevOps DreamViewers
          </p>
        </div>
      </div>
      <div className="LoginImage">
        <img
          src="/log.jpg"
          alt="LoginImage"
          style={{
            width: "100%",
            height: "99.4vh",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  );
};

export default Login;
