import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Button, Form, Input, message, Table } from "antd";

const UpdateTeam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const team = location.state.team;

  const [teamData, setTeamData] = useState(team);
  //console.log( 'team.matchId : at line 14',team)
  const [allplayers, setAllplayers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/coach/players?match_id=${team.match_id}&coach_id=${team.coach_id}`
      )
      .then((res) => {
        console.log(res.data);
        // setAllplayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [team.match_id, team.coach_id]);

  const getOnlyAvailablePlayer = async () => {
    try {
      const availablePlayer = await axios.post(
        "http://localhost:8080/api/v1/player-availability/getEventPlayer",
        { eventId: team.match_id }
      );
      console.log(availablePlayer);
      setAllplayers(availablePlayer.data.data);
    } catch (error) {
      message.error("Error Fetching Data");
    }
  };

  useEffect(() => {
    getOnlyAvailablePlayer();
  }, []);

  const handleAdd = async (player_id) => {
    // Check if the player ID is already selected
    const index = teamData.players.indexOf(player_id);
    if (index === -1) {
      // Player not selected, add to selected players
      setTeamData({
        ...teamData,
        players: [...teamData.players, player_id],
      });
    } else {
      // Player already selected, remove from selected players
      const updatedplayers = [...teamData.players];
      updatedplayers.splice(index, 1);
      setTeamData({
        ...teamData,
        players: updatedplayers,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("edited team data to be sent : ", teamData);
      const res = await axios.post(
        `http://localhost:8080/api/v1/coach/update-team`,
        { teamData: teamData }
      );
      if (res.data.success) {
        console.log("Team data updated successfully: ", res.data.team);
        navigate(`/edit-team?coach_id=${team.coach_id}`);
      } else {
        console.error("Failed to update team data: ", res.data.error);
      }
    } catch (err) {
      console.error("Error while updating team data: ", err);
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
    navigate(`/edit-team?coach_id=${team.coach_id}`);
  };

  const CustomButton = ({ player, teamData, handleAdd }) => {
    // Determine the background color based on the text
    const backgroundColor = teamData.players.includes(player._id)
      ? "#ff4d4f" // Red if 'Remove'
      : "#52c41a"; // Green if 'Add'

    return (
      <Button
        style={{
          backgroundColor: backgroundColor,
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
        {teamData.players.includes(player._id) ? "Remove" : "Add"}
      </Button>
    );
  };

  const columns = [
    {
      title: "Player Name",
      dataIndex: "username",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "District",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, player) => (
        <CustomButton
          player={player}
          teamData={teamData}
          handleAdd={handleAdd}
        />
      ),
    },
  ];

  return (
    <CoachSidebar>
      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            margin: "auto",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "25px",
            }}
          >
            <label style={{ width: "49%" }} htmlFor="teamName">
              Team Name
            </label>
            <Input
              style={{ width: "80%" }}
              placeholder="Team Name"
              name="teamName"
              value={teamData.teamName}
              onChange={handleChange}
              className="inputTag"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <label style={{ width: "51%" }} htmlFor="teamNo">
              Team Number
            </label>
            <Input
              style={{ width: "81%" }}
              placeholder="Team No"
              name="teamNo"
              value={teamData.teamNo}
              onChange={handleChange}
              className="inputTag"
            />
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={allplayers}
            style={{ margin: 50, marginBottom: 0 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {teamData.teamNo && teamData.teamName && (
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

export default UpdateTeam;
