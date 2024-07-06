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
        setCreateEvent(response.data.data); // Update the state with the fetched data
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
      showHeader={true} // Change this to true to show the header
    />
  );
};

export default UpcomingEvents;
