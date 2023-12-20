const playerModel = require("../models/playerModel");
const userModel = require("../models/userModel");

// All Doctor Details
const getAllRequestController = async (req, res) => {
  try {

    const doctors = await playerModel.find({});

    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

//Doctor Account Status
const changeAccountStatusController = async(req,res)=>{
     
        try {
 
          // console.log(req.body);

         const {playerId , status} = req.body

         console.log(playerId);

         const player = await playerModel.findByIdAndUpdate(playerId , {status})
         
         console.log(player);

        //  const user = await playerModel.findOne({_id:doctor.id})  
        //  console.log(user);
        //  const notification = user.notification

        //  notification.push({

        //         type : 'doctor-account-updated',
        //         message : "Your account updated",
        //         onClickPath : '/notification'

        //  })


        //  user.isDoctor === 'approved' ? true : false
        //  await user.save()

         res.status(201).send({
                success : true,
                message : 'Account Status Updated',
                data : player

         })

                
        } catch (error) {

                console.log('Error occure inside the changeAccountStatusController');
                res.status(400).send({
                   success : false,
                   message : 'Error occure',
                   error
                })
                
        }


}


module.exports = {
  getAllRequestController,
  changeAccountStatusController,
};