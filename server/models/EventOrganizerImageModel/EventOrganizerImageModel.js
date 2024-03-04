const mongoose = require('mongoose');

const eventOrganizerImageSchema = new mongoose.Schema({
        eventOrganizerId: {
                type: String,
                //        required:["eventOrganizer name is Required",true]
        },
        eventOrganizerprofileImageSecureLink: {
                type: String,
        },

        eventOrganizerprofileImageLink: {
                type: String,
        },

        eventOrganizerCoverImageSecureLink: {
                type: String,
        },

        eventOrganizerCoverImageLink: {
                type: String,
        },

        eventOrganizerMedicalReportsLink: {
                type: String,
        }
})

const eventOrganizerImage = mongoose.model('eventOrganizerImage', eventOrganizerImageSchema);
module.exports = eventOrganizerImage;