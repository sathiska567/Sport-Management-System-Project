const mongoose = require ('mongoose');

const EventList= mongoose.Schema({
    name : String,
   location : String,
    teams : Number,
     date : String,
    time: String,
 },{
     timestamps : true
 })

const createModel = mongoose.model("evetlist", EventList)
module.exports =  createModel;