const PlayerModel = require("../models/playerModel")


const getAllDetailsController = async(req,res)=>{

     try {

        const allApplyingDetails = await PlayerModel.find({});

        res.status(200).send({
                message:"Applying user fetching successfull",
                success : true,
                allApplyingDetails
        })
        
     } catch (error) {
        res.status(200).send({
                message:"Applying user fetching have some error",
                success : false,
                error
        })
     }
        

}


const handleStatusController = async(req,res)=>{
        
        try {
         const {id,status} = req.body;
         console.log(id,status);
         const UpdatedUser = await PlayerModel.findByIdAndUpdate(id , {status})


         res.status(200).send({
              message:"Status Update Successfull",
              success:true,
              UpdatedUser
         })
                
        } catch (error) {

             res.status(400).send({
                message:"Status Update Have some error",
                success:false,
                error
           })
                
        }




}


const updateDetailsController = async(req,res)=>{

        const {updatedId} = req.body

        const positionApplyUserDataUpdated = await PlayerModel.findByIdAndUpdate(updatedId,req.body,{new:true})

         res.status(200).send({
                message:"Updated is successfull",
                success:true
         })

}


const deleteDetailsController = async(req,res)=>{

        try {

         const {deletedUserId} = req.body;
         console.log(deletedUserId);
         const deletedUser = await PlayerModel.findByIdAndDelete(deletedUserId)

         res.status(200).send({
                message:"Deleted successfull",
                success : true
         })
                
        } catch (error) {

        res.status(200).send({
                message:"Deleted Controller have error",
                success : flase
          })
                
        }


}

module.exports = {getAllDetailsController,handleStatusController,updateDetailsController,deleteDetailsController}