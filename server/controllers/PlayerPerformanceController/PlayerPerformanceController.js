const User = require("../../models/userModel");

const getPlayers = async (req, res) => {



  try {


    let data = await User.find({ isPlayer: true }, "username");
    const players = data.map(player => ({
      playerName: player.username,
    }));



    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: players,
    });


  }
   catch (error) {


    res.status(400).send({
      success: false,
      message: "Error while fetching player data",
      error,
    });
  }
};



module.exports = {
  getPlayers,
};