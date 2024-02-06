const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');

const getOneFixtureController = async(req,res)=>{
   try {
    const {id} = req.body;
    console.log(id);

    const data = await createFixtureModel.findById(id);
    console.log(data);

    if(!data){
      return res.status(404).send({
        success:false,
        message:"Not found"
     })
    }

    res.status(200).send({
        success:true,
        message:"Successfully fetched one fixture",
        data:data
     })

   } catch (error) {
        res.status(400).send({
           success:false,
           message:error.message
        })
   }
  
}


module.exports = {getOneFixtureController}