
const express = require('express')
const router = express.Router();


//read API
app.get("/",async(req,res)=>{

    const data = await userModel.find({})
       res.json({success : true, data : data})
    })
    
    //create data || save data in mongodb
    app.post("/create",async(req, res)=>{
    // const {name, location,teams,date,time} = req.body;
    
    console.log(req.body);
    
     const data = new userModel({
        name:req.body.name,
        location:req.body.location,
        teams:req.body.teams,
        date:req.body.date,
        time:req.body.time,
     })
    
     await data.save();
    
     console.log(data);
    
    
    })
    
    //update data 
    app.put("/update", async(req,res)=>{
        console.log(req.body)
        const{ _id,...rest} = req.body
    
        console.log(rest)
         const data = await userModel.updateOne({_id : _id},rest)
         res.send({success : true, message : "data update successfully", data : data})
    })
    
    
    
    // delete API 
    app.delete("/delete/:id",async(req,res)=>{
        const id = req.params.id
        console.log(id)
        const data = await userModel.deleteOne({_id : id})
        res.send({success : true, message : "data delete successfully", data : data})
        })

        module.exports = router;