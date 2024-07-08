import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios"; // Import axios

const UpcomingEvents = () => {
  const [createEvent, setCreateEvent] = useState([]);

  // GET ALL CREATE EVENT
  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );

      if (response.data.success) {
        console.log(response);
        const events = response.data.data
        setCreateEvent(events); // Update the state with the sorted and sliced data
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllCreateEvent(); // Fetch data on component mount
  }, []);

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event" },
    { dataIndex: "location", key: "location", title: "Location" },
  ];

  return (
    <Table
      dataSource={createEvent}
      columns={columns}
      pagination={false}
      showHeader={false} // Show the header
    />
  );
};

export default UpcomingEvents;
