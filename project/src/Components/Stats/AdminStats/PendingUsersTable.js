import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";

const PendingUsersTable = () => {
  const [pendingPlayer, setPendingPlayer] = useState([]);
  const [pendingEO, setPendingEO] = useState([]);
  const [pendingCoach, setPendingCoach] = useState([]);
  const [pendingTM, setPendingTM] = useState([]);
  const [pendingReferee, setPendingReferee] = useState([]);

  const getApplicationWithCategory = async () => {
    try {
      const categoryResponse = await axios.get("http://localhost:8080/api/v1/admin/get-all-details-with-category");
      if (categoryResponse.data.success) {
        const pendingForms = categoryResponse.data.pendingForms;

        const players = [];
        const coaches = [];
        const teamManagers = [];
        const referees = [];
        const eventOrganizers = [];

        for (let i = 0; i < pendingForms.length; i++) {
          const form = pendingForms[i];
          if (form.UserRole === "player") {
            players.push(form);
          } else if (form.UserRole === "coach") {
            coaches.push(form);
          } else if (form.UserRole === "Team Manager") {
            teamManagers.push(form);
          } else if (form.UserRole === "referee") {
            referees.push(form);
          } else if (form.UserRole === "Event Organizer") {
            eventOrganizers.push(form);
          }
        }

        setPendingPlayer(players);
        setPendingCoach(coaches);
        setPendingTM(teamManagers);
        setPendingReferee(referees);
        setPendingEO(eventOrganizers);
      } else {
        message.error("Error in fetching application with category");
      }
    } catch (error) {
      message.error("Error in fetching application with category");
    }
  };

  useEffect(() => {
    getApplicationWithCategory();
  }, []);

  const data = [
    { key: "1", role: "Event Organizers", count: pendingEO.length },
    { key: "2", role: "Team Managers", count: pendingTM.length },
    { key: "3", role: "Coaches", count: pendingCoach.length },
    { key: "4", role: "Referees", count: pendingReferee.length },
    { key: "5", role: "Players", count: pendingPlayer.length },
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
      showHeader={true}
    />
  );
};

export default PendingUsersTable;
