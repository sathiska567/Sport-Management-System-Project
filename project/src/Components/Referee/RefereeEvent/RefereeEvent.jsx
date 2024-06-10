import React, { useEffect, useState } from "react";
import "./RefereeEvent.css";
import RefereeSideBar from "../RefereeSideBar/RefereeSideBar";
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

const RefereeEvent = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [refEvents, setRefEvents] = useState([]);

  // Filter userApplicationData based on userRole and Userlocation
  const handleEventLocationSearch = (value) => {
    console.log("Event Location Searched: ", value);
  };

  const handleDateChange = (date, dateString) => {
    console.log("Date Selected: ", dateString);
  };
  const handleCheckboxChange = (key, isChecked) => {
    // Update your state or data here based on the checkbox state
    console.log(
      `Checkbox for row with key ${key} is now ${
        isChecked ? "checked" : "unchecked"
      }`
    );

    if (isChecked) {
      addRefereeAvailability("test_ref_id", key);

      // Add the event to the selected events
      setSelectedEvents([...selectedEvents, key]);
    } else {
      // Remove the event from the selected events
      const updatedSelectedEvents = selectedEvents.filter(
        (event) => event !== key
      );
      setSelectedEvents(updatedSelectedEvents);

      // Remove the event from the referee availability
      const refEventId = refEvents.find((event) => event.event_id === key)?._id;
      removeRefereeAvailability(refEventId);
    }
  };

  const fetchData = async () => {
    let data = await fetch("http://localhost:8080/api/v1/event/get-all-events");
    data = await data.json();
    console.log(data.data);

    if (data.success) {
      setEvents(data.data);
    }
  };

  const fetchSelectedEvents = async () => {
    let data = await fetch(
      "http://localhost:8080/api/v1/referee/get-all-referee-events"
    );
    data = await data.json();
    console.log(data.data);

    if (data.success) {
      setRefEvents(data.data);
      const sEvents = data.data.map((event) => event.eventId);
      setSelectedEvents(sEvents);
    }
  };

  const addRefereeAvailability = async (ref_id, event_id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/referee/create-referee-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref_id,
            event_id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        message.success("Event added to referee availability successfully");
      } else {
        message.error("Error while adding event to referee availability");
      }
    } catch (error) {
      console.error("Error adding event to referee availability:", error);
      message.error(
        "An error occurred while adding event to referee availability"
      );
    }
  };

  const removeRefereeAvailability = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/referee/delete-referee-event/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        message.success("Event removed from referee availability successfully");
      } else {
        message.error("Error while removing event from referee availability");
      }
    } catch (error) {
      console.error("Error removing event from referee availability:", error);
      message.error(
        "An error occurred while removing event from referee availability"
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchSelectedEvents();
  }, []);

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
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Event Location..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={handleEventLocationSearch}
                // onChange={(e) => handleEventLocationSearch(e.target.value)}
                allowClear
              />
              <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={handleDateChange}
              />
            </div>
            <Table
              columns={[
                {
                  title: "Event Name",
                  dataIndex: "nameOfTheEvent",
                  width: "20%",
                  align: "center",
                },
                {
                  title: "Event Location",
                  dataIndex: "location",
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
                  title: "Number of Teams",
                  dataIndex: "numberOfTeams",
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
                          handleCheckboxChange(record._id, e.target.checked)
                        }
                        checked={selectedEvents.includes(record._id)}
                      />
                    </span>
                  ),
                },
              ]}
              dataSource={events}
            />
          </Content>
        </Layout>
      </Layout>
    </RefereeSideBar>
  );
};

export default RefereeEvent;