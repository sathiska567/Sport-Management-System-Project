import "./ForgetPassword.css";
import { Button, Form, Input } from "antd";


const ForgetPassword = () => {
  // State to manage password visibility

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
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <Button type="primary" className="ResetButton" htmlType="submit">
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
