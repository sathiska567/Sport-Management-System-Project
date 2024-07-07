import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const UpcomingEvents = () => {
  const [createdEvent, setCreatedEvent] = useState([]);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );
      const events = response.data.data
        .map((event, index) => ({
          key: index + 1,
          nameOfTheEvent: event.nameOfTheEvent,
          eventNewDate: event.eventNewDate,
        }))
        .sort((a, b) => new Date(b.eventNewDate) - new Date(a.eventNewDate)) // Sort by eventNewDate in descending order
        .slice(-10); // Take the last 10 elements (latest 10 events)
      setCreatedEvent(events);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const columns = [
    { title: "Event Name", dataIndex: "nameOfTheEvent", key: "nameOfTheEvent" },
    { title: "Event Date", dataIndex: "eventNewDate", key: "eventNewDate" },
  ];

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Table
      dataSource={createdEvent}
      columns={columns}
      pagination={false}
      showHeader={false} // Show the header
    />
  );
};

export default UpcomingEvents;
