// Importing necessary libraries and components
import React, { useState } from "react";
import "./RefereeMatches.css";
import RefereeSideBar from "../RefereeSideBar/RefereeSideBar";
import { Layout, Button, Input, Table, DatePicker } from "antd";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const RefereeMatches = () => {
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [teamNameFilter, setTeamNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const sampleData = [
    {
      key: "1",
      eid: "E123",
      eventName: "Event 1",
      district: "District 1",
      eventDate: "2022-01-01",
      teamName: "Team A",
    },
    {
      key: "2",
      eid: "E456",
      eventName: "Event 2",
      district: "District 2",
      eventDate: "2022-02-01",
      teamName: "Team B",
    },
    {
      key: "3",
      eid: "E789",
      eventName: "Event 3",
      district: "District 3",
      eventDate: "2022-03-01",
      teamName: "Team C",
    },
  ];

  // Filter sampleData based on userRole and Userlocation
  // Filter sampleData based on eventName, district, teamName, and eventDate
  // Filter sampleData based on eventName, district, teamName, and eventDate
const handleEventNameSearch = (value) => {
  console.log("Event Name Searched: ", value);
};

const handleDistrictSearch = (value) => {
  console.log("District Searched: ", value);
};

const handleDateChange = (date, dateString) => {
  console.log("Date Selected: ", dateString);
};

const handleTeamNameSearch = (value) => {
  console.log("Team Name Searched: ", value);
};
  // JSX structure for the Navbar component
  return (
    <RefereeSideBar>
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
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >
                <Input.Search
                  placeholder="Search Event Name..."
                  style={{ flex: 1 }}
                  onSearch={handleEventNameSearch}
                  // onChange={(e) => handleEventNameSearch(e.target.value)}
                  allowClear
                />
                <Input.Search
                  placeholder="Search District..."
                  style={{ flex: 1 }}
                  onSearch={handleDistrictSearch}
                  // onChange={(e) => handleDistrictSearch(e.target.value)}
                  allowClear
                />
              </div>
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%" }}
              >
                <DatePicker
                  className="searchInputDate"
                  style={{ flex: 1 }}
                  onChange={handleDateChange}
                />
                <Input.Search
                  placeholder="Search Team Name..."
                  style={{ flex: 1 }}
                  onSearch={handleTeamNameSearch}
                  // onChange={(e) => handleTeamNameSearch(e.target.value)}
                  allowClear
                />
              </div>
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "Event_ID",
                    dataIndex: "eid",
                  },
                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                  },
                  {
                    title: "District",
                    dataIndex: "district",
                    key: "district",
                  },
                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                  },
                  {
                    title: "Team Name",
                    dataIndex: "teamName",
                    key: "teamName",
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
                dataSource={sampleData} // Use filteredData instead of sampleData
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </RefereeSideBar>
  );
};

// Exporting the Navbar component
export default RefereeMatches;
