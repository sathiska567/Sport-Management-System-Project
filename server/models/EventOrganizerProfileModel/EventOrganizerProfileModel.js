const mongoose = require('mongoose');

const eventOrganizerProfileSchema = new mongoose.Schema({

     eventOrganizerId:{
       type:String,
//        required:["eventOrganizer name is Required",true]
     },
     eventOrganizerName:{
        type:String,
        required:["eventOrganizer name is Required",true]
     },
     eventOrganizerEmail:{
        type:String,
        required:["eventOrganizer email is Required",true]
     },
     eventOrganizerDateOfBirth:{
        type:Object,
        required:["eventOrganizer Date Of Birth is Required",true]
     },
     eventOrganizerAge:{
        type:Number,
        required:["eventOrganizer age is Required",true]
     },


})

const eventOrganizerProfileModel = mongoose.model('eventOrganizerProfile',eventOrganizerProfileSchema);
module.exports = eventOrganizerProfileModel;