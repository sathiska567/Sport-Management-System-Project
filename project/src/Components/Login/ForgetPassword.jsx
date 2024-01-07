import { useLocation, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
// import SpinComponent from "../Spin/SpinComponent";


const ForgetPassword = () => {
  // State to manage password visibility
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const location = useLocation([]);


  const handleNavigate = async()=>{
    // <SpinComponent />

    try {
      // console.log(email);
      const response = await axios.post("http://localhost:8080/api/v1/forgotten/forgot-password",{email:email})
      // console.log(response.data.user.email);

      const currentUserEmail = response.data.user.email;

      message.success("OTP sent to your email")
      navigate("/otp-reset-pass", { state: { email: currentUserEmail } })

    } catch (error) {
       message.error("This email haven't any registered account.please register !")
    }
    
  }

  return (
    <div className="ForgetPasswordPage">
      <div className="ForgetPasswordDetails">
        <h1 className="ForgetPasswordHeading">GameSync Pro</h1>
        <h3 className="ForgetPasswordSubTitle">Forget your password?</h3>
        <p className="ForgetPasswordText">
          Enter your username and we’ll help you reset your password.
        </p>
        <div>
          <Form name="nest-messages">
            <label htmlFor="" className="LoginLabel">
              Email:
            </label>
            <Input
              type="email"
              className="ForgetPasswordInput"
              id="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <Button type="primary" className="ResetButton" htmlType="submit" onClick={handleNavigate}>
              RESET PASSWORD
            </Button>
          </Form>
          <a href="/" className="ForgetPasswordLink">
            Sign In
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

export default ForgetPassword;
