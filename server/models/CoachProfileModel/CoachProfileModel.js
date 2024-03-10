const mongoose = require('mongoose');

const coachProfileSchema = new mongoose.Schema({

   coachNo: String,
   teams: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Team'
   }],
     coachName:{
        type:String,
        required:["coach name is Required",true]
     },
     coachEmail:{
        type:String,
        required:["coach email is Required",true]
     },
     coachDateOfBirth:{
        type:Object,
        required:["coach Date Of Birth is Required",true]
     },
     coachAge:{
        type:Number,
        required:["coach age is Required",true]
     },

})

const coachProfileModel = mongoose.model('coachProfile',coachProfileSchema);
module.exports = coachProfileModel;