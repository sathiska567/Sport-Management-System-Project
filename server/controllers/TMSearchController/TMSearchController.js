const User = require("../../models/userModel")


const TMSearchController = async (req, res) => {
        try {
          const TMName = req.body.TMName;
          console.log(TMName);
      
          // Case-insensitive regular expression for coach name
          const regex = new RegExp(TMName, 'i');
      
          // Find all users who are coaches and whose username matches the regex
          const data = await User.find({ isTeamManager: true, username: regex });
      
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
      


module.exports = { TMSearchController };