const PlayerAvailabilityModel = require("../../models/PlayerAvailabilityModel/PlayerAvailabilityModel");
const User = require("../../models/userModel")
const createdEventModel = require("../../models/CreateEventModel/createEventModel")


const PlayerAvailabilityController = async(req,res)=>{
   //   console.log(req.body);
   const { eventId, playerId, availability } = req.body;

   try {
           const data = await PlayerAvailabilityModel.find({ eventId: eventId , playerId:playerId });
           const event = await createdEventModel.findById(eventId);

           
           if(availability){
                if (event) {
                  event.availableSetPlayerId.push(playerId)  
                        
                  await event.save();
              }
           }else{
                  if (event) {
                  event.availableSetPlayerId.pull(playerId)  
                        
                  await event.save();
              }
           }

           console.log(data);

           if (data.length == 0) {
                   const setAvailability = new PlayerAvailabilityModel({
                           eventId: eventId,
                           playerId: playerId,
                           availability: availability
                   })

                //    const addPlayerAvailability = new User({
                //            _id: playerId,
                //            availability: availability,
                //    })

                //    await addPlayerAvailability.save();
                   await setAvailability.save();

                   res.status(200).send({
                           success: true,
                           message: "Availability added successfully",
                           setAvailability
                   })

                   //       console.log(setAvailability);
           }
           else {
                   const setAvailability = await PlayerAvailabilityModel.findOneAndUpdate({ eventId: eventId }, { availability: availability }, { new: true })
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

const getEventAvailablePlayersController = async(req,res)=>{
    try {
        const { eventId } = req.body;

            const availableData = await PlayerAvailabilityModel.find({ eventId: eventId,availability:true});

            const data = await User.find({ _id: { $in: availableData.map((item) => item.playerId) } });

            console.log(availableData);


        res.status(200).send({
                success: true,
                message: "Event Available Players Fetch successful",
                data:data
            })  
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Availability added Unsuccessfully",
            error
        })
    }    
}




module.exports = {PlayerAvailabilityController,getEventAvailablePlayersController};