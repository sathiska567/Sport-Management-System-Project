const mongoose = require('mongoose');

//schema
const AssignMemberSchema = mongoose.Schema({
   
    evename: String,
    teamname: String,
    evedate: String,  
}, {
    timestamps: true
})

const assignEventModel = mongoose.model("assignEvent", AssignMemberSchema)
module.exports = assignEventModel;