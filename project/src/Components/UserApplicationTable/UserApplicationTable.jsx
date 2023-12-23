// Importing necessary libraries and components
import "./UserApplicationTable.css";
import React, {useState, useEffect} from "react";
import SideBar from "../DashboardSideBar/SideBar";
import {
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Layout, Button, Input, Table } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const UserApplicationTable = () => {
  // Get data from back end
  // Start
  const [userRole, setUserRole] = useState([]);
  const [location, setLocation] = useState([]);
  const [userApplicationData, setUserApplicationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUserApplicationTableData")
      .then((result) => {
        const userApplicationData = result.data; // Assuming result.data contains the user data
        setUserApplicationData(userApplicationData);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
      });
  }, []);

  // End

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
            minHeight: 280,
            height: "100%",
            background: "#E9F9FF",
          }}
        >
          {/* Search section */}
          <div className="search">
            <Input.Search
              placeholder="Search User Roll..."
              styles={{
                marginBottom: "8",
              }}
              onSearch={(value) => setUserRole(value)}
              onChange={(e) => setUserRole(e.target.value)}
            />
            <Input.Search
              placeholder="Search District..."
              styles={{
                marginBottom: "8",
              }}
              onSearch={(value) => setLocation(value)}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {/* Table section */}
          <div className="tableContainer">
            <Table
              columns={[
                {
                  title: "UID",
                  dataIndex: "UID",
                  key: "UID",
                },
                {
                  title: "User Name",
                  dataIndex: "User Name",
                  key: "User Name",
                },
                // {
                //   title: "Location",
                //   dataIndex: "Location",
                //   key: "Location",
                //   filteredValue: [location],
                //   onFilter: (value, record) => {
                //     return String(record.Location)
                //       .toLowerCase()
                //       .includes(value.toLocaleLowerCase());
                //   },
                // },
                // {
                //   title: "User Role",
                //   dataIndex: "UserRole",
                //   key: "UserRole",
                //   filteredValue: [userRole],
                //   onFilter: (value, record) => {
                //     return String(record.UserRole)
                //       .toLowerCase()
                //       .includes(value.toLocaleLowerCase());
                //   },
                // },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  key: "Actions",
                  render: (text, record) => (
                    <span>
                      <a href="/AdminDashboard/UserValidation/view">
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#05AD1B",
                            color: "#fff",
                            fontSize: "16px",
                            marginRight: "10px",
                          }}
                        >
                          <UserOutlined />
                          View
                        </Button>
                      </a>
                      <a href="/AdminDashboard/UserValidation/view">
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#D94D34",
                            color: "#fff",
                            fontSize: "16px",
                          }}
                        >
                          <DeleteOutlined />
                          Delete
                        </Button>
                      </a>
                    </span>
                  ),
                },
              ]}
              pagination={{
                style: {
                  marginTop: "50px",
                },
                pageSize: 5,
              }}
              
              // Displaying data from the backend
              dataSource={userApplicationData.map((user) => ({
                UID: user.uid,
                Name: `${user.fname} ${user.lname}`,
                Location: user.location,
                UserRole: user.userRole,
              }))}
            ></Table>
          </div>
        </Content>
      </Layout>
    </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default UserApplicationTable;
