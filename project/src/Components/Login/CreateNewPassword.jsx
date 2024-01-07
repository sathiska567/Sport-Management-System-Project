import { useState } from "react";
import "./CreateNewPassword.css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  // State to manage password visibility
  const [newPassword,setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const changePassword = async()=>{
      try {
        const email = location.state.email;
        const response = await axios.post("http://localhost:8080/api/v1/forgotten/reset-password",{ email:email , password :newPassword })
        console.log(response);

        message.success(response.data.message)
        navigate("/")

      } catch (error) {
          message.error("Create New Password Occure error")
      }
  }

  return (
    <div className="CreatePasswordPage">
      <div className="CreatePasswordDetails">
        <h1 className="CreatePasswordHeading">GameSync Pro</h1>
        <p className="CreatePasswordText">Enter new password</p>
        <div>
          <Form name="nest-messages">
            <label htmlFor="" className="LoginLabel">
              New Password:
            </label>
            <Input
              type="password"
              className="CreatePasswordInput"
              id="password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={(e)=>setNewPassword(e.target.value)}
            />
            <label htmlFor="" className="LoginLabel">
              Confirm Password:
            </label>
            <Input
              type="password"
              className="CreatePasswordInput"
              id="password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <Button type="primary" className="ResetButton" htmlType="submit" onClick={changePassword}>
              RESET PASSWORD
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

export default ForgetPassword;
