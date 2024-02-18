const userModel = require("../../models/userModel")


const getPlayerDetailsController = async(req,res)=>{
   try {
      const data = await userModel.find({})

      if(data.isEventOrganizer){
           
      }
      
      res.status(200).send({
        success:false,
        message : "Get Player Details haven't an error",
        data
})
        
   } catch (error) {
        res.status(400).send({
                success:false,
                message : "Get Player Details have an error",
                error
        })
   }

}

module.exports = {getPlayerDetailsController}