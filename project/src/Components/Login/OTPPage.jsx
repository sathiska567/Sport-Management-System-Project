import "./OTPPage.css";
import { Button, Form, message } from "antd";
import React, { useState } from "react";
import Email from "../icons/Email.jsx"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPPage = () => {

  // Restrict input only numbers
  const [otp, setOtp] = useState("");
  const location = useLocation([]);
  const navigate = useNavigate();
  console.log(location);

const submitOTP = async()=>{
        try {
          console.log(location.state.email);
          const email = location.state.email;

          const response = await axios.post("http://localhost:8080/api/v1/forgotten/verify-otp", {email:email , otp : otp });
          console.log("OTP verifyied response is " , response.data);
          console.log(response.data.success);

          if(response.data.success){
            message.success("OTP was mached")
            navigate("/reset-pass",{state : {email :email}})
          }

          else{
            message.error("Forgotten Password backend have an erro")
          }

          
        } catch (error) {
          //  message.error("OTP was not mached")
        }
  }


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
            <Button type="primary" className="Next" htmlType="submit" onClick={submitOTP}>
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
