const User = require("../../models/userModel")
const CoachAvailability = require("../../models/CoachAvailabilityModel/CoachAvailabilityModel")

const GetOnlyCoachController = async(req,res)=>{
        try {
                const data = await User.find({});
                const coach = []
          
                const dataLength = data.length;
          
                for (let i = 0; i < dataLength; i++) {
                  if(data[i].isCoach){
                      coach.push(data[i])
                  }
                  
                }
          
                // console.log(dataLength);
          
                res.status(200).send({
                  success:true,
                  message:"Data fetched successfully",
                  data:coach,
               })
          
             } catch (error) {
                  res.status(400).send({
                     success:false,
                     message:error.message,
                  })
             }
}


// get event available coacehs
const GetEventAvailableCoachesController = async (req, res) => {
  try {
    const { eventId } = req.body;
    const availableCoachDetails = [];

    // Find coach availability for the given event ID
    const availability = await CoachAvailability.find({
      eventId: eventId,
      availability: true,
    });

    // Extract the coach IDs from the availability records
    const availableCoachIds = availability.map((item) => item.coachId);

    // Find details of the coaches who are available and are coaches
    const coachDetails = await User.find({
      _id: { $in: availableCoachIds },
      isCoach: true,
    });

    // Collect the relevant details of the available coaches
    coachDetails.forEach((coach) => {
      availableCoachDetails.push({
        id:coach._id,
        username: coach.username,
        email: coach.email,
      });
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: availableCoachDetails,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {GetOnlyCoachController,GetEventAvailableCoachesController};