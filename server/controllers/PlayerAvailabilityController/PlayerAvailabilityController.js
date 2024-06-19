const PlayerAvailabilityModel = require("../../models/PlayerAvailabilityModel/PlayerAvailabilityModel");
const User = require("../../models/userModel")


const PlayerAvailabilityController = async(req,res)=>{
   //   console.log(req.body);
   const { eventId, playerId, availability } = req.body;

   try {

           const data = await PlayerAvailabilityModel.find({ eventId: eventId , playerId:playerId });

           console.log(data);

           if (data.length == 0 && eventId!=null) {
                   const setAvailability = new PlayerAvailabilityModel({
                           eventId: eventId,
                           playerId: playerId,
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