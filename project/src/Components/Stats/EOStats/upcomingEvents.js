import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const upcomingEvents = () => {
  // const [createdEvent , setCreatedEvent] = useState([])

  // const getAllEvents = async()=>{
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/v1/event/get-all-events");
  //     setCreatedEvent(response.data.data)
  //   } catch (error) {
  //     message.error("Something went wrong");
  //   }
  // }

  // useEffect(()=>{
  //   getAllEvents()
  // },[])

  const data = [
    { key: "1", role: "Event 1", date: "24/07/4" },
    { key: "2", role: "Event 2", date: "24/07/12" },
    { key: "3", role: "Event 3", date: "24/07/21" },
    { key: "4", role: "Event 4", date: "24/07/25" },
    { key: "5", role: "Event 5", date: "24/07/30" },
  ];

  const columns = [
    { dataIndex: "role", key: "role" },
    { dataIndex: "date", key: "date" },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      showHeader={false} // This will hide the header completely
    />
  );
};

export default upcomingEvents;
