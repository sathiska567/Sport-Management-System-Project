const userModel = require("../../models/userModel")


const GetAllRefereeController = async (req, res) => {
   try {
      const referee = [];
      // const eventOrganizer = []
      // const coach = []
      // const referee = []
      const data = await userModel.find({});

      // console.log(data.length);

      data.forEach((user) => {
         if (user.isReferee) {
            referee.push(user);
         }
      });

      res.status(200).send({
         success: true,
         message: "Referee Details Get successfull",
         referee,
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


module.exports = {GetAllRefereeController}