import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const UpcomingEvents = () => {
  const [createdEvent, setCreateEvent] = useState([]);

  // GET ALL CREATE EVENT
  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );

      if (response.data.success) {
        setCreateEvent(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllCreateEvent();
  }, []);

  const columns = [
    { title: "Event Name", dataIndex: "nameOfTheEvent", key: "nameOfTheEvent" },
    { title: "Event Date", dataIndex: "eventNewDate", key: "eventNewDate" },
  ];

  // Show only the 10 latest events
  const latestEvents = createdEvent.slice(-8);

  return (
    <Table
      dataSource={latestEvents}
      columns={columns}
      pagination={false}
      showHeader={false}
    />
  );
};

export default UpcomingEvents;
