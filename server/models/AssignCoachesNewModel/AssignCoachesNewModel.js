const mongoose = require('mongoose');

//schema
const AssignMemberSchema = mongoose.Schema({


    sid: String,
    name: String,
    location: String,
    status: {
        type: Boolean,
        default: false
    },
    assignedEvents: [String]
}, 


{
    timestamps: true
    
})


const assignModel = mongoose.model("assignCoachesNew", AssignMemberSchema)
module.exports = assignModel;