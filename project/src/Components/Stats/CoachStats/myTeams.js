import React from "react";
import { Table } from "antd";

const PlayerReview = () => {
  const data = [
    {
      key: "1",
      playerName: "Player 1",
      eventName: "Event A",
      teamName: "Team Alpha",
      eventDate: "2023-04-01",
    },
    {
      key: "2",
      playerName: "Player 2",
      eventName: "Event B",
      teamName: "Team Beta",
      eventDate: "2023-04-02",
    },
    {
      key: "3",
      playerName: "Player 3",
      eventName: "Event C",
      teamName: "Team Gamma",
      eventDate: "2023-04-03",
    },
    {
      key: "4",
      playerName: "Player 4",
      eventName: "Event D",
      teamName: "Team Delta",
      eventDate: "2023-04-04",
    },
    {
      key: "5",
      playerName: "Player 5",
      eventName: "Event E",
      teamName: "Team Epsilon",
      eventDate: "2023-04-05",
    },
  ];

  const columns = [
    { dataIndex: "eventName", title: "Event Name" },
    { dataIndex: "teamName", title: "Team Name" },
    { dataIndex: "eventDate", title: "Event Date" },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      showHeader={false}
    />
  );
};

export default PlayerReview;
