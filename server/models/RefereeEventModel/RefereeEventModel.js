const mongoose = require('mongoose');

const RefereeEventSchema = mongoose.Schema({
    ref_id: {
        type: String,
        required: true
    },
    event_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

const RefereeEventModel = mongoose.model("referee_event", RefereeEventSchema)
module.exports = RefereeEventModel;