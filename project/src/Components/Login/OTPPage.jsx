import "./OTPPage.css";
import { Button, Form, message } from "antd";
import React, { useState } from "react";
import Email from "../icons/Email"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPPage = () => {

  const [otp, setOtp] = useState("");
  const location = useLocation([]);
  const navigate = useNavigate();
  console.log(location);

  const [otpError, setOtpError] = useState(null);
  const [error, setError] = useState('')

  const validateFields = () => {
    if (!otp) {
      message.error({ content: 'Please enter your OTP', className: 'custom-message' });
      setOtpError(true); setError('Please enter your OTP')
      return false;
    } else { setOtpError(null) }

    return true;
  };

  const submitOTP = async () => {
    setOtpError(null); setError('')
    if (!validateFields()) {
      return; 
    }

    try {
      console.log(location.state.email);
      const email = location.state.email;

      const response = await axios.post("http://localhost:8080/api/v1/forgotten/verify-otp", { email: email, otp: otp });
      console.log("OTP verifyied response is ", response.data);
      console.log(response.data.success);

      if (response.data.success) {
        message.success({ content: response.data.message, className: 'custom-message-success' })
        navigate("/reset-pass", { state: { email: email } })
      } else {
        message.error({ content: response.data.message, className: 'custom-message' })
        setOtpError(true)
        setError(response.data.message)
      }
    } catch (error) {
      message.error({ content: error.response.data.message, className: 'custom-message' })
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  return (
    <div className="OTPPage">
      <div className="OTPDetails">
        <h1 className="OTPHeading">GameSync Pro</h1>
        <Email  />
        <p className="OTPText">Enter the code we sent to your email address</p>
        <div style={{  height: '50%' }}>
          <span style={{ color: 'red' }}>* {error}</span>
          <Form name="nest-messages" style={{height:50}}>
            <label htmlFor="" className="LoginLabel">
              Code
            </label>
            <input
              type="text"
              className={`OTPInput ${otpError == null ? '' : otpError ? 'error' : 'success'}`}
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
            />
            <Button type="primary" style={{margin:0}} className="Next" htmlType="submit" onClick={submitOTP}>
              NEXT
            </Button>
            <a href="/forgot-password" className="otpResendLink">
            Didn't get the code?
          </a>
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
            height: "99.4vh",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </div>
      
    </div>
  );
};

export default OTPPage;
