const createEventModel = require("../../models/CreateEventModel/createEventModel")

const createEventController = async(req,res)=>{
   try {

      const {nameOfTheEvent,location,numberOfTeams} = req.body;
      console.log(nameOfTheEvent,location,numberOfTeams);

      const data = new createEventModel({
         nameOfTheEvent:nameOfTheEvent,
         location:location,
         numberOfTeams:numberOfTeams
      })

      await data.save();

      res.status(200).send({
         success:true,
         message:"Event Created Successfull",
         data
      })
      
     
   } catch (error) {
       res.status(400).send({
          success:false,
          message:"Failed to create event",
          error
       })
   }

}


const getAllEventsController = async(req,res)=>{
  try {
    const data = await createEventModel.find({});

    if(!data){
      return res.status(404).send({
         success:false,
         message:"No Event Found"
      })
    }

    res.status(200).send({
      success:true,
      message:"All Events Fetch successfull",
      data
    })
   
  } catch (error) {
   res.status(400).send({
      success:false,
      message:"All Events Fetch Unsuccessfull",
      data
    })
  }
}


module.exports = {createEventController,getAllEventsController}