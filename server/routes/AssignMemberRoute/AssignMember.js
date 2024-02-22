const express = require('express');
const router = express.Router();

//  API section 
router.get("/",async(req,res)=>{
    const data = await userModel.find({})
  //   console.log(data);
    res.json({success : true, data : data})
  })
   
  
  //create data || save data in mongodb
  router.post("/create",async(req,res)=>{
     console.log(req.body)
  const data = new userModel(req.body)
   await data.save()             // data save line use to "async" because this line
   res.send({success : true, message : "data save successfully",  data :  data})
  })
  
  
  // Handle Status
  router.post("/status",async(req,res)=>{
      const {id} = req.body
      console.log(id);
      // const id = req.params.id
      // const status = req.params.status
    
      const data = await userModel.findByIdAndUpdate(
          { _id: id },
          { status: true },
          { new: true }
        ); 
        
      data.save();
  
      res.status(200).json({success:true})
  
      console.log(data);
  
  })
  
  // // delete API 
  //  app.delete("/delete/:id",async(req,res)=>{
  //  const id = req.params.id
  //  console.log(id)
  //  const data = await userModel.deleteOne({_id : id})
  //  res.send({success : true, message : "data delete successfully", data : data})
  //  })
  
  router.post("/delete",async(req,res)=>{
      const {id} = req.body
      console.log(id);
      const deletedUser = await userModel.findByIdAndDelete(id);
      res.send({success : true, message : "data delete successfully", data : deletedUser})
  })

  module.exports = router;
  