import "./CreateNewPassword.css";
import { Button, Form, Input } from "antd";

const ForgetPassword = () => {
  // State to manage password visibility

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
            <Button type="primary" className="ResetButton" htmlType="submit">
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
