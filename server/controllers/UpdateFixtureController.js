const suffledNewTeamModel = require("../models/shuffledNewTeamModel");


const getAllCreatedFixtureController = async(req,res)=>{

   try {
        
      const allFixtures = await suffledNewTeamModel.find();

      res.status(200).send({
        success:true,
        message:"All fixture data fetched successfully",
        allFixtures
      })

   } catch (error) {
        res.status(400).send({
         success:false,
         message:"All fixture data fetched successfully",
         error
        })
   }

}



// GET CURRENT FIXTURE CONTROLLER
const getCurrentCreatedFixtureController = async(req,res)=>{
   try {
      const {id}= req.body

      const details = await suffledNewTeamModel.findById(id);
      // console.log(details);

      res.status(200).send({
         success:true,
         message:"Current fixture data fetched successfully",
         details
      })
      
   } catch (error) {
      res.status(400).send({
         success:true,
         message:"Current fixture data fetched Unsuccessfully",
      })
   }
    

}



// DELETE FIXTURE
const deleteFixtureController = async(req,res)=>{
        try {
          const {id} = req.body;
          const deltedResponse = await suffledNewTeamModel.findByIdAndDelete(id);

          res.status(200).send({
                success:true,
                message:"Fixture deleted successfully",
          })

        } catch (error) {
           res.status(200).send({
                    success:false,
                    message:"Fixture deleted Unsuccessfully",
                })
                
        }

}


// UPDATE FIXTURE
const fixtureUpdateController = async(req,res)=>{
   try {
//      const {id} = req.body;
//      const updatedFixture = await suffledNewTeamModel.findByIdAndUpdate({_id:id},req.body,{new:true})

   console.log(req.body);
        
   } catch (error) {
        
   }
  
}


module.exports = {getAllCreatedFixtureController,deleteFixtureController,fixtureUpdateController,getCurrentCreatedFixtureController}