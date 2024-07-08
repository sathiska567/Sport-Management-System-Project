const PlayerDetailsFormModel = require("../../models/PlayerDetailsFormModel/PlayerDetailsFormModel");




const PlayerDetailsForm = async (req, res) => {



  try {
    const {
      playerName,
      nameOfTheTeam,
      totalRuns,
      numberOfDissMiss,
      totalRunsConceded,
      numberOfWickets,
    } = req.body;



    const data = new PlayerDetailsFormModel({
      playerName,
      nameOfTheTeam,
      totalRuns,
      numberOfDissMiss,
      totalRunsConceded,
      numberOfWickets,
    });


    

    await data.save();

    res.status(200).send({
      success: true,
      message: "Player Details Created Successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create Player details",
      error,
    });
  }
};

module.exports = { PlayerDetailsForm };