const mongoose = require ('mongoose');

const CreateEventSchema= mongoose.Schema({
    name : String,
   location : String,
    teams : Number,
     date : String,
    time: String,
 },{
     timestamps : true
 })

const createModel = mongoose.model("create", CreateEventSchema)
module.exports =  createModel;

