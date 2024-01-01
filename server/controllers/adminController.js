const PlayerModel = require("../models/playerModel")
const User = require("../models/userModel")


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
         const UpdatedUser = await PlayerModel.findByIdAndUpdate(id , {status})

         const updatedUser = await User.findOne({isAdmin:true}) 
         const notification = updatedUser.notification;
        
         notification.pop();
         await updatedUser.save();


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
        
        //  handle delete notification
        const deletedNotification = await User.findOne({ isAdmin: true });

    if (deletedNotification) {
        const notification = deletedNotification.notification;
        // Assuming notification is a number, decrement it

        notification.pop();

       await deletedNotification.save();
 
    }

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
                success : false
          })
                
        }


}

module.exports = {getAllDetailsController,handleStatusController,updateDetailsController,deleteDetailsController}