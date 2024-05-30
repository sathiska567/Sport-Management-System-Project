import React, { useEffect, useState } from "react";
import "./CoachToEOCommunication.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";

import { Layout, Button, Input, Table, message, DatePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;


const CoachToEOCommunication = () => {
  const initialDataSource = [
    {
      key: "1",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "2",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "3",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "4",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "5",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "6",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "7",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },
    {
      key: "8",
      eoName: "Event Organizer 1",
      location: "New York",
      actions: "N/A",
    },

    // Add more data as needed
  ];

  const [eventName, setEventName] = useState();
  const [EventLocation, setEventLocation] = useState();
  const [EventDate, setEventDate] = useState();
  const [dataSource, setDataSource] = useState(initialDataSource);
  const navigate = useNavigate();
  const [createdEvent, setCreatedEvent] = useState([]);

  // GET ALL CREATED DATA || GET
  //   const getAllCreatedEventData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/event/get-all-events"
  //       );
  //       console.log(response);

  //       if (response.data.success) {
  //         message.success(response.data.message);
  //         setCreatedEvent(response.data.data);
  //       }
  //     } catch (error) {
  //       message.error(error.message);
  //     }
  //   };
  //   useEffect(() => {
  //     getAllCreatedEventData();
  //   }, []);

  // filter data
  // console the value to search name of the event
  const handleEventNameSearch = (value) => {
    console.log("Event Name Searched: ", value);
  };

  // console the value to search location of the event
  const handleEventLocationSearch = (value) => {
    console.log("Event Location Searched: ", value);
  };

  // console the value to search date of the event
  const handleDateChange = (date, dateString) => {
    console.log("Event Date Selected: ", dateString);
  };
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
            {/* Search section */}
            <div className="search">
              <Input.Search
                placeholder="Search Event Organizer Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={handleEventNameSearch}
                allowClear
              />
              <Input.Search
                placeholder="Search Location..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={handleEventLocationSearch}
                allowClear
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                columns={[
                  {
                    title: "Event Organizer Name",
                    dataIndex: "eoName",
                    key: "eoName",
                    render: (text, record) => <span>{record.eoName}</span>,
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
                          onClick={() => {
                            navigate("/coach-to-eo-communication-form");
                          }}
                          style={{
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "auto",
                          }}
                        >
                          Message
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={false}
                // Displaying data from the backend
                dataSource={initialDataSource}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

export default CoachToEOCommunication;
