const User = require("../../models/userModel")


const GetOnlyEventOrganizerController = async(req,res)=>{
   try {
      const data = await User.find({});
      const eventOrganizer = []

      const dataLength = data.length;

      for (let i = 0; i < dataLength; i++) {
        if(data[i].isEventOrganizer){
           eventOrganizer.push(data[i])
        }
        
      }

      console.log(dataLength);

      res.status(200).send({
        success:true,
        message:"Data fetched successfully",
        data:eventOrganizer,
     })

   } catch (error) {
        res.status(400).send({
           success:false,
           message:error.message,
        })
   }
}


module.exports = {GetOnlyEventOrganizerController}