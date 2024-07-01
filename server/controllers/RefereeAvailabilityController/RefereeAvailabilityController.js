const RefereeAvailabilityModel = require('../../models/RefereeAvailabilityModel/RefereeAvailabilityModel');
const User = require("../../models/userModel")

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

module.exports = { RefereeAvailabilityController, EventAvailableRefereeController };
