const ShuffledNewTeamModel = require("../../models/ShuffleTeamModel/ShuffleTeamModel");
const createFixtureModel = require("../../models/CreateFixtureModel/CreateFixtureModel");

const shuffledNewTeamController = async (req, res) => {
  try {
    const {shuffledNewArray,id} = req.body;
    console.log(shuffledNewArray,id);

    const createdFixtureData = await createFixtureModel.findById(id);

    const data = new ShuffledNewTeamModel({
      shuffleTeam: shuffledNewArray,
    });

    await data.save();

    createdFixtureData.createdFixtureId = data._id;

    const createdShuffleId = data._id.toString();

    await createdFixtureData.save();

    console.log(createdShuffleId);
    console.log(createdFixtureData);

    res.status(200).send({
      success: true,
      message: "Shuffle event save successfull",
      data
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


// GET ALL SHUFFLE TEAM
const getAllShuffleTeamController = async(req,res)=>{
  try {
    const data = await ShuffledNewTeamModel.find();

    res.status(200).send({
      success:true,
      message:"All Shuffle Team Fetched Successfully",
      dataLength:data.length
    })
    
  } catch (error) {
    res.status(400).send({
      success:false,
      message:"All Shuffle Team Fetched Unsuccessfully",
      error 
  })
  }
}

module.exports = { shuffledNewTeamController,getShuffledNewTeamController,getAllShuffleTeamController};