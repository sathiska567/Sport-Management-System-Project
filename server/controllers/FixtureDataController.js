const FixtureDataModel = require("../models/FixtureDataModel")


const FixtureDataController = async(req,res)=>{
  
    const {teamName} = req.body

    console.log(teamName);
    const user = new FixtureDataModel({
        TeamName:teamName
    })

    await user.save()

    res.status(200).send({
        success:true,
        message:"Data send successfully"
    })

}


const GetFixtureDataController = async(req,res)=>{
   const data = await FixtureDataModel.find({})

   res.status(200).send({
        success:true,
        message:"Data get successfully",
        data
   })
}

module.exports = {FixtureDataController,GetFixtureDataController};