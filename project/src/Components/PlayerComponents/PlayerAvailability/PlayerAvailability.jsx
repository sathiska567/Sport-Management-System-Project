import React, { useState } from "react";
import "./PlayerAvailability.css"
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Checkbox, Input, Table, message, DatePicker } from "antd";

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    eventLocation: "Galle",
    eventName: "Event 1",
    eventDate: "2022-01-01",
    Actions: "Action 1",
  },
  {
    key: "2",
    eventLocation: "Galle",
    eventName: "Event 2",
    eventDate: "2022-02-01",
    Actions: "Action 2",
  },
  {
    key: "3",
    eventLocation: "Galle",
    eventName: "Event 3",
    eventDate: "2022-03-01",
    Actions: "Action 3",
  },
];

const PlayerAvailability = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  // Filter userApplicationData based on userRole and Userlocation
  const filteredData = dataSource.filter((data) => {
    return (
      (!eventLocation ||
        data.eventLocation
          .toLowerCase()
          .includes(eventLocation.toLowerCase())) &&
      (!userLocation ||
        data.eventDate.toLowerCase().includes(userLocation.toLowerCase()))
    );
  });

  const handleCheckboxChange = (key, isChecked) => {
    // Update your state or data here based on the checkbox state
    console.log(
      `Checkbox for row with key ${key} is now ${
        isChecked ? "checked" : "unchecked"
      }`
    );
  };

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
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Event Location..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={(value) => setEventLocation(value)}
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={(date, dateString) => setUserLocation(dateString)}
              />
            </div>
            <Table
              columns={[
                {
                  title: "Event Name",
                  dataIndex: "eventName",
                  width: "20%",
                  align: "center",
                },
                {
                  title: "Event Location",
                  dataIndex: "eventLocation",
                  width: "20%",
                  align: "center",
                },
                {
                  title: "Event Date",
                  dataIndex: "eventDate",
                  width: "20%",
                  align: "center",
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "40%",
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
                      <Checkbox
                        onChange={(e) =>
                          handleCheckboxChange(record.key, e.target.checked)
                        }
                      />
                    </span>
                  ),
                },
              ]}
              dataSource={filteredData}
            />
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

export default PlayerAvailability;
