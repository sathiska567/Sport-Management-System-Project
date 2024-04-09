import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import "./CoachCommunicationMessage.css";
import { UserAddOutlined, CloseSquareOutlined } from "@ant-design/icons";

// For Text Area
const { TextArea } = Input;

const CoachCommunicationMessage = () => {
const form = Form.useForm()[0];

const onFinish = (values) => {
  
};

  // Coach Email Validation

  return (
    <CoachSidebar>
      <div className="UserApplicationForm">
        <div
          className="UserApplicationFormHeader"
          style={{
            backgroundColor: "#15295E",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h3
            style={{
              color: "white",
            }}
          >
            New Message
          </h3>
          <a href="/CoachCommunicationTable">
            <CloseSquareOutlined style={{ color: "white", fontSize: "20px" }} />
          </a>
        </div>

        <div className="UserApplicationFormApplication">
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{
              Maxheight: "520px",
              marginBottom: "50px",
              paddingRight: "20px",
              paddingLeft: "50px",
            }}
          >
            <div className="FormBody">
              <div>
                <Form.Item
                  name="to"
                  label="To:"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input sender's E-mail!",
                    },
                  ]}
                  style={{ minHeight: "25px" }}
                >
                  <Input />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="from"
                  label="From:"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input receiver's E-mail!",
                    },
                  ]}
                  style={{ minHeight: "25px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="subject"
                  label="Subject:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Subject!",
                    },
                  ]}
                  style={{ minHeight: "25px" }}
                >
                  <Input />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="message"
                  label="Message:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Message!",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "150px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#15295E",
                    color: "white",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </CoachSidebar>
  );
};

export default CoachCommunicationMessage;
