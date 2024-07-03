import React from "react";
import { Table } from "antd";

const PlayerReview = () => {
  const data = [
    { key: "1", playerName: "Player 1" },
    { key: "2", playerName: "Player 2" },
    { key: "3", playerName: "Player 3" },
    { key: "4", playerName: "Player 4" },
    { key: "5", playerName: "Player 5" },
  ];

  const columns = [
    { dataIndex: "playerName"},
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
