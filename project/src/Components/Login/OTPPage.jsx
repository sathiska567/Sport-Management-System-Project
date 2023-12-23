import "./OTPPage.css";
import { Button, Form } from "antd";
import React, { useState } from "react";
import Email from "../icons/Email.jsx"

const OTPPage = () => {

  // Restrict input only numbers
  const [otp, setOtp] = useState("");

  const handleKeyPress = (event) => {
    const key = event.key;
    const isDigit = /[0-9]/.test(key);

    if (!isDigit) {
      event.preventDefault();
    } else {
      setOtp(otp + key);
    }
  };

  return (
    <div className="OTPPage">
      <div className="OTPDetails">
        <h1 className="OTPHeading">GameSync Pro</h1>
        <Email className = "emailIcon" />
        <p className="OTPText">Enter the code we sent to your email address</p>
        <div>
          <Form name="nest-messages">
            <label htmlFor="" className="LoginLabel">
              Code
            </label>
            <input
              type="text"
              className="OTPInput"
              id="otp"
              name="otp"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="primary" className="Next" htmlType="submit">
              NEXT
            </Button>
          </Form>
          <a href="/" className="otpResendLink">
            Didn't get the code?
          </a>
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

export default OTPPage;
