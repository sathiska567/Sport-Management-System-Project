const userModel = require("../../models/userModel")

const getPlayerDetailsController = async (req, res) => {
   try {
      const players = [];
      // const eventOrganizer = []
      // const coach = []
      // const referee = []
      const data = await userModel.find({});

      // console.log(data.length);

      data.forEach((user) => {
         if (user.isPlayer) {
            players.push(user);
         }
         // else if (user.isEventOrganizer) {
         //    eventOrganizer.push(user);
         // }
         // else if(user.isCoach){
         //    coach.push(user);
         // }

         // else if(user.isReferee){
         //    referee.push(user);
         // }
      });

      res.status(200).send({
         success: true,
         message: "Player Details Get successfull",
         players,
         // eventOrganizer,
         // coach,
         // referee
      });

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Get Player Details have an error",
         error
      });
   }
};


module.exports = {getPlayerDetailsController}