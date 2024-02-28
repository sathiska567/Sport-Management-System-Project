const coachReviewModel = require("../../models/CoachReviewModel/CoachReviewModel")
const userModel = require("../../models/userModel")

const getCurrentPlayerReviewController = async(req,res)=>{
//    const {playerId} = req.body
   console.log(req.body);

   try {
      const data = await userModel.findById(req.body.coachId)
      
      if(!data){
         return res.status(404).send({
            message:"data Not found",
            success:false,
          })
      }

       res.status(200).send({
         message:"data found",
         success:true,
         data
       })
      
   } catch (error) {
      res.status(400).send({
         message:"data found Have an error",
         success:false,
         error
       })
   }
}

module.exports = {getCurrentPlayerReviewController}