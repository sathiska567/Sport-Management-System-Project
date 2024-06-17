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


const AddCoachesToEventController = async(req,res)=>{
   try {
      const {eventId , coachId} = req.body;
      console.log(eventId,coachId);

      const data = await createEventModel.find({_id:eventId});

      if(!data){
         res.status(404).send({
            success: false,
            message: "Event Not Found",
         })
      }

      const event = await createEventModel.findByIdAndUpdate(eventId, {$push: {coaches: coachId}}, {new: true});
     
      res.status(200).send({
         success: true,
         message: "Coach Added Successful",
         data:event
      })
      


   } catch (error) {
      res.status(400).send({
         success: false,
         message: "All Events Fetch Unsuccessfull",
         error:error.message
      })
   }
}

const AddRefereesToEventController = async(req,res)=>{
   try {
      const {eventId , refereeId} = req.body;
      console.log(eventId,refereeId);

      const data = await createEventModel.find({_id:eventId});

      if(!data){
         res.status(404).send({
            success: false,
            message: "Event Not Found",
         })
      }

      const event = await createEventModel.findByIdAndUpdate(eventId, {$push: {refereeId: refereeId}}, {new: true});
     
      res.status(200).send({
         success: true,
         message: "Referee Added Successful",
         data:event
      })
      

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "All Events Fetch Unsuccessfull",
         error:error.message
      })
   }
}

// get referee assign matches
const GetRefereeAddEventController = async(req,res)=>{
   try {
      const {refereeId,page} = req.body;
      console.log(refereeId,page);

       // Default to page 1 if not provided or invalid
       const pageNumber = parseInt(page, 10) || 1;
                
       // Define the limit per page
       const limit = 5;
   
       // Calculate the skip based on pageNumber and limit
       const skip = (pageNumber - 1) * limit;

      const data = await createEventModel.find({refereeId:refereeId}).limit(limit).skip(skip).exec();

       // Count total number of Fixtures
       const totalData = await createEventModel.countDocuments({refereeId:refereeId});

      if(!data){
         res.status(404).send({
            success: false,
            message: "Event Not Found",
         })
      }

      res.status(200).send({
         success: true,
         message: "Data fetched successfully",
         data: {
           limit,
           data,
           totalData,
           totalPages: Math.ceil(totalData / limit),
           currentPage: pageNumber,
         },
       });

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Assign Events Fetch Unsuccessful",
         error:error.message
      })
   }
}

const searchRefereeAddEventController = async(req,res)=>{
   try {
     const {eventName} = req.body
     console.log(eventName); 

     if(eventName == ""){
       return 0;
     }

     const regex = RegExp(eventName, 'i');
     const data = await createEventModel.find({nameOfTheEvent:regex});

     if(!data){
        res.status(404).send({
           success: false,
           message: "Event Not Found",
        })
     }

     res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data:data
     })

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Search Events Fetch Unsuccessful",
         error:error.message
      })
   }
}

// Add Paginations
const AddPaginationToGetEvent = async(req,res)=> {
   try {
     const {page} = req.body
 
     // Default to page 1 if not provided or invalid
     const pageNumber = parseInt(page, 10) || 1;

   //   define limit number
     const limit = 5;

     // Calculate the skip value base on pageNumber and limits
     const skip = (pageNumber - 1) * limit;

     // Find all documents with the skip and limit
     const events = await createEventModel.find().skip(skip).limit(limit);

     // Count the total number of documents
     const totalDocuments = await createEventModel.countDocuments();

     res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        limit,
        events,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: pageNumber,
      },
    });
     
         
   } catch (error) {
      res.status(400).send({
          success: false,
          message: "Event data fetch Unsuccessfully",
          error:error.message
      })
   }
 }

module.exports = { createEventController, getAllEventsController,AddCoachesToEventController,AddRefereesToEventController,AddPaginationToGetEvent,GetRefereeAddEventController,searchRefereeAddEventController }