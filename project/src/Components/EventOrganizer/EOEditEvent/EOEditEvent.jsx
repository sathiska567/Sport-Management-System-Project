// Importing necessary libraries and components
import "./EOEditEvent.css";
import React, { useState, useEffect } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import { UserAddOutlined, EditOutlined } from "@ant-design/icons";

import { Layout, Button, Input, Table, message, DatePicker } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const EOEditEvent = () => {
  // Get data from back end

const initialDataSource = [
  {
    key: "1",
    eid: "E001",
    eventName: "Event 1",
    eventDate: "2022-01-01",
    location: "New York",
    actions: "N/A",
  },
  {
    key: "2",
    eid: "E002",
    eventName: "Event 2",
    eventDate: "2022-02-01",
    location: "Los Angeles",
    actions: "N/A",
  },
  {
    key: "3",
    eid: "E003",
    eventName: "Event 3",
    eventDate: "2022-03-01",
    location: "Chicago",
    actions: "N/A",
  },
  // Add more data as needed
];

  const [eventName, setEventName] = useState();
  const [EventLocation, setEventLocation] = useState();
  const [EventDate, setEventDate] = useState();
  const [dataSource, setDataSource] = useState(initialDataSource);
  const navigate = useNavigate();

useEffect(() => {
  setDataSource(
    initialDataSource.filter(
      (data) =>
        data.eventName.toLowerCase().includes(eventName?.toLowerCase() || "") &&
        data.location
          .toLowerCase()
          .includes(EventLocation?.toLowerCase() || "") &&
        (EventDate
          ? new Date(data.eventDate).toDateString() ===
            new Date(EventDate).toDateString()
          : true)
    )
  );
}, [eventName, EventLocation, EventDate]);

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
                placeholder="Search Event Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setEventName(value)}
                onChange={(e) => setEventName(e.target.value)}
              />
              <Input.Search
                placeholder="Search Event Location..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setEventLocation(value)}
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <DatePicker
                style={{ marginBottom: "8px", width: "100%", height: "32px" }}
                onChange={(date, dateString) => setEventDate(dateString)}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "E_ID",
                    dataIndex: "eid",
                    key: "eid",
                  },

                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                  },

                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
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
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          href="/eo-edit-event-form"
                          style={{
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "80px",
                          }}
                        >
                          View
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#f5222d",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "80px",
                          }}
                        >
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
export default EOEditEvent;
