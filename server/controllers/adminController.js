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
         const {id,status,userRole} = req.body;

         console.log(userRole);
         const UpdatedUser = await PlayerModel.findByIdAndUpdate(id , {status})

         const updatedUser = await User.findOne({isAdmin:true}) 
         const notification = updatedUser.notification;

        //  console.log(UpdatedUser);
        
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

         const {deletedUserId,email} = req.body;
         console.log(deletedUserId,email);

         const deletedUser = await PlayerModel.findByIdAndDelete(deletedUserId)

         const findUser = await User.findOne({email:email})

         if(findUser.isEventOrganizer){
             findUser.isEventOrganizer = false;
             findUser.messages = []
         }
          if(findUser.isCoach){
                findUser.isCoach = false;
                findUser.messages = []
         }
          if(findUser.isPlayer){
                findUser.isPlayer = false;
                findUser.messages = []

         }
         if(findUser.isReferee){
                findUser.isReferee = false;
                findUser.messages = []
         }
         if(findUser.isTeamManager){
                findUser.isTeamManager = false;
                findUser.messages = []
         }


         await findUser.save();

         console.log(findUser);

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

const removeDetailsController = async(req,res)=>{

try {

        const {deletedUserId,email} = req.body;
         console.log(deletedUserId,email);

         const deletedUser = await PlayerModel.findByIdAndDelete(deletedUserId)

         const findUser = await User.findOne({email:email})

         if(findUser.isEventOrganizer){
             findUser.isEventOrganizer = false;
             findUser.messages = []
         }
          if(findUser.isCoach){
                findUser.isCoach = false;
                findUser.messages = []
         }
          if(findUser.isPlayer){
                findUser.isPlayer = false;
                findUser.messages = []

         }
         if(findUser.isReferee){
                findUser.isReferee = false;
                findUser.messages = []
         }
         if(findUser.isTeamManager){
                findUser.isTeamManager = false;
                findUser.messages = []
         }


         await findUser.save();

         console.log(findUser);

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

// backend pagination
const PaginationController = async (req, res) => {
       try {
         const { page } = req.body;
         console.log(page);
     
         // Default to page 1 if not provided or invalid
         const pageNumber = parseInt(page, 10) || 1;
         
         // Define the limit per page
         const limit = 5;
     
         // Calculate the skip based on pageNumber and limit
         const skip = (pageNumber - 1) * limit;
     
         // Fetch the players with limit and skip
         const players = await PlayerModel.find().limit(limit).skip(skip).exec();
     
         // Count total number of players
         const totalPlayers = await PlayerModel.countDocuments();
     
         res.status(200).send({
           success: true,
           message: "Data fetched successfully",
           data: {
             limit,
             players,
             totalPlayers,
             totalPages: Math.ceil(totalPlayers / limit),
             currentPage: pageNumber,
           },
         });
       } catch (error) {
         res.status(400).send({
           success: false,
           message: error.message,
         });
       }
     };



module.exports = {getAllDetailsController,handleStatusController,updateDetailsController,deleteDetailsController,removeDetailsController,PaginationController}