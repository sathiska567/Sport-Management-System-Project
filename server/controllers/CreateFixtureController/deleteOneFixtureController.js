const createFixtureModel = require("../../models/CreateFixtureModel/CreateFixtureModel");
const deletedFixtureModel = require("../../models/DeletedFixtureModel/DeletedFixtureModel")


const deleteFixtureController = async(req,res)=>{
   try {

        const {id} = req.body
        console.log(id);

        const response = await createFixtureModel.deleteOne({_id:id})

        
        const deletedFixture = new deletedFixtureModel({
                eventId:id,
         })

         await deletedFixture.save()

        res.status(200).send({
                success:true,
                message:"Fixture Deleted Successfully",                
        })
        
   } catch (error) {
        res.status(400).send({
                success:false,
                message:"Error Occured In Deleting Fixture",
                error
        })
   }

}


module.exports = {deleteFixtureController};