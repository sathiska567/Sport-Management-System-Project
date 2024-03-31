const mongoose = require('mongoose');

//schema
const MatchDetailsShema = mongoose.Schema({
   
    eventID : String,
    Name : String,
    Location : String,
    Date : String,
    EventName : String
}, {
    timestamps: true
})

const matchDetailsModel = mongoose.model("matchDetails", MatchDetailsShema)
module.exports = matchDetailsModel;