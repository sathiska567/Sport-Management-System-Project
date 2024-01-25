const FixtureDataModel = require("../../models/FixtureDataModel/FixtureDataModel");


const deleteTeamController = async(req,res)=>{
        try {
         const {id} = req.body
         const response = await FixtureDataModel.deleteOne({_id:id})
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


