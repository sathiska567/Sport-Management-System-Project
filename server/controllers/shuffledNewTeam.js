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


// GET DATA || GET
const getShuffledNewTeamController = async(req,res)=>{

  try {
    const {id} = req.body;
    console.log("shuffle get id is " , id);
    const data = await ShuffledNewTeamModel.findById(id);
    console.log(data);
    res.status(200).send({
      success:true,
      message:"Data Fetched Successfully",
      data
    })
    
  } catch (error) {
    res.status(400).send({
      success:false,
      message:"Data Fetched Unsuccessfully",
      error
    })
  }

}

module.exports = { shuffledNewTeamController,getShuffledNewTeamController };
