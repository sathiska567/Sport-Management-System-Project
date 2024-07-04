import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const PlayerReview = () => {
  const [currentCoachId, setCurrentCoachId] = useState("");
  const [createdTeams, setCreatedTeams] = useState([]);

  //GET CURRENT USER DATA
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
      setCurrentCoachId(res.data.user._id);
    } catch (error) {
      message.error("Error inside the Get currentUserData function");
    }
  };

  const getCreatedTeams = async () => {
    try {
      const createdTeamsResponse = await axios.get(
        "http://localhost:8080/api/v1/team/get-created-team"
      );
      const coachCreatedTeams = createdTeamsResponse.data.data.filter(
        (team) => team.coach_id === currentCoachId
      );
      setCreatedTeams(coachCreatedTeams);
    } catch (error) {
      message.error("Error while fetching created teams");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await currentUserData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCoachId) {
      getCreatedTeams();
    }
  }, [currentCoachId]);

  const columns = [
    { dataIndex: "teamNo", title: "Event Name" },
    { dataIndex: "teamName", title: "Team Name" },
  ];

  return (
    <Table
      dataSource={createdTeams}
      columns={columns}
      pagination={false}
      showHeader={false}
      rowKey={(record) => record._id} // Assuming each team has a unique _id
    />
  );
};

export default PlayerReview;
