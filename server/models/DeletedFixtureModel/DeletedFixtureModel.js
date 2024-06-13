const mongoose = require("mongoose");


const DeletedFixtureModeSchema = mongoose.Schema({
  eventId :{
        type:String,
        required:true
  },
   
})


const deletedFixtureModel = mongoose.model("deletedFixture", DeletedFixtureModeSchema);
module.exports = deletedFixtureModel;