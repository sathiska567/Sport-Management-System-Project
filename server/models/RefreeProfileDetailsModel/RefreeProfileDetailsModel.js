const mongoose = require('mongoose');

const RefreeProfileSchema = new mongoose.Schema({

     RefreeId:{
       type:String,

     },
     RefreeName:{
        type:String,
        required:["Refree  name is Required",true]
     },
     RefreeEmail:{
        type:String,
        required:["Refree email is Required",true]
     },
     RefreeDateOfBirth:{
        type:Object,
        required:["Refree Date Of Birth is Required",true]
     },
     RefreeAge:{
        type:Number,
        required:["Refree age is Required",true]
     },


})

const RefreeProfileDetailsNewModel = mongoose.model('RefreeProfileDetailUpdated',RefreeProfileSchema);
module.exports = RefreeProfileDetailsNewModel;