import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const UpcomingEvents = () => {
  const [refereeId, setRefereeId] = useState("");
  const [assignEvents, setAssignEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const currentUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRefereeId(res.data.user._id);
    } catch (error) {
      message.error("Error fetching current user data");
    }
  };

  const getAssignMatches = async (refereeId, page) => {
    try {
      const assignMatchResponse = await axios.post("http://localhost:8080/api/v1/event/assignReferee-event", {
        refereeId,
        page,
      });
      // console.log(assignMatchResponse.data.data.data);
      setAssignEvents(assignMatchResponse.data.data.data);
      // setTotal(assignMatchResponse.data.data.total);
    } catch (error) {
      message.error("Failed to get assigned matches");
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  useEffect(() => {
    if (refereeId) {
      getAssignMatches(refereeId, currentPage);
    }
  }, [refereeId, currentPage]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event Name" },
    { dataIndex: "location", key: "location", title: "Location" }

  ];

  return (
    <Table
      dataSource={assignEvents}
      columns={columns}
      pagination={{
        current: currentPage,
        total: total,
        pageSize: 5,
        onChange: handleTableChange,
      }}
    />
  );
};

export default UpcomingEvents;
