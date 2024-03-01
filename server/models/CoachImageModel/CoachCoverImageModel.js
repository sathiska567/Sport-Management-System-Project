const mongoose = require('mongoose');

const coachCoverImageSchema = new mongoose.Schema({
        coachId: {
                type: String,
                //        required:["coach name is Required",true]
        },

        coachCoverImageSecureLink: {
                type: String,
        },

        coachCoverImageLink: {
                type: String,
        },
})

const coachCoverImage = mongoose.model('coachCoverImage', coachCoverImageSchema);
module.exports = coachCoverImage;