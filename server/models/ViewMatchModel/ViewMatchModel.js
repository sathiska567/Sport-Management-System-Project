const mongoose = require('mongoose');

//schema
const matchDetailsSchema = mongoose.Schema({
   
    eid:String,
    name: String,
    location: String,
    date: String,
    ename: String,  
}, {
    timestamps: true
})

const ViewMatchModel  = mongoose.model("viewMatch", matchDetailsSchema)
module.exports = ViewMatchModel;