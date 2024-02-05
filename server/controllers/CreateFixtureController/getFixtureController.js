const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');

const getFixtureController = async(req,res)=>{
   try {
       const fixtureData = await createFixtureModel.find();
       if(!fixtureData){
           return res.status(404).send({
                message:"No Fixture Data Found",
                success:false       
        })
       }

      res.status(200).send({
        success:true,
        message:"Fixture Data Found",
        data:fixtureData
      })

   } catch (error) {
        res.status(400).send({
                success:false,
                message:"Fixture Data does no found",
                error
        })
   }
}


module.exports = {getFixtureController}