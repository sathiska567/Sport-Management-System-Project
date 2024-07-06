const coachAvailabilityModel = require('../../models/CoachAvailabilityModel/CoachAvailabilityModel');
const createEvent = require("../../models/CreateEventModel/createEventModel")

const coachAvailabilityController = async (req, res) => {
        //   console.log(req.body);
        const { eventId, coachId, availability } = req.body;

        try {

                const data = await coachAvailabilityModel.find({ eventId: eventId , coachId:coachId });

                console.log(data);

                if (data.length == 0) {
                        const setAvailability = new coachAvailabilityModel({
                                eventId: eventId,
                                coachId: coachId,
                                availability: availability
                        })


                        await setAvailability.save();

                        res.status(200).send({
                                success: true,
                                message: "Availability added successfully",
                                setAvailability
                        })

                        //       console.log(setAvailability);
                }
                else {
                        const setAvailability = await coachAvailabilityModel.findOneAndUpdate({ eventId: eventId }, { availability: availability }, { new: true })
                        await setAvailability.save();

                        res.status(200).send({
                                success: true,
                                message: "Availability added successfully",
                                setAvailability
                        })

                        //        console.log(setAvailability);

                }

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Availability added Unsuccessfully",
                        error
                })
        }
}


const getCoachAvailabilityController = async(req,res)=>{
  try {
    const data = await coachAvailabilityModel.find({availability:true});
    res.status(200).send({
            success: true,
            message: "Availability fetched successfully",
            data
    })
        
  } catch (error) {
     res.status(400).send({
      success: false,
      message: "Availability added Unsuccessfully",
      error
     })   
  }
}


const getEventAvailableCoachController = async (req, res) => {
        try {
          const getCreatedEvent = await createEvent.find({});
          const getAvailableCoach = await coachAvailabilityModel.find({ availability: true });
          
          // Create a map to store the count of available coaches for each event
          const eventAvailableCoachCount = {};
      
          // Initialize the map with event IDs and zero counts
          getCreatedEvent.forEach(event => {
            eventAvailableCoachCount[event._id] = {
              event,
              availableCoachCount: 0,
            };
          });
      
          // Count the available coaches for each event
          getAvailableCoach.forEach(coach => {
            if (eventAvailableCoachCount[coach.eventId]) {
              eventAvailableCoachCount[coach.eventId].availableCoachCount += 1;
            }
          });
      
          const result = Object.values(eventAvailableCoachCount);
      
          res.status(200).send({
            success: true,
            message: "Events and available coaches count",
            data: result
          });
          
        } catch (error) {
          res.status(400).send({
            success: false,
            message: "Failed to retrieve events and available coaches",
            error
          });
        }
      };
      

module.exports = { coachAvailabilityController,getCoachAvailabilityController,getEventAvailableCoachController }