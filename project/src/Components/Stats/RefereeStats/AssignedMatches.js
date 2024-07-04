import React from "react";
import { Table } from "antd";

const upcomingEvents = () => {
  const data = [
    {
      key: "1",
      eventName: "Event 1",
      teamName: "Team A",
      eventDate: "2024-07-04",
    },
    {
      key: "2",
      eventName: "Event 2",
      teamName: "Team C",
      eventDate: "2024-07-12",
    },
    {
      key: "3",
      eventName: "Event 3",
      teamName: "Team E",
      eventDate: "2024-07-21",
    },
    {
      key: "4",
      eventName: "Event 4",
      teamName: "Team V",
      eventDate: "2024-07-25",
    },
    {
      key: "5",
      eventName: "Event 5",
      teamName: "Team Q",
      eventDate: "2024-07-30",
    },
  ];

  const columns = [
    { dataIndex: "eventName", key: "EventName", title: "Event Name" },
    { dataIndex: "teamName", key: "TeamName", title: "Team Name" },
    { dataIndex: "eventDate", key: "EventDate", title: "Event Date" },
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
