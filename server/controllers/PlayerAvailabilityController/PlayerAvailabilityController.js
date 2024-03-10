const PlayerAvailabilityModel = require("../../models/PlayerAvailabilityModel/PlayerAvailabilityModel");
const PlayerProfileModel = require('../../models/PlayerProfileModel/PlayerProfileModel')

const PlayerAvailabilityController = async(req,res)=>{
   //   console.log(req.body);
   const { eventId, playerId, availability } = req.body;

   try {

           const data = await PlayerAvailabilityModel.find({ eventId: eventId });

           console.log(data);

           if (data.length == 0) {
                   const setAvailability = new PlayerAvailabilityModel({
                           eventId: eventId,
                           playerId: playerId,
                           availability: availability
                   })


                   await setAvailability.save();

                   await PlayerProfileModel.findOneAndUpdate({PlayerNo:playerId}, {$addToSet:{Status:availability}},{ new: true, overwrite: true });

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

                   await PlayerProfileModel.findOneAndUpdate({PlayerNo:playerId}, {$addToSet:{Status:availability}}, { new: true, overwrite: true });


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



module.exports = {PlayerAvailabilityController};