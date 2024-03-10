const mongoose = require('mongoose');

//schema
const AssignMemberSchema = mongoose.Schema({
    sid: String,
    name: String,
    location: String,
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const assignModel = mongoose.model("assign", AssignMemberSchema)
module.exports = assignModel;