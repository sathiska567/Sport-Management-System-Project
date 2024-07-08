import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";

const PendingUsersTable = () => {
  const [eventOrganizers, setEventOrganizers] = useState([]);
  const [teamManagers, setTeamManagers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [players, setPlayerDetails] = useState([]);
  const [referees, setRefereeDetails] = useState([]);

  //  get all event organizers
  const getOnlyEventOrganizers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event-organizer/details"
      );
      if (response.data.success) {
        setEventOrganizers(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  //  get all team managers
  const getOnlyTeamManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/team-manager/details"
      );
      if (response.data.success) {
        setTeamManagers(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching team managers");
    }
  };

  //  get all coaches
  const getOnlyCoach = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/coach/details"
      );
      if (response.data.success) {
        setCoaches(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching coaches");
    }
  };

  const handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/player/player-details"
      );
      if (response.data.success) {
        setPlayerDetails(response.data.players);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const getAllRefereeDetails = async () => {
    try {
      const refereeResponse = await axios.get(
        "http://localhost:8080/api/v1/referee/referee-details"
      );
      if (refereeResponse.data.success) {
        setRefereeDetails(refereeResponse.data.referee);
      }
    } catch (error) {
      message.error("Error fetching referee details");
    }
  };

  useEffect(() => {
    getOnlyEventOrganizers();
    getOnlyTeamManagers();
    getOnlyCoach();
    handleGetAllPlayerDetails();
    getAllRefereeDetails();
  }, []);

  const data = [
    { key: "1", role: "Event Organizers", count: eventOrganizers.length },
    { key: "2", role: "Team Managers", count: teamManagers.length },
    { key: "3", role: "Coaches", count: coaches.length },
    { key: "4", role: "Referees", count: referees.length },
    { key: "5", role: "Players", count: players.length },
  ];

  const columns = [
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Count", dataIndex: "count", key: "count" },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      showHeader={false} // Changed to true to show the headers
    />
  );
};

export default PendingUsersTable;
