const mongoose = require("mongoose");


const DeleteEventModelSchema = mongoose.Schema({
  eventId :{
        type:String,
        required:true
  },
   
})


const deletedEvent = mongoose.model("deletedEvent", DeleteEventModelSchema);
module.exports = deletedEvent;