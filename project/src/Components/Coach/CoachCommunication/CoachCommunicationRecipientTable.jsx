import React, { useEffect, useState } from "react";
import "./CoachCommunicationRecipientTable.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Layout, Button, Input, Table, message, Rate } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const CoachCommunicationRecipientTable = () => {
  
const dataSource = [
  {
    key: "1",
    eoName: "Organizer 1",
    district: "District 1",
    Actions: "Actions 1",
  },
  {
    key: "2",
    eoName: "Organizer 2",
    district: "District 2",
    Actions: "Actions 2",
  },
  {
    key: "3",
    eoName: "Organizer 3",
    district: "District 3",
    Actions: "Actions 3",
  },
  {
    key: "4",
    eoName: "Organizer 4",
    district: "District 4",
    Actions: "Actions 4",
  },
  {
    key: "5",
    eoName: "Organizer 5",
    district: "District 5",
    Actions: "Actions 5",
  },
];
  
  return (
    <CoachSidebar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Coach Name..."
                style={{
                  marginBottom: "8px",
                }}
                allowClear
              />
              <Input.Search
                className="searchInputName"
                placeholder="Search District..."
                style={{
                  marginBottom: "8px",
                }}
                allowClear
              />
            </div>
            <Table
              dataSource={dataSource}
              columns={[
                {
                  title: "Event Organizer Name",
                  dataIndex: "eoName",
                  width: "25%",
                  align: "center",
                  render: (text, record) => <span>{text}</span>,
                },
                {
                  title: "District",
                  dataIndex: "district",
                  width: "15%",
                  align: "center",
                  render: (text, record) => <span>{text}</span>,
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "25%",
                  align: "center",
                  render: (text, record) => (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="ghost"
                        className="Button"
                        href="/CoachCommunicationMessage"
                        // href="/coach-review-form"
                        style={{
                          backgroundColor: "#52c41a",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "120px",
                        }}
                      >
                        Sent Message
                      </Button>
                    </span>
                  ),
                },
              ]}
            />
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

export default CoachCommunicationRecipientTable;
