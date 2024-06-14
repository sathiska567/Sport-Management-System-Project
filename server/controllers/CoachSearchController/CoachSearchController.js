const User = require("../../models/userModel")


const CoachSearchController = async (req, res) => {
        try {
          const coachName = req.body.coachName;
          console.log(coachName);
      
          // Case-insensitive regular expression for coach name
          const regex = new RegExp(coachName, 'i');
      
          // Find all users who are coaches and whose username matches the regex
          const data = await User.find({ isCoach: true, username: regex });
      
          res.status(200).send({
            success: true,
            message: "Data fetched successfully",
            data: data,
          });
        } catch (error) {
          res.status(400).send({
            success: false,
            message: error.message,
          });
        }
      };
      


module.exports = { CoachSearchController };