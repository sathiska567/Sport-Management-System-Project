import React from "react";
import { Table } from "antd";

const PendingUsersTable = () => {
  const data = [
    { key: "1", role: "Event Organizers", count: 2 },
    { key: "2", role: "Team Managers", count: 5 },
    { key: "3", role: "Coaches", count: 1 },
    { key: "4", role: "Referees", count: 7 },
    { key: "5", role: "Players", count: 2 },
  ];

  const columns = [
    { dataIndex: "role", key: "role" },
    { dataIndex: "count", key: "count" },
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

export default PendingUsersTable;
