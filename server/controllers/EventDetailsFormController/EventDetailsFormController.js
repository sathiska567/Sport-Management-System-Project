const EventDetailsFormModel = require("../../models/EventDetailsFormModel/EventDetailsFormModel");



const eventDetailsForm = async (req, res) => {


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



      const data = new EventDetailsFormModel({
         nameOfTheMatch,
         nameOfTheTeam,
         wonMatches,
         lostMatches,
         totalRunsEachTeamMatches,
         totalOversEachTeam,
         totalMarksForEachTeam
      });

      

      await data.save();

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

module.exports = { eventDetailsForm };