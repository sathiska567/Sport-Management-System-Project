const userModel = require("../models/userModel");

const ApproveActorModelController = async(req,res)=>{
   try {
        const {email,userRole} = req.body; 
        console.log(email,userRole);

        // const userRoleValue = userRole.toLowerCase();

     const result = await userModel.findOne({email:email})
     if (!result) {
        return res.status(400).send({
           success:false,
           message:"User not found"        
        })        
     }

     if(userRole == "player"){
         result.isPlayer = true;
     }
     else if(userRole == "event organizer"){
          result.isEventOrganizer = true;
     }
     else if(userRole == "coach"){
          result.isEventOrganizer = true;
     }
     else if(userRole == "referee"){
          result.isEventOrganizer = true;
     }
     else{
        return res.status(400).send({
                success:false,
                message:"Invalid user role.Please use registered Email !"
        })
     }

     await result.save();

     console.log("current result " , result);

    res.status(200).send({
        success:true,
        message:"User role approved successfully",
        result
    })


   } catch (error) {
        res.status(400).send({
          success:false,
          message:"Error in ApproveActorModelController",
          error        
        })
   }

}


module.exports = {ApproveActorModelController};