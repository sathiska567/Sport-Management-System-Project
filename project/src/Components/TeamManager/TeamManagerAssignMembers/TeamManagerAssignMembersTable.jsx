// Importing necessary libraries and components
import "./TeamManagerAssignMembersTable.css";
import React, { useState, useEffect } from "react";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import {
  UserAddOutlined
} from "@ant-design/icons";

import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;


// Navbar component
const TeamManagerCreateTeamTable = () => {


  // Get data from back end
  // Start
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);


const sampleData = [
  {
    key: "1",
    eventName: "Event 1",
    teamName: "Team A",
    eventDate: "2022-01-01",
  },
  {
    key: "2",
    eventName: "Event 2",
    teamName: "Team B",
    eventDate: "2022-02-01",
  },
  {
    key: "3",
    eventName: "Event 3",
    teamName: "Team C",
    eventDate: "2022-03-01",
  },
];

  // Filter userApplicationData based on userRole and Userlocation
  const filteredData = userApplicationData.filter((data) => {
    return (
      data.UserRole &&
      data.UserRole.toLowerCase().includes(userRole) &&
      data.Distric &&
      data.Distric.toLowerCase().includes(Userlocation)
    );
  });

  // End

  // JSX structure for the Navbar component
  return (
    <TeamManagerSideBar>
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
                placeholder="Search Event Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setUserRole(value)}
                onChange={(e) => setUserRole(e.target.value)}
              />
              <Input.Search
                placeholder="Search Team Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setUserLocation(value)}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                  },

                  {
                    title: "Team Name",
                    dataIndex: "teamName",
                    key: "teamName",
                  },

                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                  },
                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    render: (text, record) => (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <Button
                          type="ghost"
                          ghost
                          href="/TeamManager-assign-member-coach"
                          style={{
                            backgroundColor: "#597ef7",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Assign Coaches
                        </Button>
                        <Button
                          type="ghost"
                          ghost
                          href="/TeamManager-assign-member-player"
                          style={{
                            backgroundColor: "#9254de",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Assign Players
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
                dataSource={sampleData}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
};

// Exporting the Navbar component
export default TeamManagerCreateTeamTable;
