const createEventModel = require("../../models/CreateEventModel/createEventModel")


const createEventController = async (req, res) => {
   try {
      const { nameOfTheEvent, location, numberOfTeams, eventNewDate, formattedTime } = req.body;

      // Generate auto-incrementing eid
      const lastEvent = await createEventModel.findOne().sort({ eid: -1 }); // Find the last event by eid
      let nextEidNumber = 1; // Default to 1 if no events exist

      if (lastEvent  && lastEvent.eid) {
         const lastEid = lastEvent.eid;
         nextEidNumber = parseInt(lastEid.slice(1), 10) + 1; // Extract numeric part and increment
      }

      const formattedEid = `E${nextEidNumber.toString().padStart(3, '0')}`; // Format as E000

      // Create new event instance
      const newEvent = new createEventModel({
         eid: formattedEid,
         nameOfTheEvent,
         location: location[0], // Assuming location is an array with one item
         numberOfTeams,
         eventNewDate,
         formattedTime
      });

      // Save new event to the database
      await newEvent.save();

      res.status(200).send({
         success: true,
         message: "Event Created Successfully",
         data: newEvent
      });

   } catch (error) {
      console.error("Create Event Controller Error:", error);
      res.status(400).send({
         success: false,
         message: "Failed to create event",
         error: error.message
      });
   }
};

module.exports = createEventController;



const getAllEventsController = async (req, res) => {
   try {
      const data = await createEventModel.find({});

      if (!data) {
         return res.status(404).send({
            success: false,
            message: "No Event Found"
         })
      }

      res.status(200).send({
         success: true,
         message: "All Events Fetch successfull",
         data
      })

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "All Events Fetch Unsuccessfull",
         data
      })
   }
}


module.exports = { createEventController, getAllEventsController }