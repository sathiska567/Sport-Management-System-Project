const mongoose = require('mongoose');

//schema
const AssignEventCoachesSchema = new mongoose.Schema({
   
    evename: String,
    teamname: String,
    evedate: String,  
}, {
    timestamps: true
})

const assignEventCoachesModel = mongoose.model("assignEventCoaches", AssignEventCoachesSchema)
module.exports = assignEventCoachesModel;