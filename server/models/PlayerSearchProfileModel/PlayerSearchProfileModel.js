const mongoose = require('mongoose');

//schema
const playerSearchProfileSchema = new mongoose.Schema({
   
    pid:String,
    name: String,
    location: String,
    experence: String,  
}, {
    timestamps: true
})

const playerSearchProfileModel  = mongoose.model("PlayerSearchprofile", playerSearchProfileSchema)
module.exports = playerSearchProfileModel ;