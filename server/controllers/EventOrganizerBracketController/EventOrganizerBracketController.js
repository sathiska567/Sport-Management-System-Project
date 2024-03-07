const shuffleTeamModel = require("../../models/ShuffleTeamModel/ShuffleTeamModel")

const getTeamController = async(req,res)=>{
   try {
      const data = await shuffleTeamModel.find({})  

      if(!data){
       return res.status(404).send({
         success:false,
         message:"data not found"
       })
      }
      
      res.status(200).send({
        success:true,
        message:"data found",
        data
      })



   } catch (error) {
        res.status(400).send({
                success:false,
                message:"Get Team controller have error",
                error
              })
   }
}


module.exports = {getTeamController}