import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import axios from "axios";

const UpcomingEvents = () => {
  const [playerId, setPlayerId] = useState(null);
  const [AssignMatchData, setAssignMatchData] = useState([]);

  // GET CURRENT USER DATA
  const currentUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPlayerId(res.data.user._id);
    } catch (error) {
      message.error("Error occurred inside the Get currentUserData function");
    }
  };

  const getAssignPlayerMatches = async () => {
    try {
      const assignEventResponse = await axios.post(
        "http://localhost:8080/api/v1/event/getPlayerAssignEvent",
        { playerId }
      );
      console.log(assignEventResponse.data);
      if (assignEventResponse.data.success) {
        setAssignMatchData(assignEventResponse.data.data);
      }
    } catch (error) {
      message.error("An error occurred while getting assigned matches data.");
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  useEffect(() => {
    if (playerId) {
      getAssignPlayerMatches();
    }
  }, [playerId]);

  const columns = [
    { dataIndex: "nameOfTheEvent", key: "nameOfTheEvent", title: "Event Name" },
    { dataIndex: "numberOfTeams", key: "numberOfTeams", title: "Team Name" },
    { dataIndex: "location", key: "location", title: "Event Date" },
  ];

  return (
    <Table
      dataSource={AssignMatchData} // Use the state data
      columns={columns}
      pagination={false}
      showHeader={false} // Optionally, you can set this to true or false based on your need
    />
  );
};

export default UpcomingEvents;
