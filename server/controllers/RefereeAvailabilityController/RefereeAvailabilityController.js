const RefereeAvailabilityModel = require('../../models/RefereeAvailabilityModel/RefereeAvailabilityModel');
const User = require("../../models/userModel")
const createEventModel = require("../../models/CreateEventModel/createEventModel")


const RefereeAvailabilityController = async (req, res) => {
        const { eventId, RefereeId, availability } = req.body;

        try {
                const data = await RefereeAvailabilityModel.find({ eventId: eventId, RefereeId: RefereeId });

                if (data.length == 0) {
                        const setAvailability = new RefereeAvailabilityModel({
                                eventId: eventId,
                                RefereeId: RefereeId,
                                availability: availability
                        });

                        await setAvailability.save();

                        res.status(200).send({
                                success: true,
                                message: "Availability added successfully",
                                setAvailability
                        });
                } else {
                        const setAvailability = await RefereeAvailabilityModel.findOneAndUpdate(
                                { eventId: eventId, RefereeId: RefereeId },
                                { availability: availability },
                                { new: true }
                        );

                        res.status(200).send({
                                success: true,
                                message: "Availability updated successfully",
                                setAvailability
                        });
                }
        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Availability added unsuccessfully",
                        error
                });
        }
};


const EventAvailableRefereeController = async (req, res) => {
        try {
                const { eventId } = req.body;
                const availableRefereeDetails = [];
                const createdEvent = await createEventModel.find({})
                const alreadyAddedReferee = []

                // Find coach availability for the given event ID
                const availability = await RefereeAvailabilityModel.find({
                        eventId: eventId,
                        availability: true,
                });

                // Extract the coach IDs from the availability records
                const availableRefereeIds = availability.map((item) => item.RefereeId);

                // Find details of the coaches who are available and are coaches
                // $in - operator selects the documents where the value of a field equals any value in the specified array
                const refereeDetails = await User.find({
                        _id: { $in: availableRefereeIds },
                        isReferee: true,
                });

                // Collect the relevant details of the available coaches
                refereeDetails.forEach((referee) => {
                        availableRefereeDetails.push({
                                id: referee._id,
                                username: referee.username,
                                email: referee.email,
                        });
                });


                // Identify already added referees
                createdEvent.forEach((event) => {
                if (event.refereeId && event.refereeId.length > 0) {
                    event.refereeId.forEach((refId) => {
                        if (availableRefereeIds.includes(refId.toString())) {
                            alreadyAddedReferee.push(refId.toString());
                        }
                    });
                }
            });
    
            res.status(200).send({
                success: true,
                message: "Data fetched successfully",
                data: availableRefereeDetails,
                alreadyAddedReferee: alreadyAddedReferee
            });

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: error.message,
                });
        }
}


// Restric Assign Referees
const RestrictAssignRefereeController = async (req, res) => {
        try {
          const {eventId , eventNewDate,assignRefereeId} = req.body;
          const consideringDayAvailableReferee = []
    
          const consideringDaysMatches = await createEventModel.find({eventNewDate:eventNewDate}) 
          const refereeAvailability = await RefereeAvailabilityModel.find({availability:true})       
        //   eventId
          for (let i = 0; i < consideringDaysMatches.length; i++) {
            for (let j = 0; j < refereeAvailability.length; j++) {
               if(consideringDaysMatches[i]._id == refereeAvailability[j].eventId){
                   consideringDayAvailableReferee.push(refereeAvailability[j])
               }
            }
                
          }

          for (let k = 0; k < consideringDayAvailableReferee.length; k++) {
             if((consideringDayAvailableReferee[k].RefereeId == assignRefereeId) && (consideringDayAvailableReferee[k].eventId != eventId)){
                console.log("hello");
                consideringDayAvailableReferee[k].availability = false
                await consideringDayAvailableReferee[k].save()
                
             }else{
                
                consideringDayAvailableReferee[k].availability = true
                await consideringDayAvailableReferee[k].save()
             }
                
          }
         

            res.status(200).send({
                success: true,
                message: "Data fetched successfully",
                data: consideringDayAvailableReferee,
            });
    
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error Occurred While Restricting Referees",
                error: error.message,
            });
        }
    }


// Restric Assign Referees
const RestrictRemoveRefereeController = async (req, res) => {
        try {
            const { eventId, eventNewDate, assignRefereeId } = req.body;
    
            // Find matches for the specific eventNewDate
            const consideringDaysMatches = await createEventModel.find({ eventNewDate: eventNewDate });
    
            // Find referee availabilities for all events
            const refereeAvailability = await RefereeAvailabilityModel.find({});
    
            // Array to hold referees available for the specific event and day
            const consideringDayAvailableReferee = [];
    
            // Filter referees available for the specific eventId and day
            for (let i = 0; i < consideringDaysMatches.length; i++) {
                for (let j = 0; j < refereeAvailability.length; j++) {
                    if (consideringDaysMatches[i]._id.toString() === refereeAvailability[j].eventId.toString()) {
                        consideringDayAvailableReferee.push(refereeAvailability[j]);
                    }
                }
            }
    
            // Update availability status for the assigned referee
            for (let k = 0; k < consideringDayAvailableReferee.length; k++) {
                if (consideringDayAvailableReferee[k].RefereeId === assignRefereeId) {
                    consideringDayAvailableReferee[k].availability = true; // Update availability logic as per your requirements
                }
            }
    
            // Save updated availability status (if needed)
            await Promise.all(consideringDayAvailableReferee.map(ref => ref.save()));
    
            // Respond with updated referee availability data
            res.status(200).send({
                success: true,
                message: "Referee availability updated successfully",
                data: consideringDayAvailableReferee,
            });
    
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error occurred while updating referee availability",
                error: error.message,
            });
        }
    }
    
    

module.exports = { RefereeAvailabilityController, EventAvailableRefereeController,RestrictAssignRefereeController,RestrictRemoveRefereeController };
