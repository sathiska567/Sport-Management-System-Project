import React, { useState } from "react";
import "./SignUp.css";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  // State to manage password visibility
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  // Custom validation
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [error, setError] = useState("");

  const validateFields = () => {
    if (!name) {
      message.error({
        content: "Please enter your username",
        className: "custom-message",
      });
      setNameError(true);
      setError("Please enter your username");
      return false;
    } else {
      setNameError(false);
    }

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

    if (!confirmPassword) {
      message.error({
        content: "Please re-confirm your password",
        className: "custom-message",
      });
      setConfirmPasswordError(true);
      setError("Please re-confirm your password");
      return false;
    } else {
      setConfirmPasswordError(false);
    }

    if (confirmPassword !== password) {
      message.error({
        content: "Passwords do not match",
        className: "custom-message",
      });
      setConfirmPasswordError(true);
      setPasswordError(true);
      setError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError(false);
    }

    return true;
  };

  // handle registration
  const onFinish = async () => {
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setNameError(null);
    setError("");
    if (!validateFields()) {
      return;
    }

    console.log(name, email, password);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        { username: name, email: email, password: password }
      );
      console.log(response);

      if (response.data.success) {
        message.success({
          content: "Registration is successful",
          className: "custom-message-success",
        });
        navigate("/");
      } else {
        message.success({
          content: response.data.message,
          className: "custom-message",
        });
        setError(response.data.message);
      }
    } catch (error) {
      message.error(error);
      setError(error);
    }
  };

  return (
    <div className="SignUpPage">
      <div className="SignUpDetails">
        <h1 className="SignUpHeading">GameSync Pro</h1>
        <div style={{ height: "65%" }}>
          <Form name="nest-messages" onFinish={onFinish}>
            <label htmlFor="" className="SignUpLabel">
              User Name:
            </label>
            <Input
              type="text"
              className={`SignUpInput ${
                nameError == null ? "" : nameError ? "error" : "success"
              }`}
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="" className="SignUpLabel">
              Email:
            </label>
            <Input
              type="text"
              className={`SignUpInput ${
                emailError == null ? "" : emailError ? "error" : "success"
              }`}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="" className="SignUpLabel">
              Create a Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className={`SignUpInput ${
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
            <label htmlFor="" className="SignUpLabel">
              Confirm Password:
            </label>
            <Input.Password
              type={visible ? "text" : "password"}
              className={`SignUpInput ${
                confirmPasswordError == null
                  ? ""
                  : confirmPasswordError
                  ? "error"
                  : "success"
              }`}
              id="password"
              name="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={togglePasswordVisibility}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <span style={{ color: "red" }}>{error}</span>
            )}
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
            Copyright ©2024 Design by DevOps DreamViewers
          </p>
        </div>
      </div>
      <div className="SignUpImage">
        <img
          src="/log.jpg"
          alt="SignUpImage"
          style={{
            width: "100%",
            height: "99.6vh",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
