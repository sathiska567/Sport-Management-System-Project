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



      const data = new PointTableFormModel({
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


const GetPointTableFormController = async(req,res)=>{
   try {
      const allCreatedPointTableDetails = await PointTableFormModel.find({});
      res.status(200).send({
         success: true,
         message: "All Created Point Table Details",
         allCreatedPointTableDetails
      })
      
   } catch (error) {
      res.status(400).send({
         success: false,
         message: "Failed to create event details",
         error
      })
   }
}

module.exports = { PointTableForm,GetPointTableFormController };