const mongoose = require('mongoose');



//schema
const AssignPlayerSchema = mongoose.Schema({
    
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


const assignPlayerModel = mongoose.model("assignedPlayerTable", AssignPlayerSchema)
module.exports = assignPlayerModel;