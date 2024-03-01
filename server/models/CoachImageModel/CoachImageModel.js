const mongoose = require('mongoose');

const coachImageSchema = new mongoose.Schema({
        coachId: {
                type: String,
                //        required:["coach name is Required",true]
        },
        coachprofileImageSecureLink: {
                type: String,
        },

        coachprofileImageLink: {
                type: String,
        },

        coachCoverImageSecureLink: {
                type: String,
        },

        coachCoverImageLink: {
                type: String,
        },

        coachMedicalReportsLink: {
                type: String,
        }
})

const coachImage = mongoose.model('coachImage', coachImageSchema);
module.exports = coachImage;