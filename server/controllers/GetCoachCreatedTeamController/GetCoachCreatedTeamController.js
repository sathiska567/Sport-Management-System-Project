const { Team } = require('../../models/teamModel');

const GetCoachCreatedTeamController = async(req,res)=>{
  try {
    const createdTeams = await Team.find({})

    res.status(200).send({
        success:true,
        message:"All created teams",
        data:createdTeams
     }) 
        
  } catch (error) {
     res.status(400).send({
        success:false,
        message:error.message,
     })   
  }
}

module.exports = {GetCoachCreatedTeamController}