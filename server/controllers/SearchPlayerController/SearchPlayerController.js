const createEventModel = require('../../models/CreateEventModel/createEventModel');


const SearchPlayerController = async (req, res) => {
        console.log(req.body);
        const { eventLocation } = req.body;
        console.log(eventLocation);
        try {
                const event = await createEventModel.find({ location: eventLocation });
                console.log(event);

                if (!event) {
                        return res.status(404).send({
                                success: true,
                                message: "Not Found",
                        })
                }

                res.status(200).send({
                        success: true,
                        message: "Search details are found",
                        event
                })

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Error in Search Player",
                        error
                })
        }
}


module.exports = { SearchPlayerController }