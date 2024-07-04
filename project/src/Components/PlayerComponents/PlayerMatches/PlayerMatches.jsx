import React, { useState, useEffect } from "react";
import "./PlayerMatches.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Button, Input, Table, DatePicker } from "antd";
import axios from "axios";

const { Content } = Layout;

const PlayerMatches = () => {
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [teamNameFilter, setTeamNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events");
      setData(response.data.data); // Assuming response.data.data is an array of event objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  // Filter data based on user input
  const filteredData = data.filter((item) => {
    return (
      (!eventNameFilter ||
        item.eventName.toLowerCase().startsWith(eventNameFilter.toLowerCase())) &&
      (!districtFilter ||
        item.district.toLowerCase().startsWith(districtFilter.toLowerCase())) &&
      (!teamNameFilter ||
        item.teamName.toLowerCase().startsWith(teamNameFilter.toLowerCase())) &&
      (!dateFilter ||
        new Date(item.eventDate).getTime() === new Date(dateFilter).getTime())
    );
  });

  return (
    <PlayerSideBar>
      <Layout className="ant-layout-sider-children">
        <Layout>
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
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >
                <Input.Search
                  placeholder="Search Event Name..."
                  style={{ flex: 1 }}
                  onSearch={(value) => setEventNameFilter(value)}
                  onChange={(e) => setEventNameFilter(e.target.value)}
                />
                <Input.Search
                  placeholder="Search District..."
                  style={{ flex: 1 }}
                  onSearch={(value) => setDistrictFilter(value)}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                />
              </div>
              <div className="searchSub" style={{ display: "flex", width: "100%" }}>
                <DatePicker
                  className="searchInputDate"
                  style={{ flex: 1 }}
                  onChange={(date, dateString) => setDateFilter(dateString)}
                />
                <Input.Search
                  placeholder="Search Team Name..."
                  style={{ flex: 1 }}
                  onSearch={(value) => setTeamNameFilter(value)}
                  onChange={(e) => setTeamNameFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  { title: "Event_ID", dataIndex: "eid" },
                  { title: "Event Name", dataIndex: "eventName", key: "eventName" },
                  { title: "District", dataIndex: "district", key: "district" },
                  { title: "Event Date", dataIndex: "eventDate", key: "eventDate" },
                  { title: "Team Name", dataIndex: "teamName", key: "teamName" },
                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    render: (text, record) => (
                      <span style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", alignItems: "center" }}>
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
                pagination={{ style: { marginTop: "10px" }, pageSize: 5 }}
                dataSource={filteredData} // Render filtered data
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

export default PlayerMatches;
