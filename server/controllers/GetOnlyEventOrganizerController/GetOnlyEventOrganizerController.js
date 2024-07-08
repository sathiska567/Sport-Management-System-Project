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




const GetSearchEOResultController = async (req, res) => {
   try {
     const searchTerm = req.body.value;
     const regex = new RegExp(searchTerm, 'i');
 
     // Fetch only event organizers with the specified location
     const eventOrganizers = await User.find({
      isEventOrganizer: true,
       username: { $regex: regex }
     });
 
     res.status(200).send({
       message: "Data found",
       success: true,
       data: eventOrganizers
     });
     
   } catch (error) {
     res.status(400).send({
       success: false,
       message: "Something went wrong",
       error: error.message
     });
   }
 };
 

module.exports = {GetOnlyEventOrganizerController,GetSearchEOResultController}