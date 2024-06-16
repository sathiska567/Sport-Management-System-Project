const coachAvailabilityModel = require('../../models/CoachAvailabilityModel/CoachAvailabilityModel');


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


module.exports = { coachAvailabilityController }