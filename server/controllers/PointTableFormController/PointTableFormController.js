const PointTableFormModel = require("../../models/PointTableFormModel/PointTableFormModel");



const PointTableForm = async (req, res) => {


   try {
      const {
         nameOfTheMatch,
         nameOfTheTeam,
         wonMatches,
         lostMatches,
         totalRunsEachTeamMatches,
         totalOversEachTeam,
         totalMarksForEachTeam
      } = req.body;



      console.log(
         nameOfTheMatch,
         nameOfTheTeam,
         wonMatches,
         lostMatches,
         totalRunsEachTeamMatches,
         totalOversEachTeam,
         totalMarksForEachTeam
      );

   
      // for point table get 

      const exists = await PointTableFormModel.findOne({ nameOfTheTeam, nameOfTheTeam });

      console.log("Exist:", exists)

      let data;

      if (!exists) {
         data = new PointTableFormModel({
            nameOfTheMatch,
            nameOfTheTeam,
            wonMatches,
            lostMatches,
            totalRunsEachTeamMatches,
            totalOversEachTeam,
            totalMarksForEachTeam
         });

         await data.save();
      } else {
         data = await PointTableFormModel.findOneAndUpdate({ _id: exists._id }, {
            wonMatches, lostMatches
         }, { new: true })
      }



      res.status(200).send({
         success: true,
         message: "Event Created Successfully",
         data
      });
   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Failed to create event details",
         error
      })
   }
}

module.exports = { PointTableForm };