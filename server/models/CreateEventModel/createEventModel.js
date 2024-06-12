const mongoose = require("mongoose");


const createEventSchema = mongoose.Schema({
  nameOfTheEvent :{
        type:String,
        required:["Please enter name of the event",true]
  },

  location :{
        type:String,
        required:["Please enter location of the event",true]
  },

  numberOfTeams :{
        type:Number,
        required:["Please enter number of team of the event",true]
  },

  eventNewDate:{
        type:String,
        required:["Please enter Date of the event",false]
  },

  formattedTime :{
        type:String,
        required:["Please enter Starting time of the event",false]
  },
   


})


const createEvent = mongoose.model("createEvent", createEventSchema);
module.exports = createEvent;