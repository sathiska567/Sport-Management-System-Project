const FixtureDataModel = require("../../models/FixtureDataModel/FixtureDataModel");
const deletedFixtureModel = require("../../models/DeletedFixtureModel/DeletedFixtureModel")

const deleteTeamController = async(req,res)=>{
        try {
         const {id} = req.body
         console.log(id);
         const response = await FixtureDataModel.deleteOne({_id:id})

         const deletedFixture = new deletedFixtureModel({
                eventId:id,
         })

         await deletedFixture.save()

         res.status(200).send({
                success:true,
                message:"Team Deleted Successfully",
         })
                
        } catch (error) {
                res.status(200).send({
                        success:false,
                        message:"Team Deleted Unsccessfully",
                 })  
        }

}

module.exports = {deleteTeamController};


