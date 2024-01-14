const ShuffledNewTeamModel = require("../models/shuffledNewTeamModel");

const shuffledNewTeamController = async (req, res) => {
  try {
    const dataArray = req.body;
    console.log(dataArray);

    // Extract TeamName values from dataArray
    const teamNames = dataArray.map(item => item.TeamName);
    console.log(teamNames);

    // Create a new document using the ShuffledNewTeamModel
    const document = new ShuffledNewTeamModel({ newTeam: teamNames });
    console.log(document);

    // Save the document to the database
    const savedDocument = await document.save();

    // Respond with the saved document or an appropriate response
    res.status(200).send({
      success: true,
      message: "Shuffle updated successfully",
      savedDocument,
    });
    
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error updating shuffle",
    });
  }
};

module.exports = { shuffledNewTeamController };
