const mongoose = require('mongoose');

//schema
const AssignMemberSchema = new mongoose.Schema({
    sid: String,
    name: String,
    location: String,
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const AssignModel = mongoose.model("Assign", AssignMemberSchema);

module.exports = AssignModel;
