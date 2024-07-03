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

                res.status(200).send({
                        success: true,
                        message: "Data fetched successfully",
                        data: availableRefereeDetails,
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
            const { eventId } = req.body;
            const availableRefereeDetails = [];
    
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
    
            // Check if referee already assigned to an event on the same day
            const assignedEvents = await createEventModel.find({
                _id: { $ne: eventId }, // Exclude current event
                date: { $eq: req.body.eventNewDate}, // Check for the same date
                referees: { $in: availableRefereeIds }, // Check if referee is already assigned
            });
    
            // If there are assigned events on the same day, restrict assignment
            if (assignedEvents.length > 0) {
                return res.status(400).send({
                    success: false,
                    message: "Cannot assign referee to more than one event on the same day",
                });
            }
    
            // Collect the relevant details of the available referees
            refereeDetails.forEach((referee) => {
                availableRefereeDetails.push({
                    id: referee._id,
                    username: referee.username,
                    email: referee.email,
                });
            });
    
            res.status(200).send({
                success: true,
                message: "Data fetched successfully",
                data: availableRefereeDetails,
            });
    
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error Occurred While Restricting Referees",
                error: error.message,
            });
        }
    }
    

module.exports = { RefereeAvailabilityController, EventAvailableRefereeController,RestrictAssignRefereeController };
