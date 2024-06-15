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


const paginationFixture = async(req,res)=>{
        try {
                const { page } = req.body;
                console.log(page);
            
                // Default to page 1 if not provided or invalid
                const pageNumber = parseInt(page, 10) || 1;
                
                // Define the limit per page
                const limit = 5;
            
                // Calculate the skip based on pageNumber and limit
                const skip = (pageNumber - 1) * limit;
            
                // Fetch the Fixtures with limit and skip
                const fixture = await createFixtureModel.find().limit(limit).skip(skip).exec();
            
                // Count total number of Fixtures
                const totalFixtures = await createFixtureModel.countDocuments();
            
                res.status(200).send({
                  success: true,
                  message: "Data fetched successfully",
                  data: {
                    limit,
                    fixture,
                    totalFixtures,
                    totalPages: Math.ceil(totalFixtures / limit),
                    currentPage: pageNumber,
                  },
                });
              } catch (error) {
                res.status(400).send({
                  success: false,
                  message: error.message,
                });
              }
}


module.exports = {getFixtureController,paginationFixture}