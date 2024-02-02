// Importing necessary libraries and components
import "./EOAssignStaff.css";
import React, { useState, useEffect } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const EOAssignStaff = () => {
  // Get data from back end

  const initialDataSource = [
    {
      key: "1",
      sid: "S001",
      name: "John Doe",
      Experience: "5 years",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "2",
      sid: "S002",
      name: "Jane Doe",
      Experience: "3 years",
      location: "Los Angeles",
      actions: "N/A",
    },
    {
      key: "3",
      sid: "S003",
      name: "Bob Smith",
      Experience: "2 years",
      location: "Chicago",
      actions: "N/A",
    },
    // Add more data as needed
  ];

  const [userName, setuserName] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [dataSource, setDataSource] = useState(initialDataSource);
  const navigate = useNavigate();

  useEffect(() => {
    setDataSource(
      initialDataSource.filter(
        (data) =>
          data.name.toLowerCase().includes(userName.toLowerCase()) &&
          data.location.toLowerCase().includes(userLocation.toLowerCase())
      )
    );
  }, [userName, userLocation]);

  // JSX structure for the Navbar component
  return (
    <SideBar>
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
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search User Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setuserName(value)}
                onChange={(e) => setuserName(e.target.value)}
              />
              <Input.Search
                placeholder="Search Location..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setuserLocation(value)}
                onChange={(e) => setuserLocation(e.target.value)}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "S_ID",
                    dataIndex: "sid",
                    key: "sid",
                  },

                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                  },

                  {
                    title: "Experience",
                    dataIndex: "Experience",
                    key: "Experience",
                  },

                  {
                    title: "Location",
                    dataIndex: "location",
                    key: "location",
                  },

                  {
                    title: "Actions",
                    dataIndex: "actions",
                    key: "actions",
                    render: (text, record) => (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#05AD1B",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          <UserOutlined />
                          Assign
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#D94D34",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          <EditOutlined />
                          Delete
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the backend
                dataSource={dataSource}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default EOAssignStaff;