import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";

const PlayerReview = () => {
  const [playerDetails, setPlayerDetails] = useState([]);

  const handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/player/player-details"
      );
      console.log(response.data.players);

      if (response.data.success) {
        // message.success(response.data.message)
        const players = response.data.players.map((player, index) => ({
          key: index + 1,
          playerName: player.username, // Assuming the response has `username`
        }));
        setPlayerDetails(players);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleGetAllPlayerDetails();
  }, []);

  const columns = [
    { title: "Player Name", dataIndex: "playerName", key: "playerName" },
  ];

  return (
    <Table
      dataSource={playerDetails}
      columns={columns}
      pagination={false}
      showHeader={true} 
    />
  );
};

export default PlayerReview;
