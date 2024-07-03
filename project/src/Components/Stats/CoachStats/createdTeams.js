import React from "react";
import { Table } from "antd";

const createdTeams = () => {
  const data = [
    { key: "1", teamNumber: "T001", teamName: "Team 1" },
    { key: "2", teamNumber: "T002", teamName: "Team 2" },
    { key: "3", teamNumber: "T003", teamName: "Team 3" },
    { key: "4", teamNumber: "T004", teamName: "Team 4" },
    { key: "5", teamNumber: "T005", teamName: "Team 5" },
  ];

  const columns = [
    { dataIndex: "teamNumber" },
    { dataIndex: "teamName" }
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

export default createdTeams;
