// Importing necessary libraries and components
import React, { useState } from "react";
import "./PlayerMatches.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Button, Input, Table } from "antd";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const PlayerMatches = () => {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");

  const sampleData = [
    {
      key: "1",
      pid: "123",
      playerName: "John Doe",
      district: "New York",
      experience: "5 years",
    },
    {
      key: "2",
      pid: "456",
      playerName: "Jane Smith",
      district: "Los Angeles",
      experience: "3 years",
    },
    {
      key: "3",
      pid: "789",
      playerName: "Bob Johnson",
      district: "Chicago",
      experience: "10 years",
    },
  ];

  // Filter sampleData based on userRole and Userlocation
const filteredData = sampleData.filter((data) => {
  return (
    data.playerName &&
    data.playerName.toLowerCase().startsWith(userRole.toLowerCase()) &&
    data.district &&
    data.district.toLowerCase().startsWith(Userlocation.toLowerCase())
  );
});

  // JSX structure for the Navbar component
  return (
    <PlayerSideBar>
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
                placeholder="Search Player Name..."
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
                    title: "PID",
                    dataIndex: "pid",
                  },
                  {
                    title: "Player Name",
                    dataIndex: "playerName",
                    key: "playerName",
                  },
                  {
                    title: "District",
                    dataIndex: "district",
                    key: "district",
                  },
                  {
                    title: "Experience",
                    dataIndex: "experience",
                    key: "experience",
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
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          style={{
                            width: "80px",
                            textAlign: "center",
                            alignItems: "center",
                            backgroundColor: "#05AD1B",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          View
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
                // Displaying data from the frontend
                dataSource={filteredData} // Use filteredData instead of sampleData
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

// Exporting the Navbar component
export default PlayerMatches;