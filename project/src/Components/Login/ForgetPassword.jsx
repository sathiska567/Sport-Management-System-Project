import { useLocation, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
// import SpinComponent from "../Spin/SpinComponent";

const ForgetPassword = () => {
  // State to manage password visibility
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const location = useLocation([]);

  // Custom validation
  const [emailError, setEmailError] = useState(null);
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

    return true;
  };

  const handleNavigate = async () => {
    // <SpinComponent />
    setEmailError(null);
    setError("");
    if (!validateFields()) {
      return;
    }

    try {
      // console.log(email);
      const response = await axios.post(
        "http://localhost:8080/api/v1/forgotten/forgot-password",
        { email: email }
      );
      // console.log(response.data.user.email);
      if (response.data.success) {
        const currentUserEmail = response.data.user.email;

        message.success({
          content: response.data.message,
          className: "custom-message-success",
        });
        navigate("/otp-reset-pass", { state: { email: currentUserEmail } });
      } else {
        message.error({
          content: response.data.message,
          className: "custom-message",
        });
        setEmailError(true);
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error({ content: error.message, className: "custom-message" });
    }
  };

  return (
    <div className="ForgetPasswordPage">
      <div className="ForgetPasswordDetails">
        <h1 className="ForgetPasswordHeading">GameSync Pro</h1>
        <h3 className="ForgetPasswordSubTitle">Forget your password?</h3>
        <p className="ForgetPasswordText">
          Enter your email and we’ll help you reset your password.
        </p>
        <div>
          <Form style={{ height: 200 }} name="nest-messages">
            <label htmlFor="" className="LoginLabel">
              Email:
            </label>
            <Input
              type="text"
              className={`ForgetPasswordInput ${
                emailError == null ? "" : emailError ? "error" : "success"
              }`}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span style={{ color: "red" }}>{error}</span>}
            <Button
              type="primary"
              className="ResetButton"
              htmlType="submit"
              onClick={handleNavigate}
            >
              RESET PASSWORD
            </Button>
          </Form>
          <a href="/" className="ForgetPasswordLink">
            Sign In
          </a>
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
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
