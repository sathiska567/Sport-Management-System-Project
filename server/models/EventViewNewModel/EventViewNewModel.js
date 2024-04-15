const mongoose = require('mongoose');

//schema
const AssignEventMemberSchema = mongoose.Schema({
   
    evename: String,
    teamname: String,
    evedate: String,  
}, {
    timestamps: true
})

const assignEventMemberModel = mongoose.model("assignEventMember",AssignEventMemberSchema)
module.exports = assignEventMemberModel;