import { useState } from "react";
import "./CreateNewPassword.css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // State to manage password visibility
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [error, setError] = useState("");

  const validateFields = () => {
    if (!newPassword) {
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

    if (confirmPassword !== newPassword) {
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

  const changePassword = async () => {
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError("");
    if (!validateFields()) {
      return;
    }

    try {
      const email = location.state.email;
      const response = await axios.post(
        "http://localhost:8080/api/v1/forgotten/reset-password",
        { email: email, password: newPassword }
      );
      console.log(response);
      if (response.data.success) {
        message.success({
          content: response.data.message,
          className: "custom-message-success",
        });
        navigate("/");
      } else {
        message.error({
          content: response.data.message,
          className: "custom-message",
        });
        setError(response.data.message);
      }
    } catch (error) {
      message.error({ content: error.message, className: "custom-message" });
      setError(error.message);
    }
  };

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
              className={`CreatePasswordInput ${
                passwordError == null ? "" : passwordError ? "error" : "success"
              }`}
              id="password"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordError && <span style={{ color: "red" }}>{error}</span>}
            <label htmlFor="" className="LoginLabel">
              Confirm Password:
            </label>
            <Input
              type="password"
              className={`CreatePasswordInput ${
                confirmPasswordError == null
                  ? ""
                  : confirmPasswordError
                  ? "error"
                  : "success"
              }`}
              id="password"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <span style={{ color: "red" }}>{error}</span>
            )}
            <Button
              type="primary"
              className="ResetButton"
              htmlType="submit"
              onClick={changePassword}
            >
              RESET PASSWORD
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
