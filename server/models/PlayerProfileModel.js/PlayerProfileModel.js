const mongoose = require('mongoose');

const playerProfileSchema = new mongoose.Schema({

     playerId:{
       type:String,
//        required:["Player name is Required",true]
     },
     playerName:{
        type:String,
        required:["Player name is Required",true]
     },
     playerEmail:{
        type:String,
        required:["Player email is Required",true]
     },
     playerDateOfBirth:{
        type:Object,
        required:["Player Date Of Birth is Required",true]
     },
     playerAge:{
        type:Number,
        required:["Player age is Required",true]
     },

     PlayerprofileImageSecureLink:{
        type:String,
     },

     PlayerprofileImageLink:{
        type:String,
     },

     playerCoverImageLink:{
        type:String,
     },

     playerMedicalReportsLink:{
        type:String,
     }

})

const playerProfileModel = mongoose.model('playerProfile',playerProfileSchema);
module.exports = playerProfileModel;