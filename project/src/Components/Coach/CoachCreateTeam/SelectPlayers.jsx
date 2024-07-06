import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CoachCreateTeam.css";
import { Table, Input, Button, Form, message } from "antd";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import axios from "axios";

const SelectPlayers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const matchId = params.get("matchId");
  const coachId = params.get("coachId");

  console.log("matchId : ", matchId);
  console.log("coachId : ", coachId);

  const getOnlyAvailablePlayer = async () => {
    try {
      const availablePlayer = await axios.post(
        "http://localhost:8080/api/v1/player-availability/getEventPlayer",
        { eventId: matchId }
      );
      console.log(availablePlayer);
      setPlayers(availablePlayer.data.data);
    } catch (error) {
      message.error("Error Fetching Data");
    }
  };

  useEffect(() => {
    getOnlyAvailablePlayer();
  }, []);

  const [teamData, setTeamData] = useState({
    matchId: matchId,
    coachId: coachId,
    //teamNo: '',
    teamName: "",
    selectedPlayers: [], // State to hold selected player IDs
  });

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/coach/players?match_id=${matchId}&coach_id=${coachId}`
      )
      .then((res) => {
        console.log(res.data);
        // setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchId, coachId]);

  const handleAdd = async (player_id) => {
    // Check if the player ID is already selected
    const index = teamData.selectedPlayers.indexOf(player_id);
    if (index === -1) {
      // Player not selected, add to selected players
      setTeamData({
        ...teamData,
        selectedPlayers: [...teamData.selectedPlayers, player_id],
      });
    } else {
      // Player already selected, remove from selected players
      const updatedPlayers = [...teamData.selectedPlayers];
      updatedPlayers.splice(index, 1);
      setTeamData({
        ...teamData,
        selectedPlayers: updatedPlayers,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/coach/create-team",
        teamData
      );
      if (res.data.success) {
        console.log("Team data saved successfully: ", res.data.team);
        navigate(`/create-team?coach_id=${coachId}`);
      } else {
        console.error("Failed to save team data: ", res.data.error);
      }
    } catch (err) {
      console.error("Error while saving team data: ", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const handleCancel = (event) => {
    navigate(`/create-team?coach_id=${coachId}`);
  };

  const columns = [
    {
      title: "Player Name",
      dataIndex: "username",
      key: "username",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Player Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, player) => (
        <Button
          style={{
            backgroundColor: teamData.selectedPlayers.includes(player._id)
              ? "#f5222d"
              : "#52c41a", // Conditional color
            color: "#fff",
            fontSize: "large",
            marginRight: "10px",
            borderRadius: "5px",
            marginTop: "auto",
            marginBottom: "auto",
            width: "100px",
            padding: "2px",
          }}
          onClick={() => handleAdd(player._id)}
        >
          {teamData.selectedPlayers.includes(player._id) ? "Remove" : "Add"}
        </Button>
      ),
    },
  ];

  return (
    <CoachSidebar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "90%",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
            margin: "auto",
          }}
        >
          <label htmlFor="">Enter Team Name</label>
          <input
            style={{
              width: "80%",
              margin: "auto",
            }}
            placeholder="Team Name"
            name="teamName"
            value={teamData.teamName}
            onChange={handleChange}
            className="inputTag"
          />
        </div>
        <div>
          <Table
            columns={columns}
            pagination={{
              pageSize: 4,
            }}
            dataSource={players}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "50%",
            margin: "auto",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {teamData.teamName && (
            <Button
              style={{
                alignSelf: "center",
                backgroundColor: "#52c41b",
                color: "#fff",
                fontSize: "large",
                marginRight: "10px",
                borderRadius: "5px",
                marginTop: "0px",
                marginBottom: "auto",
                width: "100px",
                padding: "2px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}

          <Button
            style={{
              alignSelf: "center",
              backgroundColor: "orange",
              color: "#fff",
              fontSize: "large",
              marginRight: "10px",
              borderRadius: "5px",
              marginTop: "0px",
              marginBottom: "auto",
              width: "100px",
              padding: "2px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </CoachSidebar>
  );
};

export default SelectPlayers;
