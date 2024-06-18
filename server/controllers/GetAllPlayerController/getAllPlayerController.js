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


const playerPaginationController = async (req, res) => {
   try {
      const { page } = req.body;

      // Default to page 1 if not provided or invalid
      const pageNumber = parseInt(page, 10) || 1;

      // Define the limit per page
      const limit = 5;

      // Calculate the skip based on pageNumber and limit
      const skip = (pageNumber - 1) * limit;

      // Fetch the players with limit and skip
      const players = await userModel.find({ isPlayer: true }).limit(limit).skip(skip).exec();

      // Count total number of players
      const totalPlayers = await userModel.countDocuments({ isPlayer: true });

      res.status(200).send({
         success: true,
         message: "Data fetched successfully",
         data: {
            limit,
            players,  // Corrected from fixture to players
            totalPlayers,
            totalPages: Math.ceil(totalPlayers / limit),
            currentPage: pageNumber,
         },
      });
   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Get Player Details encountered an error",
         error: error.message,
      });
   }
};


const getOnlySearchResultController = async (req, res) => {
   try {
      const { playerName } = req.body;
      console.log(playerName);

      // Case-insensitive regular expression for coach name
      const regex = new RegExp(playerName, 'i');

      // Find all users who are coaches and whose username matches the regex
      const data = await userModel.find({ isPlayer: true, username: regex });

      res.status(200).send({
         success: true,
         message: '  Search Review Fetched Successfully',
         data: data
      })

   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Get Player Details encountered an error",
         error: error.message,
      })
   }
}


module.exports = { getPlayerDetailsController, playerPaginationController, getOnlySearchResultController }