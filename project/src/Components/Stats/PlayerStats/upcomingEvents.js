import React from "react";
import { Table } from "antd";

const upcomingEvents = () => {
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
